import { action, mutation, query } from "./_generated/server";
import {
  zCustomAction,
  zCustomMutation,
  zCustomQuery,
} from "convex-helpers/server/zod";
import { NoOp } from "convex-helpers/server/customFunctions";

// Zod drop-in replacement for action
export const zAction = zCustomAction(action, NoOp);

// Zod drop-in replacement for mutation
export const zMutation = zCustomMutation(mutation, NoOp);

// Zod drop-in replacement for query
export const zQuery = zCustomQuery(query, NoOp);
