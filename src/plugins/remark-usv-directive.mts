import { EXIT, SKIP, CONTINUE, visit } from 'unist-util-visit'
import type { Root, Parent, Node, Link } from 'mdast'
import type { TextDirective } from 'mdast-util-directive'
import type { VFile } from 'vfile'
import { type USV, isUSV, parseUSV } from './usv.mts'
import * as YAML from 'yaml'
import { readFileSync } from 'node:fs'

export function remarkCharacterDirectives() {
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
                else if (node.name == 'usv' && !isUSV(parseUSV(child.value)))
                    file.fail(`Invalid USV: "${child.value}": A USV must be between 0000 and 10ffff.`, child, 'CharacterDirectives:usv')
    
                // Read any attributes and convert to options for the <Character/> component.
                const options = Object.keys(node.attributes || {}).toString()

                // Replace this directive node with an MDX component node.
                Object.assign(node, {
                    type: 'mdxJsxFlowElement',
                    name: 'Character',
                    children: [],
                    attributes: [{  ...child, type: 'mdxJsxAttribute', name: node.name }],
                })
                // Append an options attribute if required.
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

export function remarkSourcesLinkReference() {
    const sources = YAML.parse(readFileSync('src/data/sources.yaml', 'utf8'))

    return (tree: Root, file: VFile) => {
        visit(tree,
            'link',
            (node: Link) => {
                // Ignore regular links
                if (!node.url.startsWith('@')) return

                // Get the child node and validate it.
                const source_id = node.url.substring(1)
                if (!source_id.match(/[\p{Lowercase_Letter}0-9-]+/u))
                    file.fail(`Invalid source id \`${source_id}\`: An source id must consist of lowercase letters, numbers and hyphens`, node, 'SourcesLinkReference')                
                const entry = sources[source_id];
                if (entry === undefined)
                    file.fail(`No such sources entry found: \`${source_id}\``, node, 'SourcesLinkReference')

                const url = entry.url ?? "javascript:void(0);"
                Object.assign(node, { ...node, url: url })
            }
        )
    }
}