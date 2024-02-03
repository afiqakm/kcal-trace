import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const getUserData = protectedProcedure
    .input(
        z.object({
            userId: z.string(),
        })
    )
    .query(async ({ ctx, input }) => {
        try {

            const result = await ctx.db.user.findUnique({
                where: {
                    id: input.userId,
                },
            });

            return result; // Return the query results
        } catch (e) {
            if (e instanceof Error) throw new Error(e.message);
        }
    });
