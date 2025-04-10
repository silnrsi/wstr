---
title: Language Tagging
description: Definition and use of langauge tags
slug: language-tags
sidebar:
    order: 1410
lastUpdated: 2025-03-24
---

One method of uniquely identifying writing systems is through the use of _language tags_. These not only identify particular languages but include or infer information on the script and any variant used to write that language.

A language tag may be as simple as the three-letter code for the language, or it may additionally include subtags to indicate the script used to write the language (if more than one script is used) or the region of the world (country) where the language is used (if the orthography is different).

In the vast majority of cases, the three letter code is sufficient (for example, "aak" for Ankave, a language of Papua New Guinea, rather than "aak-Latn-PG" indicating the Latin script and the country of PNG). Some languages, however, can be written with multiple scripts (for example, "ahk" for Akha, which can be written in Latin, Thai or Myanmar scripts) and need multiple language tags ("ahk" for the Latin case, but also "ahk-Thai" and "ahk-Mymr"). For more information see SIL's [langtags descriptions][langtags-tagging]

SIL maintains a comprehensive list of language tags in the [langtags repository][langtags]. This includes the primary `langtags.json` file and a variety of other tools and useful resources. Information on making a maximal and minimal language tag is derived from various sources.

- `langtags.csv` is manually maintained. We have close cooperation with the Ethnologue script editor. Any new information on writing systems for a particular language in the Ethnologue is passed on to be included in the `langtags.csv` file and vice-versa.
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) - this file is placed in [sldrtool repo](https://github.com/silnrsi/sldrtools) and is available [here](https://github.com/silnrsi/sldrtools/blob/master/lib/sldr/language-subtag-registry.txt). (LE:This makes no sense to me why it would not be in the langtags repo.)
   - ISO 639-1
   - [ISO 639-3](https://iso639-3.sil.org/) (no files are directly used, IANA incorporates the changes)
- [Ethnologue](https://www.ethnologue.com/codes/) (`LanguageIndex.tab` is renamed `langindex.tab` and placed in `langtags/source`
   - `autonyms.csv` is from the Ethnologue, but it is not publicly available for download from the Ethnologue.
- [ISO 15924](https://unicode.org/iso15924/iso15924-codes.html) script codes are used. However, no downloaded files are used, the information is manually added to `langtags.csv`.
   - A few of the script codes may need to be described.
     - Zyyy is used for when the script is unknown
     - Zxxx is used for Sign languages
     - Zzzz is used for unencoded scripts. In those cases a subtag indicates the script name
- ISO 3166-1 alpha-2 country codes are used. However, these are derived from the Ethnologue `LanguageIndex.tab` file which includes all the regions.
- We are in the process of incorporating [ROLV (Registry of Language Varieties) codes](https://hisregistries.org/rolv/). At this point these would be processed as private subtags.
- During the build process of `langtags.json`, the sldr files are also used for testing purposes. Any language tags that are used in the sldr files should be added to `langtags.csv`. If the sldr file is incorrect, it should be corrected. 

[langtags]: https://github.com/silnrsi/langtags/blob/master/doc/tagging.md
[langtags-tagging]: https://github.com/silnrsi/langtags/blob/master/doc/tagging.md