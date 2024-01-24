import { createTRPCRouter } from "~/server/api/trpc";

import { createTrace } from "./createTrace";
import { getAllTrace } from "./getAllTrace";

export const traceRouter = createTRPCRouter({
    createTrace,
    getAllTrace,
});
