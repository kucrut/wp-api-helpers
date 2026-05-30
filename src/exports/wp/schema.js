import * as v from 'valibot';

export const CommentStatusSchema = v.picklist( [ 'open', 'closed' ] );
export const DateItemSchema = v.pipe( v.string(), v.toDate() );
export const EmailSchema = v.pipe( v.string(), v.email() );
export const IdSchema = v.pipe( v.number(), v.minValue( 1 ) );
export const UrlSchema = v.pipe( v.string(), v.url() );

export const LinkItemSchema = v.array(
	v.object( {
		embeddable: v.optional( v.boolean() ),
		href: UrlSchema,
		templated: v.optional( v.boolean() ),
		type: v.optional( v.string() ),
	} ),
);

/** @typedef {v.InferOutput<typeof MetaSchema>} Meta */
export const MetaSchema = v.optional( v.union( [
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

/** @typedef {v.InferOutput<typeof RestErrorSchema>} RestError */
export const RestErrorSchema = v.object( {
	code: v.string(),
	message: v.string(),
	data: v.object( {
		status: v.number(),
	} ),
} );
