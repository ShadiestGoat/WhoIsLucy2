<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { SectionSlide } from "../api";
	import Btn from "$lib/btn.svelte";

    const dispatch = createEventDispatcher<{ next: null }>()
    export let data: SectionSlide
</script>

{#if data.slide.subTitle}
    <h2 class="heading">{data.slide.subTitle}</h2>
{/if}

<Btn text={data.slide.nextText} on:submit={() => dispatch('next', null)} />

<style lang="scss">
    h2 {
        margin-top: 3vh;
    }
</style>
