/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as _samples_clubs from "../_samples/clubs.js";
import type * as _samples_events from "../_samples/events.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as mutations_users from "../mutations/users.js";
import type * as queries_clubs from "../queries/clubs.js";
import type * as queries_events from "../queries/events.js";
import type * as queries_users from "../queries/users.js";
import type * as zod from "../zod.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "_samples/clubs": typeof _samples_clubs;
  "_samples/events": typeof _samples_events;
  auth: typeof auth;
  http: typeof http;
  "mutations/users": typeof mutations_users;
  "queries/clubs": typeof queries_clubs;
  "queries/events": typeof queries_events;
  "queries/users": typeof queries_users;
  zod: typeof zod;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
