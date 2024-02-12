declare module '@kucrut/wp-api-helpers' {
	import type { z, ZodTypeAny } from 'zod';
	/**
	 * Get application password authorization endpoint
	 *
	 * @since 0.3.0
	 *
	 * @param url WP API root URL.
	 * @return {Promise<string>} Application password authorization route.
	 *
	 * */
	export function get_app_password_auth_endpoint(url: string): Promise<string>;
	/**
	 * Get JWT authentication
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param username Username or email.
	 * @param password Password.
	 *
	 * @return {Promise<import('zod').infer<typeof jwt_auth_data>>} Auth data.
	 */
	export function get_jwt_auth(url: string, username: string, password: string): Promise<import('zod').infer<typeof jwt_auth_data>>;
	/**
	 * Validate JWT token
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param token JWT token.
	 *
	 * @return {Promise<import('zod').infer<typeof jwt_valid_token>>} Valid token data.
	 */
	export function get_jwt_validate_token(url: string, token: string): Promise<import('zod').infer<typeof jwt_valid_token>>;
	/**
	 * Discover WordPress API root URL
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress URL.
	 *
	 * @return {Promise<string>} WordPress API root URL.
	 */
	export function discover(url: string): Promise<string>;
	/**
	 * Get site info
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<import('zod').infer<typeof info>>} Site info data.
	 */
	export function get_info(url: string, auth?: string | undefined): Promise<import('zod').infer<typeof info>>;
	/**
	 * Create media
	 *
	 * @since 0.1.0
	 *
	 * @param url  WordPress API root URL.
	 * @param auth Autorization header.
	 * @param data Form data.
	 *
	 * @return {Promise<import('zod').infer<typeof media_edit>>} Media (edit) data.
	 */
	export function create_media(url: string, auth: string, data: FormData): Promise<import('zod').infer<typeof media_edit>>;
	/**
	 * Get media
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<import('zod').infer<typeof media_view>[]>} Media data.
	 */
	export function get_media(url: string, auth?: string | undefined, args?: Fetch_Media_Args | undefined): Promise<import('zod').infer<typeof media_view>[]>;
	/**
	 * Get single media
	 *
	 * @since 0.2.0
	 *
	 * @param id Media ID.
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<import('zod').infer<typeof media_view>>} Media data.
	 */
	export function get_single_media(id: number, url: string, auth?: string | undefined): Promise<import('zod').infer<typeof media_view>>;
	/**
	 * Get single post
	 *
	 * @since 0.2.0
	 *
	 * @param id Post ID (optional).
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param type Post type, defaults to 'posts'.
	 *
	 * @todo Add args parameter.
	 *
	 * @return {Promise<import('zod').infer<typeof post_view>>} Post data.
	 */
	export function get_post(id: number, url: string, auth?: string | undefined, type?: string | undefined): Promise<import('zod').infer<typeof post_view>>;
	/**
	 * Get posts
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param type Post type, defaults to 'posts'.
	 * @param args Request arguments
	 *
	 * @return {Promise<import('zod').infer<typeof post_view>[]>} Post data.
	 */
	export function get_posts(url: string, auth?: string | undefined, type?: string | undefined, args?: Fetch_Posts_Args | undefined): Promise<import('zod').infer<typeof post_view>[]>;
	/**
	 * Get post terms
	 *
	 * @since 0.2.0
	 *
	 * @param post Post object.
	 * @param auth Authorization header (optional).
	 *
	 * @return {Promise<Post_Terms[]|null>} Array of post terms.
	 */
	export function get_post_terms(post: import('zod').infer<typeof post_view>, auth?: string | undefined): Promise<Post_Terms[] | null>;
	export type Post_Terms = {
		taxonomy: import('zod').infer<typeof taxonomy_view>;
		terms: import('zod').infer<typeof term_view>[];
	};
	export const application_password_embed: z.ZodObject<{
		app_id: z.ZodString;
		name: z.ZodString;
		uuid: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		name: string;
		uuid: string;
		app_id: string;
	}, {
		name: string;
		uuid: string;
		app_id: string;
	}>;
	export const application_password_view: z.ZodObject<{
		created: z.ZodDate;
		last_ip: z.ZodDate;
		last_used: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		created: Date;
		last_ip: Date;
		last_used: string;
	}, {
		created: Date;
		last_ip: Date;
		last_used: string;
	}>;
	export const application_password_edit: z.ZodObject<{
		created: z.ZodDate;
		last_ip: z.ZodDate;
		last_used: z.ZodString;
		password: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		created: Date;
		last_ip: Date;
		last_used: string;
		password: string;
	}, {
		created: Date;
		last_ip: Date;
		last_used: string;
		password: string;
	}>;
	export const info: z.ZodObject<{
		description: z.ZodString;
		gmt_offset: z.ZodNumber;
		home: z.ZodString;
		name: z.ZodString;
		namespaces: z.ZodArray<z.ZodString, "many">;
		site_icon_url: z.ZodString;
		site_icon: z.ZodNumber;
		site_logo: z.ZodNumber;
		timezone_string: z.ZodString;
		url: z.ZodString;
		authentication: z.ZodRecord<z.ZodString, z.ZodObject<{
			endpoints: z.ZodObject<{
				authorization: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				authorization: string;
			}, {
				authorization: string;
			}>;
		}, "strip", z.ZodTypeAny, {
			endpoints: {
				authorization: string;
			};
		}, {
			endpoints: {
				authorization: string;
			};
		}>>;
		_links: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>;
	}, "strip", z.ZodTypeAny, {
		url: string;
		name: string;
		home: string;
		description: string;
		gmt_offset: number;
		namespaces: string[];
		site_icon_url: string;
		site_icon: number;
		site_logo: number;
		timezone_string: string;
		authentication: Record<string, {
			endpoints: {
				authorization: string;
			};
		}>;
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
	}, {
		url: string;
		name: string;
		home: string;
		description: string;
		gmt_offset: number;
		namespaces: string[];
		site_icon_url: string;
		site_icon: number;
		site_logo: number;
		timezone_string: string;
		authentication: Record<string, {
			endpoints: {
				authorization: string;
			};
		}>;
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
	}>;
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
	export const post_embed: z.ZodObject<{
		author: z.ZodNumber;
		date: z.ZodDate;
		excerpt: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		featured_media: z.ZodNumber;
		id: z.ZodNumber;
		link: z.ZodString;
		slug: z.ZodString;
		title: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		type: z.ZodString;
		_links: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		date: Date;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		date: Date;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
	}>;
	export const post_view: z.ZodObject<{
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		title: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		date: z.ZodDate;
		_links: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>>;
		author: z.ZodNumber;
		excerpt: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		featured_media: z.ZodNumber;
		slug: z.ZodString;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
		comment_status: z.ZodEnum<["open", "closed"]>;
		content: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		date_gmt: z.ZodDate;
		format: z.ZodOptional<z.ZodString>;
		menu_order: z.ZodOptional<z.ZodNumber>;
		modified: z.ZodDate;
		modified_gmt: z.ZodDate;
		parent: z.ZodOptional<z.ZodNumber>;
		ping_status: z.ZodEnum<["open", "closed"]>;
		status: z.ZodString;
		sticky: z.ZodOptional<z.ZodBoolean>;
		template: z.ZodString;
		guid: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		content: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		meta?: never[] | Record<string, any> | undefined;
		format?: string | undefined;
		menu_order?: number | undefined;
		parent?: number | undefined;
		sticky?: boolean | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		content: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		meta?: never[] | Record<string, any> | undefined;
		format?: string | undefined;
		menu_order?: number | undefined;
		parent?: number | undefined;
		sticky?: boolean | undefined;
	}>;
	export const post_edit: z.ZodObject<{
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		content: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
		template: z.ZodString;
		title: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		parent: z.ZodOptional<z.ZodNumber>;
		status: z.ZodString;
		date: z.ZodDate;
		_links: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>>;
		author: z.ZodNumber;
		excerpt: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		featured_media: z.ZodNumber;
		slug: z.ZodString;
		comment_status: z.ZodEnum<["open", "closed"]>;
		date_gmt: z.ZodDate;
		format: z.ZodOptional<z.ZodString>;
		menu_order: z.ZodOptional<z.ZodNumber>;
		modified: z.ZodDate;
		modified_gmt: z.ZodDate;
		ping_status: z.ZodEnum<["open", "closed"]>;
		sticky: z.ZodOptional<z.ZodBoolean>;
		guid: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		generated_slug: z.ZodString;
		permalink_template: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		content: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		generated_slug: string;
		permalink_template: string;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		meta?: never[] | Record<string, any> | undefined;
		parent?: number | undefined;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		format?: string | undefined;
		menu_order?: number | undefined;
		sticky?: boolean | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		content: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		generated_slug: string;
		permalink_template: string;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		meta?: never[] | Record<string, any> | undefined;
		parent?: number | undefined;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		format?: string | undefined;
		menu_order?: number | undefined;
		sticky?: boolean | undefined;
	}>;
	export const media_embed: z.ZodObject<{
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		title: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		date: z.ZodDate;
		_links: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>>;
		author: z.ZodNumber;
		slug: z.ZodString;
		alt_text: z.ZodString;
		caption: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		media_type: z.ZodString;
		media_details: z.ZodObject<{
			bitrate: z.ZodOptional<z.ZodNumber>;
			dataformat: z.ZodOptional<z.ZodString>;
			file: z.ZodOptional<z.ZodString>;
			fileformat: z.ZodOptional<z.ZodString>;
			filesize: z.ZodNumber;
			height: z.ZodOptional<z.ZodNumber>;
			image_meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
			length: z.ZodOptional<z.ZodNumber>;
			length_formatted: z.ZodOptional<z.ZodString>;
			width: z.ZodOptional<z.ZodNumber>;
			sizes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
				file: z.ZodString;
				height: z.ZodNumber;
				mime_type: z.ZodString;
				source_url: z.ZodString;
				width: z.ZodNumber;
			}, "strip", z.ZodTypeAny, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>>>;
		}, "strip", z.ZodTypeAny, {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		}, {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		}>;
		mime_type: z.ZodString;
		source_url: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		date: Date;
		mime_type: string;
		source_url: string;
		author: number;
		slug: string;
		alt_text: string;
		media_type: string;
		media_details: {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		};
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		date: Date;
		mime_type: string;
		source_url: string;
		author: number;
		slug: string;
		alt_text: string;
		media_type: string;
		media_details: {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		};
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
	}>;
	export const media_view: z.ZodObject<Omit<{
		content: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
		template: z.ZodString;
		description: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		parent: z.ZodOptional<z.ZodNumber>;
		status: z.ZodString;
		excerpt: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		featured_media: z.ZodNumber;
		comment_status: z.ZodEnum<["open", "closed"]>;
		date_gmt: z.ZodDate;
		format: z.ZodOptional<z.ZodString>;
		menu_order: z.ZodOptional<z.ZodNumber>;
		modified: z.ZodDate;
		modified_gmt: z.ZodDate;
		ping_status: z.ZodEnum<["open", "closed"]>;
		sticky: z.ZodOptional<z.ZodBoolean>;
		guid: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		post: z.ZodNullable<z.ZodNumber>;
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		title: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		date: z.ZodDate;
		_links: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>>;
		author: z.ZodNumber;
		slug: z.ZodString;
		alt_text: z.ZodString;
		caption: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		media_type: z.ZodString;
		media_details: z.ZodObject<{
			bitrate: z.ZodOptional<z.ZodNumber>;
			dataformat: z.ZodOptional<z.ZodString>;
			file: z.ZodOptional<z.ZodString>;
			fileformat: z.ZodOptional<z.ZodString>;
			filesize: z.ZodNumber;
			height: z.ZodOptional<z.ZodNumber>;
			image_meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
			length: z.ZodOptional<z.ZodNumber>;
			length_formatted: z.ZodOptional<z.ZodString>;
			width: z.ZodOptional<z.ZodNumber>;
			sizes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
				file: z.ZodString;
				height: z.ZodNumber;
				mime_type: z.ZodString;
				source_url: z.ZodString;
				width: z.ZodNumber;
			}, "strip", z.ZodTypeAny, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>>>;
		}, "strip", z.ZodTypeAny, {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		}, {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		}>;
		mime_type: z.ZodString;
		source_url: z.ZodString;
	}, "content" | "parent" | "excerpt" | "featured_media" | "menu_order" | "sticky">, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		mime_type: string;
		source_url: string;
		author: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		media_details: {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		};
		post: number | null;
		meta?: never[] | Record<string, any> | undefined;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		format?: string | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		mime_type: string;
		source_url: string;
		author: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		media_details: {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		};
		post: number | null;
		meta?: never[] | Record<string, any> | undefined;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		format?: string | undefined;
	}>;
	export const media_edit: z.ZodObject<{
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		caption: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
		template: z.ZodString;
		title: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		description: z.ZodObject<{
			block_version: z.ZodOptional<z.ZodNumber>;
			protected: z.ZodOptional<z.ZodBoolean>;
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}, {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		}>;
		status: z.ZodString;
		date: z.ZodDate;
		mime_type: z.ZodString;
		source_url: z.ZodString;
		_links: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
			embeddable: z.ZodOptional<z.ZodBoolean>;
			href: z.ZodString;
			templated: z.ZodOptional<z.ZodBoolean>;
			type: z.ZodOptional<z.ZodString>;
		}, "strip", z.ZodTypeAny, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}>, "many">>>;
		author: z.ZodNumber;
		slug: z.ZodString;
		comment_status: z.ZodEnum<["open", "closed"]>;
		date_gmt: z.ZodDate;
		format: z.ZodOptional<z.ZodString>;
		modified: z.ZodDate;
		modified_gmt: z.ZodDate;
		ping_status: z.ZodEnum<["open", "closed"]>;
		guid: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		alt_text: z.ZodString;
		media_type: z.ZodString;
		media_details: z.ZodObject<{
			bitrate: z.ZodOptional<z.ZodNumber>;
			dataformat: z.ZodOptional<z.ZodString>;
			file: z.ZodOptional<z.ZodString>;
			fileformat: z.ZodOptional<z.ZodString>;
			filesize: z.ZodNumber;
			height: z.ZodOptional<z.ZodNumber>;
			image_meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
			length: z.ZodOptional<z.ZodNumber>;
			length_formatted: z.ZodOptional<z.ZodString>;
			width: z.ZodOptional<z.ZodNumber>;
			sizes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
				file: z.ZodString;
				height: z.ZodNumber;
				mime_type: z.ZodString;
				source_url: z.ZodString;
				width: z.ZodNumber;
			}, "strip", z.ZodTypeAny, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>>>;
		}, "strip", z.ZodTypeAny, {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		}, {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		}>;
		post: z.ZodNullable<z.ZodNumber>;
		generated_slug: z.ZodString;
		permalink_template: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		mime_type: string;
		source_url: string;
		generated_slug: string;
		permalink_template: string;
		author: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		media_details: {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		};
		post: number | null;
		meta?: never[] | Record<string, any> | undefined;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		format?: string | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		mime_type: string;
		source_url: string;
		generated_slug: string;
		permalink_template: string;
		author: number;
		slug: string;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		media_details: {
			filesize: number;
			bitrate?: number | undefined;
			dataformat?: string | undefined;
			file?: string | undefined;
			fileformat?: string | undefined;
			height?: number | undefined;
			image_meta?: Record<string, any> | undefined;
			length?: number | undefined;
			length_formatted?: string | undefined;
			width?: number | undefined;
			sizes?: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}> | undefined;
		};
		post: number | null;
		meta?: never[] | Record<string, any> | undefined;
		_links?: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]> | undefined;
		format?: string | undefined;
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
	export const settings: z.ZodObject<{
		date_format: z.ZodString;
		default_category: z.ZodNumber;
		default_comment_status: z.ZodEnum<["open", "closed"]>;
		default_ping_status: z.ZodEnum<["open", "closed"]>;
		default_post_format: z.ZodString;
		description: z.ZodString;
		email: z.ZodString;
		language: z.ZodString;
		page_for_posts: z.ZodNumber;
		page_on_front: z.ZodNumber;
		posts_per_page: z.ZodNumber;
		show_on_front: z.ZodEnum<["page", "posts"]>;
		site_icon: z.ZodNullable<z.ZodNumber>;
		site_logo: z.ZodNullable<z.ZodNumber>;
		start_of_week: z.ZodNumber;
		time_format: z.ZodString;
		timezone: z.ZodString;
		title: z.ZodString;
		url: z.ZodString;
		use_smilies: z.ZodBoolean;
	}, "strip", z.ZodTypeAny, {
		url: string;
		title: string;
		email: string;
		description: string;
		language: string;
		site_icon: number | null;
		site_logo: number | null;
		date_format: string;
		default_category: number;
		default_comment_status: "closed" | "open";
		default_ping_status: "closed" | "open";
		default_post_format: string;
		page_for_posts: number;
		page_on_front: number;
		posts_per_page: number;
		show_on_front: "page" | "posts";
		start_of_week: number;
		time_format: string;
		timezone: string;
		use_smilies: boolean;
	}, {
		url: string;
		title: string;
		email: string;
		description: string;
		language: string;
		site_icon: number | null;
		site_logo: number | null;
		date_format: string;
		default_category: number;
		default_comment_status: "closed" | "open";
		default_ping_status: "closed" | "open";
		default_post_format: string;
		page_for_posts: number;
		page_on_front: number;
		posts_per_page: number;
		show_on_front: "page" | "posts";
		start_of_week: number;
		time_format: string;
		timezone: string;
		use_smilies: boolean;
	}>;
	export const taxonomy_embed: z.ZodObject<{
		name: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		slug: z.ZodString;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
	}, {
		name: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
	}>;
	export const taxonomy_view: z.ZodObject<{
		name: z.ZodString;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		description: z.ZodString;
		hierarchical: z.ZodBoolean;
		types: z.ZodArray<z.ZodString, "many">;
	}, "strip", z.ZodTypeAny, {
		name: string;
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
	}, {
		name: string;
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
	}>;
	export const taxonomy_edit: z.ZodObject<{
		name: z.ZodString;
		description: z.ZodString;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		hierarchical: z.ZodBoolean;
		types: z.ZodArray<z.ZodString, "many">;
		capabilities: z.ZodRecord<z.ZodString, z.ZodString>;
		labels: z.ZodObject<{
			add_new_item: z.ZodString;
			add_or_remove_items: z.ZodNullable<z.ZodString>;
			all_items: z.ZodString;
			archives: z.ZodOptional<z.ZodString>;
			back_to_items: z.ZodString;
			choose_from_most_used: z.ZodNullable<z.ZodString>;
			desc_field_description: z.ZodString;
			edit_item: z.ZodString;
			filter_by_item: z.ZodNullable<z.ZodString>;
			item_link_description: z.ZodString;
			item_link: z.ZodString;
			items_list_navigation: z.ZodString;
			items_list: z.ZodString;
			menu_name: z.ZodString;
			most_used: z.ZodString;
			name_admin_bar: z.ZodString;
			name_field_description: z.ZodString;
			name: z.ZodString;
			new_item_name: z.ZodString;
			no_terms: z.ZodString;
			not_found: z.ZodString;
			parent_field_description: z.ZodNullable<z.ZodString>;
			parent_item_colon: z.ZodNullable<z.ZodString>;
			parent_item: z.ZodString;
			popular_items: z.ZodNullable<z.ZodString>;
			search_items: z.ZodString;
			separate_items_with_commas: z.ZodNullable<z.ZodString>;
			singular_name: z.ZodString;
			slug_field_description: z.ZodString;
			update_item: z.ZodString;
			view_item: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		}, {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		}>;
		show_cloud: z.ZodBoolean;
		visibility: z.ZodObject<{
			public: z.ZodBoolean;
			publicly_queryable: z.ZodBoolean;
			show_admin_column: z.ZodBoolean;
			show_in_nav_menus: z.ZodBoolean;
			show_in_quick_edit: z.ZodBoolean;
			show_ui: z.ZodBoolean;
		}, "strip", z.ZodTypeAny, {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		}, {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		visibility: {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		};
		labels: {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		};
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
		capabilities: Record<string, string>;
		show_cloud: boolean;
	}, {
		name: string;
		visibility: {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		};
		labels: {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		};
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
		capabilities: Record<string, string>;
		show_cloud: boolean;
	}>;
	export const taxonomies_embed: z.ZodRecord<z.ZodString, z.ZodObject<{
		name: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		slug: z.ZodString;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
	}, {
		name: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
	}>>;
	export const taxonomies_view: z.ZodRecord<z.ZodString, z.ZodObject<{
		name: z.ZodString;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		description: z.ZodString;
		hierarchical: z.ZodBoolean;
		types: z.ZodArray<z.ZodString, "many">;
	}, "strip", z.ZodTypeAny, {
		name: string;
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
	}, {
		name: string;
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
	}>>;
	export const taxonomies_edit: z.ZodRecord<z.ZodString, z.ZodObject<{
		name: z.ZodString;
		description: z.ZodString;
		_links: z.ZodObject<{
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		rest_base: z.ZodString;
		rest_namespace: z.ZodString;
		hierarchical: z.ZodBoolean;
		types: z.ZodArray<z.ZodString, "many">;
		capabilities: z.ZodRecord<z.ZodString, z.ZodString>;
		labels: z.ZodObject<{
			add_new_item: z.ZodString;
			add_or_remove_items: z.ZodNullable<z.ZodString>;
			all_items: z.ZodString;
			archives: z.ZodOptional<z.ZodString>;
			back_to_items: z.ZodString;
			choose_from_most_used: z.ZodNullable<z.ZodString>;
			desc_field_description: z.ZodString;
			edit_item: z.ZodString;
			filter_by_item: z.ZodNullable<z.ZodString>;
			item_link_description: z.ZodString;
			item_link: z.ZodString;
			items_list_navigation: z.ZodString;
			items_list: z.ZodString;
			menu_name: z.ZodString;
			most_used: z.ZodString;
			name_admin_bar: z.ZodString;
			name_field_description: z.ZodString;
			name: z.ZodString;
			new_item_name: z.ZodString;
			no_terms: z.ZodString;
			not_found: z.ZodString;
			parent_field_description: z.ZodNullable<z.ZodString>;
			parent_item_colon: z.ZodNullable<z.ZodString>;
			parent_item: z.ZodString;
			popular_items: z.ZodNullable<z.ZodString>;
			search_items: z.ZodString;
			separate_items_with_commas: z.ZodNullable<z.ZodString>;
			singular_name: z.ZodString;
			slug_field_description: z.ZodString;
			update_item: z.ZodString;
			view_item: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		}, {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		}>;
		show_cloud: z.ZodBoolean;
		visibility: z.ZodObject<{
			public: z.ZodBoolean;
			publicly_queryable: z.ZodBoolean;
			show_admin_column: z.ZodBoolean;
			show_in_nav_menus: z.ZodBoolean;
			show_in_quick_edit: z.ZodBoolean;
			show_ui: z.ZodBoolean;
		}, "strip", z.ZodTypeAny, {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		}, {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		visibility: {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		};
		labels: {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		};
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
		capabilities: Record<string, string>;
		show_cloud: boolean;
	}, {
		name: string;
		visibility: {
			public: boolean;
			publicly_queryable: boolean;
			show_admin_column: boolean;
			show_in_nav_menus: boolean;
			show_in_quick_edit: boolean;
			show_ui: boolean;
		};
		labels: {
			name: string;
			add_new_item: string;
			add_or_remove_items: string | null;
			all_items: string;
			back_to_items: string;
			choose_from_most_used: string | null;
			desc_field_description: string;
			edit_item: string;
			filter_by_item: string | null;
			item_link_description: string;
			item_link: string;
			items_list_navigation: string;
			items_list: string;
			menu_name: string;
			most_used: string;
			name_admin_bar: string;
			name_field_description: string;
			new_item_name: string;
			no_terms: string;
			not_found: string;
			parent_field_description: string | null;
			parent_item_colon: string | null;
			parent_item: string;
			popular_items: string | null;
			search_items: string;
			separate_items_with_commas: string | null;
			singular_name: string;
			slug_field_description: string;
			update_item: string;
			view_item: string;
			archives?: string | undefined;
		};
		description: string;
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		rest_base: string;
		rest_namespace: string;
		hierarchical: boolean;
		types: string[];
		capabilities: Record<string, string>;
		show_cloud: boolean;
	}>>;
	export const term_embed: z.ZodObject<{
		id: z.ZodNumber;
		link: z.ZodString;
		name: z.ZodString;
		slug: z.ZodString;
		taxonomy: z.ZodString;
		_links: z.ZodObject<{
			about: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:post_type': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		name: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		taxonomy: string;
	}, {
		link: string;
		id: number;
		name: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		taxonomy: string;
	}>;
	export const term_view: z.ZodObject<{
		link: z.ZodString;
		id: z.ZodNumber;
		name: z.ZodString;
		_links: z.ZodObject<{
			about: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			'wp:post_type': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		taxonomy: z.ZodString;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
		count: z.ZodNumber;
		description: z.ZodString;
		parent: z.ZodNumber;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		taxonomy: string;
		count: number;
		meta?: never[] | Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		name: string;
		description: string;
		parent: number;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			'wp:post_type': {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		taxonomy: string;
		count: number;
		meta?: never[] | Record<string, any> | undefined;
	}>;
	export const user_embed: z.ZodObject<{
		avatar_urls: z.ZodRecord<z.ZodString, z.ZodString>;
		description: z.ZodString;
		id: z.ZodNumber;
		name: z.ZodString;
		url: z.ZodString;
		slug: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
	}, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
	}>;
	export const user_view: z.ZodObject<{
		id: z.ZodNumber;
		url: z.ZodString;
		name: z.ZodString;
		description: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		avatar_urls: z.ZodRecord<z.ZodString, z.ZodString>;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
	}, "strip", z.ZodTypeAny, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
		meta?: never[] | Record<string, any> | undefined;
	}, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
		meta?: never[] | Record<string, any> | undefined;
	}>;
	export const user_edit: z.ZodObject<{
		id: z.ZodNumber;
		url: z.ZodString;
		name: z.ZodString;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodNever, "many">]>>;
		description: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
				templated: z.ZodOptional<z.ZodBoolean>;
				type: z.ZodOptional<z.ZodString>;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: z.ZodString;
		avatar_urls: z.ZodRecord<z.ZodString, z.ZodString>;
		capabilities: z.ZodRecord<z.ZodString, z.ZodBoolean>;
		email: z.ZodString;
		extra_capabilities: z.ZodRecord<z.ZodString, z.ZodBoolean>;
		first_name: z.ZodString;
		last_name: z.ZodString;
		link: z.ZodString;
		locale: z.ZodString;
		nickname: z.ZodString;
		registered_date: z.ZodString;
		roles: z.ZodArray<z.ZodString, "many">;
		username: z.ZodString;
	}, "strip", z.ZodTypeAny, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		capabilities: Record<string, boolean>;
		avatar_urls: Record<string, string>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: never[] | Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		capabilities: Record<string, boolean>;
		avatar_urls: Record<string, string>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: never[] | Record<string, any> | undefined;
	}>;
	export type WP_Application_Password_Edit = z.infer<typeof application_password_edit>;
	export type WP_Application_Password_Embed = z.infer<typeof application_password_embed>;
	export type WP_Application_Password_View = z.infer<typeof application_password_view>;
	/**
	 * Get settings
	 *
	 * @since 0.2.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<import('zod').infer<typeof settings>>} Settings data.
	 */
	export function get_settings(url: string, auth: string): Promise<import('zod').infer<typeof settings>>;
	/**
	 * Get taxonomies
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<import('zod').infer<typeof taxonomies_view>>} Taxonomies (view) data.
	 */
	export function get_taxonomies(url: string, auth?: string | undefined, args?: Fetch_Taxonomies_Args | undefined): Promise<import('zod').infer<typeof taxonomies_view>>;
	/**
	 * Get single taxonomy
	 *
	 * @since 0.2.0
	 *
	 * @param name Taxonomy name.
	 * @param url  WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return {Promise<import('zod').infer<typeof taxonomy_view>>} Taxonomies (view) data.
	 */
	export function get_taxonomy(name: string, url: string, auth?: string | undefined): Promise<import('zod').infer<typeof taxonomy_view>>;
	/**
	 * Get taxonomy terms
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param taxonomy Taxonomy's rest_base.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return {Promise<import('zod').infer<typeof term_view>[]>} Terms (view) data.
	 */
	export function get_terms(url: string, taxonomy: string, auth?: string | undefined, args?: Fetch_Terms_Args | undefined): Promise<import('zod').infer<typeof term_view>[]>;
	/**
	 * Get user data
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param id User ID or 'me'.
	 * @param auth Authorization header (required when `id` is `me`).
	 * @param context Request context, defaults to 'view'.
	 *
	 * @return {Promise<import('zod').infer<import('../../types.ts').Schema_By_Context<C, typeof user_view, typeof user_embed, typeof user_edit>>>} User data.
	 */
	export function get_user<C extends Context_Arg>(url: string, id: number | 'me', auth?: string | undefined, context?: C | undefined): Promise<import("zod").TypeOf<Schema_By_Context<C, import("zod").ZodObject<{
		id: import("zod").ZodNumber;
		url: import("zod").ZodString;
		name: import("zod").ZodString;
		description: import("zod").ZodString;
		_links: import("zod").ZodObject<{
			self: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", import("zod").ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: import("zod").ZodString;
		avatar_urls: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
		meta: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodArray<import("zod").ZodNever, "many">]>>;
	}, "strip", import("zod").ZodTypeAny, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
		meta?: never[] | Record<string, any> | undefined;
	}, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
		meta?: never[] | Record<string, any> | undefined;
	}>, import("zod").ZodObject<{
		avatar_urls: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
		description: import("zod").ZodString;
		id: import("zod").ZodNumber;
		name: import("zod").ZodString;
		url: import("zod").ZodString;
		slug: import("zod").ZodString;
		_links: import("zod").ZodObject<{
			self: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", import("zod").ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
	}, "strip", import("zod").ZodTypeAny, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
	}, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
	}>, import("zod").ZodObject<{
		id: import("zod").ZodNumber;
		url: import("zod").ZodString;
		name: import("zod").ZodString;
		meta: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodArray<import("zod").ZodNever, "many">]>>;
		description: import("zod").ZodString;
		_links: import("zod").ZodObject<{
			self: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", import("zod").ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: import("zod").ZodString;
		avatar_urls: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
		capabilities: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodBoolean>;
		email: import("zod").ZodString;
		extra_capabilities: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodBoolean>;
		first_name: import("zod").ZodString;
		last_name: import("zod").ZodString;
		link: import("zod").ZodString;
		locale: import("zod").ZodString;
		nickname: import("zod").ZodString;
		registered_date: import("zod").ZodString;
		roles: import("zod").ZodArray<import("zod").ZodString, "many">;
		username: import("zod").ZodString;
	}, "strip", import("zod").ZodTypeAny, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		capabilities: Record<string, boolean>;
		avatar_urls: Record<string, string>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: never[] | Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		capabilities: Record<string, boolean>;
		avatar_urls: Record<string, string>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: never[] | Record<string, any> | undefined;
	}>>>>;
	/**
	 * Get users
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header (required when `id` is `me`).
	 * @param context Request context, defaults to 'view'.
	 * @param args Request arguments.
	 *
	 * @return {Promise<import('zod').infer<import('../../types.ts').Schema_By_Context<C, typeof user_view, typeof user_embed, typeof user_edit>>[]>} Users data.
	 */
	export function get_users<C extends Context_Arg>(url: string, auth?: string | undefined, context?: C | undefined, args?: Fetch_Users_Args): Promise<import("zod").TypeOf<Schema_By_Context<C, import("zod").ZodObject<{
		id: import("zod").ZodNumber;
		url: import("zod").ZodString;
		name: import("zod").ZodString;
		description: import("zod").ZodString;
		_links: import("zod").ZodObject<{
			self: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", import("zod").ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: import("zod").ZodString;
		avatar_urls: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
		meta: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodArray<import("zod").ZodNever, "many">]>>;
	}, "strip", import("zod").ZodTypeAny, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
		meta?: never[] | Record<string, any> | undefined;
	}, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
		meta?: never[] | Record<string, any> | undefined;
	}>, import("zod").ZodObject<{
		avatar_urls: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
		description: import("zod").ZodString;
		id: import("zod").ZodNumber;
		name: import("zod").ZodString;
		url: import("zod").ZodString;
		slug: import("zod").ZodString;
		_links: import("zod").ZodObject<{
			self: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", import("zod").ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
	}, "strip", import("zod").ZodTypeAny, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
	}, {
		id: number;
		url: string;
		name: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		avatar_urls: Record<string, string>;
	}>, import("zod").ZodObject<{
		id: import("zod").ZodNumber;
		url: import("zod").ZodString;
		name: import("zod").ZodString;
		meta: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodArray<import("zod").ZodNever, "many">]>>;
		description: import("zod").ZodString;
		_links: import("zod").ZodObject<{
			self: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
			collection: import("zod").ZodArray<import("zod").ZodObject<{
				embeddable: import("zod").ZodOptional<import("zod").ZodBoolean>;
				href: import("zod").ZodString;
				templated: import("zod").ZodOptional<import("zod").ZodBoolean>;
				type: import("zod").ZodOptional<import("zod").ZodString>;
			}, "strip", import("zod").ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}>, "many">;
		}, "strip", import("zod").ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		}>;
		slug: import("zod").ZodString;
		avatar_urls: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
		capabilities: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodBoolean>;
		email: import("zod").ZodString;
		extra_capabilities: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodBoolean>;
		first_name: import("zod").ZodString;
		last_name: import("zod").ZodString;
		link: import("zod").ZodString;
		locale: import("zod").ZodString;
		nickname: import("zod").ZodString;
		registered_date: import("zod").ZodString;
		roles: import("zod").ZodArray<import("zod").ZodString, "many">;
		username: import("zod").ZodString;
	}, "strip", import("zod").ZodTypeAny, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		capabilities: Record<string, boolean>;
		avatar_urls: Record<string, string>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: never[] | Record<string, any> | undefined;
	}, {
		link: string;
		id: number;
		url: string;
		name: string;
		username: string;
		email: string;
		description: string;
		_links: {
			self: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
				templated?: boolean | undefined;
				type?: string | undefined;
			}[];
		};
		slug: string;
		capabilities: Record<string, boolean>;
		avatar_urls: Record<string, string>;
		extra_capabilities: Record<string, boolean>;
		first_name: string;
		last_name: string;
		locale: string;
		nickname: string;
		registered_date: string;
		roles: string[];
		meta?: never[] | Record<string, any> | undefined;
	}>>>[]>;
	type Context_Arg = undefined | 'view' | 'embed' | 'edit';
	type Operator_Arg = 'AND' | 'OR';
	type Order_Arg = 'asc' | 'desc';
	interface Tax_Query {
		include_children?: boolean;
		operator?: Operator_Arg;
		terms: number[];
	}
	interface Fetch_Args {
		/**
		 * Scope under which the request is made; determines fields present in response.
		 * @default 'view'
		 */
		context?: Context_Arg;
	}
	interface Fetch_Collection_Args {
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
	interface Fetch_Posts_Args extends Fetch_Collection_Args {
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
		orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'include_slugs' | 'title';
		/**
		 * Array of column names to be searched.
		 */
		search_columns?: ('post_title' | 'post_content' | 'post_excerpt')[];
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
	interface Fetch_Media_Args extends Fetch_Posts_Args {
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
	interface Fetch_Taxonomies_Args extends Fetch_Args {
		/**
		 * Limit results to taxonomies associated with a specific post type.
		 */
		type?: string;
	}
	interface Fetch_Terms_Args extends Fetch_Args, Fetch_Collection_Args {
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
	interface Fetch_Users_Args extends Fetch_Args, Fetch_Collection_Args {
		/**
		 * Limit result set to users matching at least one specific capability provided. Accepts csv list or single capability.
		 */
		capabilities?: string[];
		/**
		 * Limit result set to users who have published posts.
		 */
		has_published_posts?: boolean | string[];
		/**
		 * Limit result set to users matching at least one specific role provided. Accepts csv list or single role.
		 */
		roles?: string[];
		/**
		 * Limit result set to terms with one or more specific slugs.
		 */
		slug?: string[];
		/**
		 * Limit result set to users who are considered authors.
		 */
		who?: 'authors';
	}
	type Schema_By_Context<C extends Context_Arg, X extends ZodTypeAny, Y extends ZodTypeAny, Z extends ZodTypeAny> = C extends undefined | 'view' ? X : C extends 'embed' ? Y : C extends 'edit' ? Z : never;
}

declare module '@kucrut/wp-api-helpers/utils' {
	/**
	 * Create basic auth string
	 *
	 * @since 0.3.0
	 *
	 * @param username Username.
	 * @param password Password
	 * @return {string} Base64-encoded basic auth;
	 */
	export function create_basic_auth_string(username: string, password: any): string;
	/**
	 * Fetch and parse response
	 *
	 * @since 0.1.0
	 *
	 * @param schema Zod schema to parse the response with.
	 * @param fetcher Fetch function.
	 *
	 * @return {ReturnType<import('../../types.ts').Handle_Response<import('zod').infer<T>>>} Parsed data.
	 */
	export function fetch_and_parse<T extends import("zod").ZodTypeAny>(schema: T, fetcher: () => ReturnType<typeof fetch>): Promise<import("zod").TypeOf<T>>;
	/**
	 * Fetch data
	 *
	 * @since 0.1.0
	 *
	 * @param endpoint Data endpoint.
	 * @param auth Authentication header.
	 * @param args Arguments.
	 *
	 * @return {ReturnType<typeof fetch>} Response.
	 */
	export function fetch_data(endpoint: string, auth?: string | undefined, args?: Record<string, any> | undefined): ReturnType<typeof fetch>;
	/**
	 * Get error message
	 *
	 * @since 0.1.0
	 *
	 * @param error    Error object, whatever.
	 * @param fallback Fallback message if the error is unrecognized.
	 * @param dump     Whether to dump error if the error is unrecognized. (Defaults to true).
	 *
	 * @return {string} Error message.
	 */
	export function get_error_message(error: unknown, fallback: string, dump?: boolean | undefined): string;
	/**
	 * Handle WP REST API response
	 *
	 * This helps catch syntax errors in json because of PHP notices, etc.
	 *
	 * @since 0.1.0
	 *
	 * @param response Fetch response object.
	 * @param callback Callback to run when json is valid.
	 *
	 * @throws {Error} JSON.parse error.
	 *
	 * @return {Promise<T>} Whatever the callback returns.
	 */
	export function handle_response<T>(response: Response, callback: Handle_Response<T>): Promise<T>;
	/**
	 * Make response handler
	 *
	 * @since 0.1.0
	 *
	 * @param handler Handler function.
	 * @return {(resp: Response) => Promise<T>} Bleh
	 */
	export function make_response_handler<T>(handler: Handle_Response<T>): (resp: Response) => Promise<T>;
	/**
	 * Normalize fetch arguments
	 *
	 * @since 0.1.0
	 *
	 * @param args Fetch arguments.
	 * @return {[string, string][]} Pairs of key and value strings.
	 */
	export function normalize_fetch_args(args: Record<string, any>): [string, string][];
	/**
	 * Pick schema based on passed context
	 *
	 * @param view_schema View schema.
	 * @param embed_schema Embed schema.
	 * @param edit_schema Edit schema.
	 * @param context Context.
	 *
	 * @return {S} Schema.
	 */
	export function pick_schema<C extends Context_Arg, S extends import("zod").ZodTypeAny>(view_schema: S, embed_schema: S, edit_schema: S, context?: C | undefined): S;
	type Context_Arg = undefined | 'view' | 'embed' | 'edit';
	type Handle_Response<T> = (data: unknown) => Promise<T>;
}

//# sourceMappingURL=index.d.ts.map