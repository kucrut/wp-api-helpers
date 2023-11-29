/* eslint-disable no-unused-vars */

import type { ZodTypeAny } from 'zod';

export type Context_Arg = undefined | 'view' | 'embed' | 'edit';
export type Order_Arg = 'asc' | 'desc';

export interface Fetch_Args {
	/**
	 * Scope under which the request is made; determines fields present in response.
	 * @default 'view'
	 */
	context?: Context_Arg;
}

export interface Fetch_Collection_Args {
	/**
	 * "Current page of the collection."
	 * @default 1
	 */
	page?: number;
	/**
	 * Maximum number of items to be returned in result set (maximum 100).
	 * @default 10
	 */
	per_page?: number;
	/**
	 * Limit results to those matching a string.
	 */
	search?: string;
	/**
	 * Ensure result set excludes specific IDs.
	 */
	exclude?: number[];
	/**
	 * Limit result set to specific IDs.
	 */
	include?: number[];
	/**
	 * Order sort attribute ascending or descending.
	 */
	order?: Order_Arg;
}

export interface Fetch_Taxonomies_Args extends Fetch_Args {
	/**
	 * Limit results to taxonomies associated with a specific post type.
	 */
	type?: string;
}

export interface Fetch_Terms_Args extends Fetch_Args, Fetch_Collection_Args {
	/**
	 * Whether to hide terms not assigned to any posts.
	 * @default false
	 */
	hide_empty?: boolean;
	/**
	 * Sort collection by term attribute.
	 * @default 'name'
	 */
	orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
	/**
	 * Limit result set to terms assigned to a specific post.
	 */
	post?: number;
	/**
	 * Limit result set to terms with one or more specific slugs.
	 */
	slug?: string[];
}

export type Handle_Response< T > = ( data: unknown ) => Promise< T >;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handled_Fetch< F extends ( ...args: any ) => any, T > = (
	...args: Parameters< F >
) => ReturnType< Handle_Response< T > >;

export type Schema_By_Context<
	C extends Context_Arg,
	X extends ZodTypeAny,
	Y extends ZodTypeAny,
	Z extends ZodTypeAny,
> = C extends undefined | 'view' ? X : C extends 'embed' ? Y : C extends 'edit' ? Z : never;
