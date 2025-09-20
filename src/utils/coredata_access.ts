// Utility functions to access the coredata SQLite database
import { db, characters as chars, scripts, eq, sql } from 'astro:db';

// @todo Get db path from environment variable set in .env - currently returning undefined
const COREDATA_DB_PATH: string = process.env.COREDATA_DB_PATH as string || 'src/data/coredata.sqlite';
export { COREDATA_DB_PATH };
// console.log(`Using coredata DB path: '${COREDATA_DB_PATH}'`);

const ERROR_INVALID_USV = '*** NO CHARACTER NAME FOUND FOR THIS USV ***';

async function getCharacterName(usv: string): Promise<string> {
  const usvInt = parseInt(usv, 16);
  if (isNaN(usvInt) || usvInt < 0 || usvInt > 0x10FFFF) {
    return ERROR_INVALID_USV;
  }

  const [result] = await db
    .select({ character_name: chars.character_name })
    .from(chars)
    .where(eq(chars.character_usv, usv));

  return result ? result.character_name : ERROR_INVALID_USV;
}
export { getCharacterName, ERROR_INVALID_USV };


// Implement getScripts function
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
