<script lang="ts">
    import SvelteMarkdown from "svelte-markdown"
	import Empty from "./components/empty.svelte";
	import ListItem from "./components/listItem.svelte";
	import Heading from "./components/heading.svelte";
	import Link from "./components/link.svelte";
	import Code from "./components/code.svelte";
	import Strikethrough from "./components/strikethrough.svelte";
	import Bold from "./components/bold.svelte";
	import List from "./components/list.svelte";

    export let content: string
</script>

<SvelteMarkdown
    options={{
        async: true,
        smartypants: true,
        gfm: true,
    }}
    renderers={{
        table: Empty,
        code: Empty,
        image: Empty,
        html: Empty,
        text: Empty,
        
        list: List,
        listitem: ListItem,

        heading: Heading,
        link: Link,
        codespan: Code,
        del: Strikethrough,
        strong: Bold,
    }}
    source={content.replace(/\n/g, "\n\n")}
    isInline={false}
/>