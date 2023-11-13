declare module '@kucrut/wp-api-helpers' {
	import type { z } from 'zod';
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
	/**
	 * Get JWT authentication
	 *
	 * @since 0.1.0
	 *
	 * @see {@link https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/}
	 *
	 * @param {Object} options Options.
	 * @return Fetch response or handled data.
	 */
	export function jwt_auth<T = {
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	}>(options: {
		url: string;
		username: string;
		password: string;
		handle?: boolean | HandleResponse<T> | undefined;
	}): Promise<Response | {
		user_email: string;
		user_display_name: string;
		user_nicename: string;
		token: string;
	} | T>;
	export type JWT_Auth_Data = JWT_Auth_Data_1;
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

	export const rest_error_schema: z.ZodObject<{
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
	type JWT_Auth_Data_1 = z.infer<z.ZodObject<{
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
	export type WP_Rest_Error = z.infer<z.ZodObject<{
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
	type HandleResponse<T> = (data: unknown) => Promise<T>;
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
	type HandleResponse<T> = (data: unknown) => Promise<T>;
}

//# sourceMappingURL=index.d.ts.map