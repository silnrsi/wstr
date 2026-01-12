// Utility functions to access the coredata SQLite database
import { db, characters, scripts, eq, sql } from 'astro:db';
import { USVtoString, type USV } from './usv.mts'

export const USVNotFound = 'no-character-data';
export type USVNotFound = typeof USVNotFound

export async function getCharacterName(usv: USV): Promise<string | USVNotFound> {
  const [result] = await db
    .select({ character_name: characters.character_name })
    .from(characters)
    .where(eq(characters.character_usv, USVtoString(usv)))
    .limit(1);

  return result ? result.character_name : USVNotFound;
}

// Return a CharacterObject
export async function getCharacter(whereExpression: string = '', orderExpression: string = '__uid'): Promise<any> {
  const [result] = await db
    .select()
    .from(characters)
    .where(sql.raw(whereExpression))
    .orderBy(sql.raw(orderExpression))
    .limit(1);
  return result;
}


// Return an array of ScriptObjects, optionally filtered and ordered
export async function getScripts(whereExpression: string = '', orderExpression: string = 'script_code'): Promise<any[]> {
  const results = await db
    .select()
    .from(scripts)
    .where(sql.raw(whereExpression))
    .orderBy(sql.raw(orderExpression))

  return results;
}

// Return a ScriptObject for a given script code
export async function getScriptByCode(code: string): Promise<any> {
  const [result] = await db
    .select()
    .from(scripts)
    .where(eq(scripts.script_code, code))
    .limit(1);

  return result;
}