import { SKIP, visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { TextDirective } from 'mdast-util-directive'
import type { VFile } from 'vfile'
import { htmlFromCharacter, htmlFromUSV, parseOption } from './character.mts'

export default function remarkCharacterDirectives() {
    return (tree: Root, file: VFile) => {
        visit(tree,
            'textDirective', // Only process textDirective nodes.
            (node: TextDirective) => {
                // Ignore other directives.
                if (node.name !== 'usv' && node.name !== 'char') return

                // Get the child node and validate it.
                const child = node.children.pop()
                if (child?.type !== 'text' && child?.type !== 'inlineCode')
                    file.fail(`Missing value on \`:${node.name}\` directive.`, node, 'CharacterDirectives')
                
                // Read any attributes and convert to options for the html rendering calls.
                let attrs = Object.keys(node.attributes || {})
                attrs = attrs.length ? attrs : ['usv', 'char', 'name']
                const options = Object.fromEntries(attrs.map((k) => [parseOption(k),true]))
                
                let rendered;
                try {
                    switch (node.name) {
                        case "usv": 
                            rendered = htmlFromUSV(child.value, options)
                            break
                        case "char":
                            rendered = htmlFromCharacter(child.value, options)
                            break;
                    }
                } catch (cause) {              
                    file.fail(`${cause}`, child, `CharacterDirectives:${node.name}`)
                }

                // Replace this directive node with an Html node.
                Object.assign(node, { type: 'html', value: rendered })
                return SKIP
            }
        )
    }
}
