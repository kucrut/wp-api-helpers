import { z } from 'zod';

const comment_ping_status = z.enum( [ 'open', 'closed' ] );

const date_item = z.string().datetime( { offset: true } );

const link_item = z.array( z.object( { embeddable: z.boolean().optional(), href: z.string().url() } ) );

const links = z.object( {
	self: link_item,
	collection: link_item,
} );

const meta = z.record( z.any() ).or( z.array( z.any() ) ).optional(),

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
		file: z.string(),
		filesize: z.number(),
		height: z.number(),
		image_meta: z.record( z.any() ).optional(),
		width: z.number(),
		sizes: z.record(
			z.object( {
				file: z.string(),
				height: z.number(),
				mime_type: z.string(),
				source_url: z.string(),
				width: z.number(),
			} ),
		),
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

export const taxonomy = z.object( {
	hierarchical: z.boolean(),
	description: z.string(),
	name: z.string(),
	rest_base: z.string(),
	rest_namespace: z.string(),
	slug: z.string(),
	types: z.string().array(),
	_links: z.object( {
		'collection': link_item,
		'wp:items': link_item,
	} ),
} );

/** @typedef {z.infer<taxonomy>} Taxonomy */

export const term = z.object( {
	id: z.number().min( 1 ),
	count: z.number(),
	description: z.string(),
	link: z.string(),
	name: z.string(),
	slug: z.string(),
	taxonomy: z.string(),
	parent: z.number(),
	_links: links.extend( {
		about: link_item,
	} ),
} );

/** @typedef {z.infer<term>} Term */

export const user = z.object( {
	meta,
	avatar_urls: z.record( z.string().url() ),
	capabilities: z.record( z.boolean() ),
	description: z.string(),
	email: z.string().email(),
	extra_capabilities: z.record( z.boolean() ),
	first_name: z.string(),
	id: z.number().min( 1 ),
	last_name: z.string(),
	link: z.string().url(),
	locale: z.string(),
	name: z.string().min( 1 ),
	nickname: z.string(),
	registered_date: z.string().datetime( { offset: true } ),
	roles: z.string().array(),
	slug: z.string(),
	url: z.string().url(),
	username: z.string(),
	_links: links,
} );

/** @typedef {z.infer<user>} User */
