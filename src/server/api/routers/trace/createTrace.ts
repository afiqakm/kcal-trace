/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Category } from "@prisma/client";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const createTrace = protectedProcedure
  .input(
    z.object({
      meal: z.string().max(50),
      category: z.nativeEnum(Category),
      kcal: z.string().max(15),
      userId: z.string(),
    })
  )
  .mutation(({ ctx, input }) => {
    return ctx.db.trace.create({
      data: {
        meal: input.meal,
        category: input.category,
        kcal: input.kcal,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: input.userId,
      },
    });
  });
