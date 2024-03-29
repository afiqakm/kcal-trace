import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { ModeToggle } from "~/components/custom/ModeToggle";
import { Button } from "~/components/ui/button";
import AuthPage from "~/containers/auth";

import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter();
  const { query } = router;
  const { data: userData } = useSession();

  if (userData) {
    void router.push("/home");
  }

  if (query.error) {
    toast.error('Something went wrong, please try again!');
  }

  return (
    <>
      <Head>
        <title>KCAL Trace</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthPage />
      </main>
    </>
  );
}