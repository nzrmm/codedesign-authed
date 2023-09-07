import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { Layouts, LayoutKeys } from "@/layouts";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-poppins",
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
          --font-poppins: ${poppins.style.fontFamily};
        }
        html {
          font-family: var(--font-poppins);
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
