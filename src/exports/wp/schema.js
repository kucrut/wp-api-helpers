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
