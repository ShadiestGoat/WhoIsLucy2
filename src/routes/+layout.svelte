<script lang="ts">
	import { onMount, setContext } from "svelte";
    import "../app.scss";
	import '@fontsource/roboto';
	import '@fontsource/noto-color-emoji';
    import { ClientSideAPI } from "$lib/api"
    import toast, { Toaster } from "svelte-french-toast"
    import { page } from "$app/stores"

    let api = new ClientSideAPI("")

    setContext("API", api)

    onMount(() => {
        if ($page.route.id?.startsWith("/finale")) {
            // Finale does this need keys updated
            return
        }

        const searchParams = new URLSearchParams(location.search)
        let key = searchParams.get("key")
        if (key) {
            document.cookie = "key=" + encodeURIComponent(key)
        } else {
            const keyCookie = document.cookie.split("; ").find((v) => v.split("=")[0] == "key")
            if (keyCookie && keyCookie.split("=").length == 2) {
                key = decodeURIComponent(keyCookie.split("=")[1])
            } else {
                toast("You don't have a key!\nDid you use your special link?", {
                    icon: "⚠",
                })
            }
        }

        if (key) {
            api.key = key
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