import { Doc, Id } from "../_generated/dataModel";
import { z } from "zod";
import { zid } from "convex-helpers/server/zod";
import { zQuery } from "../zod";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get names for all users
export const list100 = zQuery({
  args: {},
  handler: async (ctx): Promise<z.infer<typeof output>> => {
    const users = (await ctx.db.query("users").order("desc").take(100))!;
    // Safely strip unnecessary data
    const output = z.array(z.object({ name: z.string() }));
    return output.parse(users);
  },
});

// Get a minimal user by id
export const findById = zQuery({
  args: { userId: zid("users") },
  handler: async (ctx, args): Promise<z.infer<typeof output>> => {
    const user = (await ctx.db.get(args.userId))!;
    // Safely strip unnecessary data
    const output = z.object({
      name: z.string(),
      image: z.string().optional(),
    });
    return output.parse(user);
  },
});

// Get a whole user by id
export const findByIdWhole = zQuery({
  args: { userId: zid("users") },
  handler: async (ctx, args): Promise<Doc<"users"> | null> => {
    const user = (await ctx.db.get(args.userId))!;
    return user;
  },
});

// Get a whole user by auth
export const findByAuthWhole = zQuery({
  args: {},
  handler: async (ctx): Promise<Doc<"users"> | null> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated...");
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found...");
    }

    // Return the user data from your users table
    return user;
  },
});
