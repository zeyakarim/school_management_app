import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { Providers } from "./providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex">
            {/* LEFT */}
            <div className="w-[16%] md:w-[8%] lg:w-[16%]">
              <Navbar />
            </div>
            {/* RIGHT */}
            <div className="w-[84%] md:w-[92%] lg:w-[84%] bg-[#F7F8FA] flex flex-col">
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
