---
title: Language Tagging
description: Definition and use of language tags
sidebar:
    order: 1410
lastUpdated: 2025-08-04
---

### Introduction

Language tags are standardised identifiers for language information. They are primarily used to identify a particular [Locale][locale page], specifically language and script, but can also be used to infer the orthography of a text, locale information, any variant used to write that language, or even that the text is a transcription derived from a different locale.

### Interpreting Language Tags

#### Minimal and Maximal Tag Equivalents

There are typically two key equivalent tags, the shortest (minimal) tag and the full (maximal) tag. In the case of English, the shortest tag is `en` and the full tag is `en-Latn-US`. These may be found in a `langtags.json` tag set in the `tag` and `full` fields. Users typically prefer to work with the shortest or minimal tag, while applications value the full tag because it contains all the information they need to do their work. Thus `en-Latn-US` describes all the key information about the locale: its language, script and region. Meanwhile users typically think: "I just want English, so `en`".

In the vast majority of cases, the two or three letter language code is sufficient (for example, `aak` for Ankave, a language of Papua New Guinea, rather than `aak-Latn-PG` indicating the Latin script and the country of PNG). Some languages, however, can be written with multiple scripts (for example, `ahk` for Akha, which can be written in Latin, Thai, or Myanmar scripts) and need multiple language tags (`ahk` for the primary Latin script usage, `ahk-Laoo` for the Lao script as used in Laos, `ahk-Thai` for the Thai script as used in Thailand, and `ahk-Mymr` for the Myanmar script as used in Myanmar).

Notice how Akha written in Latin script has the minimal tag `ahk`, not `ahk-Latn`. When there are multiple scripts used in a language, the most common script is encompassed by the language code on its own. As languages evolve, this designated "primary script" can change, which in turn will change the meaning of the language tag (see the section on [Tag Stability Problems][stability problems] below).

The extensions mechanism for language tags also allow tags to be extended to specify such things as sort orders, transcription orthographies, etc. These are beyond the scope of langtags.json, but can have considerable impact. For example, `en-Latn-US-t-wsg` indicates that the text is in English but is derived from Gondi, such as via automated (or manual) translation. The text is still English (so `en` would be sufficient), but the tagger wanted to accentuate the derivative nature of the text from another language.

#### Macrolanguages

Macrolanguages are a commonly misunderstood element of language tagging. A macrolanguage is a group of similar or related languages, with its own tag separate from the tags of the individual languages it refers to. For example, the macrolanguage `zh` (Chinese) contains nineteen microlanguages, including `cmn` (Mandarin Chinese), `yue` (Yue Chinese/Cantonese), `wuu` (Wu Chinese), `sjc` (Shaojiang Chinese), and more. 

However, many users do not know that the general term Chinese is divided into so many microlanguages. As such, they might ask for `zh` (Chinese) without realizing they need to be more specific. How is a program to know which of the 19 microlanguages they want?

To avoid this problem, each macrolanguage has an "encompassed microlanguage" that it defaults to. The microlanguage chosen for this role is usually the one with the most speakers. For this example, `cmn` (Mandarin Chinese) is the "encompassed microlanguage" of `zh`. 

This means that the tag `zh` and the tag `cmn` are considered canonically equivalent. If someone asks for `zh`, they will specifically recieve `cmn`. What's more, the fully minimal tag of an encompassed microlanguage uses the macrolanguage's code. Therefore, the minimal tag of `cmn` is actually `zh`. 

This tag equivalence is an extremely common point of confusion for users and developers alike. Many people ask, "Why can't I find `cmn` in langtags?" because they do not realize that `cmn` is listed as `zh`. Others ask, "How do we know which microlanguage this macrolanguage tag refers to?" 

The answer to the latter question is to check `langtags.json` itself. The field "tags" contains a list of every equivalent tag. For example, the entry for `zh-Hans-CH` lists `"cmn", "cmn-CN", "cmn-Hans", "cmn-Hans-CN", "zh", "zh-Hans", "zh-cmn", "zh-cmn-CN", "zh-cmn-Hans", "zh-cmn-Hans-CN"` in the "tags" field. This is the easiest way to check which microlanguage a macrolanguage tag refers to. 

#### Tag Stability Problems

