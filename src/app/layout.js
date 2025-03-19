import { config } from "dotenv";
config();
import "./globals.css";
export const metadata = {
  title: "Fauzhan Wahyudi Phiraka Answare",
  description: "Created by Fauzhan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-mono">{children}</body>
    </html>
  );
}
