import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { Layouts, LayoutKeys } from "@/layouts";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-inter",
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: LayoutKeys;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & {
    layout: LayoutKeys;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const Layout = Layouts[Component.layout] ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
        html {
          font-family: var(--font-inter);
        }
      `}</style>

      <SessionProvider session={session}>
        {Component.layout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  );
}
