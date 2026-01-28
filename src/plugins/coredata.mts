// Utility functions to access the coredata SQLite database
import { db, characters, eq, sql } from 'astro:db';
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
