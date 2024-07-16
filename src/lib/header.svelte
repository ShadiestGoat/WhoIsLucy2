<header class="row w-100">
    <h3>Who <span class="hell">The Hell</span> is <span class="lucy">Lucy?</span></h3>
</header>

<style lang="scss">
    @use "scss/mods/header" as h;

    header {
        padding: h.$padTop h.$padSide h.$padBot;
        margin-bottom: h.$marBot;
        align-items: center;
        justify-content: center;
        border-bottom: 2px $gray-8 solid;
        z-index: -1;
        position: relative;

        h3 {
            letter-spacing: .3ch;
            font-size: h.$fontSize;
        }

        span {
            font-style: italic;
        }

        .lucy {
            color: $primary;
        }
        .hell {
            color: $warning;
        }
    }
</style>