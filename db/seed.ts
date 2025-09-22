import { parse } from 'csv-parse/sync';
import { readFile, stat } from 'fs/promises';
import { getTableName, getTableColumns, sql } from 'drizzle-orm';
import { db, characters, languages, scripts } from 'astro:db';

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

	await regenerate_table(table, records);

	const n_records  = await db.$count(table);
	console.log(`\t${name}\t${n_records} records loaded.`)
}


function* chunks(array: any[], size: number) {
	while (array.length > 0) yield array.splice(0, size)
};

async function regenerate_table(table: any, records: any[]) {
	const queries: any = chunks(records, 512).map(records => db.insert(table).values(records));
	await db.delete(table);
	await db.batch(queries);
}

export default async function seed() {
	await convert(characters);
	await convert(languages);
	await convert(scripts);
}
