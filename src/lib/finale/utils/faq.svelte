<script lang="ts">
	import { shouldContinueEvent, type AnyInputEvent } from "$lib/input";
	import Markdown from "$lib/md/markdown.svelte";
	import { createEventDispatcher } from "svelte";
    import animatedDetails from "svelte-animated-details"

    export let title: string
    export let content: string

    export let open = false

    let debounce = false

    const dispatch = createEventDispatcher<{ openToggle: null }>()

    function handleEvent(e: AnyInputEvent) {
        if (!shouldContinueEvent(e) || debounce) {
            return
        }

        debounce = true
        open = !open
        dispatch('openToggle')
        setTimeout(() => {
            debounce = false
        }, 1000)
    }
</script>

<details
    role="presentation"
    on:keydown={handleEvent} on:click={handleEvent}
    use:animatedDetails bind:open={open}
>
    <summary>
        <Markdown content="# {title}" />
    </summary>

    <div class="content">
        <Markdown {content} />
    </div>
</details>

<style lang="scss">
    $padVert: 2.5dvh;
    $padHorz: 1.5dvw;

    details {
        color: $primary;
        background: $gray-9;
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.75s;
    }

    details:hover {
        background-color: $gray-8;
    }

    summary {
        padding: $padVert $padHorz;
        text-align: center;

        :global(> h2) {
            display: inline;
            user-select: none;
        }
    }

    .content {
        padding: 0 $padHorz $padVert;
    }
</style>
