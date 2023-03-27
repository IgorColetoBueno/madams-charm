import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="dark:bg-gray-600 bg-gray-50 h-full">{children}</body>
    </html>
  );
}
