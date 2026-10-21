import { defineMdastPlugin } from 'satteri'
import { htmlFromCharacter, htmlFromUSV, parseOption } from '../character.mts'

export default defineMdastPlugin({
    name: "character-directives",
    textDirective(node, ctx) {
        // Ignore other directives.
        if (node.name !== 'usv' && node.name !== 'char') return

        // Get the child node and validate it.
        const child = node.children.pop()
        if (child?.type !== 'text' && child?.type !== 'inlineCode'){
            const err = Error(`Missing value on \`:${node.name}\` directive.`)
            ctx.report({ message: err.message, node})
            throw err
        }

        // Read any attributes and convert to options for the html rendering calls.
        let attrs = Object.keys(node.attributes || {})
        attrs = attrs.length ? attrs : ['usv', 'char', 'name']
        const options = Object.fromEntries(attrs.map((k) => [parseOption(k),true]))
        
        let rendered;
        try {
            switch (node.name) {
                case "usv": 
                    rendered = htmlFromUSV(ctx.textContent(child), options)
                    break
                case "char":
                    rendered = htmlFromCharacter(ctx.textContent(child), options)
                    break;
            }
        } catch (cause) {
            ctx.report({ message: `${cause}`, node: child})
            throw cause;
        }

        // Replace this directive node with an Html node.
        return { raw: rendered, mdxExpressions: false }
    }
}) 
