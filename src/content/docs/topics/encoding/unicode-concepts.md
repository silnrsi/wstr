---
title: Unicode Concepts
description: Fundamental ideas and definitions for understanding Unicode
sidebar:
    order: 3300
lastUpdated: 2025-08-07
---

Placeholder: This could be mainly links for now, or portions from the listed Understanding Unicode chapters. 

Here are the main subtopics, some with info copied from WSBP.

**Encoding** refers to the process of representing information in some form. In computer systems, we encode written language by representing the **graphemes** or other **text elements** of the writing system in terms of sequences of **characters**, units of textual information within some system for representing written texts. These characters are in turn represented within a computer in terms of the only means of representation the computer knows how to work with: binary numbers.

A **character set encoding** (or **character encoding**) is such a system for doing this. Any character set encoding involves at least these two components: a set of characters and some system for representing these in terms of the processing units used within the computer. 

Unicode is a standard encoding which is being developed to have a universal character set that covers all of the scripts in the world.

## Codepoints and the Unicode codespace

The Unicode coded character set is coded in terms of integer values, which are referred to in Unicode as Unicode scalar values (USVs). By convention, Unicode codepoints are represented in hexadecimal notation with a minimum of four digits and preceded with “U+”; so, for example, “U+0345”, “U+10345” and “U+20345”. Also by convention, any leading zeroes above four digits are suppressed; thus we would write “U+0456” but not “U+03456”.

Every character in Unicode can be uniquely identified by its codepoint, or also by its name. Unicode character names use only ASCII characters and by convention are written entirely in upper case. Characters are often referred to using both the codepoint and the name; e.g. U+0061 LATIN SMALL LETTER A. In discussions where the actual characters are unimportant or are assumed to be recognisable using only the codepoints, people will often save space and use only the codepoints. Also, in informal contexts where it is clear that Unicode codepoints are involved, people will often suppress the string “U+”. For clarity, this document will continue to use “U+”.

The Unicode codespace ranges from U+0000 to U+10FFFF. Borrowing terminology from ISO/IEC 10646, the codespace is described in terms of 17 **planes** of 64K codepoints each. Thus, Plane 0 includes codepoints U+0000..U+FFFF, Plane 1 includes codepoints U+10000..U+1FFFF, etc.

In the original design of Unicode, all characters were to have codepoints in the range U+0000..U+FFFF. In keeping with this, Plane 0 was set apart as the portion of the codespace in which all of the most commonly used characters were encoded, and is designated the Basic Multilingual Plane (BMP). The remainder of the codespace, Planes 1 to 1610, are referred to collectively as the Supplementary Planes. As space ran out in the BMP, not only ancient scripts, but modern characters and scripts have been encoded in the Supplementary Multilingual Plane (SMP).

There are gaps in the Unicode codespace: codepoints that are permanently unassigned and reserved as non-characters. These include the last two codepoints in each plane, U+*n*FFFE and U+*n*FFFF (where *n* ranges from 0 to 10<sub>16</sub>). These have always been reserved, and characters will never be assigned at these codepoints. One implication of this is that these codepoints are available to software developers to use for proprietary purposes in internal processing. Note, however, that care must be taken not to transmit these codepoints externally.

Unassigned codepoints can be reserved in a similar manner at any time if there is a reason for doing so. This has been done specifically in order to make additional codes available to programmers to use for internal processing purposes. Again, these should never appear in data.

There is another special range of 2,048 codepoints that are reserved, creating an effective gap in the codespace. These occupy the range U+D800..U+DFFF and are reserved due to the mechanism used in the UTF-16 encoding form (see [Chapter 2 of the Unicode Standard][encoding-forms]). In UTF-16, codepoints in the BMP are represented as code units having the same integer value. The code units in the range 0xD800–0xDFFF, serve a special purpose, however. These code units, known as surrogate code units (or simply surrogates), are used in representing codepoints from Planes 1 to 16. As a result, it is not possible to represent the corresponding codepoints in UTF-16. Hence, these codepoints are reserved.

## Blocks & Extensions

As has been mentioned, the Basic Multilingual Plane (BMP) is intended for those characters that are most commonly used. This implies that the BMP is primarily for scripts that are currently in use, and that other planes are primarily for scripts that are not in current use. As Unicode has evolved, more and more modern scripts have been encoded in the Supplementary Multilingual Plane (SMP).

When Unicode was first being developed, characters were first taken from existing industry standards. For the most part, those included characters used in writing modern languages, but also included a number of commonly used symbols. As these characters were assigned, they were added to the BMP. Assignments to the BMP were done in an organised manner, with some allowances for possible future additions.

The overall organisation of the BMP is illustrated in [Chapter 2 of the Unicode Standard][bmp].

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

[encoding-forms]: https://www.unicode.org/versions/latest/core-spec/chapter-2/#G13708

[bmp]: https://www.unicode.org/versions/latest/core-spec/chapter-2/#G286747