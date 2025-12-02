import { EXIT, SKIP, CONTINUE, visit } from 'unist-util-visit'
import type { Root, Parent, Node } from 'mdast'
import type { TextDirective } from 'mdast-util-directive'
import type { VFile } from 'vfile'

export function remarkCharacterDirectives() {
    return (tree: Root, file: VFile) => {
        visit(tree,
            'textDirective', // Only process textDirective nodes.
            (node: TextDirective) => {
                const txtdir = node as TextDirective
                const value = txtdir.children[0]
                if (value?.type !== 'text') {
                    console.log(JSON.stringify(file))
                    file.fail(`Missing value on :\`${txtdir.name}\` directive`, node)
                }
                const options = Object.keys(txtdir.attributes || {}).toString()
                Object.assign(node, {
                    type: 'mdxJsxFlowElement',
                    name: 'Character',
                    children: [],
                    attributes: [{  ...value, type: 'mdxJsxAttribute', name: txtdir.name }],
                })
                if (options) {
                    // @ts-expect-error: mutate because it is faster; content model is fine.
                    node.attributes.push(
                        { type: 'mdxJsxAttribute',
                          name: 'options',
                          value: options,
                          position: value?.position
                        })
                }
                return SKIP
            }
        )
    }
}
