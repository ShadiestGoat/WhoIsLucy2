import { apiCtx, nextSection, type Section } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
    const resp = await nextSection("", "", apiCtx(fetch, url))

    if (!resp.next) {
        throw "Unknown err"
    }

	return {
		section: resp.next as Section
	};
};