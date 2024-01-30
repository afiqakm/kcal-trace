import { createTRPCRouter } from "~/server/api/trpc";

import { createTrace } from "./createTrace";
import { getAllTrace } from "./getAllTrace";
import { getTodayTrace } from "./getTodayTrace";

export const traceRouter = createTRPCRouter({
    createTrace,
    getAllTrace,
    getTodayTrace,
});
