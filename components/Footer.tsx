import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Only Area */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img src={LOGO_URL} alt="Marbot LMS Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              Platform belajar mandiri untuk meningkatkan kualitas pengelolaan masjid di seluruh Indonesia. Rapi, Bersih, dan Berdampak.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#14B8A6] hover:border-[#14B8A6] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-[#0F172A] mb-5">Navigasi</h4>
            <ul className="space-y-3">
              {['Pembelajaran', 'Pengajar', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Pembelajaran' ? '/katalog' : item === 'Pengajar' ? '/pengajar' : '/'} className="text-sm text-[#64748B] hover:text-[#14B8A6] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-[#0F172A] mb-5">Legalitas</h4>
            <ul className="space-y-3">
              {['Kebijakan Privasi', 'S&K', 'Bantuan', 'Karir'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-[#64748B] hover:text-[#14B8A6] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#0F172A] mb-5">Hubungi Kami</h4>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Email: bantuan@marbot.id<br />
              WA: +62 812-3456-7890<br />
              Gedung Management Masjid Lt. 2<br />
              Jakarta Selatan, Indonesia
            </p>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#64748B]">
          <p>© 2024 Marbot LMS. Semua Hak Dilindungi.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6]"></span>
              <span>Sistem Operasional</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;