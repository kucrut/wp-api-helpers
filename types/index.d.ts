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
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		meta?: Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
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
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		meta?: Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		meta?: Record<string, any> | undefined;
	}>>;
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
		avatar_urls: Record<string, string>;
		capabilities: Record<string, boolean>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		slug: string;
		_links: {
			self: {
				href: string;
			}[];
			collection: {
				href: string;
			}[];
		};
		meta?: Record<string, any> | undefined;
	}>;
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
	type HandleResponse<T> = (data: unknown) => Promise<T>;
}

//# sourceMappingURL=index.d.ts.map