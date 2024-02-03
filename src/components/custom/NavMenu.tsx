import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useBoundStore } from "~/store";

const NavMenu = () => {

    const {
        setIsCreateTraceDrawerOpen
    } = useBoundStore();

    return (
        <div className="w-full fixed bottom-0 inset-x-0 bg-secondary h-16 px-6 py-3 flex justify-center">
            <Button onClick={() => setIsCreateTraceDrawerOpen(true)}>
                <PlusIcon className="h-6 w-6" />
            </Button>
        </div>
    );
};

export default NavMenu;
