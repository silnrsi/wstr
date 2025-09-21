import { parse } from 'csv-parse/sync';
import { readFile, stat } from 'fs/promises';
import { getTableName, getTableColumns, sql } from 'drizzle-orm';
import { db, characters, languages, scripts, dbUrl } from 'astro:db';
import { loadEnv } from 'vite';

const data_dir = 'src/data';

async function convert(table: any) {
	// Load csv file based on table name.
	const name = getTableName(table);
	const csv_path = `${data_dir}/${name}.csv`;

	// Read and parse the file in one go.
	const records = parse(await readFile(csv_path), {
		bom: true,
		trim: true,
		skip_empty_lines: true,
		columns: true,
	});
	
	await write_table(table, records);

	const n_records  = await db.$count(table);
	console.log(`\t${name}\t${n_records} records loaded.`)
}

// current fastest, 5.5s whole db.
const chunk_size = 256; // Determined emprically at the point where run stopped reducing.
async function write_table(table, records) {
	const queries = []
	while (records.length != 0) {
		let chunk = records.splice(0, chunk_size)
		queries.push(db.insert(table).values(chunk));
	}
	await db.delete(table);
	await db.batch(queries);
}

export default async function seed() {
	await convert(characters);
	await convert(languages);
	await convert(scripts);
}
