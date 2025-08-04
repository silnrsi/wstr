---
title: OpenType
description: Features and lookups
sidebar:
  order: 5520
lastUpdated: 2025-07-25
---

OpenType is a [smart-font](/reference/glossary#smartfont) technology that was developed by Microsoft and Adobe. It is the mostly widely-supoorted such system available today (less common systems are Graphite and AAT).

OpenType defines a set of font tables that include _rules_ to perform transformations on the stream of glyphs representing the text stream to be rendered. The rules are grouped into _lookups_ and the lookups are organized in terms of _features_.

Here are some general resources about OpenType:
* [Microsoft documentation](https://learn.microsoft.com/en-us/typography/opentype/)
* [Wikipedia overview](https://en.wikipedia.org/wiki/OpenType)

## Features

The following information on OpenType features is mainly intended for font and applications developers. For help with using font features in applications see [Using Font Features][sil-fonts-features] and [Using SIL Fonts on Web Pages][sil-fonts-web].

***(add explanation of types of features: Internal, default; User-controllable; Language-specific; Common (scmp, etc.); Stylistic Sets; Character variants. Below is some info copied from the FDBP.)***

### Stylistic Sets and Character Variants

Tags for Layout Feature tables which are in the range "ss01" to "ss20" are registered as Stylistic Set 1 through 20. Tags in the range "cv01" to "cv99" are registered as Character Variant 1 through 99.

When should one use [Stylistic Sets][otspec-ss] and when should one use [Character Variants][otspec-cv]?

According to the OpenType spec, Character Variants (`cvxx` tags) should be preferred when only one character or very closely related characters are affected. Examples include:

- matching lower and upper case characters
- a lower case character and its small capital form
- all characters that use a particular diacritic, where the diacritic has two forms

Stylistic Sets (`ssxx` tags) are preferred when systematically related changes affect more distinct characters. Examples include:

- 'barred b', 'barred d', and 'barred g' characters with different placements for the bar
- 'a' and 'g' characters with literacy forms

Having said that, there are some technical and practical distinctions that may require violating these guidelines:

- The `cvxx` tags can utilize `GSUB` “alternate” (type 3) lookups, thus allowing a feature to have more than on/off values.
- There are only 20 registered `ssxx` features, but 99 `cvxx` features.
- Some apps (MS Word for example) assume that users would need to turn on only one `ssxx` feature at a time.
- Not as many apps support `cvxx` (yet).

Note that only substitution type lookups are allowed in Stylistic Set and Character Variant features and the features must be in the `GSUB` table. There may be cases where variant positioning behavior is needed, such as a feature that controls whether a particular diacritic is drawn touching its base or separated from it. While it may seem reasonable to use positioning type lookups and place the features in the `GPOS` table, it is unlikely that rendering engines will actually process such features.

## Lookup Orders

The OpenType specification suggests that software should:
> assemble all lookups from the set of chosen features, and apply the lookups in the order given in the LookupList table. 

However in actual implementations this isn't how it is usually done. Instead, features are divided into sets, and the sets are processed in a specific order. Within a set, all the lookups associated with the included features are executed (in lookup order, which is the order the lookups are defined in the file) before moving on to the next set of features.

It is important, therefore, that font developers know how features are divided into sets, and the order in which these sets are executed. To complicate matters, this is:
- not always consistent among shaping engines
- script-specific, and
- not well documented.

The most useful information is gleaned by reading the Harfbuzz code[^1] since (a) the code is opensource and thus accessible, and (b) Harfbuzz tries to be compatible with Microsoft's Uniscribe.

The following tables attempt to document what the Harfbuzz code indicates for GSUB execution. Each row represents a set of features, each feature identified by its 4-character tag. All the lookups in the list of features in a row a processed together in lookup order. _userfeatures_ includes everything else that the user (or CSS) might have requested, such as dlig, ssxx, cvxx, smcp, onum, etc.

### Default shaper

| | |
|---|---|
|GSUB|rvrn|
||ltra ltrm frac numr dnom rand ccmp locl rlig calt clig liga rclt _userfeatures_|
|GPOS|mark mkmk curs kern _userfeatures_|

### USE shaper

| | |
|---|---|
|GSUB|rvrn|
|syllable analysis|ltra ltrm rtla rtlm frac numr dnom rand trak HARF
||locl ccmp nukt akhn|
||rphf|
||pref|
||rkrf abvr blwf half pstf vatu cjct|
|insert dotted circles, reorder|isol init med fina |
||abvs blws haln pres psts BUZZ ccmp locl rlig calt clig liga rclt vert _userfeatures_|
|GPOS|dist abvm blwm mark mkmk curs kern _userfeatures_|

### Arabic shaper

This includes Arabic, Mongolian, N'Ko, Syriac, and several other connected or cursive scripts.

| | |
|---|---|
|GSUB|rvrn|
||rtla rtlm frac numr dnom rand|
||stch|
||ccmp locl|
||isol|
||fina|
||fin2    (Syriac only)|
||fin3    (Syriac only)|
||medi|
||med2    (Syriac only)|
||init|
||rlig|
||rclt calt|
||mset clig liga _userfeatures_|
|GPOS|mark mkmk curs kern|

### Indic

| | |
|---|---|
|GSUB|rvrn|
||ltra ltrm frac numr dnom rand|
||ccmp locl|
||nukt|
||akhn|
||rphf|
||rkrf|
||pref|
||blwf|
||abvf|
||half|
||pstf|
||vatu|
||cjct|
||init pres abvs blws psts haln rlig calt clig rclt|
||_userfeatures_|
|GPOS|curs kern dist abvm blwm|

### Khmer

| | |
|---|---|
|GSUB|rvrn|
||ltra ltrm frac numr dnom rand|
||ccmp locl|
||pref blwf abvf|
||cfar|
||pres abvs blws psts rlig calt clig rclt _userfeatures_|
|GPOS|curs dist abvm blwm|



----
[^1]: The Harfbuzz source is maintained [on Github][harfbuzz], and the pertinent information gleaned from the  `collect_features` methods of the various shaper modules (`hb-ot-shape.cc`, `hb-ot-shape-complex-arabic.cc`, `hb-ot-shape-complex-arabic.cc`, etc.)

[harfbuzz]: https://github.com/harfbuzz/harfbuzz/tree/master/src
[otspec-cv]: https://www.microsoft.com/typography/otspec/features_ae.htm#cv01-cv99
[otspec-ss]: https://www.microsoft.com/typography/otspec/features_pt.htm#ssxx
[sil-fonts-features]: https://software.sil.org/fonts/features/
[sil-fonts-web]: https://software.sil.org/fonts/webfonts/