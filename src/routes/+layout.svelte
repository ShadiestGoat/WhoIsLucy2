<script lang="ts">
	import { onMount, setContext, tick } from "svelte";
    import "../app.scss";
	import '@fontsource/roboto';
	import '@fontsource/noto-color-emoji';
    import { ClientSideAPI } from "$lib/api"
    import toast, { Toaster } from "svelte-french-toast"
    import { page } from "$app/stores"
    import { replaceState } from "$app/navigation"
	import type { LayoutData } from "./$types";

    export let data: LayoutData
    let api = new ClientSideAPI(data.key)

    setContext("API", api)

    onMount(async () => {
        (async () => {
            const searchParams = $page.url.searchParams
            if (!searchParams.get("key")) {
                return
            }

            searchParams.delete("key")
            const newParams = searchParams.toString()

            await tick()
            replaceState($page.url.toString().split("?")[0] + (newParams ? "?" + newParams : ""), $page.state);
        })()

        if ($page.route.id?.startsWith("/finale")) {
            // Finale does this need keys updated
            return
        }

        if (!api.key) {
            toast("You don't have a key!\nDid you use your special link?", {
                icon: "⚠",
            })
        }
    })
</script>

<Toaster toastOptions={{
    className: "toast",
}} />

<div class="container col">
    <slot />
</div>

<style lang="scss">
    .container {
        height: 100dvh;
        align-items: center;
    }
</style>