import { z } from 'zod';

const comment_ping_status = z.enum( [ 'open', 'closed' ] );

const date_item = z.coerce.date();

const link_item = z.array(
	z.object( {
		embeddable: z.boolean().optional(),
		href: z.string().url(),
		templated: z.boolean().optional(),
		type: z.string().optional(),
	} ),
);

const meta = z.record( z.any() ).or( z.array( z.any() ) ).optional();

const renderable_item = z.object( {
	raw: z.string().optional(),
	rendered: z.string(),
} );

const post_base = z.object( {
	meta,
	author: z.number().min( 1 ),
	comment_status: comment_ping_status,
	date_gmt: date_item,
	date: date_item,
	id: z.number(),
	link: z.string().url(),
	modified: date_item,
	modified_gmt: date_item,
	ping_status: comment_ping_status,
	slug: z.string(),
	status: z.string(),
	template: z.string(),
	title: renderable_item,
	type: z.string(),
	guid: z.object( {
		raw: z.string().url().optional(),
		rendered: z.string().url(),
	} ),
} );

export const info = z.object( {
	desription: z.string(),
	gmt_offset: z.number(),
	home: z.string().url(),
	name: z.string(),
	namespaces: z.string().array(),
	site_icon_url: z.string(),
	site_icon: z.number(),
	site_logo: z.number(),
	timezone_string: z.string(),
	url: z.string().url(),
	authentication: z.record(
		z.object( {
			endpoints: z.object( {
				authorization: z.string().url(),
			} ),
		} ),
	),
	_links: z.record( link_item ),
} );

/** @typedef {z.infer<info>} Info */

export const jwt_auth_data = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

/** @typedef {z.infer<jwt_auth_data>} JWT_Auth_Data */

export const jwt_valid_token = z.object( {
	code: z.string().refine( val => val === 'jwt_auth_valid_token' ),
	data: z.object( {
		status: z.number().refine( val => val === 200 ),
	} ),
} );

/** @typedef {z.infer<jwt_valid_token>} JWT_Valid_Token */

export const media = post_base.extend( {
	alt_text: z.string(),
	caption: renderable_item,
	description: renderable_item,
	media_type: z.string(),
	mime_type: z.string(),
	post: z.number().nullable(),
	source_url: z.string().url(),
	media_details: z.object( {
		bitrate: z.number().optional(), // Video.
		dataformat: z.string().optional(), // Video.
		file: z.string().optional(), // Image.
		fileformat: z.string().optional(), // Video.
		filesize: z.number(), // Image.
		height: z.number().optional(), // Image.
		image_meta: z.record( z.any() ).optional(), // Image.
		length: z.number().optional(), // Video.
		length_formatted: z.string().optional(), // Video.
		width: z.number().optional(), // Image.
		sizes: z
			.record(
				z.object( {
					file: z.string(),
					height: z.number(),
					mime_type: z.string(),
					source_url: z.string(),
					width: z.number(),
				} ),
			)
			.optional(), // Image.
	} ),
} );

/** @typedef {z.infer<media>} Media */

export const rest_error = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

/** @typedef {z.infer<rest_error>} Rest_Error */

export const taxonomy_embed = z.object( {
	name: z.string(),
	rest_base: z.string(),
	rest_namespace: z.string(),
	slug: z.string(),
	_links: z.object( {
		'collection': link_item,
		'wp:items': link_item,
	} ),
} );

export const taxonomy_view = taxonomy_embed.extend( {
	description: z.string(),
	hierarchical: z.boolean(),
	types: z.string().array(),
} );

export const taxonomy_edit = taxonomy_view.extend( {
	capabilities: z.record( z.string() ),
	labels: z.object( {
		add_new_item: z.string(),
		add_or_remove_items: z.string().nullable(),
		all_items: z.string(),
		archives: z.string().optional(),
		back_to_items: z.string(),
		choose_from_most_used: z.string().nullable(),
		desc_field_description: z.string(),
		edit_item: z.string(),
		filter_by_item: z.string().nullable(),
		item_link_description: z.string(),
		item_link: z.string(),
		items_list_navigation: z.string(),
		items_list: z.string(),
		menu_name: z.string(),
		most_used: z.string(),
		name_admin_bar: z.string(),
		name_field_description: z.string(),
		name: z.string(),
		new_item_name: z.string(),
		no_terms: z.string(),
		not_found: z.string(),
		parent_field_description: z.string().nullable(),
		parent_item_colon: z.string().nullable(),
		parent_item: z.string(),
		popular_items: z.string().nullable(),
		search_items: z.string(),
		separate_items_with_commas: z.string().nullable(),
		singular_name: z.string(),
		slug_field_description: z.string(),
		update_item: z.string(),
		view_item: z.string(),
	} ),
	show_cloud: z.boolean(),
	visibility: z.object( {
		public: z.boolean(),
		publicly_queryable: z.boolean(),
		show_admin_column: z.boolean(),
		show_in_nav_menus: z.boolean(),
		show_in_quick_edit: z.boolean(),
		show_ui: z.boolean(),
	} ),
} );

export const term = z.object( {
	count: z.number(),
	description: z.string(),
	id: z.number().min( 1 ),
	link: z.string(),
	name: z.string(),
	parent: z.number(),
	slug: z.string(),
	taxonomy: z.string(),
	_links: z.record( link_item ),
} );

/** @typedef {z.infer<term>} Term */

export const user_embed = z.object( {
	avatar_urls: z.record( z.string().url() ),
	description: z.string(),
	id: z.number().min( 1 ),
	name: z.string().min( 1 ),
	url: z.string().url(),
	slug: z.string(),
	_links: z.object( {
		self: link_item,
		collection: link_item,
	} ),
} );

export const user_view = user_embed.extend( { meta } );

export const user_edit = user_view.extend( {
	capabilities: z.record( z.boolean() ),
	email: z.string().email(),
	extra_capabilities: z.record( z.boolean() ),
	first_name: z.string(),
	last_name: z.string(),
	link: z.string().url(),
	locale: z.string(),
	nickname: z.string(),
	registered_date: z.string().datetime( { offset: true } ),
	roles: z.string().array(),
	username: z.string(),
} );
