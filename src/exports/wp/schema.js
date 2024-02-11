import { z } from 'zod';

const comment_ping_status = z.enum( [ 'open', 'closed' ] );

const date_item = z.coerce.date();

const image_size = z.object( {
	file: z.string(),
	height: z.number(),
	mime_type: z.string(),
	source_url: z.string(),
	width: z.number(),
} );

const link_item = z.array(
	z.object( {
		embeddable: z.boolean().optional(),
		href: z.string().url(),
		templated: z.boolean().optional(),
		type: z.string().optional(),
	} ),
);

// NOTE: When meta is an array it shouldn't have any value, hence the never type.
const meta = z.record( z.any() ).or( z.array( z.never() ) ).optional();

const post_edit_base = z.object( {
	generated_slug: z.string(),
	permalink_template: z.string(),
} );

const renderable_item = z.object( {
	block_version: z.number().optional(),
	protected: z.boolean().optional(),
	raw: z.string().optional(),
	rendered: z.string(),
} );

export const application_password_embed = z.object( {
	app_id: z.string(),
	name: z.string(),
	uuid: z.string(),
} );

export const application_password_view = z.object( {
	created: date_item,
	last_ip: date_item,
	last_used: z.string().ip(),
} );

export const application_password_edit = application_password_view.extend( {
	password: z.string(),
} );

export const info = z.object( {
	description: z.string(),
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

export const jwt_auth_data = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

export const jwt_valid_token = z.object( {
	code: z.string().refine( val => val === 'jwt_auth_valid_token' ),
	data: z.object( {
		status: z.number().refine( val => val === 200 ),
	} ),
} );

export const post_embed = z.object( {
	author: z.number().min( 1 ),
	date: date_item,
	excerpt: renderable_item,
	featured_media: z.number(),
	id: z.number(),
	link: z.string().url(),
	slug: z.string(),
	title: renderable_item,
	type: z.string(),
	_links: z.record( link_item ).optional(),
} );

export const post_view = post_embed.extend( {
	meta,
	comment_status: comment_ping_status,
	content: renderable_item,
	date_gmt: date_item,
	format: z.string().optional(),
	menu_order: z.number().optional(),
	modified: date_item,
	modified_gmt: date_item,
	parent: z.number().optional(),
	ping_status: comment_ping_status,
	status: z.string(),
	sticky: z.boolean().optional(),
	template: z.string(),
	guid: z.object( {
		raw: z.string().url().optional(),
		rendered: z.string().url(),
	} ),
} );

export const post_edit = post_view.merge( post_edit_base );

export const media_embed = post_embed
	.omit( {
		excerpt: true,
		featured_media: true,
	} )
	.extend( {
		alt_text: z.string(),
		caption: renderable_item,
		media_type: z.string(),
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
			sizes: z.record( image_size ).optional(), // Image.
		} ),
		mime_type: z.string(),
		source_url: z.string().url(),
	} );

export const media_view = z
	.object( {
		description: renderable_item,
		post: z.number().nullable(),
	} )
	.merge( post_view )
	.merge( media_embed )
	.omit( {
		content: true,
		excerpt: true,
		featured_media: true,
		menu_order: true,
		parent: true,
		sticky: true,
	} );

export const media_edit = media_view.merge( post_edit_base );

export const rest_error = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

export const settings = z.object( {
	date_format: z.string(),
	default_category: z.number(),
	default_comment_status: z.enum( [ 'open', 'closed' ] ),
	default_ping_status: z.enum( [ 'open', 'closed' ] ),
	default_post_format: z.string(),
	description: z.string(),
	email: z.string().email(),
	language: z.string(),
	page_for_posts: z.number(),
	page_on_front: z.number(),
	posts_per_page: z.number(),
	show_on_front: z.enum( [ 'page', 'posts' ] ),
	site_icon: z.number().nullable(),
	site_logo: z.number().nullable(),
	start_of_week: z.number(),
	time_format: z.string(),
	timezone: z.string(),
	title: z.string(),
	url: z.string(),
	use_smilies: z.boolean(),
} );

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

export const taxonomies_embed = z.record( taxonomy_embed );
export const taxonomies_view = z.record( taxonomy_view );
export const taxonomies_edit = z.record( taxonomy_edit );

export const term_embed = z.object( {
	id: z.number().min( 1 ),
	link: z.string(),
	name: z.string(),
	slug: z.string(),
	taxonomy: z.string(),
	_links: z.object( {
		'about': link_item,
		'collection': link_item,
		'self': link_item,
		'wp:post_type': link_item,
	} ),
} );

export const term_view = term_embed.extend( {
	meta,
	count: z.number(),
	description: z.string(),
	parent: z.number(),
} );

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

/**
 * @typedef {z.infer<typeof application_password_edit>} WP_Application_Password_Edit
 * @typedef {z.infer<typeof application_password_embed>} WP_Application_Password_Embed
 * @typedef {z.infer<typeof application_password_view>} WP_Application_Password_View
 */
