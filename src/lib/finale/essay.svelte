<script lang="ts">
	import Markdown from "$lib/md/markdown.svelte";

    export let content: string
</script>

<div class="col">
    <Markdown {content} />
</div>

<style lang="scss">
    div {
        gap: 0.75rem;
    }
</style>