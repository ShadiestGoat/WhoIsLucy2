<script lang="ts">
	import type { AdmonitionType } from "../plugins/blockquote-admonition";
	import '@fontsource/material-symbols-outlined/100.css';

    export let admonitionType: AdmonitionType

    type AdmonitionInfo = {
        icon: string,
        text: string,
        colorName: string
    }

    function admonitionInfo(t: AdmonitionType | null): AdmonitionInfo | null {
        if (!t) return null

        switch (t) {
            case 'NOTE':
                return {
                    icon: '\ue3c9',
                    text: 'Info!',
                    colorName: 'blue'
                }
        }
    }

    $: info = admonitionInfo(admonitionType)
</script>

<blockquote class="col {info ? `admonition ${info.colorName}` : ''}">
    {#if info}
        <div class="row">
            <p class="icon">{info.icon}</p>
            <h4>{info.text}</h4>
        </div>
    {/if}

    <slot />
</blockquote>

<style lang="scss">
    @use 'sass:color';

    .icon {
        font-family: $fontMaterialIcons;
        margin-right: 2px;
        font-size: 1rem;
    }
    h4 {
        font-size: 1.2rem;
    }

    .row {
        margin-bottom: 8px;
        align-items: center;
    }

    blockquote {
        gap: 0.75vh;
        background-color: var(--color, transparent);
        border-left: $gray-5 3px solid;
        margin-left: 0;
        padding: 16px;
    }

    .admonition {
        border-left: 0;
        border-radius: 12.5px;
    }

    .blue {
        --color: #{color.adjust($blue-5, $alpha: -0.75)};
    }
</style>