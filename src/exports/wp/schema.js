import { z } from 'zod';

export const jwt_auth_data = z.object( {
	user_email: z.string().email(),
	user_display_name: z.string(),
	user_nicename: z.string(),
	token: z.string(),
} );

const link_item = z.array( z.object( { href: z.string().url() } ) );

const links = z.object( {
	self: link_item,
	collection: link_item,
} );

/** @typedef {z.infer<jwt_auth_data>} JWT_Auth_Data */

export const rest_error = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

/** @typedef {z.infer<rest_error>} Rest_Error */

export const user = z.object( {
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
	meta: z.record( z.any() ).optional(),
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
