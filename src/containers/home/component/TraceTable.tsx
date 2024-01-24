import React from "react";
import { api } from "~/utils/api";


const TraceTable = () => {

    const { data } = api.trace.getAllTrace.useQuery();
    return (
        <div>
            {data?.map((item) => (
                <div key={item.id}>
                    {item.meal}
                </div>
            ))}
        </div>
    );
};

export default TraceTable;
