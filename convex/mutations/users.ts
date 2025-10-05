import { Doc, Id } from "../_generated/dataModel";
import { z } from "zod";
import { zid } from "convex-helpers/server/zod";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Zod schema for user filters
const filtersSchema = z.object({
  days: z.array(z.string()).optional(),
  hosts: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  similar: z.array(z.string()).optional(),
});

// Output schema for the mutation response
const updateFiltersOutputSchema = z.object({
  success: z.boolean(),
  filters: filtersSchema,
});

// Update user filters mutation
export const updateFilters = mutation({
  args: {},
  handler: async (
    ctx,
    args
  ): Promise<z.infer<typeof updateFiltersOutputSchema>> => {
    // Get the authenticated user ID
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get the current user
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate and parse the filters from args using Zod
    const validatedFilters = filtersSchema.parse(args);

    // Update the user's chosenFilters
    await ctx.db.patch(userId, {
      chosenFilters: validatedFilters,
    });

    // Return success with the updated filters
    return updateFiltersOutputSchema.parse({
      success: true,
      filters: validatedFilters,
    });
  },
});

// Partial update user filters mutation (allows updating only specific filter types)
export const updateFiltersPartial = mutation({
  args: {},
  handler: async (
    ctx,
    args
  ): Promise<z.infer<typeof updateFiltersOutputSchema>> => {
    // Get the authenticated user ID
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get the current user
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate and parse the partial filters from args using Zod
    const validatedPartialFilters = filtersSchema.partial().parse(args);

    // Merge with existing filters
    const currentFilters = user.chosenFilters || {};
    const updatedFilters = {
      ...currentFilters,
      ...validatedPartialFilters,
    };

    // Update the user's chosenFilters
    await ctx.db.patch(userId, {
      chosenFilters: updatedFilters,
    });

    // Return success with the updated filters
    return updateFiltersOutputSchema.parse({
      success: true,
      filters: updatedFilters,
    });
  },
});

// Clear all user filters mutation
export const clearFilters = mutation({
  args: {},
  handler: async (ctx): Promise<z.infer<typeof updateFiltersOutputSchema>> => {
    // Get the authenticated user ID
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get the current user
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Clear all filters
    const emptyFilters = {
      days: [],
      hosts: [],
      tags: [],
      similar: [],
    };

    // Update the user's chosenFilters
    await ctx.db.patch(userId, {
      chosenFilters: emptyFilters,
    });

    // Return success with the cleared filters
    return updateFiltersOutputSchema.parse({
      success: true,
      filters: emptyFilters,
    });
  },
});
