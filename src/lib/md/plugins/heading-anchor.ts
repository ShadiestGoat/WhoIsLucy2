import type { Heading, Parent, Root, RootContent } from "mdast";
import type { Element } from "hast";
import type { State } from "mdast-util-to-hast";
import { isParent } from "./utils";

declare module 'mdast' {
	export interface HeadingData {
		customID?: string
	}
}

function doFilter(n: RootContent & Parent, p: Parent, i: number): boolean {
    if (n.type != "paragraph") return true

    if (n.children.length != 1 || n.children[0].type != "text") {
        return true
    }

    if (i == 0 || p.children[i - 1].type != "heading") {
        return true
    }

    const c = n.children[0]
    if (c.value.startsWith("^") && !c.value.includes(" ")) {
        const h = p.children[i - 1] as Heading
        h.data ??= {}
        h.data.customID = c.value
    }

    return false
}


function recursive(n: RootContent | Root, p: Parent | null, i: number): boolean {
    const nHasChildren = isParent(n)

    if (!nHasChildren) {
        return true
    }

    // Don't descend into paragraphs, its pointless
    if (n.type == "paragraph" && p) {
        return doFilter(n, p, i)
    }

    n.children = n.children.filter((c, i) => recursive(c, n, i)) as typeof n.children

    return true
}

export function remarkPluginHeading() {
    return (tree: Root) => {
        recursive(tree, null, 0)
    }
}

export function rehypeHeading(state: State, node: Heading) {
    const result: Element = {
        type: 'element',
        tagName: `h${node.depth}`,
        properties: {
            customID: node.data?.customID,
            depth: node.depth
        },
        children: state.all(node),
    }

    state.patch(node, result)
    return state.applyData(node, result)
}
