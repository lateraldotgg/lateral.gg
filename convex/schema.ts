import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  events: defineTable({
    name: v.string(),
    description: v.string(),
  }),
});

export default schema;
