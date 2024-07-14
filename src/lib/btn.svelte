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
</script>

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

<style lang="scss">
    @use './scss/input';

    p {
        font-size: 1rem;
    }
</style>