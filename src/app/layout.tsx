import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // <--- Import the wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Based Snake",
    description: "Snake on Base",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Wrap everything inside Providers */}
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
