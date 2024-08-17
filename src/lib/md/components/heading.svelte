<script lang="ts">
	import type { HastNode } from "svelte-exmarkdown";
	import { getAstNode } from "svelte-exmarkdown/contexts";

  export let customID = ""
  export let depth = 1
  const ast = getAstNode()

  $: tag = `h${depth > 5 ? 6 : depth + 1}`

  function getID(h: HastNode): string {
    if (customID) return customID

    if (!h.children?.length) {
      return ""
    }
    if (h.children[0].type != "text") {
      return ""
    }

    return h.children[0].value.replace(/ /g, '-')
  }
</script>

<svelte:element id={getID($ast)} this={tag}>
    <slot />
</svelte:element>

<style lang="scss">
  h2, h3, h4, h5, h6 {
    color: $primary;
  }
</style>