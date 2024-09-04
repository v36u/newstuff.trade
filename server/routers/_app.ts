import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "~/prisma/db";

export const appRouter = router({
  getAllListings: procedure.query(async (opts) => {
    const allListings = await prisma.listing.findMany();

    return allListings;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
