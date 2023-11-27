declare module '@kucrut/wp-api-helpers' {
	import type { z } from 'zod';
	/**
	 * Get JWT authentication
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param username Username or email.
	 * @param password Password.
	 *
	 * @return Auth data.
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
	 * @return Valid token data.
	 */
	export function get_jwt_validate_token(url: string, token: string): Promise<import('zod').infer<typeof jwt_valid_token>>;
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
	export function create_media_parsed(url: string, auth: string, data: FormData): Promise<any>;
	export const info: z.ZodObject<{
		desription: z.ZodString;
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
		desription: string;
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
		desription: string;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
		author: number;
		excerpt: {
			rendered: string;
			block_version?: number | undefined;
			protected?: boolean | undefined;
			raw?: string | undefined;
		};
		featured_media: number;
		slug: string;
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
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		meta?: any[] | Record<string, any> | undefined;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		meta?: any[] | Record<string, any> | undefined;
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
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		meta?: any[] | Record<string, any> | undefined;
		parent?: number | undefined;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		meta?: any[] | Record<string, any> | undefined;
		parent?: number | undefined;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
	}>;
	export const media_view: z.ZodObject<Omit<{
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
		mime_type: z.ZodString;
		source_url: z.ZodString;
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
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
	}, "content" | "menu_order" | "sticky">, "strip", z.ZodTypeAny, {
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		meta?: any[] | Record<string, any> | undefined;
		parent?: number | undefined;
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
		_links: Record<string, {
			href: string;
			embeddable?: boolean | undefined;
			templated?: boolean | undefined;
			type?: string | undefined;
		}[]>;
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
		meta?: any[] | Record<string, any> | undefined;
		parent?: number | undefined;
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
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		meta?: any[] | Record<string, any> | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
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
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		meta?: any[] | Record<string, any> | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
	}>;
	export const user_edit: z.ZodObject<{
		id: z.ZodNumber;
		url: z.ZodString;
		name: z.ZodString;
		meta: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodArray<z.ZodAny, "many">]>>;
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
		meta?: any[] | Record<string, any> | undefined;
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
		meta?: any[] | Record<string, any> | undefined;
	}>;
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
	/**
	 * Get taxonomies
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 * @param args Request arguments.
	 *
	 * @return Taxonomies (view) data.
	 */
	export function get_taxonomies(url: string, auth?: string | undefined, args?: FetchTaxonomiesArgs | undefined): Promise<import('zod').infer<typeof taxonomies_view>>;
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
	 * @return Terms (view) data.
	 */
	export function get_terms(url: string, taxonomy: string, auth?: string | undefined, args?: FetchTermsArgs | undefined): Promise<import('zod').infer<typeof term_view>[]>;
	/**
	 * Get self user data
	 *
	 * @since 0.1.0
	 *
	 * @param url WordPress API root URL.
	 * @param auth Authorization header.
	 *
	 * @return User (view) data.
	 */
	export function get_me(url: string, auth: string): Promise<import('zod').infer<typeof user_view>>;
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
	 * Fetch and parse response
	 *
	 * @since 0.1.0
	 *
	 * @param schema Zod schema to parse the response with.
	 * @param fetcher Fetch function.
	 *
	 * @return Parsed data.
	 */
	export function fetch_and_parse<T extends import("zod").ZodTypeAny>(schema: T, fetcher: () => ReturnType<typeof fetch>): Promise<import("zod").TypeOf<T>>;
	/**
	 * Fetch data
	 *
	 * @param endpoint Data endpoint.
	 * @param auth Authentication header.
	 * @param args Arguments.
	 *
	 * @return Response.
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