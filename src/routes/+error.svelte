<script lang="ts">
    import { page } from '$app/stores';
	import Header from '$lib/header.svelte';

    // App.Error isn't liked by eslint for some reason
    type errType = Exclude<typeof $page.error, null>

    const errOrder: (keyof errType)[] = ["status", "jsErr", "message", "rawBody"]

    function mkErr(err: Record<string, unknown>) {
        let res: [keyof errType, unknown][] = []

        for (const k of errOrder) {
            const v = err[k]
            if (!v || v == "<null>" || v == "undefined") {
                continue
            }

            res.push([k, v])
        }

        return res
    }

    $: err = mkErr(($page.error ?? {}) as Record<string, never>)
</script>

<Header />

<h1>Sorry, <span class="err">an error</span> happened :(</h1>
<p class="sub">If you believe this is a bug, let me know, with this debug info!</p>
<div class="debug">
    {#each err as cErr}
        <p>{cErr[0]}:</p><p>{cErr[1]}</p>
    {/each}
</div>

<style lang="scss">
    h1 {
        margin-top: 10dvh;
    }
    .sub {
        margin-top: 2dvh;
    }

    .err {
        color: $warning;
    }

    .debug {
        display: grid;
        grid-template: auto / repeat(2, 1fr);

        padding: 2dvh 2dvw;
        margin-top: 5dvh;

        width: $maxWidth;
        gap: 2dvh 3dvw;

        background: $gray-9;
        border-radius: 12px;

        >:nth-child(odd) {
            justify-self: left;
        }
        >:nth-child(even) {
            justify-self: right;
        }
    }
</style>