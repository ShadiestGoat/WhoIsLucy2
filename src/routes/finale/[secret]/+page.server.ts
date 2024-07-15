import { ServerSideAPI } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (e) => {
    const api = new ServerSideAPI(e)
    
    const { params } = e

    const { status, resp } = await api.getFinale(params.secret)

    if (!resp) {
        error(500, {
            status,
            rawBody: JSON.stringify(resp),
            message: "Bad Resp Body in SSR",
        })
    }

	return {
        finale: resp
    }
};