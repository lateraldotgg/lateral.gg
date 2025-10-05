import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // custom users through Convex Auth
  users: defineTable({
    email: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    phone: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    emailVerificationTime: v.optional(v.number()),
    phoneVerificationTime: v.optional(v.number()),
    chosenFilters: v.optional(
      v.object({
        days: v.optional(v.array(v.string())),
        hosts: v.optional(v.array(v.string())),
        tags: v.optional(v.array(v.string())),
        similar: v.optional(v.array(v.string())),
      })
    ),
  }).index("email", ["email"]),
  // clubs
  clubs: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    user: v.optional(v.id("users")),
  }),
  // events
  events: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    datetime: v.optional(v.string()),
    club: v.id("clubs"),
  }),
});

export default schema;
