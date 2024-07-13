<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { SectionQuestion } from "../api";

    const dispatch = createEventDispatcher<{ next: string }>()
    export let data: SectionQuestion

    let ans = ""

    function onKeyDown(e:KeyboardEvent) {
        if (e.key != "Enter") {
            return
        }

        dispatch('next', ans)

        ans = ""
    }

</script>

<div class="input">
    <input type="text" placeholder="Your answer" bind:value={ans} on:keydown={onKeyDown} />
</div>

<style lang="scss">
    @use 'sass:math';
    @use '../inpUtils';

    .input {
        padding: 0;
    }

    input {
        background: none;
        border: none;
        padding: inpUtils.$padding;
    }
</style>