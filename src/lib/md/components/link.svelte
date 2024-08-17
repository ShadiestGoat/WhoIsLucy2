<script lang="ts">
	import Empty from "./empty.svelte";

    export let raw = ""
    export let href = ''
    export let title: string | undefined = undefined
</script>

{#if href.startsWith("https://") || href.startsWith("#")}
    <a {href} {title} target={href[0] == "h" ? "_blank" : ""} on:click={(e) => e.stopPropagation()}><slot /></a>
{:else}
    <Empty>
        {raw}
    </Empty>
{/if}

<style lang="scss">
    @use "../../scss/mods/trans";

    $padSize: 5px;

    a {
        @include trans.trans;

        color: $blue-3;
        position: relative;
        z-index: 99;

        &:hover, &:has(::before:hover) {
            color: $blue-5;
        }

        &::before {
            content: '';
            position: absolute;
            width:  calc(100% + $padSize * 2);
            height: 100%;
            left: -$padSize;
            cursor: pointer;
        }
    }
</style>