import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import DefaultLayout from "~/components/DefaultLayout";
import { ThemeProvider } from "~/components/theme-provider";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>KCALT</title>
          <meta name="description" content="Trace your KCAL" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="mask-icon" href="/icons/mask-icon.svg" color="#272727" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://kcal-trace.vercel.app" />
          <meta name="twitter:title" content="My awesome PWA app" />
          <meta name="twitter:description" content="Best PWA app in the world!" />
          <meta name="twitter:image" content="/icons/twitter.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="KCAL trace" />
          <meta property="og:description" content="Trace your KCAL" />
          <meta property="og:site_name" content="KCALT" />
          <meta property="og:url" content="https://kcal-trace.vercel.app" />
          <meta property="og:image" content="/icons/og.png" /> */}
          {/* add the following only if you want to add a startup image for Apple devices. */}
        </Head>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
