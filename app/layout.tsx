import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polish Core Home Office | Interactive 3D Portfolio",
  description: "Step into a nostalgic Polish attic home office from the year 2000. An interactive 3D portfolio experience with retro pixel art aesthetics.",
  keywords: ["portfolio", "3D", "interactive", "retro", "pixel art", "Polish", "home office"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#1a1a1a]">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
