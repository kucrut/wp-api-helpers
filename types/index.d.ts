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
	 * @since 0.1.0
	 *
	 * @param url WordPress URL.
	 *
	 * @return WordPress API root URL.
	 */
	export function discover(url: string): Promise<string>;
	/**
	 * Create media
	 *
	 * @since 0.1.0
	 *
	 * @param url  WordPress API root URL.
	 * @param auth Autorization header.
	 * @param data Form data.
	 *
	 * @return Fetch response.
	 */
	export function create_media(url: string, auth: string, data: FormData): Promise<Response>;
	export function create_media_parsed(url: string, auth: string, data: FormData): Promise<{
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		slug: string;
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		mime_type: string;
		post: number | null;
		source_url: string;
		media_details: {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		};
		meta?: any[] | Record<string, any> | undefined;
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

	export const media: z.ZodObject<{
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
		template: z.ZodString;
		title: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		status: z.ZodString;
		date: z.ZodDate;
		author: z.ZodNumber;
		comment_status: z.ZodEnum<["open", "closed"]>;
		date_gmt: z.ZodDate;
		modified: z.ZodDate;
		modified_gmt: z.ZodDate;
		ping_status: z.ZodEnum<["open", "closed"]>;
		slug: z.ZodString;
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
		caption: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		description: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		media_type: z.ZodString;
		mime_type: z.ZodString;
		post: z.ZodNullable<z.ZodNumber>;
		source_url: z.ZodString;
		media_details: z.ZodObject<{
			file: z.ZodString;
			filesize: z.ZodNumber;
			height: z.ZodNumber;
			image_meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
			width: z.ZodNumber;
			sizes: z.ZodRecord<z.ZodString, z.ZodObject<{
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
			}>>;
		}, "strip", z.ZodTypeAny, {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		}, {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		slug: string;
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		mime_type: string;
		post: number | null;
		source_url: string;
		media_details: {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		};
		meta?: any[] | Record<string, any> | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		slug: string;
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		mime_type: string;
		post: number | null;
		source_url: string;
		media_details: {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		};
		meta?: any[] | Record<string, any> | undefined;
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
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		description: string;
		slug: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		types: string[];
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		};
	}, {
		name: string;
		description: string;
		slug: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		types: string[];
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			about: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		};
		count: number;
		taxonomy: string;
	}>;

	export const user: z.ZodObject<{
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		name: z.ZodString;
		nickname: z.ZodString;
		registered_date: z.ZodString;
		roles: z.ZodArray<z.ZodString, "many">;
		slug: z.ZodString;
		url: z.ZodString;
		username: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
	}>;
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
	export type Media = z.infer<z.ZodObject<{
		link: z.ZodString;
		type: z.ZodString;
		id: z.ZodNumber;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
		template: z.ZodString;
		title: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		status: z.ZodString;
		date: z.ZodDate;
		author: z.ZodNumber;
		comment_status: z.ZodEnum<["open", "closed"]>;
		date_gmt: z.ZodDate;
		modified: z.ZodDate;
		modified_gmt: z.ZodDate;
		ping_status: z.ZodEnum<["open", "closed"]>;
		slug: z.ZodString;
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
		caption: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		description: z.ZodObject<{
			raw: z.ZodOptional<z.ZodString>;
			rendered: z.ZodString;
		}, "strip", z.ZodTypeAny, {
			rendered: string;
			raw?: string | undefined;
		}, {
			rendered: string;
			raw?: string | undefined;
		}>;
		media_type: z.ZodString;
		mime_type: z.ZodString;
		post: z.ZodNullable<z.ZodNumber>;
		source_url: z.ZodString;
		media_details: z.ZodObject<{
			file: z.ZodString;
			filesize: z.ZodNumber;
			height: z.ZodNumber;
			image_meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
			width: z.ZodNumber;
			sizes: z.ZodRecord<z.ZodString, z.ZodObject<{
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
			}>>;
		}, "strip", z.ZodTypeAny, {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		}, {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		}>;
	}, "strip", z.ZodTypeAny, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		slug: string;
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		mime_type: string;
		post: number | null;
		source_url: string;
		media_details: {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		};
		meta?: any[] | Record<string, any> | undefined;
	}, {
		link: string;
		type: string;
		id: number;
		caption: {
			rendered: string;
			raw?: string | undefined;
		};
		template: string;
		title: {
			rendered: string;
			raw?: string | undefined;
		};
		description: {
			rendered: string;
			raw?: string | undefined;
		};
		status: string;
		date: Date;
		author: number;
		comment_status: "closed" | "open";
		date_gmt: Date;
		modified: Date;
		modified_gmt: Date;
		ping_status: "closed" | "open";
		slug: string;
		guid: {
			rendered: string;
			raw?: string | undefined;
		};
		alt_text: string;
		media_type: string;
		mime_type: string;
		post: number | null;
		source_url: string;
		media_details: {
			file: string;
			height: number;
			width: number;
			filesize: number;
			sizes: Record<string, {
				file: string;
				height: number;
				width: number;
				mime_type: string;
				source_url: string;
			}>;
			image_meta?: Record<string, any> | undefined;
		};
		meta?: any[] | Record<string, any> | undefined;
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
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			'wp:items': z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}, {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}>;
	}, "strip", z.ZodTypeAny, {
		name: string;
		description: string;
		slug: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		types: string[];
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		};
	}, {
		name: string;
		description: string;
		slug: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		types: string[];
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			about: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		};
		count: number;
		taxonomy: string;
	}>>;
	export type User = z.infer<z.ZodObject<{
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		name: z.ZodString;
		nickname: z.ZodString;
		registered_date: z.ZodString;
		roles: z.ZodArray<z.ZodString, "many">;
		slug: z.ZodString;
		url: z.ZodString;
		username: z.ZodString;
		_links: z.ZodObject<{
			self: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
			collection: z.ZodArray<z.ZodObject<{
				embeddable: z.ZodOptional<z.ZodBoolean>;
				href: z.ZodString;
			}, "strip", z.ZodTypeAny, {
				href: string;
				embeddable?: boolean | undefined;
			}, {
				href: string;
				embeddable?: boolean | undefined;
			}>, "many">;
		}, "strip", z.ZodTypeAny, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
		}, {
			self: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
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
		slug: string;
		hierarchical: boolean;
		rest_base: string;
		rest_namespace: string;
		types: string[];
		_links: {
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			'wp:items': {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
			}[];
			about: {
				href: string;
				embeddable?: boolean | undefined;
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
				embeddable?: boolean | undefined;
			}[];
			collection: {
				href: string;
				embeddable?: boolean | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
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
	 * @since 0.1.0
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
	 * @since 0.1.0
	 *
	 * @param handler Handler function.
	 * @return Bleh
	 */
	export function make_response_handler<T>(handler: HandleResponse<T>): (resp: Response) => Promise<T>;
	/**
	 * Normalize fetch arguments
	 *
	 * @since 0.1.0
	 *
	 * @param args Fetch arguments.
	 * @return Pairs of key and value strings.
	 */
	export function normalize_fetch_args(args: Record<string, any>): [string, string][];
	type HandleResponse<T> = (data: unknown) => Promise<T>;
}

//# sourceMappingURL=index.d.ts.map