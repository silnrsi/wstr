import csv

def writeString(outFile, label, value):
	if value != '':
		outFile.write("  " + label + ": " + value + "\n")
		
def writeQuoted(outFile, label, value):
	if value != '':
		outFile.write("  " + label + ": \"" + value + "\"\n")
		
def writeNumeric(outFile, label, value):
	if value != "":
		if value.isdigit():
			outFile.write("  " + label + ": '" + value + "'\n")
		else:
			writeString(outFile, label, value)
			
def wrapText(value):
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
		value = value.replace("[CR]", "\n")
		value = value.replace("(CR)", "\n")
		valueWrapped = wrapText(value)
		outFile.write("  " + label + ": >-\n")
		for t in valueWrapped:
			outFile.write("    " + t + "\n")
		
def writeList(outFile, label, value):
	if value != "":
		outFile.write("  " + label + ": [" + value + "]\n")


def convert_csv(inFilePath, outFilePath):
	"""
	Convert CSV data to YAML format.
	"""

	outFile = open(outFilePath, 'w')
	outFile.write("")
	
	with open(inFilePath, 'r') as inFile:
		reader = csv.reader(inFile)
		for i, row in enumerate(reader):
			#print(row[0] + " " + row[2])
			
			if row[0] == "entrytype" or row[0] == "0":
				continue
			
			outFile.write(row[2] + ":\n")					# ID
			writeQuoted(outFile,	"entrytype",		row[0])
			writeQuoted(outFile,	"title",				row[3])
			writeString(outFile,	"author",				row[4])
			writeString(outFile,	"editor",				row[5])
			writeString(outFile,	"sortname",			row[6])
			writeQuoted(outFile,	"journaltitle",	row[7])
			writeQuoted(outFile,	"booktitle",		row[8])
			writeQuoted(outFile,	"series",				row[9])
			writeString(outFile,	"organization",	row[10])
			writeString(outFile,	"presort",			row[11])
			writeString(outFile,	"url",					row[12])
			writeNumeric(outFile,	"date",					row[13])
			writeNumeric(outFile,	"urldate",			row[14])
			writeString(outFile,	"isbn",					row[15])
			writeString(outFile,	"issn",					row[16])
			writeString(outFile,	"publisher",		row[17])
			writeQuoted(outFile,	"location",			row[18])
			writeNumeric(outFile,	"pages",				row[19])
			writeNumeric(outFile,	"volume",				row[20])
			writeNumeric(outFile,	"number",				row[21])
			writeList(outFile,		"keywords",			row[22])
			writeText(outFile,		"addendum",			row[23])
			writeText(outFile,		"abstract",			row[24])
			writeText(outFile,		"annotation",		row[25])
	return None


if __name__ == "__main__":

	convert_csv("sources-canonical.csv", "sources.yaml")

	print("Done")
