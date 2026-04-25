import { Mail, Phone, Smartphone } from 'lucide-react';
import Image from 'next/image';

export default function TopBar(): React.JSX.Element {
    return (
        <div className="fixed top-0 inset-x-0 z-50 h-8 hidden sm:flex items-center bg-gradient-to-r from-[#214aaf] to-blue-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center gap-5">
                <a
                    href="mailto:info@brightpathnepal.com"
                    className="flex items-center gap-1.5 text-white hover:text-blue-100 text-[11px] font-medium transition-colors"
                >
                    <Mail size={12} className="text-blue-300/80" />
                    info@brightpathnepal.com
                </a>

                <a
                    href="tel:01-5313666"
                    className="flex items-center gap-1.5 text-white hover:text-blue-100 text-[11px] font-medium transition-colors"
                >
                    <Phone size={12} className="text-blue-300/80" />
                    01-5313666
                </a>

                <a
                    href="tel:+9779845411411"
                    className="flex items-center gap-1.5 text-white hover:text-blue-100 text-[11px] font-medium transition-colors"
                >
                    <Smartphone size={12} className="text-blue-300/80" />
                    +977 9845411411
                </a>
            </div>
            <div className="flex items-center gap-3 p-12 mr-4">
                <a href="https://facebook.com/brightpathnepal" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="https://cdn.simpleicons.org/facebook/ffffff"
                        alt="Facebook"
                        width={14}
                        height={14}
                    />
                </a>
                <a href="https://instagram.com/brightpathnepal" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="https://cdn.simpleicons.org/instagram/ffffff"
                        alt="Instagram"
                        width={14}
                        height={14}
                    />
                </a>
                <a target="_blank" rel="noopener noreferrer">
                    <Image
                        src="https://cdn.simpleicons.org/youtube/ffffff"
                        alt="Youtube"
                        width={14}
                        height={14}
                    />
                </a>
                <a href="https://tiktok.com/@brightpathnepal" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="https://cdn.simpleicons.org/tiktok/ffffff"
                        alt="Tiktok"
                        width={14}
                        height={14}
                    />
                </a>
            </div>
        </div>
    );
}