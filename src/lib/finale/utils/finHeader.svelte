<script lang="ts">
	import Btn from "$lib/btn.svelte";
	import { linear } from "svelte/easing";

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

    function coolScale(node: HTMLElement, params: { duration?: number, mkAbsolute: boolean}) {
		return {
			delay: 0,
			duration: params.duration || 400,
			easing: linear,
			css: (_: number, u: number) => `width: ${100 + u * 50}dvw; position: ${params.mkAbsolute ? "absolute" : "relative"}`
		};
	}
</script>

<div class="wrapper col w-100">
    {#key isFAQ}
        <div in:coolScale={{ mkAbsolute: false }} out:coolScale={{ mkAbsolute: true }} class="container w-100">
            <h1>{names.title}</h1>
    
            {#if hasBoth}
                <Btn text="Go to {names.otherName}" on:submit={() => {
                    isFAQ = !isFAQ
                }} autofocus={false} />
            {/if}
        </div>
    {/key}
</div>

<style lang="scss">
    @use "../../scss/mods/header" as h;
    @use "../../scss/mods/trans";

    .wrapper {
        position: relative;
        align-items: center
    }

    .container {
        @include trans.trans;

        display: grid;
        grid-template: 1fr / 1fr;
        position: relative;

        padding: h.$padTop h.$padSide h.$padBot;

        h1, :global(> .btn) {
            grid-column: 1;
            grid-row: 1;
        }

        h1 {
            color: $primary;
            justify-self: start;
        }

        :global(> .btn) {
            justify-self: end;
        }
    }

</style>