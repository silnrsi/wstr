// Render a character component to html
// Convert a USV or Unicode character to a sequence of HTML spans

import { getCharacter, getCharacterName, ERROR_INVALID_USV } from '../plugins/coredata.mts';

export type Option = "usv" | "char" | "name"

export interface Options {
    readonly usv?: true,
    readonly char?: true,
    readonly name?: true
}

function parseOption(text: string): Option {
    switch (text) {
        case "usv":
        case "char":
        case "name":
            return text
        default:
            var err = new RangeError(`invalid option: "${text}": An option must be either "usv", "char" or "name"`)
            Error.captureStackTrace(err, parseOption)
            throw err
    }
}

export function parseOptionsSequence(text: string): Option[] {
    return text.split(/\s*,\s*|\s+/).map(parseOption)
}

export async function htmlFromUSV(usv: string, options: Options) {
    const characterName = await getCharacterName(usv);
    if (characterName === ERROR_INVALID_USV) {
        throw new RangeError(`invalid USV: "${usv}": A USV must be between 0000 and 1fffff`);
    }

    // Concatenate the parts based on options, separated by spaces
    const parts = []
    if (options.usv) {
        parts.push(`<span class="uni-char-metadata">U+${usv}</span>`);
    }
    if (options.char) {
        // Decide whether we need to include a dotted circle with combining marks
        const info = await getCharacter(`character_usv = '${usv}'`);
        const dottedCircle = info?.character_category.startsWith('M') ? String.fromCodePoint(0x25CC) : ''
        parts.push(dottedCircle + String.fromCodePoint(parseInt(usv, 16)));
    }
    if (options.name) {
        parts.push(`<span class="uni-char-metadata">${characterName}</span>`);
    }
    return `<span class='character-component'>${parts.join(' ')}</span>`
}

export function htmlFromCharacter(char: string, options: Options) {
    const usv = char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')
    if (!usv) throw new RangeError(`A character must be a Unicode character, excluding whitespace, [,],{ and }.`)

    return htmlFromUSV(usv, options)
}
