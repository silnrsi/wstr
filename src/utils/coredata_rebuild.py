#!/usr/bin/env python3
import argparse
import csv
import os
import sqlite3
import sys
import time

# WSTR Core Data Rebuild Script
# Import CSV files into the coredata.sqlite database

# The TABLES_INFO isn't external to the script because JSON doesn't allow
# literal line breaks for ease of editing. We could use some other format.

# @todo Consider deleting the database everytime, if we can assume there are no
#       tables other than those listed in these schemas.

# Exit code constants
EXIT_SUCCESS = 0
EXIT_CSV_MISSING_FILE = 1
EXIT_CSV_MISSING_BOM = 2
EXIT_DB_SETUP_ERROR = 3
EXIT_DB_IMPORT_ERROR = 4
EXIT_DB_COMPACT_ERROR = 5
EXIT_DB_EXECUTE_ERROR = 6

DATA_PATH_PREFIX = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../src/data"))
DB_PATH_PREFIX = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../db/"))
TABLES_INFO = [
    {
        "table": "characters",
        "csv_file": os.path.abspath(os.path.join(DATA_PATH_PREFIX, "characters.csv")),
        "schema": """CREATE TABLE IF NOT EXISTS characters (
            __uid TEXT,
            character_charId TEXT PRIMARY KEY,
            character_usv TEXT,
            character_name TEXT,
            character_category TEXT,
            character_direction TEXT,
            character_pua TEXT,
            character_unicodeStatus TEXT,
            character_typicalForm TEXT,
            character_unicodeVersion TEXT
        );"""
    },
    {
        "table": "languages",
        "csv_file": os.path.abspath(os.path.join(DATA_PATH_PREFIX, "languages.csv")),
        "schema": """CREATE TABLE IF NOT EXISTS languages (
            __uid                    VARCHAR (36)  DEFAULT NULL,
            __parent_uid             VARCHAR (36)  DEFAULT NULL,
            language_code            VARCHAR (255) DEFAULT NULL,
            language_name            VARCHAR (255) DEFAULT NULL,
            language_alternateNames  MEDIUMTEXT,
            language_dialects        MEDIUMTEXT,
            language_status          VARCHAR (255) DEFAULT NULL,
            language_notes           MEDIUMTEXT,
            __display_name           VARCHAR (64)  DEFAULT NULL,
            language_code2           VARCHAR (255) DEFAULT NULL,
            language_printName       VARCHAR (255) DEFAULT NULL,
            __record_type            VARCHAR (10)  DEFAULT NULL,
            language_openTypeTags    VARCHAR (255) DEFAULT NULL,
            language_sortName        VARCHAR (255) DEFAULT NULL,
            language_retired         MEDIUMTEXT,
            language_inEthnologue    INTEGER       DEFAULT NULL,
            language_subjectTabFlags INTEGER       DEFAULT NULL,
            language_localNames      VARCHAR (255) DEFAULT NULL
        );"""
    },
    {
        "table": "scripts",
        "csv_file": os.path.abspath(os.path.join(DATA_PATH_PREFIX, "scripts.csv")),
        "schema": """CREATE TABLE IF NOT EXISTS scripts (
            __uid TEXT,
            __parent_uid TEXT,
            script_name TEXT,
            script_code TEXT PRIMARY KEY,
            script_type TEXT,
            script_family TEXT,
            script_direction TEXT,
            script_baseline TEXT,
            script_whiteSpace TEXT,
            script_features TEXT,
            script_typicalFont TEXT,
            script_alternateNames TEXT,
            script_numericCode TEXT,
            script_casing TEXT,
            script_diacritics TEXT,
            script_contextualForms TEXT,
            script_complexPos TEXT,
            script_reordering TEXT,
            script_splitGraphs TEXT,
            script_ligatures TEXT,
            __display_name TEXT,
            script_displayCode TEXT,
            script_openTypeTags TEXT,
            script_status TEXT,
            script_numericCodePlus TEXT,
            script_sortName TEXT,
            script_shortName TEXT,
            script_subjectTabFlags TEXT,
            script_sample TEXT
        );"""
    }
]

DB_FILE = os.path.abspath(os.path.join(DB_PATH_PREFIX, 'coredata.db'))

# Check all input files exist
def check_input_files():
    BOM = b'\xef\xbb\xbf'
    for info in TABLES_INFO:
        if not os.path.isfile(info["csv_file"]):
            print(f"CSV file not found for table: {info['table']}")
            sys.exit(EXIT_CSV_MISSING_FILE)
    # Check the CSV begins with a BOM
    for info in TABLES_INFO:
        with open(info["csv_file"], 'rb') as f:
            if f.read(3) != BOM:
                print(f"CSV file is missing BOM: {info['csv_file']}")
                sys.exit(EXIT_CSV_MISSING_BOM)


