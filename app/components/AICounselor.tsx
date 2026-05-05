'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  FileUp,
  Globe,
  CheckCircle2,
  User,
  FileText,
  LayoutDashboard,
  Sparkles,
  Mic,
  MicOff,
} from 'lucide-react';
import { createChatSession, MR_BRIGHT_INSTRUCTION } from '../../services/geminiService';
import type { ChatMessage, LeadProfile } from '../../types/index';
import { GoogleGenAI, type LiveServerMessage, Modality } from '@google/genai';

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AICounselor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Hello, I am **Mr. Bright**, your AI study abroad counsellor. To help you find the **most accurate path**, I encourage you to **upload your latest academic qualification** or transcript. The more we know about your journey, the better I can tailor a **roadmap for your global future**.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [profile, setProfile] = useState<LeadProfile>({
    verificationStatus: 'unverified',
  });

  const chatSessionRef = useRef<ReturnType<typeof createChatSession> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const liveSessionRef = useRef<unknown>(null);
  const audioContextsRef = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const nextStartTimeRef = useRef(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionRef = useRef({ user: '', model: '' });

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      try {
        chatSessionRef.current = createChatSession();
      } catch (err) {
        console.error('Session Init Error:', err);
      }
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data: { country_name?: string; city?: string }) => {
          setProfile((prev) => ({ ...prev, nationality: data.country_name, location: data.city }));
        })
        .catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const stopLiveMode = () => {
    if (liveSessionRef.current) {
      (liveSessionRef.current as { close: () => void }).close();
      liveSessionRef.current = null;
    }
    if (audioContextsRef.current.input) audioContextsRef.current.input.close();
    if (audioContextsRef.current.output) audioContextsRef.current.output.close();
    audioSourcesRef.current.forEach((s) => s.stop());
    audioSourcesRef.current.clear();
    setIsLiveActive(false);
  };

  const startLiveMode = async () => {
    if (isLiveActive) {
      stopLiveMode();
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return;

    try {
      setIsLiveActive(true);
      const ai = new GoogleGenAI({ apiKey });

      const AudioCtx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      const outputCtx = new AudioCtx({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-preview-native-audio-dialog',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then((session) => {
                (session as { sendRealtimeInput: (input: unknown) => void }).sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const outCtx = audioContextsRef.current.output!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const src = outCtx.createBufferSource();
              src.buffer = audioBuffer;
              src.connect(outCtx.destination);
              src.addEventListener('ended', () => audioSourcesRef.current.delete(src));
              src.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              audioSourcesRef.current.add(src);
            }

            if (message.serverContent?.interrupted) {
              audioSourcesRef.current.forEach((s) => s.stop());
              audioSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.inputTranscription) {
              transcriptionRef.current.user += (message.serverContent.inputTranscription as { text?: string }).text ?? '';
            }
            if (message.serverContent?.outputTranscription) {
              transcriptionRef.current.model += (message.serverContent.outputTranscription as { text?: string }).text ?? '';
            }

            if (message.serverContent?.turnComplete) {
              const userText = transcriptionRef.current.user;
              const modelText = transcriptionRef.current.model;
              if (userText || modelText) {
                setMessages((prev) => [
                  ...prev,
                  { role: 'user', text: userText || '[Voice Input]' },
                  { role: 'model', text: modelText || '[Voice Response]' },
                ]);
              }
              transcriptionRef.current = { user: '', model: '' };
            }
          },
          onerror: (e: unknown) => {
            console.error('Live Error:', e);
            stopLiveMode();
          },
          onclose: () => {
            setIsLiveActive(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: MR_BRIGHT_INSTRUCTION,
        },
      });

      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Live Mode Init Error:', err);
      setIsLiveActive(false);
    }
  };

  const handleSend = async (
    overrideText?: string,
    attachment?: { data: string; mimeType: string; name: string },
  ) => {
    const textToSend = overrideText ?? input;
    if (!textToSend.trim() && !attachment) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'undefined') {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: textToSend },
        { role: 'model', text: 'Mr. Bright is currently resting. (Reason: API Key not configured).' },
      ]);
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      text: textToSend,
      attachmentName: attachment?.name,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });

      if (attachment) {
        setProfile((p) => ({ ...p, verificationStatus: 'analyzing' }));
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Analyze this document for BrightPath Nepal counselling. Extract key details like Name, GPA, and Level. Update the user on their eligibility.`,
                },
                { inlineData: { data: attachment.data, mimeType: attachment.mimeType } },
              ],
            },
          ],
        });
        const responseText = response.text ?? "I've reviewed the document. How else can I assist?";
        setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
        setProfile((p) => ({ ...p, verificationStatus: 'verified' }));
      } else {
        if (!chatSessionRef.current) {
          chatSessionRef.current = createChatSession();
        }

        const stream = await chatSessionRef.current.sendMessageStream({ message: textToSend });
        let fullResponse = '';

        setMessages((prev) => [...prev, { role: 'model', text: '', isStreaming: true }]);

        for await (const chunk of stream) {
          fullResponse += chunk.text ?? '';
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last?.isStreaming) last.text = fullResponse;
            return copy;
          });
        }

        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last) {
            last.isStreaming = false;
            last.text = fullResponse;
          }
          return copy;
        });
      }
    } catch (error: unknown) {
      console.error('AICounselor send error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'I encountered a small hiccup. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      handleSend(`I've uploaded my ${file.name}. Please check my eligibility.`, {
        data: base64,
        mimeType: file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const getContextualPills = (): string[] => {
    if (messages.length < 3) return ['Check Eligibility', 'Study in Japan', 'Australia Scholarships'];
    if (profile.verificationStatus === 'unverified') return ['Upload Transcript', 'IELTS vs PTE', 'Fee Structure'];
    return ['Suggest Universities', 'Visa Success Rate', 'Book Physical Counselling'];
  };

  const formatMessage = (text: string): string => {
    if (!text) return '';
    const tableRegex = /\|(.+)\|.*\n\|(?:[ :\-]+|)\|\n((?:\|.*\|\n?)*)/g;
    let html = text.replace(tableRegex, (_match, header: string, body: string) => {
      const headerCols = header.split('|').filter((c: string) => c.trim()).map((c: string) => c.trim());
      const bodyRows = body
        .trim()
        .split('\n')
        .map((row: string) =>
          row.split('|').filter((c: string) => c.trim()).map((c: string) => c.trim()),
        );
      const headerHtml = `<thead><tr class="bg-[#0f3f8c] text-white text-[9px] uppercase tracking-widest font-black">${headerCols.map((c: string) => `<th class="p-2 border-r border-white/10 last:border-0">${c}</th>`).join('')}</tr></thead>`;
      const bodyHtml = `<tbody>${bodyRows
        .map(
          (row: string[], i: number) =>
            `<tr class="${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0">${row.map((c: string) => `<td class="p-2 border-r border-slate-100 last:border-0 text-[10px] font-bold text-slate-700">${c}</td>`).join('')}</tr>`,
        )
        .join('')}</tbody>`;
      return `<div class="my-4 overflow-hidden rounded-xl border border-slate-200 shadow-sm"><table class="w-full text-left border-collapse">${headerHtml}${bodyHtml}</table></div>`;
    });
    html = html.replace(/\*\*(.*?)\*\*/g, '<span class="font-black text-[#6b21a8]">$1</span>');
    return html.replace(/\n/g, '<br/>');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="flex gap-3 items-end mb-4 max-w-[95vw]">
          {showProfile && (
            <div className="hidden md:flex flex-col w-48 h-[400px] bg-gradient-to-b from-[#0f3f8c] to-[#1e40af] rounded-2xl shadow-2xl p-5 text-white animate-in slide-in-from-right-5 duration-300">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <LayoutDashboard className="w-4 h-4 text-blue-200" />
                <h4 className="font-bold text-[12px] tracking-tight">Lead Center</h4>
              </div>
              <div className="space-y-5 flex-1 overflow-y-auto">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase font-bold text-blue-200 tracking-widest">Origin</p>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{profile.nationality ?? 'Detecting...'}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] uppercase font-bold text-blue-200 tracking-widest">Verification</p>
                  <div
                    className={`flex items-center gap-1.5 text-[8px] font-bold py-1 px-2.5 rounded-full w-fit ${
                      profile.verificationStatus === 'verified'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : profile.verificationStatus === 'analyzing'
                          ? 'bg-blue-500/20 text-blue-300 animate-pulse border border-blue-500/30'
                          : 'bg-white/10 text-white/60 border border-white/10'
                    }`}
                  >
                    {profile.verificationStatus === 'verified' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : (
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    )}
                    {profile.verificationStatus.toUpperCase()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSend('Please prepare my Lead Report.')}
                className="mt-4 w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-black transition-all flex items-center justify-center gap-2 border border-white/10 uppercase tracking-widest"
              >
                <FileText className="w-3.5 h-3.5" /> Lead Report
              </button>
            </div>
          )}

          <div className="w-[88vw] md:w-[350px] h-[450px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-[#0f3f8c] to-[#1e40af] p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f3f8c] rounded-full" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight leading-none mb-1">Mr. Bright</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-blue-200 rounded-full animate-pulse" />
                    <p className="text-[9px] text-blue-100 uppercase tracking-widest font-black">AI Consultant</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`p-2 rounded-xl transition-all ${showProfile ? 'bg-white/20' : 'hover:bg-white/10'}`}
                  aria-label="Toggle lead profile"
                >
                  <User className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[90%] space-y-1">
                    <div
                      className={`p-4 rounded-3xl text-[12px] leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-[#1e40af] text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-medium'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                      {msg.attachmentName && (
                        <div className="mt-3 flex items-center gap-2 p-2 bg-blue-50 text-[#1e40af] rounded-xl border border-blue-100 text-[9px] font-black uppercase tracking-wider">
                          <FileText className="w-3.5 h-3.5" /> {msg.attachmentName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && !messages[messages.length - 1]?.isStreaming && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-3xl rounded-tl-none p-4 shadow-sm flex items-center gap-3">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1e40af]" />
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Counsellor is typing...</span>
                  </div>
                </div>
              )}

              {isLiveActive && (
                <div className="flex justify-center p-4">
                  <div className="flex items-center gap-3 bg-[#1e40af]/10 px-6 py-2.5 rounded-full border border-[#1e40af]/20">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-[#1e40af] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#1e40af] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#1e40af] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-[#1e40af] tracking-widest">Listening...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto shrink-0 border-t border-slate-100">
              {getContextualPills().map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSend(pill)}
                  className="whitespace-nowrap px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black text-[#1e40af] hover:border-[#1e40af] hover:bg-blue-50 transition-all shadow-sm uppercase tracking-wider"
                >
                  {pill}
                </button>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3 shrink-0">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,application/pdf"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-[#1e40af] hover:bg-blue-50 rounded-full transition-all"
                aria-label="Upload transcript"
              >
                <FileUp className="w-5 h-5" />
              </button>

              <button
                onClick={startLiveMode}
                className={`p-2 transition-all rounded-full flex items-center justify-center ${
                  isLiveActive ? 'bg-red-100 text-red-500' : 'text-slate-400 hover:text-[#1e40af] hover:bg-blue-50'
                }`}
                aria-label={isLiveActive ? 'Stop voice mode' : 'Start voice mode'}
              >
                {isLiveActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLiveActive ? 'Voice mode active...' : 'Ask Mr. Bright...'}
                disabled={isLiveActive}
                className="flex-1 bg-slate-50 px-4 py-2.5 rounded-full outline-none focus:ring-4 focus:ring-[#1e40af]/5 text-[12px] border border-slate-200 font-medium disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !input.trim() || isLiveActive}
                className="p-3 bg-[#1e40af] text-white rounded-full hover:bg-[#0f3f8c] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex flex-col items-end cursor-pointer group animate-in slide-in-from-right-4 duration-500"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
            aria-label="Open Mr. Bright AI chat"
          >
            <div className="bg-white px-6 py-4 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 relative before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-r before:border-t before:border-slate-100 group-hover:bg-slate-50 transition-all">
              <div className="w-10 h-10 bg-[#1e40af]/10 rounded-2xl flex items-center justify-center text-[#1e40af] shrink-0 animate-bounce">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Free AI Support</p>
                <p className="text-sm font-black text-slate-900 tracking-tight leading-none">Voice or Chat with Mr. Bright</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (isOpen && isLiveActive) stopLiveMode();
            setIsOpen(!isOpen);
          }}
          aria-label={isOpen ? 'Close Mr. Bright chat' : 'Open Mr. Bright chat'}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 relative ${
            isOpen ? 'bg-white text-[#1e40af]' : 'bg-gradient-to-br from-[#1e40af] to-[#6b21a8] text-white'
          }`}
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <>
              <MessageCircle className="w-8 h-8" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AICounselor;