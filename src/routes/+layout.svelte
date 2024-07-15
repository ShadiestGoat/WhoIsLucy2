<script lang="ts">
	import { onMount, setContext } from "svelte";
    import "../app.scss";
	import '@fontsource/roboto';
    import { ClientSideAPI } from "$lib/api"

    let api = new ClientSideAPI("")

    setContext("API", api)

    onMount(() => {
        const searchParams = new URLSearchParams(location.search)
        let key = searchParams.get("key")
        if (key) {
            document.cookie = "key=" + encodeURIComponent(key)
        } else {
            const keyCookie = document.cookie.split("; ").find((v) => v.split("=")[0] == "key")
            if (keyCookie && keyCookie.split("=").length == 2) {
                key = decodeURIComponent(keyCookie.split("=")[1])
            } else {
                // TODO: Make a toast abt it
            }
        }

        if (key) {
            api.key = key
        }
    })
</script>

<div class="container col">
    <slot />
</div>

<style lang="scss">
    .container {
        height: 100dvh;
        align-items: center;
    }
</style>