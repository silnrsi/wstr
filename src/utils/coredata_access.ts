// Utility functions to access the coredata SQLite database
import { db, characters, scripts, eq, sql } from 'astro:db';

const ERROR_INVALID_USV = '*** NO CHARACTER NAME FOUND FOR THIS USV ***';

async function getCharacterName(usv: string): Promise<string> {
  const usvInt = parseInt(usv, 16);
  if (isNaN(usvInt) || usvInt < 0 || usvInt > 0x10FFFF) {
    return ERROR_INVALID_USV;
  }

  const [result] = await db
    .select({ character_name: characters.character_name })
    .from(characters)
    .where(eq(characters.character_usv, usv))
    .limit(1);

  return result ? result.character_name : ERROR_INVALID_USV;
}
export { getCharacterName, ERROR_INVALID_USV };


// Return a CharacterObject
async function getCharacter(whereExpression: string = '', orderExpression: string = '__uid'): Promise<any> {
  const [result] = await db
    .select()
    .from(characters)
    .where(sql.raw(whereExpression))
    .orderBy(sql.raw(orderExpression))
    .limit(1);
  return result;
}
export { getCharacter };


// Return an array of ScriptObjects, optionally filtered and ordered
async function getScripts(whereExpression: string = '', orderExpression: string = 'script_code'): Promise<any[]> {
  const results = await db
    .select()
    .from(scripts)
    .where(sql.raw(whereExpression))
    .orderBy(sql.raw(orderExpression))

  return results;
}
export { getScripts };


// Return a ScriptObject for a given script code
async function getScriptByCode(code: string): Promise<any> {
  const [result] = await db
    .select()
    .from(scripts)
    .where(eq(scripts.script_code, code))
    .limit(1);

  return result;
}
export { getScriptByCode };
