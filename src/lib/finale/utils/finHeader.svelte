<script lang="ts">
	import Btn from "$lib/btn.svelte";

    const TITLE_FAQ = "FAQ"
    const TITLE_ESSAY = "Essay"

    function vars(isFaq: boolean): {title: string, otherName: string} {
        if (isFaq) {
            return { title: TITLE_FAQ, otherName: TITLE_ESSAY }
        }
        return { title: TITLE_ESSAY, otherName: TITLE_FAQ }
    }

    export let hasBoth: boolean
    export let isFAQ: boolean

    $: names = vars(isFAQ)
</script>

<div class="row w-100">
    <h1>{names.title}</h1>

    {#if hasBoth}
        <Btn text="Go to {names.otherName}" on:submit={() => {
            isFAQ = !isFAQ
        }} autofocus={false} />
    {/if}
</div>

<style lang="scss">
    @use "../../scss/mods/header" as h;

    .row {
        justify-content: space-between;
        padding: h.$padTop h.$padSide h.$padBot;
    }
    h1 {
        color: $primary;
    }
</style>