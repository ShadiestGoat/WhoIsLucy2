<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { SectionSlide } from "../api";
	import { shouldContinueEvent, type AnyInputEvent } from "$lib/input";

    const dispatch = createEventDispatcher<{ next: null }>()
    export let data: SectionSlide

    function submit(e: AnyInputEvent) {
		if (!shouldContinueEvent(e, true)) {
			return
		}

        dispatch('next', null)
	}
</script>

{#if data.slide.subTitle}
    <h2 class="heading">{data.slide.subTitle}</h2>
{/if}

<!-- svelte-ignore a11y-autofocus -->
<button
    class="input"
    type="button"
    tabindex="0"
    autofocus
    on:click={submit}
    on:keypress={submit}
>
    <p>{data.slide.nextText}</p>
</button>

<style lang="scss">
    @use "../scss/input";

    h2 {
        margin-top: 3vh;
    }
    p {
        font-size: 1rem;
    }
</style>
