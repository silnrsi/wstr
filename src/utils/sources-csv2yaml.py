# Convert a .CSV file containing WSTR Source items to YAML format
# Intended to be run from wstr/src/utils.
# The names of the files to process are hard-coded below.

import csv

def writeString(outFile, label, value):
	# Use quotes only if needed for special characters.
	if value == '':
		pass
	elif value.find('{') >= 0 or value.find('}') >= 0 or value.find('[') >= 0 or value.find(']') >= 0:
		writeQuoted(outFile, label, value)
	elif value.find(',') >= 0 or value.find('&') >= 0 or value.find('*') >= 0 or value.find('#') >= 0:
		writeQuoted(outFile, label, value)
	elif value.find('?') >= 0 or value.find('|') >= 0 or value.find('-') >= 0 or value.find('<') >= 0:
		writeQuoted(outFile, label, value)
	elif value.find('>') >= 0 or value.find('=') >= 0 or value.find('!') >= 0 or value.find('%') >= 0:
		writeQuoted(outFile, label, value)
	elif value.find('@') >= 0 or value.find(':') >= 0:
		writeQuoted(outFile, label, value)
	else:
		outFile.write("  " + label + ": " + value + "\n")
		
def writeQuoted(outFile, label, value):
	if value != '':
		value = value.replace('"', '\\"')
		outFile.write("  " + label + ": \"" + value + "\"\n")
		
def writeNumeric(outFile, label, value):
	if value != "":
		if True:  # value.isdigit() - no, always surround with quotes
			outFile.write("  " + label + ": \"" + value + "\"\n")	# could use single quote
		else:
			writeString(outFile, label, value)

def writeNoQuotes(outFile, label, value):
	if value != '':
		outFile.write("  " + label + ": " + value + "\n")
			
def wrapText(value):  # currently unused
	result = []
	paras = value.split("\n")
	for i in range(len(paras)):
		pVal = paras[i]
		#print(str(i) + ": " + pVal)
		while len(pVal) > 100:
			iBreak = 100
			#print("next: " + pVal)
			# find a good break before character 100
			while iBreak > 0 and pVal[iBreak] != ' ':
				iBreak = iBreak - 1
			subStr = pVal[0:iBreak]
			#print(str(iBreak) + " - " + subStr)
			result.append(subStr)
			pVal = pVal[iBreak+1:]
		result.append(pVal)  # the last bit
	return result
			
def writeText(outFile, label, value):
	if value != "":
		# value = value.replace("[CR]", "\n")  # leave these as-is for now
		# value = value.replace("(CR)", "\n")

		#valueWrapped = wrapText(value)  # not wrapping for now

		outFile.write("  " + label + ": >-\n")
		paras = value.split("\n")
		for i in range(len(paras)):
			pVal = paras[i]
			pVal2 = pVal.replace('"', '\\"')  # escape double-quotes
			outFile.write("    \"" + pVal2 + "\"\n")
		
def writeList(outFile, label, value):
	if value != "":
		outFile.write("  " + label + ": [" + value + "]\n")


def convert_csv(inFilePath, outFilePath):
	"""
	Convert CSV data to YAML format.
	"""

	outFile = open(outFilePath, 'w')
	outFile.write("")

	outFile.write("# yaml-language-server: $schema=file:/workspaces/wstr-sample-site/src/data/sources-schema.yaml\n")
	outFile.write("# src/data/sources.yaml\n")
	outFile.write("---\n")
	
	with open(inFilePath, 'r') as inFile:
		reader = csv.reader(inFile)
		for i, row in enumerate(reader):
			#print(row[0] + " " + row[2])
			
			if row[0] == "entrytype" or row[0] == "0":
				continue
			
			outFile.write(row[2] + ":\n")							# ID
			writeString(outFile,	"entrytype",		row[0])
			writeString(outFile,	"entrysubtype",		row[1])
			writeString(outFile,	"title",			row[3])
			writeString(outFile,	"author",			row[4])
			writeString(outFile,	"editor",			row[5])
			writeString(outFile,	"sortname",			row[6])
			writeString(outFile,	"journaltitle",		row[7])
			writeString(outFile,	"booktitle",		row[8])
			writeString(outFile,	"series",			row[9])
			writeString(outFile,	"organization",		row[10])
			writeString(outFile,	"presort",			row[11])
			writeNoQuotes(outFile,	"url",				row[12])
			writeNumeric(outFile,	"date",				row[13])
			writeNumeric(outFile,	"urldate",			row[14])
			writeNoQuotes(outFile,	"isbn",				row[15])
			writeNoQuotes(outFile,	"issn",				row[16])
			writeString(outFile,	"publisher",		row[17])
			writeString(outFile,	"location",			row[18])
			writeNoQuotes(outFile,	"pages",			row[19])
			writeNumeric(outFile,	"volume",			row[20])
			writeNumeric(outFile,	"number",			row[21])
			writeList(outFile,		"keywords",			row[22])
			writeString(outFile,	"addendum",			row[23])
			writeQuoted(outFile,	"abstract",			row[24])
			writeQuoted(outFile,	"annotation",		row[25])
	return None


if __name__ == "__main__":

	convert_csv("../data/sources-initial.csv", "../data/sources.yaml")

	print("Done")
