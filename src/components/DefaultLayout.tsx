import React, { type ReactNode, useEffect, useState } from "react";
import { ModeToggle } from "./custom/ModeToggle";
import { Toaster, toast } from "sonner";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import NavMenu from "./custom/NavMenu";


const DefaultLayout = ({ children }: { children: ReactNode }) => {

    const { data, status } = useSession();

    return (
        <div className="p-6 flex flex-col gap-6 md:items-center">
            <div className="w-full flex justify-end items-center">
                <Toaster position="top-center" />
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
            {data && <NavMenu />}
        </div>
    );
};

export default DefaultLayout;
