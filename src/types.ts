/* eslint-disable no-unused-vars */

export type ContextArg = 'view' | 'embed' | 'edit';
export type OrderArg = 'asc' | 'desc';

export interface FetchArgs {
	/**
	 * Scope under which the request is made; determines fields present in response.
	 * @default 'view'
	 */
	context?: ContextArg;
}

export interface FetchCollectionArgs {
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
	order?: OrderArg;
}

export interface FetchTaxonomiesArgs extends FetchArgs {
	/**
	 * Limit results to taxonomies associated with a specific post type.
	 */
	type?: string;
}

export interface FetchTermsArgs extends FetchArgs, FetchCollectionArgs {
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

export type HandleResponse< T > = ( data: unknown ) => Promise< T >;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandledFetch< F extends ( ...args: any ) => any, T > = (
	...args: Parameters< F >
) => ReturnType< HandleResponse< T > >;
