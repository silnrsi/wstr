# Generate WSTR articles from SS entries.
# Intended to be run from wstr/src/utils.
# The names of the files to process are hard-coded below.

import os
import csv
from datetime import date

csv.field_size_limit(10000000)

def filenameFromTitle(title):		# not used
	result = title.lower()
	result = result.replace(",", "")
	result = result.replace("..", "-")
	result = result.replace(".", "")
	result = result.replace("?", "")
	result = result.replace("'", "")
	result = result.replace('"', "")
	result = result.replace("(", "")
	result = result.replace(")", "")
	result = result.replace("u+", "u")
	result = result.replace("ó", "o")
	result = result.replace(" ", "-")
	result = result.replace("-the-", "-")
	result = result.replace("-a-", "-")
	result = result.replace("-an-", "-")
	result = result.replace("--", "-")
	return result


def generate_articles(path, inFname, inFnameContents):
	"""
	Generate WSTR articles from SS entry data in two spreadsheets.
	"""

	inFilePath = path + inFname
	inFilePathContents = path + inFnameContents

	dateStr = date.today()
	dateStr = dateStr.strftime("%Y-%m-%d")

	contentsDict = {}
	descrDict = {}
	fileDict = {}
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

			if status == "article":
				#print(uid)
				if contents != "":
					contentsDict[uid] = contents

			if status == "article-img":
				descrDict[uid] = description
				#fileDict[uid] = filename

	with open(inFilePath, 'r') as inFile:
		reader = csv.reader(inFile)

		outFileNameImgList = path + "SS2WSTR-imageFiles.txt"
		outFileImgList = open(outFileNameImgList, 'w')
		outFileImgList.write("")
		
		for i, row in enumerate(reader):
			uid = row[0]
			#ss_url = row[1]
			#recordType = row[2]
			status = row[3]
			title = row[4]
			tags = row[5];
			#description = row[6];
			#contents = row[7];
			fileName = row[8];

			artFileName = row[9]
			artCopyYears = row[10]
			artCopyHolder = row[11]
			artAuthor = row[12]
			artLicense = row[13]
			artLicenseUrl = row[14]
			artReference = row[15]

			imgFileName = row[16]
			imgCopyYears = row[17]
			imgCopyHolder = row[18]
			imgAuthor = row[19]
			imgLicense = row[20]
			imgLicenseUrl = row[21]
			imgAttribSite = row[22]
			imgAttribUrl = row[23]
			imgCaption = row[24]

			# contributor = row[40]
			# licenseExport = row[41]
			# copyExport = row[42]
			# attribExport = row[43]
			# publishDate = row[51]

			title = title.replace(": ", " - ")

			if status == "article" or status == "article-img":
				contents = contentsDict[uid] if uid in contentsDict else ""
				description = descrDict[uid] if uid in descrDict else ""

				#outFilePath = path + filenameFromTitle(title) + ".md"
				outFilePath = path + "generated/" + artFileName + ".mdx"

				oldPath = uid[0:2] + "/" + uid[2:4] + "/"
				slugInitial = artFileName[0:1]
				if slugInitial >= '0' and slugInitial <= '9':
					slugInitial = '0-9'
				newPath = "images/"

				print(title)

				outFile = open(outFilePath, 'w')
				outFile.write("")

				outFile.write("---\n")
				outFile.write("title: " + title + "\n")
				# if status == "article-img":
				# 	outFile.write("description: Image imported from ScriptSource entry [" + uid + "]\n")
				# else:
				# 	outFile.write("description: Article imported from ScriptSource entry [" + uid + "]\n")
				outFile.write("tags: [" + tags + "]\n" )
				outFile.write("lastUpdated: " + dateStr + "\n")
				outFile.write("---\n\n")

				hasAttrib = artAuthor != "" or artCopyYears != "" or artCopyHolder != "" or artLicense != "" \
					or imgCopyYears != "" or imgCopyHolder != "" or imgLicense != "" or imgAuthor != "" \
					or imgAttribSite != "" or imgAttribUrl != ""

				outFile.write("import CaptionText from '/src/components/CaptionText.astro';\n")
				if hasAttrib:
					outFile.write("import Attribution from '/src/components/Attribution.astro';\n")
				outFile.write("\n")

				if status == "article":
					contents = contents.replace("(CR)", "\n")

					imgCnt = 1

					# Replace image file names with names based on article filename.
					s = 0
					p = contents.find('](images/', s)
					while p > -1:
						p2 = contents.find(')', p + 9)
						fnameOld = contents[p+9:p2]
						bogus,e = os.path.splitext(fnameOld)
						fnameNew = artFileName + "-" + str(imgCnt) + e

						outFileImgList.write(oldPath + fnameOld + "|" + fnameNew + '\n')

						contents = contents.replace("images/"+fnameOld, newPath + fnameNew)
						contents = contents.replace('['+fnameOld+']', '['+fnameNew+']')
						s = p + 9 + len(fnameNew)
						imgCnt = imgCnt + 1
						p = contents.find('](images/', s)

					outFile.write(contents + "\n\n")

					if artReference != "" and artReference != "SIL":
						artReference = artReference.replace(" \"", " &#x201C;")
						artReference = artReference.replace("\"", "&#x201D;")
						artReference = artReference.replace(" '", " &#x2018;")
						artReference = artReference.replace("'", "&#x2019;")
						outFile.write("<CaptionText text='Reference: " + artReference + "'/>\n\n")

					if hasAttrib:
						outFile.write("<Attribution type='Article' copyyears='" + artCopyYears
							+ "' copyholder='" + artCopyHolder + "' author='" + artAuthor 
							+ "' license='" + artLicense + "' licenseUrl='" + artLicenseUrl + "'/>\n\n")
											
				# end of article
						
				elif status == "article-img":
					fnameOld = uid + "_" + fileName
					bogus,e = os.path.splitext(fnameOld)
					fnameNew = imgFileName
					outFile.write("![" + title + "](images/" + fnameNew + ")\n\n")

					outFileImgList.write(oldPath + fnameOld + "|" + fnameNew + '\n')

					if imgCaption != "":
						outFile.write("<CaptionText text='" + imgCaption + "'/>\n\n")

					description = description.replace("(CR)", "\n")
					if description != "":
						outFile.write(description + "\n\n")

					if hasAttrib:
						outFile.write("<Attribution type='Image' copyyears='" + imgCopyYears
							+ "' copyholder='" + imgCopyHolder + "' author='" + imgAuthor 
							+ "' license='" + imgLicense + "' licenseUrl='" + imgLicenseUrl 
							+ "' source='" + imgAttribSite + "' sourceurl='" + imgAttribUrl
							+ "'/>\n\n")
					
				# end of article-img

				outFile.write("<CaptionText text='This article formerly appeared on ScriptSource.'/>")

			#if i > 7:
			#	break

# end of generate_articles()


if __name__ == "__main__":

	generate_articles("../data/", "entries-handfixed.csv", "entries-contents.csv")

	print("Done")
