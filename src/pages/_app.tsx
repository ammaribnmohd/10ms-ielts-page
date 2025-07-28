import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Noto_Sans_Bengali } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-sans-bengali',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${notoSansBengali.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}