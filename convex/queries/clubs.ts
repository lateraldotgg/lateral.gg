import { query } from "../_generated/server";
import { Doc } from "../_generated/dataModel";
import { z } from "zod";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zid } from "convex-helpers/server/zod";

// Zod drop-in replacement for query
const zQuery = zCustomQuery(query, NoOp);

// Get 100 clubs in descending order
export const list100 = zQuery({
  args: {},
  handler: async (ctx): Promise<Doc<"clubs">[]> => {
    return await ctx.db.query("clubs").order("desc").take(100);
  },
});

// Get a minimal club by id
export const findById = zQuery({
  args: { clubId: zid("clubs") },
  handler: async (ctx, args): Promise<z.infer<typeof output>> => {
    const club = (await ctx.db.get(args.clubId))!;
    const output = z.object({
      name: z.string(),
      description: z.string(),
    });
    return output.parse(club);
  },
});
