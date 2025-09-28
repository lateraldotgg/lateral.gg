import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // custom users through Convex Auth
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("email", ["email"]),
  // clubs
  clubs: defineTable({
    name: v.string(),
    description: v.string(),
    user: v.optional(v.id("users")),
  }),
  // events
  events: defineTable({
    name: v.string(),
    description: v.string(),
    club: v.id("clubs"),
  }),
});

export default schema;
