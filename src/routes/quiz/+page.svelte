<script lang="ts">
	import { CorrectMode, SectionType, type SectionResp } from "$lib/api";
	import GenericSection from "$lib/genericSection.svelte";
    import type { PageData } from './$types';

    export let data: PageData
    let section = data.section
    let transitionClass = ""

    function doTransition(cm: CorrectMode) {
        if (transitionClass != "") {
            return
        }

        transitionClass = "trans "

        switch (cm) {
            case CorrectMode.GOOD:
                transitionClass += "green"
                break
            case CorrectMode.BAD:
                transitionClass += "red"
                break
        }

        setTimeout(() => { transitionClass = "" }, 0.8 * 1000)
    }

    function next({ detail: data }: CustomEvent<SectionResp>) {
        if (data.next && data.next.type == SectionType.FINALE) {
            location.href = `/finale/${data.next.finale.secret}`
            return
        }

        doTransition(data.transitionMode)

        if (data.next) {
            section = data.next
        }
    }
</script>

<div class="h-100 col container {transitionClass}">
    <div class="row header w-100">
        <h3>Who is</h3> <h2 class="primary">Lucy?</h2>
    </div>
    
    <div class="col section">
        <GenericSection bind:section={section} on:next={next} />
    </div>
</div>

<style lang="scss">
    // Autocomplete help... I know about $lib lmao
    @use '../../lib/scss/section';
    @use '../../lib/scss/trans';

    h2 {
        margin-left: 5px;
    }

    .header {
        padding: 2vh 2vw 1vh;
        margin-bottom: 2vh;
        align-items: center;
        justify-content: center;
        border-bottom: 2px $gray-8 solid;
        z-index: -1;
        position: relative;

        h2, h3 {
            letter-spacing: .3rem;
        }
    }

    .section {
        padding: section.$sectionPad 2vh;

        align-items: center;
        flex-grow: 1;
    }

    .container {
        @include trans.trans;
        box-shadow: inset 0 0;
    }

    .green {
        --color: #{$green-4};
    }
    .red {
        --color: #{$red-5};
    }

    .trans {
        box-shadow: inset 0 0 40px 4px var(--color);
    }
</style>