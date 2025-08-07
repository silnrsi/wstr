---
title: Unicode Concepts
description: Fundamental ideas and definitions for understanding Unicode
sidebar:
    order: 3300
lastUpdated: 2025-08-07
---

Placeholder: This could be mainly links for now, or portions from the listed Understanding Unicode chapters. 

Here are the main subtopics, some with info copied from WSBP.

## Blocks & Extensions

(Understanding Unicode ch 3)

## Transformation Formats

(Understanding Unicode ch 4, plus the complex annex!)

There are multiple ways that Unicode characters can be stored, or expressed as bytes. Given that a USV may be a number more than 255 (FF hexadecimal), we need a way of representing these bigger numbers in more than one byte. These are called *Unicode transformation formats*. There are advantages and disadvantages to each.

- UTF-32: 32 bits for each character
    - advantages: each character takes the same amount of space
    - disadvantages: lots of zero bytes, so uses a lot of room
- UTF-16: 16 bits for each character
    - advantages: each character in the BMP takes the same amount of space
    - disadvantages: characters above the BMP are represented by using two 16-bit "surrogate pairs"
- UTF-8: a character can take 1, 2, 3 or 4 8-bit bytes
    - advantages: most compact
    - disadvantages: variable number of bytes per character

There are well-defined (but non-trivial) algorithms defined for converting data among these formats. In all likelihood the programming language you are using has functions that will do this work.

**All text should be read and interpreted according to the proper encoding and transformation format.**

Resource: [Mapping codepoints to Unicode encoding forms](https://scriptsource.org/source/wynmmq6u9w)

Online comparison of formats: https://r12a.github.io/app-conversion/

## Principles & Compromises

(Understanding Unicode ch 5 & 6)

## Character Properties

(Understanding Unicode ch 7)

Now that we have all agreed how different characters are encoded, we can start to make assumptions about the text. Unicode does this by giving characters properties: Is a character a non-spacing mark? Lowercase? A digit (there are lots of sets of digits)? Right to left? These properties also have supporting algorithms for some key text processing activities, for example laying out text where some of it is in a right to left script like Arabic or Hebrew.

Every character has properties associated with it. Some scripts (such as Latin, Cyrillic, and Greek) have upper and lowercase characters, and a character’s Unicode property indicates whether it is uppercase, lowercase, or neither. Many scripts (such as Arabic and Devanagari) make no uppercase/lowercase distinction.

Other properties include whether a character is a combining character (such as a diacritic), how the character should be handled in a bi-directional display (when there is a mixture of left-to-right and right-to-left text), whether it functions as white space, and more.

Each character has a property indicating what script it belongs to (such as Latin, Arabic, Bengali, etc.) or whether it can be used for multiple scripts.

Some of these properties might be useful in your software, particularly script and case mappings. Low-level libraries called by your program may also make assumptions about characters based upon these properties. 

**It is important that characters are used in a way that is consistent with their properties**: for example, you would not want to mix up U+0410 "А" (with a Cyrillic script property) and U+0041 "A" (with a Latin script property).

Resource: [Unicode Character Properties spreadsheet](https://github.com/silnrsi/unicode-resources/tree/main/ucd-spreadsheet)

### Glyph Similarities

The Unicode Standard does not unify letter shapes or characters across scripts (unless those characters are common to all, for example combining diacritics). Thus there is both a Latin "A" (U+0041 LATIN CAPITAL LETTER A) and a Cyrillic "А" (U+0410 CYRILLIC CAPITAL LETTER A). A font supporting both Latin and Cyrillic scripts might use the exact same glyph to display both of these Unicode characters. 

The existence of these "confusable" characters also offers the possibility of deliberate, malicious attempts to deceive users. 

**You will do your users a great service if your software can warn users when they use a character from a different script.**

Resource: [Dotless letters and movable combining marks](https://scriptsource.org/entry/k3fmzy7abd), 

https://util.unicode.org/UnicodeJsps/confusables.jsp

Ref: Unicode's Where is my Character? site: https://www.unicode.org/standard/where/

## Case Mappings

(Understanding Unicode ch 7.4)

## (De)Composition & Normalization

(Understanding Unicode ch 7.5 (& 6? & 10?))

Unicode was originally designed to round trip to many of the smaller standards of the day. This means that some "composed characters" have two ways of being stored in Unicode, either as a single code that can be roundtripped to a smaller standard, or a sequence of a base and diacritic.

For instance, the following are two ways of representing the same data:

- á U+00E1 - LATIN SMALL LETTER A WITH ACUTE
- a U+0061 - LATIN SMALL LETTER A  +  ́ U+0301 - COMBINING ACUTE ACCENT

They are "canonically equivalent", that is, they both represent the same item and your software should treat them as identical (for example, when searching text). Fortunately most programming languages have functions available to convert between these forms.

Unicode defines normalization forms, with specific rules on how to create them. The most common forms are:

* Normalization Form Composed (NFC)
* Normalization Form Decomposed (NFD)

In NFD, each component has a separate code point. In NFC, components will be combined, provided a composite character exists in Unicode, according to specific algorithms. In the example above, the first sequence is NFC and the second is NFD. 

In many cases, the NFC and NFD forms are identical. For example, U+0254 U+0301 is the "open o" character with an acute accent. Since there is no composite character for "open o with acute" in Unicode, this sequence is already as composed as possible.

NFC often provides the most compact storage. NFD may provide advantages for working with the data, since each component is a separate character. **Applications should not assume any normalization on data input unless it controls the data source, and should generally output data in NFC.** See [To compose or decompose: that is the question](https://scripts.sil.org/cms/scripts/page.php?id=nfc_vs_nfd&site_id=nrsi).

Resources:

[Precomposed Characters in Unicode](https://scriptsource.org/entry/r8cbwvep6z)

Ref: 

Video (27min) "Why Determining the Length of a String is More Complicated Than You Think" (IUC 44, Oct 2020 presentation) ([https://www.youtube.com/watch?v=wCExnGiMeF0](https://www.youtube.com/watch?v=wCExnGiMeF0))

Ref:

List of library resources for various programming languages.

## Rendering Behaviors

(Understanding Unicode ch 8)

## Canonical Ordering

(Understanding Unicode ch 9)

## Deprecation			

