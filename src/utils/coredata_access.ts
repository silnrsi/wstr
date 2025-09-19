// Utility functions to access the coredata SQLite database
import { db as db_, characters as chars, scripts, eq, sql } from 'astro:db';
import assert from 'node:assert/strict'

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

console.log(`DB at ${import.meta.env.ASTRO_DB_REMOTE_URL}`);

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

  const [result_] = await db_.select({ character_name: chars.character_name }).from(chars).where(eq(chars.character_usv, usv));
  const result = await db.get('SELECT character_name FROM characters WHERE character_usv = ?', usv);
  assert.deepEqual(result_, result);
  await db.close();

  return result ? result.character_name : ERROR_INVALID_USV;
}
export { getCharacterName, ERROR_INVALID_USV };


// Implement getScripts function
async function getScripts(whereExpression: string = '', orderExpression: string = 'script_code'): Promise<any[]> {
  const db = await open({
    filename: COREDATA_DB_PATH,
    driver: sqlite3.Database
  });

  const whereClause = whereExpression ? `WHERE ${whereExpression}` : '';
  const orderClause = orderExpression ? `ORDER BY ${orderExpression}` : '';
  const query = `SELECT * FROM scripts ${whereClause} ${orderClause}`;
  const results_ = await db_.select().from(scripts).where(sql.raw(whereExpression)).orderBy(sql.raw(orderExpression))
  const results = await db.all(query);
  // assert.deepEqual(results_, results);
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

  const [result_] = await db_.select().from(scripts).where(eq(scripts.script_code, code)).limit(1);
  const result = await db.get('SELECT * FROM scripts WHERE script_code = ? LIMIT 1', code);
  assert.deepEqual(result_, result);
  await db.close();

  return result;
}
export { getScriptByCode };
