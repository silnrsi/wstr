---
title: Language Tagging
description: Definition and use of language tags
sidebar:
    order: 1410
lastUpdated: 2025-08-04
---

### Introduction

Language tags are standardised identifiers for language information. They are used to identify a particular language and script, but they can be used to infer the orthography of a text, locale information, any variant used to write that language, or even a transcription.

### Using Language Tags

There are typically two key equivalent tags, the shortest tag and the full tag. In the case of English, the shortest tag is `en` and the full tag is `en-Latn-US`. These may be found in a `langtags.json` tag set in the `tag` and `full` fields. Users typically prefer to work with the shortest or minimal tag, while applications value the full tag because it contains all the information they need to do their work. Thus `en-Latn-US` describes all the key information about the orthography: it's language, script and region. Meanwhile users typically think: "I just want English, so `en`".

In the vast majority of cases, the two or three letter code is sufficient (for example, `aak` for Ankave, a language of Papua New Guinea, rather than `aak-Latn-PG` indicating the Latin script and the country of PNG). Some languages, however, can be written with multiple scripts (for example, `ahk` for Akha, which can be written in Latin, Thai or Myanmar scripts) and need multiple language tags (`ahk` for the primary Latin script usage, but also `ahk-Laoo` for the Lao script as used in Laos, `ahk-Thai` for the Thai script as used in Thailand, and `ahk-Mymr` for the Myanmar script as used in Myanmar).

The extensions mechanism for language tags also allow tags to be extended to specify such things as sort orders, transcription orthographies, etc. These are beyond the scope of langtags.json, but can have considerable impact. For example, `en-Latn-US-t-wsg` indicates that the text is in English but is derived from Gondi, for example via automated (or manual) translation. The text is still English (so `en` would be sufficient), but the tagger wanted to accentuate the derivative nature of the text from another language.

### Methods

SIL maintains a comprehensive list of language tags in the [langtags repository][langtags]. This includes the primary `langtags.json` file and a variety of other tools and useful resources. Information on making a maximal and minimal language tag is derived from various sources.

- `langtags.csv` is manually maintained. We have close cooperation with the Ethnologue script editor. Any new information on writing systems for a particular language in the Ethnologue is passed on to be included in the `langtags.csv` file and vice-versa.

A good overview on how to create a tag may be found here: [langtags descriptions][langtags-tagging].

The technical specification for the structure of a language tag is [BCP47][bcp47]. BCP47 makes reference to the [IANA Language Subtag registry][iana] that contains basic definitions for all the language tag subcomponents that require registering.

Since a language tag is designed around tagging text, it is best to think of a language tag as an orthography tag. At the orthography level, multiple tags may refer to the same thing. Thus `en`, `en-Latn`, `en-US`, and `en-Latn-US` can all be considered equivalent. It is difficult to work out what these equivalences are. For this there is a [json file available][json-ldml] which groups tags into tag sets based on their orthographic equivalence. A description of the fields is given here: [langtags.md][langtags-desc]. There is also a [python module given as a reference implementation][pypi], which is available on langtags on pypi.

### Problems

Given the importance of the standard, one might expect language tags to be stable. But they are not. If there is an orthography revision, the new orthography often takes over the primary tag set for that orthography, and if lucky, another tag will be created for the old orthography. For example, Germany regularly updates its orthography. Thus there is: `de-1901` for the 1901 orthography revision, and `de-1996` which is the current orthography revision. Thus before 1996, `de` would have been equivalent to `de-1901`, but after 1996 it became equivalent to `de-1996`. It is very difficult to ensure the long term future stability of the tagging of some text. Only when orthographies are reformed, and so two tags may be created, is there any hope.

Applications, therefore, need to provide the ability to change the tagging of data when necessary. For example, the ability to switch all occurrences of `de` to `de-1996` and then to reuse `de`.

While orthographies are in early development, which includes until they are standardised, and can take decades, the language tag is particularly unstable. It is only once there is enough literature or a large enough user community of a particular orthography revision, that issues of tag stability need to be considered.

### Standards

- [IANA Language Subtag Registry][iana] - this file is placed in the [sldrtool repo][sldrtool] and is available [here][iana-file].
   - ISO 639-1 (no files are directly used, IANA incorporates the changes)
   - [ISO 639-3][639-3] (no files are directly used, IANA incorporates the changes)
- [Ethnologue][ethnologue-codes] (`LanguageIndex.tab` is renamed `langindex.tab` and placed in [langtags/source][langindex].
   - [autonyms.csv][autonyms] is from the Ethnologue, but it is not publicly available for download from the Ethnologue.
- [ISO 15924][15924] script codes are used. However, no downloaded files are used, the information is manually added to `langtags.csv`.
   - A few of the script codes may need to be described.
     - Zyyy is used for when the script is unknown.
     - Zxxx is used for Sign languages.
     - Zzzz is used for unencoded scripts. In those cases a subtag indicates the script name. For example, `dag-Zzzz-GH-x-adinkra` indicates the Dagbani language in Ghana is using an unencoded script called Adinkra.
- ISO 3166-1 alpha-2 country codes are used. However, these are derived from the Ethnologue `LanguageIndex.tab` file which includes all the regions.
- We are in the process of incorporating [ROLV (Registry of Language Varieties) codes][rolv]. At this point these are processed as private subtags.
- During the build process of `langtags.json`, the sldr files are also used for testing purposes. Any language tags that are used in the sldr files should be added to `langtags.csv`. If the sldr file is incorrect, it should be corrected. 

[15924]: https://unicode.org/iso15924/iso15924-codes.html
[639-3]: https://iso639-3.sil.org/
[autonyms]: https://github.com/silnrsi/langtags/tree/master/source/autonyms.csv
[bcp47]: https://www.rfc-editor.org/bcp/bcp47.txt
[ethnologue-codes]: https://www.ethnologue.com/codes/
[iana]: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
[iana-file]: https://github.com/silnrsi/sldrtools/blob/master/lib/sldr/language-subtag-registry.txt
[json-ldml]: https://ldml.api.sil.org/langtags.json
[langindex]: https://github.com/silnrsi/langtags/tree/master/source/langindex.tab
[langtags]: https://github.com/silnrsi/langtags/blob/master/doc/tagging.md
[langtags-desc]: https://github.com/silnrsi/langtags/blob/master/doc/langtags.md
[langtags-tagging]: https://github.com/silnrsi/langtags/blob/master/doc/tagging.md
[pypi]: https://github.com/silnrsi/langtags/blob/master/lib/langtag/__init__.py
[rolv]: https://hisregistries.org/rolv/
[sldrtool]: https://github.com/silnrsi/sldrtools
