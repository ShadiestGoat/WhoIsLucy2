<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { SectionQuestion } from "../api";

    const dispatch = createEventDispatcher<{ next: string }>()
 
    // svelte-ignore unused-export-let
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
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" autofocus placeholder="Your answer" bind:value={ans} on:keydown={onKeyDown} />
</div>

<style lang="scss">
    @use 'sass:math';
    @use '../scss/input' as *;
    @use '../scss/mods/input';

    .input {
        padding: 0;
    }

    input {
        background: none;
        border: none;
        padding: input.$padding;
    }
</style>