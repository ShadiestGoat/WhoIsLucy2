<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { shouldContinueEvent, type AnyInputEvent } from "./input";

    const dispatch = createEventDispatcher<{ submit: null }>()
    function submit(e: AnyInputEvent) {
		if (!shouldContinueEvent(e, true)) {
			return
		}

        dispatch('submit', null)
	}

    export let text: string
    export let autofocus = true
    export let href = ""
</script>

{#if href}
    <!-- svelte-ignore a11y-autofocus -->
    <a {href} class="input" {autofocus}>{text}</a>
{:else}
    <!-- svelte-ignore a11y-autofocus -->
    <button
        class="input"
        type="button"
        tabindex="0"
        {autofocus}
        on:click={submit}
        on:keypress={submit}
    >
        <p>{text}</p>
    </button>
{/if}

<style lang="scss">
    @use './scss/input';

    p, a {
        font-size: 1rem;
    }

    a {
        text-decoration: none;
    }
</style>