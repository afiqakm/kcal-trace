'use client'

import React, { useState } from "react";
import TraceForm from "./component/TraceForm";
import TraceTable from "./component/TraceTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronsDown, ChevronsUp } from "lucide-react";

const Home = () => {
    const [isOpen, setIsOpen] = useState(true);
    // const { data } = useSession()
    // const router = useRouter()

    // if (!data) {
    //     void router.push('/')
    // }

    const baseClassName = "fixed inset-x-0 p-6 rounded-tl-xl rounded-tr-xl border-2 border-slate-100 transition-all duration-300 ease-in-out"
    const openClassName = cn(baseClassName, "bottom-0")
    const closeClassName = cn(baseClassName, "bottom-[-300px]")
    return (
        <div className="flex flex-col gap-4">
            <TraceTable />
            <div className={isOpen ? openClassName : closeClassName}>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px]"
                >
                    {
                        isOpen ?
                            (<ChevronsDown className="h-4 w-4" />)
                            :
                            (<ChevronsUp className="h-4 w-4" />)
                    }
                </Button>
                <TraceForm />
            </div>
        </div >
    );
};

export default Home;
