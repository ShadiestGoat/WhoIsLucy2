<script lang="ts">
	import Btn from "$lib/btn.svelte";
</script>

<div class="w-100 container">
    <h2 class="who">Who</h2>
    <div class="row">
        <h2><span class="hell ital">The Hell</span> is</h2>
    </div>
    <h1 class="ital">Lucy</h1>

    <Btn text="Lets find out" autofocus={false} href="/quiz" />
</div>

<style lang="scss">
    @use "../lib/scss/mods/input";

    $fsRegular: 8dvh;
    $fsMain: 13dvh;
    $centerOffset: calc($fsRegular * 3);

    .container {
        display: grid;
        grid-template: (repeat(2, $fsRegular) $fsMain 1fr) / 1fr;
        justify-items: center;
        align-items: center;
        padding: 10dvh 0 $gVertPad;

        :global(> .btn) {
            @include input.botInput;
        }
    }

    h2 {
        font-size: $fsRegular;
    }

    .row {
        gap: 2ch;
    }

    .who {
        position: relative;
        right: $centerOffset;
    }

    .ital {
        font-style: italic;
    }

    .hell {
        letter-spacing: 0.1ch;
        color: $warning;
    }

    h1 {
        color: $primary;
        font-size: $fsMain;
        position: relative;
        left: $centerOffset;
    }
</style>