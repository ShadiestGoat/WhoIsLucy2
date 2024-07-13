export enum CorrectMode {
    GOOD,
    BAD,
    UNKNOWN
}

export enum SectionType {
    SLIDE = "slide",
    QUESTION = "question",
    FINALE = "finale"
}

type SectionBase = {
    title: string,
	id: string,
}

export type SectionSlide = SectionBase & {
    type: SectionType.SLIDE
    slide: {
        subTitle?: string
        nextText: string
    }
}

export type FinaleInfo = {
    faq: string[2][]
    essay: string
}

export type SectionFinale = SectionBase & {
    type: SectionType.FINALE
    finale: {
        secret: string
    }
}

export type SectionQuestion = SectionBase & {
    type: SectionType.QUESTION
}

export type Section = SectionSlide | SectionQuestion | SectionFinale

export type SectionResp = {
    next?: Section,
    transitionMode: CorrectMode
}

