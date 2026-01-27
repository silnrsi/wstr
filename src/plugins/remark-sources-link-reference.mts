import { EXIT, SKIP, CONTINUE, visit } from 'unist-util-visit'
import type { Root, Link } from 'mdast'
import type { VFile } from 'vfile'
import * as YAML from 'yaml'
import { readFileSync } from 'node:fs'

const sources = YAML.parse(readFileSync('src/data/sources.yaml', 'utf8'))

/**
 * Create a reMark plugin configured as specified to generate links from the 
 * sources.yaml database. This plugin allows the use of
 * `[Link text](@source_id)` form links in markdown files that get their url
 * from an entry in the sources.yaml file indexed by the `source_id` key.
 *
 * @param {string | null | undefined} noLinkPrefix
 *  When a valid source entry is found that does not have a `url` field:
 *    if nullish: link to a null link the does nothing but is valid. 
 *    if defined: generate a broken link to site reltive URL
 *    `/${noLinkPrefix}/${source_id}`.
 * @returns {RemarkPlugin}
 */ 
export default function remarkSourcesLinkReference(noLinkPrefix?: string) {
    return () => {
        return (tree: Root, file: VFile) => {
            visit(tree,
                'link',
                (node: Link) => {
                    // Ignore regular links
                    if (!node.url.startsWith('@')) return

                    // Get the source id and validate it.
                    const source_id = node.url.substring(1)
                    if (!source_id.match(/[\p{Lowercase_Letter}0-9-]+/u))
                        file.fail(`Invalid source id \`${source_id}\`: An source id may consist of lowercase letters, numbers and hyphens`, node, 'SourcesLinkReference')
                        
                    const entry = sources[source_id];
                    if (entry === undefined)
                        file.fail(`No such sources entry found: \`${source_id}\``, node, 'SourcesLinkReference')

                    const url = entry?.url ?? noLinkPrefix ?  `${noLinkPrefix}${source_id}` : "javscript:void(0)"
                    Object.assign(node, { ...node, url: url })
                }
            )
        }
    }
}