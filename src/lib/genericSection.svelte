<script lang="ts">
	import { createEventDispatcher, SvelteComponent, type ComponentType } from "svelte";
	import { getClientSideAPI, SectionType, type Section, type SectionResp } from "./api";
	import Slide from "./sections/slide.svelte";
	import Question from "./sections/question.svelte";

    const dispatch = createEventDispatcher<{ next: SectionResp }>()
    export let section: Section
    
    type NextEv = CustomEvent<string | null>
    type SectionComp = ComponentType<SvelteComponent<{ data: Section }, { next: NextEv }>>
    const api = getClientSideAPI()

    function mkInp(s: Section): SectionComp | null {
        console.log("INPUT MADE IS GOOD", section.type)
        switch (s.type) {
            case SectionType.SLIDE:
                return Slide as SectionComp
            case SectionType.QUESTION:
                return Question as SectionComp
        }

        return null
    }

    async function next({ detail: ans }: NextEv) {
        const resp = await api.nextSection(section.id, ans || undefined)
        if (!resp) {
            return
        }

        dispatch("next", resp)
    }
</script>

<h1 class="heading">{section.title}</h1>

<svelte:component
    this={mkInp(section)} data={section}
    on:next={next}
/>

<style lang="scss">
    @use './scss/section';

    h1 {
        font-size: 3rem;
    }
</style>