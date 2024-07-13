import { PUBLIC_APP_API_LOC } from '$env/static/public'

export enum CorrectMode {
    GOOD,
    BAD,
    UNKNOWN
}

export enum SectionType {
    SLIDE = "slide",
    QUESTION = "question",
    FINALE = "finale"
}

type SectionBase = {
    title: string,
	id: string,
}

export type SectionSlide = SectionBase & {
    type: SectionType.SLIDE
    slide: {
        subTitle?: string
        nextText: string
    }
}

export type FinaleInfo = {
    faq: string[2][]
    essay: string
}

export type SectionFinale = SectionBase & {
    type: SectionType.FINALE
    finale: {
        secret: string
    }
}

export type SectionQuestion = SectionBase & {
    type: SectionType.QUESTION
}

export type Section = SectionSlide | SectionQuestion | SectionFinale

export type SectionResp = {
    next?: Section,
    transitionMode: CorrectMode
}

export function apiCtx(fetchFunc = fetch, url = new URL(location as unknown as string)): { fetch: typeof fetch, url: URL } {
    return {
        fetch: fetchFunc,
        url,
    }
}

async function apiCall(method: string, path: string, data?: Record<string, unknown>, { fetch } = apiCtx()): Promise<Record<string, unknown>> {
    const resp = await fetch(`${PUBLIC_APP_API_LOC ?? "/api"}${path}`, {
        method,
        body: data ? JSON.stringify(data) : "{}",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let body: Record<string, unknown> | null

    try {
        body = await resp.json()
    } catch {
        console.error("Failed to parse body as JSON!")
        body = null
    }
    
    if (!body || typeof body != "object") {
        throw `Unexpected body: (status: ${resp.status})`
    }

    if (resp.status == 200) {
        return body
    }

    if (body.error) {
        throw `API Exception: ${body.error}`
    }

    throw `Unknown API Exception: ${resp.status}`
}

function getKey(url: URL) {
    return (new URLSearchParams(url.search)).get("key")
}

export async function nextSection(currentSection: string, answer = "", ctx = apiCtx()): Promise<SectionResp> {
    return apiCall("POST", "/", { currentSection, answer, key: getKey(ctx.url) }, ctx) as Promise<SectionResp>
}

export async function getFinale(secret: string, ctx = apiCtx()): Promise<FinaleInfo> {
    return apiCall("POST", "/finale", { finaleSecret: secret }, ctx) as Promise<FinaleInfo>
}

