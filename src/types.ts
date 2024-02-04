/* eslint-disable no-unused-vars */

import type { ZodTypeAny } from 'zod';

export type Context_Arg = undefined | 'view' | 'embed' | 'edit';
export type Operator_Arg = 'AND' | 'OR';
export type Order_Arg = 'asc' | 'desc';

export interface Tax_Query {
	include_children?: boolean;
	operator?: Operator_Arg;
	terms: number[];
}

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

export interface Fetch_Posts_Args extends Fetch_Collection_Args {
	/**
	 * Limit response to posts published after a given ISO8601 compliant date.
	 */
	after?: string;
	/**
	 * Limit result set to posts assigned to specific authors.
	 */
	author?: number[];
	/**
	 * Ensure result set excludes posts assigned to specific authors.
	 */
	author_exclude?: number[];
	/**
	 * Limit response to posts published before a given ISO8601 compliant date.
	 */
	before?: string;
	/**
	 * Limit result set to items with specific terms assigned in the categories taxonomy.
	 */
	categories?: number[] | Tax_Query[];
	/**
	 * Limit result set to items except those with specific terms assigned in the categories taxonomy.
	 */
	categories_exclude?: number[] | Tax_Query[];
	/**
	 * Limit response to posts modified after a given ISO8601 compliant date.
	 */
	modified_after?: string;
	/**
	 * Limit response to posts modified before a given ISO8601 compliant date.
	 */
	modified_before?: string;
	/**
	 * Offset the result set by a specific number of items.
	 */
	offset?: number;
	/**
	 * Sort collection by post attribute.
	 */
	orderby?:
		| 'author'
		| 'date'
		| 'id'
		| 'include'
		| 'modified'
		| 'parent'
		| 'relevance'
		| 'slug'
		| 'include_slugs'
		| 'title';
	/**
	 * Array of column names to be searched.
	 */
	search_columns?: ( 'post_title' | 'post_content' | 'post_excerpt' )[];
	/**
	 * Limit result set to terms with one or more specific slugs.
	 */
	slug?: string[];
	/**
	 * Limit result set to posts assigned one or more statuses.
	 *
	 * @default 'publish'
	 */
	status?: string;
	/**
	 * Limit result set based on relationship between multiple taxonomies.
	 */
	tax_relation?: Operator_Arg;
	/**
	 * Limit result set to items with specific terms assigned in the categories taxonomy.
	 */
	tags?: number[] | Tax_Query[];
	/**
	 * Limit result set to items except those with specific terms assigned in the categories taxonomy.
	 */
	tags_exclude?: number[] | Tax_Query[];
	/**
	 * Limit result set to items that are sticky.
	 *
	 * @default false
	 */
	sticky?: boolean;
}

export interface Fetch_Media_Args extends Fetch_Posts_Args {
	/**
	 * Limit result set to attachments of a particular media type.
	 */
	media_type?: 'application' | 'audio' | 'image' | 'text' | 'video';
	/**
	 * Limit result set to attachments of a particular MIME type.
	 */
	mime_type?: string;
	/**
	 * Limit result set to items with particular parent IDs.
	 */
	parent?: number[];
	/**
	 * Limit result set to all items except those of a particular parent ID.
	 */
	parent_exclude?: number[];
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
