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
	 * Log in to WordPress via JWT
	 *
	 * @since 0.1.0
	 *
	 * @see {@link https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/}
	 *
	 * @param {Object} credentials Credentials.
	 * @return Fetch response.
	 */
	export function jwt_login({ url, username, password }: {
		url: string;
		username: string;
		password: string;
	}): Promise<Response>;
	export const jwt_login_data: z.ZodObject<{
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
	export type JWT_Login_Data = z.infer<z.ZodObject<{
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
}

//# sourceMappingURL=index.d.ts.map