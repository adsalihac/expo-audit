import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "../lib/query-client";

export const metadata: Metadata = {
  title: "Expo App Performance Auditor",
  description: "Lighthouse for Expo apps with automated audits, profiling, and CI intelligence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="developer-grid">
          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
