---
title: Locale Data
description: Definition of locale data
sidebar:
    order: 1500
lastUpdated: 2025-07-11
---

### What is a Locale?

Locale, in the context of computing, is a collection of parameters that affect how information is expressed or presented within a particular group of users, generally distinguished from one another on the basis of language or location (usually country). 

In layman's terms, a locale is a category that is more specific than a language, containing also the script used for writing, the region in which the language is being used, and sometimes, even more specific variants, such as dialect. 

For example, English in the United States using Latin Script is a different locale from English in Great Britain using Latin Script. Similarly, Hindi in India written in Devanagari script is a different locale from Hindi in India written in Latin script. 

Locales are identified with a key called a [Language Tag][langtag]. This is a three-part key defined by [BCP 47][BCP 47], which consists of the language, script, and region. For example, English in the United States using Latin Script would have a full tag of en-Latn-US. For the purposes of this page, it is enough to be able to recognize a tag; for more information on Language Tags themselves, see the [Language Tagging][langtag] page on this site.

### What is Locale Data?

Locale Data refers to the data needed to present a user from a specific locale with information that would be familiar to them. This includes, but is not limited to:
- Important vocabulary 
  - Country, language, and script names, currency, days of the week and months of the year, units of measurement, time zones, etc
- Date and time formatting 
  - Are dates displayed as Day/Month/Year or Month/Day/Year? Do you use 24 hr time or 12 hr time?
- Orthographic Data
  - What characters do you use to write? What order are they sorted in? Are they written right-to-left or left-to-right? When making an index, what characters/combinations of characters would you use for headers? What about punctuation; what type of quotation marks do you use? 
- Numerical Data
  - What numerical system do you use? Do you mark your decimals with a point, comma, or something else entirely? How do you write currency information? How do you indicate a range? 

While many companies such as Meta and Microsoft often have their own internal systems for defining locale data, this site will primarily focus on the CLDR and SLDR. These repositories contain files written in LDML (Locale Data Markup Language) that define locale data for a wide range of locales. 

### More on this site: 

- [CLDR and SLDR][cldr and sldr]
- [LDML][ldml]

### More from External Sources:

- [UTR #35: "What is a Locale?"][unicodelocaledef]

[langtag]: /topics/writingsystems/language-tagging
[BCP 47]: https://www.rfc-editor.org/rfc/bcp/bcp47.txt
[cldr and sldr]: /topics/writingsystems/cldr-and-sldr
[ldml]: /topics/writingsystems/ldml
[unicodelocaledef]: https://unicode.org/reports/tr35/#Locale
