# Generate a YAML file containing data from ScriptSource entries from two CSV files
# Intended to be run from wstr/src/utils.
# The names of the files to process are hard-coded below.

import os
import csv
from datetime import date

csv.field_size_limit(10000000)

def add_quotes_if_needed(str):
	result = str
	if '{' in result or  '}' in result or '[' in result or ']' in result or ',' in result \
			or '&' in result or '*' in result or '#' in result or '?' in result or '|' in result \
			or '-' in result or '<' in result or '>' in result or '=' in result or '!' in result \
			or '%' in result or '@' in result or ':' in result:
		result = '"' + result + '"'
	return result


def generate_sources(path, inFname, inFnameContents):
	"""
	Generate WSTR sources from SS entry data in two spreadsheets.
	"""

	inFilePath = path + inFname
	inFilePathContents = path + inFnameContents

	#dateStr = date.today()
	#dateStr = dateStr.strftime("%Y-%m-%d")

	abstractDict = {}
	with open(inFilePathContents, 'r') as inFileContents:
		reader = csv.reader(inFileContents)
		for i, row in enumerate(reader):
			uid = row[0]
			#ss_url = row[1]
			#recordType = row[2]
			status = row[3]
			#title = row[4]
			filename = row[5]
			description = row[6]
			contents = row[7]

			if status == "source":
				# No entries have both contents and description.
				if contents != "":
					abstractDict[uid] = contents
				if description != "":
					abstractDict[uid] = description

	with open(inFilePath, 'r') as inFile:
		reader = csv.reader(inFile)

		outFileName = path + "entry_sources.yaml"
		outFile = open(outFileName, 'w')
		outFile.write("")

		for i, row in enumerate(reader):
			uid = row[0]
			#ss_url = row[1]
			#recordType = row[2]
			status = row[3]
			title = row[4]
			tags = row[5];
			#description = row[6];
			#contents = row[7];
			#fileName = row[8];

			if status == "source":
				key = row[25];
				entrytype = row[26];
				url = row[27];
				date = row[28];
				urldate = row[29];
				organization = row[30];
				presort = row[31];
				author = row[32];
				sortname = row[33];
				publisher = row[34];
				journaltitle = row[35];
				volume = row[36];
				number = row[37];
				pages = row[38];
				addendum = row[39];

				abstract = abstractDict[uid] if uid in abstractDict else ""

				title = add_quotes_if_needed(title)
				journaltitle = add_quotes_if_needed(journaltitle)

				abstract = abstract.replace('"', '\\"')

				outFile.write(key + ":\n")
				outFile.write("  entrytype: " + entrytype + "\n")
				outFile.write("  title: " + title + "\n")
				if author != "":
					outFile.write("  author: " + author + "\n")
				if url != "":
					outFile.write("  url: " + url + "\n")
				if date != "":
					outFile.write("  date: \"" + date + "\"\n")
				if urldate != "":
					outFile.write("  urldate: \"" + urldate + "\"\n")
				if organization != "":
					outFile.write("  organization: " + organization + "\n")
				if presort != "":
					outFile.write("  presort: " + presort + "\n")
				if sortname != "":
					outFile.write("  sortname: " + sortname + "\n")
				if publisher != "":
					outFile.write("  publisher: " + publisher + "\n")
				if journaltitle != "":
					outFile.write("  journaltitle: " + journaltitle + "\n")
				if volume != "":
					outFile.write("  volume: \"" + volume + "\"\n")
				if number != "":
					outFile.write("  number: \"" + number + "\"\n")
				if pages != "":
					outFile.write("  pages: " + pages + "\n")
				if tags != "":
					outFile.write("  keywords: [" + tags + "]\n")
				if addendum != "":
					outFile.write("  addendum: \"" + addendum + "\"\n")
				if abstract != "":
					outFile.write("  abstract: \"" + abstract + "\"\n")

# end of generate_sources()


if __name__ == "__main__":

	generate_sources("../data/", "entries-handfixed.csv", "entries-contents.csv")

	print("Done")
