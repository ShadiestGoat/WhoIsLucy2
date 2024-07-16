<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import toast from "svelte-french-toast";
	import Header from "$lib/header.svelte";
	import Btn from "$lib/btn.svelte";
	import FinHeader from "$lib/finale/utils/finHeader.svelte";

    export let data: PageData

    let { faq, essay } = data.finale
    
    let hasFAQ = faq.length > 2
    let hasEssay = essay.length > 2

    function copyURL() {
        toast.promise(navigator.clipboard.writeText($page.url.toString()), {
            loading: "",
            error: "Failed to copy URL!",
            success: "URL Copied!"
        })
    }

    let collapse = false

    let isFAQ = hasFAQ
</script>

<Header />

<div class="btn-wrapper">
    <Btn text={collapse ? "v" : "x"} on:submit={() => collapse = !collapse} autofocus={false} classes={collapse ? "btn-collapse" : ""} />
</div>

<div class="col container w-100 {collapse ? "collapse" : ""}">
    <h1>Congratulations!</h1>
    
    <p class="wrap-words">
        This page is a point of reference about whats going on.<wbr />
        You can <span class="nobr">(and probably should)</span> revisit this page later
    </p>
    
    <p class="wrap-words">Here is a link to this page, copy it & store it somewhere</p>
    
    <!-- svelte-ignore a11y-interactive-supports-focus a11y-click-events-have-key-events -->
    <div role="textbox" on:click={copyURL} class="input url-wrapper row nobr">
        <p class="url">{$page.url}</p>
    </div>
</div>

<FinHeader hasBoth={hasFAQ && hasEssay} bind:isFAQ={isFAQ} />

<style lang="scss">
    @use "../../../lib/scss/input.scss" as *;
    @use "../../../lib/scss/mods/input";
    @use "../../../lib/scss/mods/trans";
    @use "../../../lib/scss/mods/header" as h;
    @use "sass:color";
    @use "sass:math";

    .nobr {
        white-space: nowrap
    }

    $urlPad: 2dvw;
    $urlWrapperWidth: $maxWidth * 0.75;

    @mixin grad($dir) {
        background: linear-gradient(to $dir, color.adjust(input.$borderColor, $alpha: -1), input.$borderColor 90%);
        #{$dir}: 0;
    }

    .url-wrapper {
        width: $urlWrapperWidth;
        padding: 2dvh $urlPad;
        position: relative;
        top: 0;
        overflow: hidden;
        justify-content: center;

        &::before, &::after {
            content: "";
            width: $urlPad * 2.5;
            height: 100%;
            top: 0;
            position: absolute;
            display: block;
        }

        &::before {
            @include grad(left);
        }
        &::after {
            @include grad(right);
        }
    }

    .btn-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        :global(.btn) {
            padding: math.div(input.$paddingVert, 2) math.div(input.$paddingHorz, 2);
            top: h.$padTop + h.$padBot + h.$marBot + 3vh;
            right: h.$padSide;
            position: absolute;
            z-index: 10;
        }

        :global(.btn-collapse) {
            top: 3px;
        }
    }

    $containerPad: 2dvh;
    $containerGap: 2dvh;

    // $containerPad + gap * 5 + inpPad * 2 + 3rem

    .container {
        transition: all trans.$transDur, border-bottom math.div(trans.$transDur, 2) math.div(trans.$transDur, 2);
        gap: 2dvh;
        align-items: center;
        position: relative;
        height: 35dvh;
        border-bottom: 2px $gray-8 solid;

        &.collapse {
            height: 0;
            overflow-y: hidden;
            border-bottom: 0px $gray-8 solid;
        }
    }

    h1 {
        color: $primary;
    }
</style>