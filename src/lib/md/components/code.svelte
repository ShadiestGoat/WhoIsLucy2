<script lang="ts">
    export let raw: string
</script>
  
<code>{raw.slice(1, raw.length - 1)}</code>
  
<style lang="scss">
    code {
        background: $gray-8;
        border-radius: 12px;
        padding: 0px 1.5vw;
    }
</style>