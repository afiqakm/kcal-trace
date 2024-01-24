import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";


const Auth = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1>Login</h1>
      <Button
        className="h-[50px] w-[250px] gap-3 bg-indigo-500 text-slate-100 hover:bg-indigo-600"
        onClick={() =>
          signIn("discord", {
            callbackUrl: "/home",
          })
        }
      >
        <FaDiscord size={20} />
        Sign in with Discord
      </Button>
    </div >
  )
};

export default Auth;