Given the importance of the standard, one might expect language tags to be stable, but this is not the case. If there is an orthography revision, the new orthography often takes over the primary tag set for that orthography, and, in ideal circumstances, another tag will be created for the old orthography. For example, Germany regularly updates its orthography. Thus there is: `de-1901` for the 1901 orthography revision and `de-1996` for the current orthography revision. Thus before 1996, `de` would have been equivalent to `de-1901`, but after 1996, it became equivalent to `de-1996`. Therefore, it is very difficult to ensure the long term future stability of the tagging of many texts. Only when orthographies are officially reformed, allowing for the creation of two separate tags, is there any hope of consistency.

Applications, therefore, need to provide the ability to change the tagging of data when necessary. For example, the ability to switch all occurrences of `de` to `de-1996` and then to reuse `de` in its new context.

A language tag is particularly unstable while orthographies are in early development. This period lasts until the orthography is officially standardised, which can take decades. For this reason, issues of tag stability should be considered only once there is enough literature or a large enough user community of a particular orthography, whether new or a revision. 

### Methods

SIL maintains a comprehensive list of language tags in the [langtags repository][langtags]. This includes the primary `langtags.json` file and a variety of other tools and useful resources. Much of the information in `langtags.json` is drawn from industry standards, which are listed in the [Standards][langtag standards] section below.

In addition, `langtags.csv` is a manually maintained file that also feeds into `langtags.json`. We have close cooperation with the Ethnologue script editor. Any new information on writing systems for a particular language in the Ethnologue is passed on to be included in the `langtags.csv` file and vice-versa. This information is then used to build `langtags.json`. 

A good overview on how to create a tag may be found here: [langtags descriptions][langtags-tagging].

The technical specification for the structure of a language tag is [BCP47][bcp47]. BCP47 makes reference to the [IANA Language Subtag registry][iana] that contains basic definitions for all the language tag subcomponents that require registering.

#### Standards

- [IANA Language Subtag Registry][iana] - this file is placed in the [sldrtool repo][sldrtool] and is available [here][iana-file].
   - ISO 639-1 (no files are directly used, IANA incorporates the changes)
   - [ISO 639-3][639-3] (no files are directly used, IANA incorporates the changes)
- [Ethnologue][ethnologue-codes] `LanguageIndex.tab` is renamed `langindex.tab` and placed in [langtags/source][langindex].
   - [autonyms.csv][autonyms] is from the Ethnologue, but it is not publicly available for download from the Ethnologue.
- [ISO 15924][15924] script codes are used. However, no downloaded files are used, the information is manually added to `langtags.csv`.
   - A few of the script codes may need to be described.
     - Zyyy is used for when the script is unknown.
     - Zxxx is used for Sign languages.
     - Zzzz is used for unencoded scripts. In those cases a subtag indicates the script name. For example, `dag-Zzzz-GH-x-adinkra` indicates the Dagbani language in Ghana is using an unencoded script called Adinkra.
- ISO 3166-1 alpha-2 country codes are used. However, these are derived from the Ethnologue `LanguageIndex.tab` file which includes all the regions.
- We are in the process of incorporating [ROLV (Registry of Language Varieties) codes][rolv]. At this point these are processed as private subtags.
- During the build process of `langtags.json`, the SLDR files are also used for testing purposes. Any language tags that are used in the SLDR files should be added to `langtags.csv`. If the SLDR file is incorrect, it should be corrected. For more information on the SLDR, see the [CLDR and SLDR][sldr page] page on this site.

#### Referencing Langtags

Since a language tag is designed around tagging text, it is best to think of a language tag as an orthography tag. At the orthography level, multiple tags may refer to the same thing. Thus `en`, `en-Latn`, `en-US`, and `en-Latn-US` can all be considered equivalent. It is difficult to work out what these equivalences are. 

For this purpose, there is a [json file available through the LDML API][json-ldml] which groups tags into tag sets based on their orthographic equivalence. These tags also include a variety of fields giving additional data on the locale. A description of these fields is given here: [langtags.md][langtags-desc]. 

There is also a [python module given as a reference implementation][pypi], which is available on langtags on pypi. 

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
[sldr page]: /topics/writingsystems/cldr-and-sldr
[locale def]: /reference/glossary/#locale
[langtag standards]: /topics/writingsystems/language-tagging/#standards
[stability problems]: /topics/writingsystems/language-tagging/#tag-stability-problems