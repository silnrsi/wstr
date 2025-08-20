---
title: Locale Data
description: Definition of locale data
sidebar:
    order: 1500
lastUpdated: 2025-08-08
---

## What is a Locale?

Locale, in the context of computing, is a collection of parameters that affect how information is expressed or presented to a particular group of users, generally distinguished from one another on the basis of language or location (usually country). 

In layman's terms, a locale is a category that is more specific than a language, containing also the script used for writing, the region in which the language is being used, and sometimes, even more specific variants, such as dialect. 

For example, English in the United States using Latin Script is a different locale from English in Great Britain using Latin Script. Similarly, Hindi in India written in Devanagari script is a different locale from Hindi in India written in Latin script. 

Locales are identified with a key called a [Language Tag][langtag]. This is a three-part key defined by [BCP 47][bcp47], which consists of the language, script, and region. For example, English in the United States using Latin Script would have a full tag of en-Latn-US. For the purposes of this page, it is enough to be able to recognize a tag; for more information on Language Tags themselves, see the [Language Tagging][langtag] page on this site.

## What is Locale Data?

Locale Data refers to the data needed to present a user from a specific locale with information that would be familiar to them. This includes, but is not limited to:
- Important vocabulary 
  - Names of countries, languages, scripts, currencies, days of the week, months of the year, units of measurement, time zones, etc.
- Date and time formatting 
  - Order of elements in a date (Day/Month/Year, Month/Day/Year, Year-Month-Day, etc), 24-hour time vs 12-hour time, etc. 
- Orthographic Data
  - Characters used to write this language, Direction of text (left-to-right or right-to-left), Characters (or combination of characters) used for headers when making an index, punctuation, etc.
- Numerical Data
  - Numerical system used in this locale, decimal marks (point, comma, etc), currency symbols, etc. 

Locale Data is stored within LDML (Local Data Markup Language) files, which are primarily hosted in the Unicode Common Locale Data Repository (CLDR). Companies that use data from the CLDR may supplement it or incorporate it into their own systems. This site will primarily focus on the CLDR and SLDR (SIL Locale Data Respository). Having locale data in the CLDR is an essential first step for a language to be recognized in the digital world. These repositories contain files written in LDML that define locale data for a wide range of locales. 

## More on this site: 

- [CLDR and SLDR][cldr-and-sldr]
- [LDML][ldml]

## More from External Sources:

- [UTR #35: "What is a Locale?"][uni-utr35-localedef]

[bcp47]: https://www.rfc-editor.org/rfc/bcp/bcp47.txt
[cldr-and-sldr]: /topics/writingsystems/cldr-and-sldr
[langtag]: /topics/writingsystems/language-tagging
[ldml]: /topics/writingsystems/ldml
[uni-utr35-localedef]: https://unicode.org/reports/tr35/#Locale
