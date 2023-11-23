declare module '@kucrut/wp-api-helpers' {
	import type { z } from 'zod';
	/**
	 * Fetch JWT authentication
	 *
	 * @since 0.1.0
	 *
	 * @see {@link https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/}
	 *
	 * @param {Object} credentials Credentials.
	 * @return Fetch response.
	 */
	export function fetch_jwt_auth(credentials: {
		url: string;
		username: string;
		password: string;
	}): Promise<Response>;
	export function get_jwt_auth(credentials: {
		url: string;
		username: string;
		password: string;
	}): Promise<{
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	}>;
	/**
	 * Validate JWT token (fetch only)
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param token JWT token.
	 *
	 * @return Fetch response.
	 */
	export function fetch_jwt_validate_token(url: string, token: string): Promise<Response>;
	export function get_jwt_validate_token(url: string, token: string): Promise<{
		code: string;
		data: {
			status: number;
		};
	}>;
	/**
	 * Discover WordPress API root URL
	 *
	 * @since 0.0.1
	 *
	 * @param url WordPress URL.
	 *
	 * @return WordPress API root URL.
	 */
	export function discover(url: string): Promise<string>;
	export const jwt_auth_data: z.ZodObject<{
		user_email: z.ZodString;
		user_display_name: z.ZodString;
		user_nicename: z.ZodString;
		token: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	}, {
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	}>;
	export const jwt_valid_token: z.ZodObject<{
		code: z.ZodEffects<z.ZodString, string, string>;
		data: z.ZodObject<{
			status: z.ZodEffects<z.ZodNumber, number, number>;
		}, "strip", z.ZodTypeAny, {
			status: number;
		}, {
			status: number;
		}>;
	}, "strip", z.ZodTypeAny, {
		code: string;
		data: {
			status: number;
		};
	}, {
		code: string;
		data: {
			status: number;
		};
	}>;

	export const rest_error: z.ZodObject<{
		code: z.ZodString;
		message: z.ZodString;
		data: z.ZodObject<{
			status: z.ZodNumber;
		}, "strip", z.ZodTypeAny, {
			status: number;
		}, {
			status: number;
		}>;
	}, "strip", z.ZodTypeAny, {
		code: string;
		data: {
			status: number;
		};
		message: string;
	}, {
		code: string;
		data: {
			status: number;
		};
		message: string;
	}>;

	export const taxonomy: z.ZodObject<{
		hierarchical: z.ZodBoolean;
		description: z.ZodString;
		name: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		slug: z.ZodString;
		types: z.ZodArray<z.ZodString, "many">;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		}, {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		description: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		slug: string;
		types: string[];
		_links: {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		};
	}, {
		name: string;
		description: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		slug: string;
		types: string[];
		_links: {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		};
	}>;

	export const term: z.ZodObject<{
		id: z.ZodNumber;
		count: z.ZodNumber;
		description: z.ZodString;
		link: z.ZodString;
		name: z.ZodString;
		slug: z.ZodString;
		taxonomy: z.ZodString;
		parent: z.ZodNumber;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			about: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		}, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		};
		count: number;
		taxonomy: string;
	}, {
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		};
		count: number;
		taxonomy: string;
	}>;

	export const user: z.ZodObject<{
		avatar_urls: z.ZodRecord<z.ZodString, z.ZodString>;
		capabilities: z.ZodRecord<z.ZodString, z.ZodBoolean>;
		description: z.ZodString;
		email: z.ZodString;
		extra_capabilities: z.ZodRecord<z.ZodString, z.ZodBoolean>;
		first_name: z.ZodString;
		id: z.ZodNumber;
		last_name: z.ZodString;
		link: z.ZodString;
		locale: z.ZodString;
		meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
		name: z.ZodString;
		nickname: z.ZodString;
		registered_date: z.ZodString;
		roles: z.ZodArray<z.ZodString, "many">;
		slug: z.ZodString;
		url: z.ZodString;
		username: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		}, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: Record<string, any> | undefined;
	}>;
	export type JWT_Valid_Token = z.infer<z.ZodObject<{
		code: z.ZodEffects<z.ZodString, string, string>;
		data: z.ZodObject<{
			status: z.ZodEffects<z.ZodNumber, number, number>;
		}, "strip", z.ZodTypeAny, {
			status: number;
		}, {
			status: number;
		}>;
	}, "strip", z.ZodTypeAny, {
		code: string;
		data: {
			status: number;
		};
	}, {
		code: string;
		data: {
			status: number;
		};
	}>>;
	export type JWT_Auth_Data = z.infer<z.ZodObject<{
		user_email: z.ZodString;
		user_display_name: z.ZodString;
		user_nicename: z.ZodString;
		token: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	}, {
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	}>>;
	export type Rest_Error = z.infer<z.ZodObject<{
		code: z.ZodString;
		message: z.ZodString;
		data: z.ZodObject<{
			status: z.ZodNumber;
		}, "strip", z.ZodTypeAny, {
			status: number;
		}, {
			status: number;
		}>;
	}, "strip", z.ZodTypeAny, {
		code: string;
		data: {
			status: number;
		};
		message: string;
	}, {
		code: string;
		data: {
			status: number;
		};
		message: string;
	}>>;
	export type Taxonomy = z.infer<z.ZodObject<{
		hierarchical: z.ZodBoolean;
		description: z.ZodString;
		name: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		slug: z.ZodString;
		types: z.ZodArray<z.ZodString, "many">;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		}, {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		description: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		slug: string;
		types: string[];
		_links: {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		};
	}, {
		name: string;
		description: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		slug: string;
		types: string[];
		_links: {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		};
	}>>;
	export type Term = z.infer<z.ZodObject<{
		id: z.ZodNumber;
		count: z.ZodNumber;
		description: z.ZodString;
		link: z.ZodString;
		name: z.ZodString;
		slug: z.ZodString;
		taxonomy: z.ZodString;
		parent: z.ZodNumber;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			about: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		}, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		};
		count: number;
		taxonomy: string;
	}, {
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		};
		count: number;
		taxonomy: string;
	}>>;
	export type User = z.infer<z.ZodObject<{
		avatar_urls: z.ZodRecord<z.ZodString, z.ZodString>;
		capabilities: z.ZodRecord<z.ZodString, z.ZodBoolean>;
		description: z.ZodString;
		email: z.ZodString;
		extra_capabilities: z.ZodRecord<z.ZodString, z.ZodBoolean>;
		first_name: z.ZodString;
		id: z.ZodNumber;
		last_name: z.ZodString;
		link: z.ZodString;
		locale: z.ZodString;
		meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
		name: z.ZodString;
		nickname: z.ZodString;
		registered_date: z.ZodString;
		roles: z.ZodArray<z.ZodString, "many">;
		slug: z.ZodString;
		url: z.ZodString;
		username: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
			}, {
				href: string;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		}, {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: Record<string, any> | undefined;
	}>>;
	/**
	 * Fetch taxonomies
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Autorization header.
	 * @param args Request arguments.
	 *
	 * @return Fetch response.
	 */
	export function fetch_taxonomies(url: string, auth: string, args?: FetchTaxonomiesArgs | undefined): Promise<Response>;
	export function get_taxonomies(url: string, auth: string, args?: FetchTaxonomiesArgs | undefined): Promise<{
		name: string;
		description: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		slug: string;
		types: string[];
		_links: {
			collection: {
				href: string;
			}[];
			'wp:items': {
				href: string;
			}[];
		};
	}[]>;
	/**
	 * Fetch taxonomy terms
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Autorization header.
	 * @param taxonomy Taxonomy's rest_base.
	 * @param args Request arguments.
	 *
	 * @return Fetch response.
	 */
	export function fetch_terms(url: string, auth: string, taxonomy?: string | undefined, args?: FetchTermsArgs | undefined): Promise<Response>;
	export function get_terms(url: string, auth: string, taxonomy?: string | undefined, args?: FetchTermsArgs | undefined): Promise<{
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
			about: {
				href: string;
			}[];
		};
		count: number;
		taxonomy: string;
	}[]>;
	/**
	 * Fetch own user data
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Autorization header.
	 *
	 * @return Fetch response.
	 */
	export function fetch_me(url: string, auth: string): Promise<Response>;
	export function get_me(url: string, auth: string): Promise<{
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: Record<string, any> | undefined;
	}>;
	type ContextArg = 'view' | 'embed' | 'edit';
	type OrderArg = 'asc' | 'desc';
	interface FetchArgs {
		/**
		 * Scope under which the request is made; determines fields present in response.
		 * @default 'view'
		 */
		context?: ContextArg;
	}
	interface FetchCollectionArgs {
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
	interface FetchTaxonomiesArgs extends FetchArgs {
		/**
		 * Limit results to taxonomies associated with a specific post type.
		 */
		type?: string;
	}
	interface FetchTermsArgs extends FetchArgs, FetchCollectionArgs {
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
}

declare module '@kucrut/wp-api-helpers/utils' {
	/**
	 * Get error message
	 *
	 * @since 0.1.0
	 *
	 * @param error    Error object, whatever.
	 * @param fallback Fallback message if the error is unrecognized.
	 * @param dump     Whether to dump error if the error is unrecognized. (Defaults to true).
	 *
	 * @return Error message.
	 */
	export function get_error_message(error: unknown, fallback: string, dump?: boolean | undefined): string;
	/**
	 * Handle WP REST API response
	 *
	 * This helps catch syntax errors in json because of PHP notices, etc.
	 *
	 * @since 0.0.1
	 *
	 * @param response Fetch response object.
	 * @param callback Callback to run when json is valid.
	 *
	 * @throws JSON.parse error.
	 *
	 * @return Whatever the callback returns.
	 */
	export function handle_response<T>(response: Response, callback: HandleResponse<T>): Promise<T>;
	/**
	 * Make response handler
	 *
	 * @param handler Handler function.
	 * @return Bleh
	 */
	export function make_response_handler<T>(handler: HandleResponse<T>): (resp: Response) => Promise<T>;
	/**
	 * Normalize fetch arguments
	 *
	 * @since 0.0.1
	 *
	 * @param args Fetch arguments.
	 * @return Pairs of key and value strings.
	 */
	export function normalize_fetch_args(args: Record<string, any>): [string, string][];
	type HandleResponse<T> = (data: unknown) => Promise<T>;
}

//# sourceMappingURL=index.d.ts.map