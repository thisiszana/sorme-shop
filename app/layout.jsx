import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sorme Store",
  description: "A Store for buy and sell anything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
