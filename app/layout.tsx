import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// Conditionally import Phenom styles
let PhenomStyles: any;
try {
  PhenomStyles = require("@phenom/react-ds/styles");
} catch {
  // Styles not available, will use fallback components
}
import { RoleProvider } from "@/contexts/RoleContext";
import { Snackbar } from "@/components/ui/fallbacks";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HCM Demo",
  description: "HCM Agentic Demo Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <RoleProvider>
          {children}
          <Snackbar />
        </RoleProvider>
      </body>
    </html>
  );
}

