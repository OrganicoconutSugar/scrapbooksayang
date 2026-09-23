import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Augusta Shiva — A Scrapbook Story",
  description:
    "An interactive anniversary & birthday scrapbook zine — a handcrafted journey through our memories, told in chapters.",
  openGraph: {
    title: "For Augusta Shiva — A Scrapbook Story",
    description: "An intimate digital scrapbook celebrating our journey together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600;700&family=Permanent+Marker&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
