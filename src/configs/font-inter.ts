import localFont from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../assets/fonts/inter/Inter-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/inter/Inter-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../assets/fonts/inter/Inter-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "../assets/fonts/inter/Inter-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../assets/fonts/inter/Inter-SemiBoldItalic.woff2",
      style: "italic",
      weight: "600",
    },
    {
      path: "../assets/fonts/inter/Inter-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../assets/fonts/inter/Inter-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
  ],
  variable: "--font-inter",
});

export default inter;
