---
title: Language Tags
sidebar:
    order: 2599
---

## Introduction

Language tags are standardised identifier for language information. They are
used to identify the orthography of a text, locale information, languages, etc.
A good overview on how to create a tag may be found here:
[tagging.md](https://github.com/silnrsi/langtags/blob/master/doc/tagging.md).
The technical specification for the structure of a language tag is
[BCP47](https://www.rfc-editor.org/bcp/bcp47.txt). BCP47 makes reference to the
[IANALanguage Subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
that contains basic definitions for all the language
tag subcomponents that require registering.

Since a language tag is designed around tagging text, it is best to think of a
language tag as an orthography tag. At the orthography level, multiple tags may
refer to the same thing. Thus `en`, `en-Latn`, `en-US`, and `en-Latn-US` can all
be considered equivalent. It is difficult to work out what these equivalences
are. For this there is a json file available here:
https://ldml.api.sil.org/langtags.json
which groups tags into tag sets based on their orthographic equivalence. A
description of the fields is given here:
[langtags.md](https://github.com/silnrsi/langtags/blob/master/doc/langtags.md).
There is also a python module given as a reference implementation
[here](https://github.com/silnrsi/langtags/blob/master/lib/langtag/__init__.py),
which is available as langtag on pypi.

## Using Language Tags

There are typically two key equivalent tags, the shortest tag and the full tag.
In the case of English, the shortest tag is `en` and the full tag is
`en-Latn-US`. These may be found in a langtags.json tag set in the `tag` and
`full` fields. Users typically prefer to work with the shortest or minimal tag,
while applications value the full tag because it contains all the information
they need to do their work. Thus `en-Latn-US` describes all the key information
about the orthography: it's language, script and region. Meanwhile users
typically think: "I just want English, so `en`".

The extensions mechanism for language tags also allow tags to be extended to
specify such things as sort orders, transcription orthographies, etc. These are
beyond the scope of langtags.json, but can have considerable impact. For
example, `en-Latn-US-t-wsg` indicates that the text is in English but is derived
from Ghondi, for example via automated (or manual) translation. The text is
still English (so `en` would be sufficient), but the tagger wanted to accentuate
the derivative nature of the text from another language.

### Problems

Given the importance of the standard, one might expect language tags to be
stable. But they are not. If there is an orthography revision, the new
orthography often takes over the primary tag set for that orthography, and if
lucky, another tag will be created for the old orthography. For example, Germany
regularly updates its orthography. Thus there is: `de-1901` for the 1901
orthography revision, and `de-1996` which is the current orthography revision.
Thus before 1996, `de` would have been equivalent to `de-1901`, but after 1996
it became equivalent to `de-1996`. It is very difficult to ensure the long term
future stability of the tagging of some text. Only when orthographies are
reformed, and so two tags may be created, is there any hope.

Applications, therefore, need to provide the ability to change the tagging of
data when necessary. For example, the ability to switch all occurrences of `de`
to `de-1996` and then to reuse `de`.

While orthographies are in early development, which includes until they are
standardised, and can take decades, the language tag is particularly unstable.
It is only once there is enough literature or a large enough user community of a
particular orthography revision, that issues of tag stability need to be
considered.

