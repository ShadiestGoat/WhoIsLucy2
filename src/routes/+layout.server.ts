import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const key = url.searchParams.get("key")

	if (key) {
		cookies.set("key", encodeURIComponent(key), {path: "/"})
	}

	return {
		key: cookies.get("key") ?? ""
	}
};
