import localFont from "next/font/local";

const jaini = localFont({
  src: [
    {
      path: "../assets/fonts/jaini/jaini-v1-latin-regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-jaini",
});

export default jaini;

/**
 * export const geistSans = localFont({
 * src: "../assets/fonts/GeistVF.woff",
 * variable: "--font-geist-sans",
 * weight: "100 900",
 * });
 * export const geistMono = localFont({
 * src: "../assets/fonts/GeistMonoVF.woff",
 * variable: "--font-geist-mono",
 * weight: "100 900",
 * });
 */
