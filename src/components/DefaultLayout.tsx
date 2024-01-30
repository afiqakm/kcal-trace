import React, { type ReactNode, useEffect, useState } from "react";
import { ModeToggle } from "./custom/ModeToggle";
import { Toaster, toast } from "sonner";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";


const DefaultLayout = ({ children }: { children: ReactNode }) => {

    const { data, status } = useSession();

    return (
        <div className="m-6 flex flex-col gap-6">
            <Toaster position="top-center" />
            <div className="flex justify-end items-center">
                {/* <ModeToggle /> */}
                {data &&
                    <Button
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        Logout
                    </Button>
                }
            </div>
            {children}
        </div>
    );
};

export default DefaultLayout;
