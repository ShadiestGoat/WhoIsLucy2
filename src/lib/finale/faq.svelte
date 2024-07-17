<script lang="ts">
	import Faq from "./utils/faq.svelte";

    export let faq: [string, string][]

    let curFAQ = -1
</script>

<div class="col container">
    {#each faq as q, i}
        <Faq open={curFAQ == i} title={q[0]} content={q[1]} on:openToggle={() => {
            if (curFAQ == i) {
                curFAQ = -1
            } else {
                curFAQ = i
            }
        }} />
    {/each}
</div>

<style lang="scss">
    .container {
        width: $maxWidth;
        gap: 5dvh;
        padding-bottom: 10dvh;
    }
</style>