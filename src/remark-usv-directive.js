import { EXIT, SKIP, CONTINUE, visit } from 'unist-util-visit'

export default function remarkCharacterDirectives() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === 'textDirective') {
                if (node.name !== 'usv' && node.name !== 'char' && length(node.children)==1) return
                const value = node.children[0]
                const options = Object.keys(node.attributes || {})
                Object.assign(node, {
                    type: 'mdxJsxFlowElement',
                    name: 'Character',
                    children: [],
                    attributes: [
                        {  ...value, type: 'mdxJsxAttribute', name: node.name },
                        { type: 'mdxJsxAttribute', name: 'options', value: `${options}`, position: value?.position }
                    ],
                    data: { _mdxExplicitJsx: true }
                })
                return SKIP
            }
        })
    }
}
