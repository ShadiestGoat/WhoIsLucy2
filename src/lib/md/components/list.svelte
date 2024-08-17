<script lang="ts">
    export let ordered = false

    $: emt = ordered ? 'ol' : 'ul'
</script>

<svelte:element this={emt}><slot /></svelte:element>

<style lang="scss">
    ul, ol {
        padding-left: 2dvw;
        font-family: $font;
    }
</style>