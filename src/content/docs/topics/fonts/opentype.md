---
title: OpenType
description: Features and lookups
sidebar:
  order: 5520
tags: [numerals, opentype, rendering, script-arab, script-beng, script-deva, script-gujr, script-guru, script-khmr, script-knda, script-mlym, script-mong, script-nkoo, script-orya, script-syrc, script-taml, script-telu]
lastUpdated: 2026-01-22
---

OpenType is a [smart-font](/reference/glossary#smartfont) technology that was developed by Microsoft and Adobe. It is the mostly widely-supported such system available today (less common systems are [Graphite](/reference/glossary#graphite) and [Apple Advanced Typography](/reference/glossary#aat)).

OpenType defines a set of font tables that include _rules_ to perform transformations on the stream of glyphs representing the text stream to be rendered. The rules are grouped into _lookups_ and the lookups are organized in terms of _features_.

Here are some general resources about OpenType:

- [Microsoft documentation][opentype-ms-documentation]
- [Wikipedia overview][wikipedia-opentype]
- [Opentype Cookbook][otcookbook]

## Standards

There are two primary standards that define the OpenType font format:

- [Microsoft OpenType Specification][opentype-spec-ms]
- ISO/IEC 14496-22: Information technology — Coding of audio-visual objects — Part 22: Open Font Format

The latter is an international standard that can be useful in some contexts, but it lags behind the Microsoft specification (by some years). Further, the latest version of the specification is not available for free unless one is a participant in one of various official ISO/IEC committees. As of this writing in 2025, the Fourth edition, dated 2019-01, is [downloadable for free][openfont-spec-iso-2019-01].

A third specification that can be helpful — and is actually referenced by the first two — is Apple's [TrueType Reference Manual][truetype-apple]. Specifically, Apple maintains the official list of 258 glyph names which fonts can identify by number instead of by spelling the names out. See the [OpenType `post` table][post-ms] for details. 

## Features

The following information on OpenType features is mainly intended for font and applications developers. For help with using font features in applications see [Using Font Features][sil-fonts-features] and [Using SIL Fonts on Web Pages][sil-fonts-web].

Font [features](/reference/glossary#feature) can be thought of as the switches that applications use to enable or disable specific rendering behavior implemented in a given font. OpenType features are identified by a 4-character alpha-numeric tag, and a registry of the agreed-upon tags is maintained within the OpenType specifications, for example [from Microsoft][feature-registry-ms]. For each tag, the registry describes the purpose of the feature and how it is intended to be used.

Font features fall into two broad categories: Features utilized by [shaping engines](/reference/glossary#shapingEngine) for a specific script and optional behavior that the user might want to enable or disable on any run of text.

### Features utilized by shaping engines for a specific script 

As an example, fonts supporting Arabic script will likely implement the `init` feature which the shaping engine turns on for every character in the text that is supposed to be rendered in its initial form. Similarly the shaping engine will turn on the `isol`, `medi`, or `fina` feature for each character that should be rendered in the isolate, medial, or final form, respectively.

These can often be recognized in the registry by text similar to:

> UI suggestion: Control of the feature should not generally be exposed to the user.

Normally, neither users nor application developers need to concern themselves with these features -- the text-drawing library that the application uses should set these features as required to achieve the needed rendering.

### Optional behavior that the user might want to enable or disable on any run of text

Sometimes referred to as _user-accessible_ features, examples include are _Discretionary Ligatures_ (`dlig`), _Small Capitals_ (`smcp`), _Lining Numerals_ (`lnum`), and _Swash Variants_. 

This type of feature can often be recognized in the registry by text similar to:

> Application interface: Discretionary feature: can be applied to glyph runs based on document markup, user control or other application criteria.

The Microsoft feature registry currently lists over 60 such discretionary features, so a lot of optional behaviors that font developers need are already covered. But what do font developers do if they want to implement an optional behavior that isn't addressed by the available registered features? This is where  _Stylistic Set_ (`ssXX`) and _Character Variant_ (`cvXX`) features are useful. 

#### Stylistic Sets and Character Variants

Feature tags in the range "ss01" to "ss20" are registered as Stylistic Set 1 through 20. Tags in the range "cv01" to "cv99" are registered as Character Variant 1 through 99. The registry does not describe _what_ these features are intended to do — it is up to the font developer to define and document that. 

When should a font developer use [Stylistic Sets][otspec-ss] and when should one use [Character Variants][otspec-cv]?

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

## Scripts and Languages

Within an OpenType font, features are organized by script and then language. This means that a font might apply a different set of rules to text that is in one script and langauge than for text in the same script but a different language, or text in a different script altogether. This allows a font developer to accommodate the differences in cultural preferences between language communities.

## User Interface considerations

For optional behaviors that a font developer may include, how does the user actually control whether the feature is enabled or disabled? Or, if the feature is a multi-valued Character Variant, how does the user control what value is set?

In a way similar to how application developers might allow the user to select, for example, a Bold (vs Regular) weight for a run of text, they should provide a way to enable/disable optional behaviors through OpenType languages and features. 

**We strongly encourage application developers to provide User Interface elements to give their users the ability to enable or disable optional behaviors.**  This will involve querying the font to discover the available features and, for Character Variant or Stylistic sets, any descriptive information that the font developer may have included within the font. For more information see [User Interface Strings][user-interface-strings]. 

**We strongly encourage application developers to associate a language tag with all text that is rendered** so that any language-specific behaviors in the font will be utilized.

## Language and feature interactions

_aka, English is just another language_

Generally speaking, authors of fonts have two ways to allow users to select variant or language-specific rendering:

- By setting up a _language table_ (Graphite) or _language systems_ (OpenType) in which language-specific rendering rules are coded.
- By defining user-selectable features (such as OpenType [Character Variants][otspec-cv] or [Stylistic Sets][otspec-ss]) that trigger specific behavior.

In fonts that implement both of these strategies, there is usually a relationship between them, something like _Selecting Language X is equivalent to enabling features A, B, and C._ This raises the question:

**What if a subgroup of language X users need all the features except for, say, feature C?**

Ideally they simply select language X and then turn off feature C.

Unfortunately, while this generally works for Graphite, it does _not_ work for OpenType since setting an OpenType feature to off (or zero) is the same as the feature not being selected at all; i.e., it cannot actually _undo_ the behavior already implemented by the language selection.

What this means is that any language group other than those covered by the default language behavior in the font are, in a sense, disadvantaged: the default language user can turn all font features on or off, but not so for the users of non-default languages. 

### Recommended approach

For any language-specific behavior that interacts with user features:

- Use a Character Variant (rather than Stylistic Set) for the feature. 
- Implement the Character Variant with an extra feature value that reverts the behavior back to default.

**Example**

Suppose you want a feature that displays an “open” variant of a particular set of characters (whatever “open” means), but there exist some languages that want this as the default shape.
Implement as follows:

- Choose a Character Variant, say “cv23”
- Implement the needed rules for the default and other languages -- some will leave the specific glyphs alone while others will substitute the “open” variants.
- When implementing cv23, implement two values:
  - cv23=1 selects the “open” variant
  - cv23=2 reverts the “open” variant (if present) back to the default (perhaps called “closed”)

## Lookup Orders

Internally, a font _feature_ is implemented as a collection of _lookups_ which each apply a collection of processing _rules_ to the string of glyphs that is being shaped. Since lookups intended to be run later will depend on the results prior lookups, a key consideration for font developers is understanding and controlling the order in which lookups are processed. 

So the question is: How can the developer know what the order in which lookups are processed?

The OpenType specification suggests that shaping software should:
> assemble all lookups from the set of chosen features, and apply the lookups in the order given in the LookupList table. (For fonts developed using [Adobe Feature File][adobe-fea] sourcecode, this will be the order that lookups appear in the FEA source.)

However in actual implementations this isn't how it is usually done. Instead, features are divided into sets, and the sets are processed in a specific order. Within a set, all the lookups associated with the included features are executed (in lookup order, which is the order the lookups are defined in the file) before moving on to the next set of features.

It is important, therefore, that font developers know how features are divided into sets, and the order in which these sets are executed. To complicate matters, this is:
- not always consistent among shaping engines
- script-specific, and
- not well documented.

The most useful information is gleaned by reading the Harfbuzz code[^1] since (a) the code is open source and thus accessible, and (b) Harfbuzz tries to be compatible with Microsoft's Uniscribe.

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

See also [Creating and supporting OpenType fonts for the Universal Shaping Engine][otdev-use]. 

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
[^1]: The Harfbuzz source is maintained [on Github][harfbuzz], and the pertinent information gleaned from the `collect_features` methods of the various shaper modules (`hb-ot-shape.cc`, `hb-ot-shape-complex-arabic.cc`, `hb-ot-shape-complex-arabic.cc`, etc.)


[opentype-ms-documentation]: https://learn.microsoft.com/en-us/typography/opentype/
[wikipedia-opentype]: https://en.wikipedia.org/wiki/OpenType
[otcookbook]: https://opentypecookbook.com/
[opentype-spec-ms]: https://learn.microsoft.com/en-us/typography/opentype/spec/
[openfont-spec-iso-2019-01]: https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec14496-22%7Bed4.0%7Den.pdf
[truetype-apple]: https://developer.apple.com/fonts/TrueType-Reference-Manual/index.html
[post-ms]: https://learn.microsoft.com/en-us/typography/opentype/spec/post
[sil-fonts-features]: https://software.sil.org/fonts/features/
[sil-fonts-web]: https://software.sil.org/fonts/webfonts/
[feature-registry-ms]: https://learn.microsoft.com/en-us/typography/opentype/spec/featuretags
[otspec-cv]: https://www.microsoft.com/typography/otspec/features_ae.htm#cv01-cv99
[otspec-ss]: https://www.microsoft.com/typography/otspec/features_pt.htm#ssxx
[user-interface-strings]: /topics/fonts/user-interface-strings
[adobe-fea]: https://github.com/adobe-type-tools/afdko/blob/develop/docs/OpenTypeFeatureFileSpecification.md
[harfbuzz]: https://github.com/harfbuzz/harfbuzz/tree/master/src
[otdev-use]: http://www.microsoft.com/typography/OpenTypeDev/USE/intro.htm

