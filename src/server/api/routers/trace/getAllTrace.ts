import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const getAllTrace = protectedProcedure
    // .input(
    //     z.object({
    //         userId: z.string(),
    //     })
    // )
    .query(async ({ ctx, input }) => {
        try {
            const targetDate = new Date("2024-01-23"); // Specify the target date

            const result = await ctx.db.trace.findMany({
                where: {
                    createdAt: {
                        gte: targetDate, // Greater than or equal to the start of the day
                        lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), // Less than the start of the next day
                    },
                },
                orderBy: { createdAt: "desc" },
            });

            // const result = await ctx.db.trace.findMany({});

            console.log(result);
            return result; // Return the query results
        } catch (e) {
            if (e instanceof Error) throw new Error(e.message);
        }
    });
