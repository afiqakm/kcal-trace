import { createTRPCRouter } from "~/server/api/trpc";

import { getUserData } from "./getUserData";

export const userRouter = createTRPCRouter({
    getUserData,
});
