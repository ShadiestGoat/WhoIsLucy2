import type { Blockquote, Root, RootContent } from "mdast";
import type { Element } from "hast";
import type { State } from "mdast-util-to-hast";
import { isParent } from "./utils";

export type AdmonitionType = 'NOTE'
export const allAdmonitionTypes: AdmonitionType[] = ['NOTE']

declare module 'mdast' {
	export interface BlockquoteData {
		admonitionType?: AdmonitionType
	}
}

function bqData(n: Blockquote) {
    if (!n.children || n.children.length <= 1) return
    
    const p = n.children[0]
    if (p.type != "paragraph" || p.children.length != 1) return

    const pText = p.children[0]
    if (pText.type != "text" || pText.value.match(/^\[![A-Z]+\]$/)?.length != 1) return

    const admonitionType = pText.value.slice(2, -1) as AdmonitionType
    if (!allAdmonitionTypes.includes(admonitionType)) return

    n.children = n.children.slice(1)

    n.data ??= {}
    n.data.admonitionType = admonitionType

    return false
}


function recursive(n: RootContent | Root) {
    const nHasChildren = isParent(n)

    // No point in descending into either of these
    if (!nHasChildren) return
    if (n.type == "paragraph" || n.type == "heading") return
    if (n.type == "blockquote" ) bqData(n)

    n.children.map(recursive)
}

export function remarkPluginBlockquote() {
    return recursive
}

export function rehypeBlockquote(state: State, node: Blockquote) {
    const result: Element = {
        type: 'element',
        tagName: `blockquote`,
        properties: {
            admonitionType: node.data?.admonitionType
        },
        children: state.wrap(state.all(node), true)
    }

    state.patch(node, result)
    return state.applyData(node, result)
}
