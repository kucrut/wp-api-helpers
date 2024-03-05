/** @type {typeof fetch} */
let fetcher;

/**
 * Get fetch function
 *
 * @return {typeof fetch} Fetch function.
 */
export function get_fetch() {
	return fetcher || fetch;
}

/**
 * Set fetcher
 *
 * @param {typeof fetch} fn Fetch function.
 */
export function set_fetch( fn ) {
	fetcher = fn;
}
