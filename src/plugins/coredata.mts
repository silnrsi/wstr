// Utility functions to access the coredata SQLite database
import {readFileSync } from 'fs'
import { parse } from 'csv-parse/sync';
import { parseUSV, type USV } from './usv.mts'

interface Character {
  character_charId:           string,
  character_usv:              string,
  character_name:             string,
  character_category:         string,
  character_direction:        string,
  character_pua:              string,
  character_unicodeStatus:    string,
  character_typicalForm:      string,
  character_unicodeVersion:   string,
}


function loadCharactersData(): Record<string, Character> {
  return Object.fromEntries(parse(readFileSync('src/data/characters.csv'), {
      bom: true,
      trim: true,
      skip_empty_lines: true,
      columns: true,
    })
    .map((r: any) => [parseUSV(r.character_usv), r as Character] ))
}


// Return a CharacterObject
export function getCharacter(usv: USV): Character | undefined {
  return characters[usv];
}

const characters = loadCharactersData();
