import { Mail, Phone, Smartphone } from 'lucide-react';

export default function TopBar(): React.JSX.Element {
  return (
    <div
      className="fixed top-0 inset-x-0 z-50 h-8 hidden sm:flex items-center"
      style={{ background: 'linear-gradient(to right, #214aaf, #3B82F6)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center gap-5">
        <a
          href="mailto:info@brightpathnepal.com"
          className="flex items-center gap-1.5 text-white hover:text-blue-100 transition-colors"
          style={{ fontSize: '11px', fontWeight: 500 }}
        >
          <Mail size={12} style={{ color: '#93c5fdcc' }} />
          info@brightpathnepal.com
        </a>

        <a
          href="tel:01-5313666"
          className="flex items-center gap-1.5 text-white hover:text-blue-100 transition-colors"
          style={{ fontSize: '11px', fontWeight: 500 }}
        >
          <Phone size={12} style={{ color: '#93c5fdcc' }} />
          01-5313666
        </a>

        <a
          href="tel:+9779845411411"
          className="flex items-center gap-1.5 text-white hover:text-blue-100 transition-colors"
          style={{ fontSize: '11px', fontWeight: 500 }}
        >
          <Smartphone size={12} style={{ color: '#93c5fdcc' }} />
          +977 9845411411
        </a>
      </div>
    </div>
  );
}