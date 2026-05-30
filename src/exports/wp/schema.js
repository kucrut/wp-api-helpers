import * as v from 'valibot';

export const CommentPingStatusSchema = v.picklist( [ 'open', 'closed' ] );

export const DateItemSchema = v.date();

export const LinkItemSchema = v.array(
	v.object( {
		embeddable: v.optional( v.boolean() ),
		href: v.pipe( v.string(), v.url() ),
		templated: v.optional( v.boolean() ),
		type: v.optional( v.string() ),
	} ),
);

export const meta = v.optional( v.union( [
	v.any(),
	// When meta is an array it shouldn't have any value, hence the never type.
	v.array( v.never() ),
] ) );

export const RenderableItemSchema = v.object( {
	block_version: v.optional( v.number() ),
	protected: v.optional( v.boolean() ),
	raw: v.optional( v.string() ),
	rendered: v.string(),
} );

export const RestErrorSchema = v.object( {
	code: v.string(),
	message: v.string(),
	data: v.object( {
		status: v.number(),
	} ),
} );
