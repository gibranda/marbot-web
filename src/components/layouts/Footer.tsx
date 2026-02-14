/* eslint-disable sonarjs/no-nested-conditional */
/* eslint-disable react/no-array-index-key */
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

import { LOGO_URL } from "@/constants/constants";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo Only Area */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-6 flex items-center">
              <img src={LOGO_URL} alt="Marbot LMS Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-[#64748B]">
              Platform belajar mandiri untuk meningkatkan kualitas pengelolaan masjid di seluruh Indonesia. Rapi,
              Bersih, dan Berdampak.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="mb-5 font-bold text-[#0F172A]">Navigasi</h4>
            <ul className="space-y-3">
              {["Pembelajaran", "Pengajar", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Pembelajaran" ? "/katalog" : item === "Pengajar" ? "/pengajar" : "/"}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#14B8A6]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="mb-5 font-bold text-[#0F172A]">Legalitas</h4>
            <ul className="space-y-3">
              {["Kebijakan Privasi", "S&K", "Bantuan", "Karir"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-sm text-[#64748B] transition-colors hover:text-[#14B8A6]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-bold text-[#0F172A]">Hubungi Kami</h4>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Email: bantuan@marbot.id
              <br />
              WA: +62 812-3456-7890
              <br />
              Gedung Management Masjid Lt. 2<br />
              Jakarta Selatan, Indonesia
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-[#E2E8F0] pt-8 text-sm text-[#64748B] md:flex-row">
          <p>© 2024 Marbot LMS. Semua Hak Dilindungi.</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <span className="flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-[#14B8A6]"></span>
              <span>Sistem Operasional</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
