// Utility functions to access the coredata SQLite database

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

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

  const db = await open({
    filename: COREDATA_DB_PATH,
    driver: sqlite3.Database
  });

  const result = await db.get('SELECT character_name FROM characters WHERE character_usv = ?', usv);
  await db.close();

  return result ? result.character_name : ERROR_INVALID_USV;
}
export { getCharacterName, ERROR_INVALID_USV };


// Return a CharacterObject
async function getCharacter(whereExpression: string = '', orderExpression: string = ''): Promise<any> {
  const db = await open({
    filename: COREDATA_DB_PATH,
    driver: sqlite3.Database
  });

  // console.debug(`getCharacter called with whereExpression='${whereExpression}', orderExpression='${orderExpression}'`);
  const whereClause = whereExpression ? `WHERE ${whereExpression}` : '';
  const orderClause = orderExpression ? `ORDER BY ${orderExpression}` : '';
  const query = `SELECT * FROM characters ${whereClause} ${orderClause}`;
  const results = await db.all(query);
  // console.debug(`getCharacter query: ${query}, result count:`, results.length);
  await db.close();

  return results.length > 0 ? results[0] : null;
}
export { getCharacter };


// Return an array of ScriptObjects, optionally filtered and ordered
async function getScripts(whereExpression: string = '', orderExpression: string = 'script_code'): Promise<any[]> {
  const db = await open({
    filename: COREDATA_DB_PATH,
    driver: sqlite3.Database
  });

  const whereClause = whereExpression ? `WHERE ${whereExpression}` : '';
  const orderClause = orderExpression ? `ORDER BY ${orderExpression}` : '';
  const query = `SELECT * FROM scripts ${whereClause} ${orderClause}`;
  const results = await db.all(query);
  await db.close();

  return results;
}
export { getScripts };


// Return a ScriptObject for a given script code
async function getScriptByCode(code: string): Promise<any> {
  const db = await open({
    filename: COREDATA_DB_PATH,
    driver: sqlite3.Database
  });

  const result = await db.get('SELECT * FROM scripts WHERE script_code = ? LIMIT 1', code);
  await db.close();

  return result;
}
export { getScriptByCode };
