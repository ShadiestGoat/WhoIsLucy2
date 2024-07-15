import { ServerSideAPI, type Section } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (e) => {
    const api = new ServerSideAPI(e)
    const { status, resp } = await api.nextSection("", "")

    if (!resp || !resp.next) {
        error(500, {
            status,
            rawBody: JSON.stringify(resp),
            message: "Bad Resp Body in SSR",
        })
    }

	return {
		section: resp.next as Section
	};
};