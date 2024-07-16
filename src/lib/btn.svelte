<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { shouldContinueEvent, type AnyInputEvent } from "./input";

    const dispatch = createEventDispatcher<{ submit: null }>()
    function submit(e: AnyInputEvent) {
		if (!shouldContinueEvent(e)) {
			return
		}

        if (self) {
            self.blur()
        }
        dispatch('submit', null)
	}

    export let text: string
    export let autofocus = true
    export let href = ""
    export let disable = false
    export let classes = ""
    export const BTN_CLASS = "btn"

    let self: HTMLElement
</script>

{#if href}
    <!-- svelte-ignore a11y-autofocus -->
    <a bind:this={self} href={disable ? "" : href} aria-disabled={disable} class="input {BTN_CLASS} {classes}" {autofocus}>{text}</a>
{:else}
    <!-- svelte-ignore a11y-autofocus -->
    <button
        bind:this={self}
        class="input {BTN_CLASS} {classes}"
        type="button"
        tabindex="0"
        {autofocus}
        disabled={disable}
        aria-disabled={disable}
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