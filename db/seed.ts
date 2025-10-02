"use strictest"
import { srcDir } from 'astro:config/server';
import { parse } from 'csv-parse/sync';
import { readFile } from 'fs/promises';
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

	let time = performance.now();
	// Read and parse the file in one go.
	const records = await readFile(csv_src)
	.then(content => parse(content, {
		bom: true,
		trim: true,
		skip_empty_lines: true,
		columns: true,
	}));

	await regenerate_table(table, records);
	time = (performance.now() - time);
	console.info(`\t${name}: ${await db.$count(table)} records in ${time.toFixed(0)} ms.`)
}

async function regenerate_table(table: any, records: any[]) {
	await db.batch([
		db.delete(table),
		...chunks(records, 64).map(c => db.insert(table).values(c))
	]);
}

function* chunks(array: any[], size: number) {
	while (array.length !== 0) yield array.splice(0, size)
};
