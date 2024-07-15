import { PUBLIC_APP_API_LOC } from '$env/static/public'
import { error, type ServerLoadEvent } from '@sveltejs/kit'
import { getContext } from 'svelte'
import toast, { type ToastOptions } from 'svelte-french-toast'

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

export type Obj = Record<string, unknown>

type APIResp<T> = T | null
type DebugResp<T> = { status: number, resp: T }
type FinResp<Resp, Debug extends boolean> = Debug extends true ? DebugResp<APIResp<Resp>> : APIResp<Resp>

export type APIErrHandler = (status: number, msg: string, body: string, err?: unknown) => void

class API<Debug extends true | false = false> {
    private fetch: typeof fetch
    private handleErr: APIErrHandler
    key: string
    debug: Debug

    constructor(fetchFunc: typeof fetch, key: string, debug: Debug, handleErr: APIErrHandler) {
        this.fetch = fetchFunc
        this.key = key
        this.handleErr = handleErr
        this.debug = debug
    }

    private async rawAPI<T extends Obj>(method: string, path: string, data?: Record<string, unknown>): Promise<FinResp<T, Debug>> {
        let resp: Response

        try {
            resp = await this.fetch(`${PUBLIC_APP_API_LOC ?? "/api"}${path}`, {
                method,
                body: data ? JSON.stringify(data) : undefined,
                headers: data ? {'Content-Type': 'application/json'} : undefined,
            })
        } catch (err) {
            this.handleErr(500, "Failed to fetch", "<null>", `${err}`)
            return (this.debug ? {status: 500, resp: null } : null) as FinResp<T, Debug>
        }

        let rawBody: string | null = null
        let body: T | null = null

        const doResp = (respBody: APIResp<T>) => {
            return (this.debug ? { status: resp.status, resp: respBody } : respBody) as FinResp<T, Debug>
        }

        const handleErr = (msg: string, err?: unknown) => {
            this.handleErr(resp.status, msg, rawBody ?? "<null>", `${err}`)
            return doResp(null)
        }
    
        try {
            rawBody = await resp.text()
        } catch (err) {
            return handleErr("Can't read body", err)
        }

        try {
            body = JSON.parse(rawBody)
        } catch {
            return handleErr("Can't parse body as JSON", rawBody)
        }
        
        if (!body || typeof body != "object") {
            return handleErr("Unexpected body: not an obj")
        }
    
        if (resp.status == 200) {
            return doResp(body)
        }
    
        if (body.error) {
            return handleErr(`API Exception: ${body.error}`)
        }

        return handleErr(`Unknown API Exception`)
    }

    async nextSection(currentSection: string, answer = "") {
        return this.rawAPI<SectionResp>("POST", "/", { currentSection, answer, key: this.key })
    }
    async getFinale(secret: string) {
        return this.rawAPI<FinaleInfo>("POST", "/finale", { finaleSecret: secret })
    }
}

export class ServerSideAPI extends API<true> {
    constructor({ fetch, cookies, url }: ServerLoadEvent) {
        const key = url.searchParams.get("key") ?? cookies.get("key")

        super(fetch, key ?? "", true, function (status, msg, body, err) {
            error(status, {
                message: msg,
                status,
                jsErr: err,
                rawBody: body
            })
        })
    }
}

export class ClientSideAPI extends API {
    constructor(key: string) {
        super(fetch, key, false, (status, msg, body, err) => {
            const opts: ToastOptions = {
                position: "bottom-right",
            }

            if (!this.key && status == 401) {
                toast.error("Not Authorized...\nDid you use your special link?", opts)
                return
            }

            console.error(status, msg, body, err)
            toast.error(msg, opts)
        })
    }
}

/** Gets client side API instance.
 * 
 * MUST BE CALLED AT COMPONENT INIT!!
 */
export function getClientSideAPI(): ClientSideAPI {
    return getContext("API")
}
