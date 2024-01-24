import React from "react";
import TraceForm from "./component/TraceForm";
import TraceTable from "./component/TraceTable";
import { useSession } from "next-auth/react";

const Home = () => {

    const { data } = useSession()
    if (data)
        return (
            <div className="flex flex-col gap-4">
                <TraceTable />
                <div className="fixed inset-x-0 p-6 bottom-0 rounded-tl-xl rounded-tr-xl">
                    <TraceForm />
                </div>
            </div >
        );
};

export default Home;
