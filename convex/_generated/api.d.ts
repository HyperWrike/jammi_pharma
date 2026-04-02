/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_admin from "../functions/admin.js";
import type * as functions_bundles from "../functions/bundles.js";
import type * as functions_categories from "../functions/categories.js";
import type * as functions_cms from "../functions/cms.js";
import type * as functions_coupons from "../functions/coupons.js";
import type * as functions_doctor_profiles from "../functions/doctor_profiles.js";
import type * as functions_federation_posts from "../functions/federation_posts.js";
import type * as functions_orders from "../functions/orders.js";
import type * as functions_partner_requests from "../functions/partner_requests.js";
import type * as functions_products from "../functions/products.js";
import type * as functions_products_mutations from "../functions/products_mutations.js";
import type * as functions_reviews from "../functions/reviews.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "functions/admin": typeof functions_admin;
  "functions/bundles": typeof functions_bundles;
  "functions/categories": typeof functions_categories;
  "functions/cms": typeof functions_cms;
  "functions/coupons": typeof functions_coupons;
  "functions/doctor_profiles": typeof functions_doctor_profiles;
  "functions/federation_posts": typeof functions_federation_posts;
  "functions/orders": typeof functions_orders;
  "functions/partner_requests": typeof functions_partner_requests;
  "functions/products": typeof functions_products;
  "functions/products_mutations": typeof functions_products_mutations;
  "functions/reviews": typeof functions_reviews;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
