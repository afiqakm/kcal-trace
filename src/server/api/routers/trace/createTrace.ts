/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const createTrace = protectedProcedure
  .input(
    z.object({
      meal: z.string().max(50),
      kcal: z.string().max(15),
    })
  )
  .mutation(({ ctx, input }) => {
    return ctx.db.trace.create({
      data: {
        meal: input.meal,
        kcal: input.kcal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });
