<script lang="ts">
	import { CorrectMode, SectionType, type SectionResp } from "$lib/api";
	import GenericSection from "$lib/genericSection.svelte";
	import Header from "$lib/header.svelte";
	import { onMount } from "svelte";
    import type { PageData } from './$types';
	import toast from "svelte-french-toast";
	import { page } from "$app/stores";
	import { replaceState } from "$app/navigation";
	import { fly } from "svelte/transition";

    export let data: PageData
    let section = data.section
    let transitionClass = ""

    onMount(() => {
        const err = $page.url.searchParams.get("err")
        if (!err) {
            return
        }

        switch (err) {
            case "401":
                toast.error("Looks like your secret is invalid/expired.\nTry again!")
                break
        }

        replaceState("/quiz", $page.state);
    })

    function doInnerLight(cm: CorrectMode) {
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

        doInnerLight(data.transitionMode)

        if (data.next) {
            section = data.next
        }
    }
</script>

<div class="h-100 col container {transitionClass}">
    <Header />
    
    {#key section}
        <div in:fly={{
            duration: 1_000,
            x: "100dvw"
        }} out:fly={{
            duration: 1_000,
            x: "-100dvw"
        }} class="col section w-100">
            <GenericSection section={section} on:next={next} />
        </div>
    {/key}
</div>

<style lang="scss">
    // Autocomplete help... I know about $lib lmao
    @use '../../lib/scss/mods/trans';
    @use '../../lib/scss/mods/header' as h;

    .section {
        padding: $gVertPad 2vh;
        height: 100dvh - h.$totalHeight;
        top: h.$totalHeight;

        position: absolute;

        align-items: center;
        flex-grow: 1;
    }

    .container {
        @include trans.trans;
        box-shadow: inset 0 0;
        position: relative;
        width: 100dvw;
        overflow: hidden;
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