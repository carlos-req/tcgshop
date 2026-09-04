import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AppShell } from "@/components/AppShell";
import { CartProvider } from "@/lib/cart-context";
import { SITE_URL } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

const description =
  "Sealed booster boxes and packs for Magic: The Gathering, Palworld TCG, and more — verified authenticity, tracked shipping, every pack a possibility.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "X-Spelled | Sealed. Authenticated. Yours to open.",
  description,
  openGraph: {
    title: "X-Spelled | Sealed. Authenticated. Yours to open.",
    description,
    siteName: "X-Spelled",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X-Spelled | Sealed. Authenticated. Yours to open.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#15130f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <AppShell>
            <a
              href="#main-content"
              className="focus:bg-primary focus:text-on-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </AppShell>
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
