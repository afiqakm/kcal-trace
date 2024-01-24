
import type { BoundStateCreator } from "..";
import { type ITraceSlice } from "./types";

export const traceSlice: BoundStateCreator<ITraceSlice> = (
    set
) => ({
    action: {
        createTrace: false,
    },
    error: {
        createTrace: "",
    },
    // traceList: [],
    createTraceAttempt: (value: boolean) => {
        set({ action: { createTrace: value } });
    },
    createTraceError(value) {
        set({ error: { createTrace: value } });
    },
    // setStatementData: (data: UserStatement[]) => {
    //     set({ statementData: data });
    // },
});
