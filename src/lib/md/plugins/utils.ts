import type { Node, Parent } from "mdast";

export function isParent(n: Node): n is Parent {
    return "children" in n
}
