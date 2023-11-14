/* eslint-disable no-unused-vars */

export type HandleResponse< T > = ( data: unknown ) => Promise< T >;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandledFetch< F extends ( ...args: any ) => any, T > = (
	...args: Parameters< F >
) => ReturnType< HandleResponse< T > >;
