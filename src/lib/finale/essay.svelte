<script lang="ts">
	import Markdown from "$lib/md/markdown.svelte";

    export let content: string
</script>

<Markdown {content} />