def check_import_needed():
    reasons = []
    # Rebuild is needed if the DB file doesn't exist
    database_exists = os.path.isfile(DB_FILE)

    newer_files = []
    if database_exists:
        # Rebuild is needed if any CSV file is newer than the DB file
        db_mtime = os.path.getmtime(DB_FILE)
        for info in TABLES_INFO:
            if os.path.getmtime(info["csv_file"]) > db_mtime:
                newer_files.append(info["csv_file"])
        if len(newer_files) > 0:
            reasons.append("one or more CSV files are newer than the database")

        # Rebuild is needed if the script is newer than the DB file
        script_mtime = os.path.getmtime(__file__)
        if script_mtime > db_mtime:
            reasons.append("the import script is newer than the database")
    else:
        reasons.append(f"database {DB_FILE} does not exist")

    return (not database_exists) or (len(reasons) > 0), reasons, newer_files


def create_db_and_tables():
    try:
        # Show a list of tables and files to process
        print("Tables and CSV files to process:")
        for info in TABLES_INFO:
            print(f" - {info['table']:15}   {info['csv_file']}")

        db_existed = os.path.isfile(DB_FILE)
        if not db_existed:
            print(f"Creating database file: {DB_FILE}")
            open(DB_FILE, 'a').close()

        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        if db_existed:
            print("Deleting existing tables, refreshing schemas and recreating tables")
        else:
            print("Creating tables")
        for info in TABLES_INFO:
            if db_existed:
                print(f" - Deleting table: {info['table']}")
                cursor.execute(f"DROP TABLE IF EXISTS {info['table']}")
            print(f" - Creating table: {info['table']}")
            cursor.execute(info["schema"])
        # Vacuum to clean up after dropping tables
        print("Optimising database with VACUUM")
        cursor.execute("VACUUM")
        conn.commit()
        conn.close()

    except Exception as e:
        print(f"Error creating database or tables: {e}")
        sys.exit(EXIT_DB_SETUP_ERROR)

def execute_sql(sql, params=()):
    # print(f"Executing SQL: {sql} | Params: {params}")
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute(sql, params)
        if cursor.description:
            result = cursor.fetchone()[0]
        else:
            result = None
        conn.commit()
        conn.close()
        return result
    except Exception as e:
        print(f"Error executing SQL: {e}")
        sys.exit(EXIT_DB_EXECUTE_ERROR)

def import_csv_to_table():
    print("Importing CSV files into database tables:")
    print(f"   {'Table':15} {'Records':>8}")
    print(f"   {'-'*15} {'-'*8}")
    for info in TABLES_INFO:
        table = info["table"]
        csv_file = info["csv_file"]
        if not os.path.isfile(csv_file):
            print(f"CSV file not found for table: {table}")
            sys.exit(EXIT_CSV_MISSING_FILE)
        try:
            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            with open(csv_file, newline='', encoding='utf-8') as f:
                reader = csv.reader(f)
                headers = next(reader)
                placeholders = ','.join(['?'] * len(headers))
                insert_sql = f"INSERT OR REPLACE INTO {table} ({','.join(headers)}) VALUES ({placeholders})"
                for row in reader:
                    cursor.execute(insert_sql, row)
            conn.commit()
            conn.close()
            # Display number of records in the table
            count = execute_sql(f"SELECT COUNT(*) FROM {table}")
            print(f"   {table:15} {count:8,}")
        except Exception as e:
            print(f"   Error importing CSV to table '{table}': {e}")
            sys.exit(EXIT_DB_IMPORT_ERROR)

def compact_database():
    try:
        execute_sql("VACUUM")
        # Show database size in MB
        size = os.path.getsize(DB_FILE) / (1024 * 1024)
        print(f"Database compacted, size: {size:.3f}MiB")
    except Exception as e:
        print(f"Error compacting database: {e}")
        sys.exit(EXIT_DB_COMPACT_ERROR)

def main():
    start_time = time.time()
    parser = argparse.ArgumentParser(description="Import CSV files into the coredata.sqlite database.")
    parser.add_argument('--files', action='store_true', help='List the CSV files and exit.')
    parser.add_argument('--vacuum', action='store_true', help='Compact the database after import using VACUUM.')
    args = parser.parse_args()

    # Print name of script
    print(os.path.basename(__file__))
    if args.files:
        print("Configured CSV files:")
        for info in TABLES_INFO:
            print(f"{info['table']:20} {info['csv_file']}")
        sys.exit(EXIT_SUCCESS)
    else:
        check_input_files()
        import_needed, reasons, newer_files = check_import_needed()
        if import_needed:
            print(f"Rebuild is needed for the following reason{ 's' if len(reasons) > 1 else ''}:")
            for reason in reasons:
                print(f" - {reason}")
            if newer_files:
                print("The following files are newer than the database:")
                for f in newer_files:
                    print(f" - {f}")
            create_db_and_tables()
            import_csv_to_table()
            if args.vacuum:
                compact_database()
            execution_ms = int((time.time() - start_time) * 1000)
            print(f"Rebuild completed in {execution_ms}ms")
            sys.exit(EXIT_SUCCESS)
        else:
            print("No rebuild of coredata needed.")
            sys.exit(EXIT_SUCCESS)

if __name__ == "__main__":
    main()
