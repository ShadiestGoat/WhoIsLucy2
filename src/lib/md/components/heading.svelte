<script lang="ts">
  export let depth: number

  console.log(depth)

  $: tag = `h${depth > 5 ? 6 : depth + 1}`
</script>

<svelte:element this={tag}>
    <slot />
</svelte:element>

<style lang="scss">
  h2, h3, h4, h5, h6 {
    color: $primary;
  }
</style>