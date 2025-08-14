---
title: Unicode Concepts
description: Fundamental ideas and definitions for understanding Unicode
sidebar:
    order: 3300
lastUpdated: 2025-08-07
---

[Encoding][glo-encoding] refers to the process of representing information in some form. In computer systems, we encode written language by representing the [graphemes][glo-grapheme] or other **text elements** of the writing system in terms of sequences of [characters][glo-character], units of textual information within some system for representing written texts. These characters are in turn represented within a computer in terms of the only means of representation the computer knows how to work with: binary numbers.

A [character set encoding][glo-character-set-encoding] (or **character encoding**) is such a system for doing this. Any character set encoding involves at least these two components: a set of characters and some system for representing these in terms of the processing units used within the computer. 

Unicode is a standard encoding which is being developed to have a universal character set that covers all of the scripts in the world.

## Codepoints and the Unicode codespace

The Unicode coded character set is coded in terms of integer values, which are referred to in Unicode as Unicode scalar values (USVs). By convention, Unicode codepoints are represented in hexadecimal notation with a minimum of four digits and preceded with “U+”; so, for example, “U+0345”, “U+10345” and “U+20345”. Also by convention, any leading zeroes above four digits are suppressed; thus we would write “U+0456” but not “U+03456”.

Every character in Unicode can be uniquely identified by its codepoint, or also by its name. Unicode character names use only ASCII characters and by convention are written entirely in upper case. Characters are often referred to using both the codepoint and the name; e.g. U+0061 LATIN SMALL LETTER A. In discussions where the actual characters are unimportant or are assumed to be recognisable using only the codepoints, people will often save space and use only the codepoints. Also, in informal contexts where it is clear that Unicode codepoints are involved, people will often suppress the string “U+”. For clarity, this document will continue to use “U+”.

The Unicode codespace ranges from U+0000 to U+10FFFF. Borrowing terminology from ISO/IEC 10646, the codespace is described in terms of 17 [planes][glo-plane] of 64K codepoints each. Thus, Plane 0 includes codepoints U+0000..U+FFFF, Plane 1 includes codepoints U+10000..U+1FFFF, etc.

In the original design of Unicode, all characters were to have codepoints in the range U+0000..U+FFFF. In keeping with this, Plane 0 was set apart as the portion of the codespace in which all of the most commonly used characters were encoded, and is designated the Basic Multilingual Plane (BMP). The remainder of the codespace, Planes 1 to 1610, are referred to collectively as the Supplementary Planes. As space ran out in the BMP, not only ancient scripts, but modern characters and scripts have been encoded in the Supplementary Multilingual Plane (SMP).

There are gaps in the Unicode codespace: codepoints that are permanently unassigned and reserved as non-characters. These include the last two codepoints in each plane, U+*n*FFFE and U+*n*FFFF (where *n* ranges from 0 to 10<sub>16</sub>). These have always been reserved, and characters will never be assigned at these codepoints. One implication of this is that these codepoints are available to software developers to use for proprietary purposes in internal processing. Note, however, that care must be taken not to transmit these codepoints externally.

Unassigned codepoints can be reserved in a similar manner at any time if there is a reason for doing so. This has been done specifically in order to make additional codes available to programmers to use for internal processing purposes. Again, these should never appear in data.

There is another special range of 2,048 codepoints that are reserved, creating an effective gap in the codespace. These occupy the range U+D800..U+DFFF and are reserved due to the mechanism used in the UTF-16 encoding form (see [Chapter 2 of the Unicode Standard][uni-encoding-forms]). In UTF-16, codepoints in the BMP are represented as code units having the same integer value. The code units in the range 0xD800–0xDFFF, serve a special purpose, however. These code units, known as surrogate code units (or simply surrogates), are used in representing codepoints from Planes 1 to 16. As a result, it is not possible to represent the corresponding codepoints in UTF-16. Hence, these codepoints are reserved.

## Blocks & Extensions

Placeholder: 
- [Script blocks and the organisation of the Unicode character set][script-blocks]
- [Getting acquainted with Unicode characters and the code charts][characters-code-charts] 

## Transformation Formats

**All text should be read and interpreted according to the proper encoding and transformation format.**

Placeholder:
- [Unicode encoding forms and encoding schemes][encoding-forms]
- [Mapping codepoints to Unicode encoding forms][mapping-code-points]

[Online comparison of formats][code-converter]

## Principles & Compromises

Placeholder:
- [Which encoding is the right choice?][right-choice]
- [Byte order: Unicode encoding schemes][byte-order]

## Character Properties

Software creates the impression of understanding the behaviours of writing systems by attributing **semantic character properties** to encoded characters. These properties represent parameters that determine how various text processes treat characters. For example, the SPACE character needs to be handled differently by a line-breaking process than, say, the U+002C  COMMA character. Thus, U+0020 SPACE and U+002C COMMA have different properties with respect to line-breaking.

One of the distinctive strengths of Unicode is that the Standard not only defines a set of characters, but also defines a number of semantic properties for those characters. Unicode is different from most other character set encoding standards in this regard. In particular, this is one of the key points of difference between Unicode and ISO/IEC 10646.

