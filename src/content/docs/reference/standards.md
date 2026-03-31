---
title: Standards
description: Standards
sidebar:
  order: 9200
lastUpdated: 2026-03-31
---
Many of the pages on this site will reference different standards. Below we list links to the various standards mentioned.

## Encoding

[ISO/IEC 10646][iso-10646] specifies the Universal Coded Character Set (UCS). It is intended to have the exact repertoire as is in The Unicode Standard. 

[The Unicode Standard][unicode] -- the standards body for the internationalization of software and services. 

## Languages

[ISO 639][iso-639] -- Code for individual languages and language groups. The first version of the standard, ISO 639-1, included a few hundred well-known languages that were identified by unique two-letter codes. ISO 639-2 included a larger number of languages, and began to use three-letter codes as well as the two-letter ones. [ISO 639-3][iso-639-3] is intended to be much more comprehensive and assigns each language a unique three-letter code. While ISO 639-1 is mostly obsolete, the ISO 639-2 standard continues to be used alongside of ISO 639-3, including the two-letter codes for languages that have been assigned them.

[ISO 639-3][iso-639-3] -- ISO 639 is the [International Organization for Standardization's][iso] registry of the languages of the world. It is comprised of living languages taken from SIL's [Ethnologue][ethnologue], as well as extinct, ancient, reconstructed, and artificial languages.

The current registry includes over 7,000 languages, each identified by a unique three-letter code. Languages are also assigned a name and a type (living, extinct, ancient, or constructed).

The standard distinguishes between individual and macrolanguages. A macrolanguage is a grouping of dialects that are closely enough related that they may be considered a single language for some purposes. For instance, the macrolanguage called Arabic (ara) consists of Standard Arabic (arb) as well as Egyptian Arabic (arz), Moroccan Arabic (ary), and several dozen other dialects. Similarly, the individual Central, Northern and Southern varieties of Kurdish (ckb, kmr and sdh, respectively) are grouped together into the Kurdish macrolanguage (kur).

If you would like to suggest improvements to the ISO 639-3, please submit data to the registrar per these instructions: [Submitting ISO 639-3 Change Requests][iso-639-3-change].

[Ethnologue][ethnologue] -- a catalog of every known living language still in use today. The living and recently extinct languages in [ISO 639-3][iso-639-3] correspond, with a very few exceptions, to the languages of the Ethnologue. The most significant difference between the two registries is that the ISO standard includes ancient, reconstructed, and artificial languages as well as those currently or recently in use. The Ethnologue defines additional categories for nearly extinct languages and those that are spoken only as a second language. The Ethnologue also includes extensive information gained from SIL's linguistic research.

[ROLV (Registry Of Language Varieties)][rolv] -- This registry defines standardized codes used for identifying the language varieties (sometimes called dialects) of the world.

## Scripts

[ISO 15924][iso-15924] -- The International Organization for Standardization (ISO) has appointed the Unicode Consortium as the Registration Authority for International Standard, *Codes for the representation of names of scripts*. Each script is identified by a name and four-letter code. These script codes are used in language tagging. Suggestions for additions and corrections can be made from the Unicode's [ISO 15924][iso-15924-contact] page.

## Regions

[ISO 3166][iso-3166]-- two-letter country codes are used in making a language tag.

[ISO 3166-1 Numeric][iso-3166-1] -- three-digit region codes are sometimes used when a country code is insufficient.

## Writing system support

[BCP 47 / IANA Language Subtag Registry][bcp47] -- A BCP 47 tag is a standard way of referencing a language, used widely in the computer industry. The tag structure has been standardized by the Internet Engineering Task Force (IETF) in Best Current Practice (BCP) 47; the subtags are maintained by the IANA Language Subtag Registry.

[OpenType Layout Tag Registry][oltr] -- OpenType Layout tag registry for Script tags, Language tags, Feature tags, and Baseline tags.

[CLDR (Unicode Common Locale Data Repository)][cldr] -- provides key building blocks for software to support the world’s languages, with the largest and most extensive standard repository of locale data available.

[bcp47]: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
[cldr]: https://cldr.unicode.org/
[ethnologue]: https://www.ethnologue.com/
[iso-10646]: https://en.wikipedia.org/wiki/Universal_Coded_Character_Set
[iso-15924]: https://unicode.org/iso15924/iso15924-codes.html
[iso-15924-contact]: http://unicode.org/iso15924/
[iso-3166-1]: https://en.wikipedia.org/wiki/ISO_3166-1_numeric
[iso-3166]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[iso-639-3]: https://iso639-3.sil.org/
[iso-639-3-change]: https://iso639-3.sil.org/code_changes/submitting_change_requests
[iso-639]: http://www.infoterm.info/standardization/iso_639_1_2002.php
[iso]: http://www.iso.org/iso/home.html
[oltr]: https://learn.microsoft.com/en-us/typography/opentype/spec/ttoreg
[rolv]: https://globalrecordings.net/en/rolv
[unicode]: https://www.unicode.org/main.html
