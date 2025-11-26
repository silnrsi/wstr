import { EXIT, SKIP, CONTINUE, visit } from 'unist-util-visit'

export default function remarkCharacterDirectives() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === 'textDirective') {
                if (node.name !== 'usv' && node.name !== 'char' && length(node.children)==1) return
                const value = node.children[0]
                const options = Object.keys(node.attributes || {})
                node.type = 'mdxJsxFlowElement'
                node.children = []
                node.attributes = [
                    {  ...value, type: 'mdxJsxAttribute', name: node.name },
                    { type: 'mdxJsxAttribute', name: 'options', value: `${options}`, position: value.position }
                ]
                node.data = { _mdxExplicitJsx: true }
                node.name = 'Character'
                return SKIP
            }
        })
        // console.log("Dump Tree:" + JSON.stringify(tree))
    }
}