In addition to the semantic properties, Unicode also provides reference algorithms for certain complex processes for which the correct implementation may not be self evident. In this way, the Standard is not only defining semantics properties for characters, but is also guiding how semantics should be interpreted. This has an important benefit for users in that it leads to more consistent behaviour between software implementations. There is also a benefit for software developers who are suddenly faced with supporting a wide variety of languages and writing systems: they are provided with important information regarding how characters in unfamiliar scripts behave.

**It is important that characters are used in a way that is consistent with their properties**

Placeholder:
- [Character semantics and behaviours][semantics]

Resource: [Unicode Character Properties spreadsheet][ucd-spreadsheet]

### Glyph Similarities

The Unicode Standard does not unify letter shapes or characters across scripts (unless those characters are common to all, for example combining diacritics). Thus there is both a Latin "A" (U+0041 LATIN CAPITAL LETTER A) and a Cyrillic "А" (U+0410 CYRILLIC CAPITAL LETTER A). A font supporting both Latin and Cyrillic scripts might use the exact same glyph to display both of these Unicode characters. 

The existence of these "confusable" characters also offers the possibility of deliberate, malicious attempts to deceive users. 

**You will do your users a great service if your software can warn users when they use a character from a different script.**

Resources: 
- [Dotless letters and movable combining marks][dotless-letters]
- [Unicode Utilities: Confusables][uni-confusables]
- [Unicode's Where is my Character?][uni-where-character]


## Case Mappings

Placeholder:
- [Uppercase, lowercase, titlecase and case mappings][casing]

## (De)Composition & Normalization

Unicode was originally designed to round trip to many of the smaller standards of the day. This means that some "composed characters" have two ways of being stored in Unicode, either as a single code that can be roundtripped to a smaller standard, or a sequence of a base and diacritic.

For instance, the following are two ways of representing the same data:

- á U+00E1 - LATIN SMALL LETTER A WITH ACUTE
- a U+0061 - LATIN SMALL LETTER A  +  ́ U+0301 - COMBINING ACUTE ACCENT

They are "canonically equivalent", that is, they both represent the same item and your software should treat them as identical (for example, when searching text). Fortunately most programming languages have functions available to convert between these forms.

Unicode defines normalization forms, with specific rules on how to create them. The most common forms are:

- Normalization Form Composed (NFC)
- Normalization Form Decomposed (NFD)

In NFD, each component has a separate code point. In NFC, components will be combined, provided a composite character exists in Unicode, according to specific algorithms. In the example above, the first sequence is NFC and the second is NFD. 

In many cases, the NFC and NFD forms are identical. For example, U+0254 U+0301 is the "open o" character with an acute accent. Since there is no composite character for "open o with acute" in Unicode, this sequence is already as composed as possible.

NFC often provides the most compact storage. NFD may provide advantages for working with the data, since each component is a separate character. **Applications should not assume any normalization on data input unless it controls the data source, and should generally output data in NFC.** See [To compose or decompose: that is the question][compose-decompose].

Resources:

- [Precomposed Characters in Unicode][precomposed]
- Video (27min) [Why Determining the Length of a String is More Complicated Than You Think][string-length] (IUC 44, Oct 2020 presentation)

Placeholder:
- [Character decomposition mappings][decomposition]
- [Normalization][normalization]

## Rendering Behaviors

Placeholder:
- [Rendering behaviours][rendering]
- [The Unicode Bidirectional Algorithm][unicode-bidi-algorithm]

## Canonical Ordering

Placeholder:
- [Combining marks and canonical ordering][canonical]

## Deprecation

Placeholder

_Portions of this content first appeared in [Guidelines for Writing System Support][wsig], copyright © 2003 UNESCO and SIL International._

[byte-order]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#1557eaf6
[canonical]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#6c203953
[casing]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#72b37972
[characters-code-charts]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#29876e62
[code-converter]: https://r12a.github.io/app-conversion/
[compose-decompose]: https://scripts.sil.org/cms/scripts/page.php?id=nfc_vs_nfd&site_id=nrsi
[decomposition]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#a9054ead
[dotless-letters]: https://scriptsource.org/entry/k3fmzy7abd
[encoding-forms]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#96f19a02
[glo-character-encoding-form]: /reference/glossary#charencform
[glo-character-set-encoding]: /reference/glossary#charsetenc
[glo-character]: /reference/glossary#char
[glo-grapheme]: /reference/glossary#grapheme
[glo-encoding]: /reference/glossary#enc
[glo-grapheme]: /reference/glossary#grapheme
[glo-plane]: /reference/glossary#plane
[mapping-code-points]: https://scripts.sil.org/cms/scripts/page.php?id=iws-appendixa&site_id=nrsi
[normalization]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#170d0d63
[precomposed]: https://scriptsource.org/entry/r8cbwvep6z
[rendering]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#8390955c
[right-choice]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#60b9249a
[script-blocks]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#e2cd27ff
[semantics]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#4c028a78
[string-length]: https://www.youtube.com/watch?v=wCExnGiMeF0
[ucd-spreadsheet]: https://github.com/silnrsi/unicode-resources/tree/main/ucd-spreadsheet
[unicode-bidi-algorithm]: /topics/encoding/unicode-bidi-algorithm
[uni-confusables]: https://util.unicode.org/UnicodeJsps/confusables.jsp
[uni-encoding-forms]: https://www.unicode.org/versions/latest/core-spec/chapter-2/#G13708
[uni-where-character]: https://www.unicode.org/standard/where/
[wsig]: https://scripts.sil.org/wsi_guidelines.html

