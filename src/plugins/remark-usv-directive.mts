import { EXIT, SKIP, CONTINUE, visit } from 'unist-util-visit'
import type { Root, Parent, Node } from 'mdast'
import type { TextDirective } from 'mdast-util-directive'
import type { VFile } from 'vfile'
import { type USV, isUSV, parseUSV } from './usv.mts'

export function remarkCharacterDirectives() {
    return (tree: Root, file: VFile) => {
        visit(tree,
            'textDirective', // Only process textDirective nodes.
            (node: TextDirective) => {
                if (node.name !== 'usv' && node.name !== 'char') return
                const child = node.children.pop()
                if (child?.type !== 'text' && child?.type !== 'inlineCode') {
                    file.fail(`Missing value on \`:${node.name}\` directive`, node)
                } else if (node.name == 'usv' && !isUSV(parseUSV(child.value))) {
                    file.fail(`invalid USV: "${child.value}": A USV must be between 0000 and 10ffff`, child)
                }
                const options = Object.keys(node.attributes || {}).toString()
                Object.assign(node, {
                    type: 'mdxJsxFlowElement',
                    name: 'Character',
                    children: [],
                    attributes: [{  ...child, type: 'mdxJsxAttribute', name: node.name }],
                })
                if (options) {
                    // @ts-expect-error: mutate because it is faster; content model is fine.
                    node.attributes.push(
                        { type: 'mdxJsxAttribute',
                          name: 'options',
                          value: options,
                          position: child?.position
                        })
                }
                return SKIP
            }
        )
    }
}
