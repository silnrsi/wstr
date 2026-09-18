// Utility functions to access the coredata SQLite database
import {readFileSync } from 'fs'
import { parse } from 'csv-parse/sync';
import { parseUSV, type USV } from './usv.mts'

type GeneralCategory = "Lu" |  "Ll" |  "Lt" |  "LC" |  "Lm" |  "Lo" |  "L" 
                     |  "Mn" |  "Mc" |  "Me" |  "M" 
                     |  "Nd" |  "Nl" |  "No" |  "N" 
                     |  "Pc" |  "Pd" |  "Ps" |  "Pe" |  "Pi" |  "Pf" |  "Po" |  "P" 
                     |  "Sm" |  "Sc" |  "Sk" |  "So" |  "S" 
                     |  "Zs" |  "Zl" |  "Zp" |  "Z" 
                     |  "Cc" |  "Cf" |  "Cs" |  "Co" |  "Cn" | "C"

type BidiClass =  
  // Strong types
  "L" |  "R" |  "AL"
  // Weak Types
  | "EN" |  "ES" |  "ET" |  "AN" |  "CS" |  "NSM" |  "BN"
  // Neutral Types
  | "B" |  "S" |  "WS" |  "ON"
  // Explicit Formatting Types
  | "LRE" |  "LRO" |  "RLE" |  "RLO" |  "PDF" |  "LRI" |  "RLI" |  "FSI" |  "PDI"

 interface Character {
  readonly usv: USV,
  readonly name: string,
  readonly general_category: GeneralCategory,
  readonly canonical_combining_class: number,
  readonly bidi_class: BidiClass,
  readonly decomposition: string,
  readonly numeric: [number, number, number],
  readonly bidi_mirrored: "Y" | "N",
  readonly unicode_1_name: string,
  readonly iso_comment_field: string,
  readonly simple_uppercase: string,
  readonly simple_lowercase: string,
  readonly simple_titlecase: string,
}

function* characterRange(first: USV, last: USV, character: Character) {
  for (let usv = first; usv <= last; ++usv)
    yield ([usv, {...character, usv: usv}] as [USV, Character])
}

function loadCharactersData(): Map<USV, Character> {
  let ranges: ReturnType<typeof characterRange>[] = []
  let first: USV = 0
  console.time('load_ucd')
  let ucd: [USV, Character][] = parse(readFileSync('src/data/UnicodeData.txt'), {
      bom: true,
      trim: true,
      skip_empty_lines: true,
      group_columns_by_name: true,
      columns: ['usv', 'name', 'general_category', 'canonical_combining_class', 'bidi_class', 'decomposition', 'numeric', 'numeric', 'numeric', 'bidi_mirrored', 'unicode_1_name', 'iso_comment_field', 'simple_uppercase', 'simple_lowercase', 'simple_titlecase'],
      delimiter: ';',
      on_record: (r: any, _ctx) => {
        const [name, pos] = r.name.split(', ')
        r.usv = parseUSV(r.usv)
        r.canonical_combining_class = Number(r.canonical_combining_class)
        r.numeric = r.numeric.map(Number)
        const c = r as Character
        switch (pos) {
          case 'First>':
            first = c.usv
            return null
          case 'Last>':
            r.name = name.substring(1)
            ranges.push(characterRange(first, c.usv, c))
            return null
          default:
            return [c.usv, r]
        }
      }
    }
  )

  const res = new Map([...ucd, ...ranges.flatMap(r => Array.from(r))])
  console.timeEnd('load_ucd')

  return res
}


// Return a CharacterObject
export function getCharacter(usv: USV): Character | undefined {
  return characters.get(usv);
}

const characters = loadCharactersData();
