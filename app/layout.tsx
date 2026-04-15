import "./globals.css";
import type { Metadata } from "next";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "平安海湾",
  description: "海湾地区城市安全速报"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
