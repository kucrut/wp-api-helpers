/** @type {typeof fetch} */
let fetcher_fn;

/**
 * Get fetch function
 *
 * @return {typeof fetch} Fetch function.
 */
export function get_fetch() {
	return fetcher_fn || fetch;
}

/**
 * Set fetcher
 *
 * @param {typeof fetch} fn Fetch function.
 */
export function set_fetch( fn ) {
	fetcher_fn = fn;
}
