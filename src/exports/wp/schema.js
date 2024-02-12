import { z } from 'zod';

export const comment_ping_status = z.enum( [ 'open', 'closed' ] );

export const date_item = z.coerce.date();

export const link_item = z.array(
	z.object( {
		embeddable: z.boolean().optional(),
		href: z.string().url(),
		templated: z.boolean().optional(),
		type: z.string().optional(),
	} ),
);

// NOTE: When meta is an array it shouldn't have any value, hence the never type.
export const meta = z.record( z.any() ).or( z.array( z.never() ) ).optional();

export const renderable_item = z.object( {
	block_version: z.number().optional(),
	protected: z.boolean().optional(),
	raw: z.string().optional(),
	rendered: z.string(),
} );

export const rest_error = z.object( {
	code: z.string(),
	message: z.string(),
	data: z.object( {
		status: z.number(),
	} ),
} );

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
