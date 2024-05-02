import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <div className=""> */}

      <body className={inter.className}>
        <div className="flex h-full">
          <Sidebar />
          <div className="scroll-smooth relative flex flex-1 flex-col">
            <Header />
            <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>





      </body>
      {/* </div> */}
    </html>
  );
}
