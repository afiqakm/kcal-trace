

export interface ITraceSlice {
    action: {
        createTrace: boolean;
    };
    error: {
        createTrace: string;
    };
    // TraceList: UserStatement[];
    createTraceAttempt: (value: boolean) => void;
    createTraceError: (value: string) => void;
    // setTraceList: (data: UserStatement[]) => void;
}