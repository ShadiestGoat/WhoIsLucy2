<script lang="ts">
    // import { gfmPlugin } from "svelte-exmarkdown/gfm"
	import { rehypeHeading, remarkPluginHeading } from "./plugins/heading-anchor";
	import { rehypeBlockquote, remarkPluginBlockquote } from "./plugins/blockquote-admonition";

    import SvelteMarkdown from "svelte-exmarkdown/Markdown.svelte"
    import Empty from "./components/empty.svelte";
	import ListItem from "./components/listItem.svelte";
	import Link from "./components/link.svelte";
	import Code from "./components/code.svelte";
	import Strikethrough from "./components/strikethrough.svelte";
	import Bold from "./components/bold.svelte";
	import Ol from "./components/ol.svelte";
	import Ul from "./components/ul.svelte";
	import Blockquote from "./components/blockquote.svelte";
	import Text from "./components/text.svelte";
	import Heading from "./components/heading.svelte";

    export let content: string
    $: md = content.split("\n").map((v, i, arr) => {
        if (v == "") return v + "\n"
        if (v[0] == ">") return v + "\n> "

        if (v[0] == "#" && i != arr.length - 1) {
            const next = arr[i + 1]

            if (next != "" && next[0] == '^') {
                return v
            }
        }

        return v + "\n"
    }).join("\n")
</script>

<SvelteMarkdown
    {md}
    plugins={[
        // gfmPlugin(),
        {
            renderer: {
                table: Empty,
                code: Empty,
                image: Empty,
                html: Empty,
                p: Text,

                ol: Ol,
                ul: Ul,
                li: ListItem,
                blockquote: Blockquote,

                a: Link,
                codespan: Code,
                del: Strikethrough,
                strong: Bold,
                ...Object.fromEntries(Array(6).fill(6).map((_, i) => {
                    return [`h${i + 1}`, Heading]
                }))
            },
            remarkToRehypeOptions: {
                handlers: {
                    heading: rehypeHeading,
                    blockquote: rehypeBlockquote
                }
            },
            remarkPlugin: {
                plugins: [
                    remarkPluginHeading,
                    remarkPluginBlockquote,
                ]
            }
        }
    ]}
/>