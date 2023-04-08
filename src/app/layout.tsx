import { Manrope } from "next/font/google";
import "./global.css";
import classNames from "classnames";
const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Charme de Madame",
  generator: "Next.js",
  applicationName: "Charme de Madame",
  referrer: "origin-when-cross-origin",
  keywords: ["Roupas íntimas", "Loja", "E-commerce"],
  authors: [{ name: "Igor Bueno" }],
  creator: "Igor Bueno",
  publisher: "Igor Bueno",
  alternates: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={classNames("h-full", manrope.className)}>
      <body className="dark:bg-gray-700 bg-gray-50 h-full">{children}</body>
    </html>
  );
}
