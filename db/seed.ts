"use strict"
import { srcDir } from 'astro:config/server';
import { parse } from 'csv-parse/sync';
import { readFile, copyFile, stat } from 'fs/promises';
import { getTableName } from 'drizzle-orm';
import { db, characters, languages, scripts, } from 'astro:db';

export default async function seed() {
	await convert(characters);
	await convert(languages);
	await convert(scripts);
}

async function convert(table: any) {
	// Load csv file based on table name.
	const name = getTableName(table);
	const csv_src = new URL(`${srcDir}data/${name}.csv`);

	// Read and parse the file in one go.
	const records = await readFile(csv_src)
	.then(content => parse(content, {
		bom: true,
		trim: true,
		skip_empty_lines: true,
		columns: true,
	}));

	await regenerate_table(table, records);
	console.info(`\t${name}: ${await db.$count(table)} records.`)
}

async function regenerate_table(table: any, records: any[]) {
	const queries: any = chunks(records, 512).map(c => db.insert(table).values(c));
	await db.delete(table);
	await db.batch(queries);
}

function* chunks(array: any[], size: number) {
	while (array.length !== 0) yield array.splice(0, size)
};
