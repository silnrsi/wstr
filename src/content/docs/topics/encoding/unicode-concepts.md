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

## Codepoints and the Unicode codespace (the book 3.1)

The Unicode coded character set is coded in terms of integer values, which are referred to in Unicode as Unicode scalar values (USVs). By convention, Unicode codepoints are represented in hexadecimal notation with a minimum of four digits and preceded with “U+”; so, for example, “U+0345”, “U+10345” and “U+20345”. Also by convention, any leading zeroes above four digits are suppressed; thus we would write “U+0456” but not “U+03456”.

Every character in Unicode can be uniquely identified by its codepoint, or also by its name. Unicode character names use only ASCII characters and by convention are written entirely in upper case. Characters are often referred to using both the codepoint and the name; e.g. U+0061 LATIN SMALL LETTER A. In discussions where the actual characters are unimportant or are assumed to be recognisable using only the codepoints, people will often save space and use only the codepoints. Also, in informal contexts where it is clear that Unicode codepoints are involved, people will often suppress the string “U+”. For clarity, this document will continue to use “U+”.

The Unicode codespace ranges from U+0000 to U+10FFFF. Borrowing terminology from ISO/IEC 10646, the codespace is described in terms of 17 [planes][glo-plane] of 64K codepoints each. Thus, Plane 0 includes codepoints U+0000..U+FFFF, Plane 1 includes codepoints U+10000..U+1FFFF, etc.

In the original design of Unicode, all characters were to have codepoints in the range U+0000..U+FFFF. In keeping with this, Plane 0 was set apart as the portion of the codespace in which all of the most commonly used characters were encoded, and is designated the Basic Multilingual Plane (BMP). The remainder of the codespace, Planes 1 to 1610, are referred to collectively as the Supplementary Planes. As space ran out in the BMP, not only ancient scripts, but modern characters and scripts have been encoded in the Supplementary Multilingual Plane (SMP).

There are gaps in the Unicode codespace: codepoints that are permanently unassigned and reserved as non-characters. These include the last two codepoints in each plane, U+*n*FFFE and U+*n*FFFF (where *n* ranges from 0 to 10<sub>16</sub>). These have always been reserved, and characters will never be assigned at these codepoints. One implication of this is that these codepoints are available to software developers to use for proprietary purposes in internal processing. Note, however, that care must be taken not to transmit these codepoints externally.

Unassigned codepoints can be reserved in a similar manner at any time if there is a reason for doing so. This has been done specifically in order to make additional codes available to programmers to use for internal processing purposes. Again, these should never appear in data.

There is another special range of 2,048 codepoints that are reserved, creating an effective gap in the codespace. These occupy the range U+D800..U+DFFF and are reserved due to the mechanism used in the UTF-16 encoding form (see [Chapter 2 of the Unicode Standard][uni-encoding-forms]). In UTF-16, codepoints in the BMP are represented as code units having the same integer value. The code units in the range 0xD800–0xDFFF, serve a special purpose, however. These code units, known as surrogate code units (or simply surrogates), are used in representing codepoints from Planes 1 to 16. As a result, it is not possible to represent the corresponding codepoints in UTF-16. Hence, these codepoints are reserved.

## Blocks & Extensions

Placeholder: 3.2
- [Script blocks and the organisation of the Unicode character set][script-blocks]
- [Getting acquainted with Unicode characters and the code charts][characters-code-charts] 

## Transformation Formats

**All text should be read and interpreted according to the proper encoding and transformation format.**

Placeholder:
- [Unicode encoding forms and encoding schemes][encoding-forms]
- [Mapping codepoints to Unicode encoding forms][mapping-code-points]

[Online comparison of formats][code-converter]

## Principles & Compromises

### Which encoding is the right choice?

With three different encoding forms available, someone creating content is faced with the choice of which encoding they should use for the data they create. Likewise, software developers need to consider this question both for what they use as the internal memory representation of data and what they use when storing data on a disk or transmitting it over a wire. The answer depends on a variety of factors, including the nature of the data, the nature of the processing, and the contexts in which it will be used.

One of the original concerns people had regarding Unicode was that a 16-bit encoding form would automatically double file sizes in relation to an 8-bit encoding form. Unicode’s three encoding forms do differ in terms of their space efficiency, though the actual impact depends upon the range of characters being used and on the proportions of characters from different ranges within the codespace. Consider the following:

Codepoint range|Number of bytes: UTF-8|Number of bytes: UTF-16|Number of bytes: UTF-32
--- | --- | --- | ---
U+0000..U+007F|one|two|four
U+0080..U+07FF|two|two|four
U+0800..U+D7FF, U+E000..U+FFFF|three|two|four
U+10000..U+10FFFF|four|four|four

_Table 4. Bytes required to represent a character in each encoding form_

Clearly, UTF-32 is less efficient, unless a large proportion of characters in the data come from the supplementary planes, which is usually not likely. (For supplementary-plane characters, all three encoding forms are equal, requiring four bytes.) For characters in the Basic Latin block of Unicode (equivalent to the ASCII character set), i.e. U+0000..U+007F, UTF-8 is clearly the most efficient. On the other hand, for characters in the BMP used for Far East languages, UTF-8 is less efficient than UTF-16.

Another factor particularly for software developers to consider is efficiency in processing. UTF-32 has an advantage in that every character is exactly the same size, and there is never a need to test the value of a code unit to determine whether or not it is part of a sequence. Of course, this has to be weighed against considerations of the overall size of data, for which UTF-32 is generally quite inefficient. Also, while UTF-32 may allow for more efficient processing than UTF-16 or UTF-8, it should be noted that none of the three encoding forms is particularly inefficient with respect to processing. Certainly, it is true that all of them are much more efficient than are the various legacy multibyte encodings.

For general use with data that includes a variety of characters mostly from the BMP, UTF-16 is a good choice for software developers. BMP characters are all encoded as 16-bits, and testing for surrogates can be done very quickly. In terms of storage, it provides a good balance for multilingual data that may include characters from a variety of scripts in the BMP, and is no less efficient than other encoding forms for supplementary-plane characters. For these reasons, many applications that support Unicode use UTF-16 as the primary encoding form.

There are certain situations in which one of the other encoding forms may be preferred, however. In situations in which a software process needs to handle a single character (for example, to pass a character generated by a keyboard driver to an application), it is simplest to handle a single UTF-32 code unit. On the other hand, in situations in which software has to cooperate with existing implementations that were designed for 8-bit data only, then UTF-8 may be a necessity. UTF-8 has been most heavily used in the context of the Internet for this reason.

On first consideration, it may appear that having three encoding forms would be less desirable. In fact, having three encoding forms based on 8-, 16- and 32-bit code units has provided considerable flexibility for developers and has made it possible to begin making a transition to Unicode while maintaining operability with existing implementations. This has been a key factor in making Unicode a success within industry.

There is another related question worth considering here: Given a particular software product, which encoding forms does it support? Some software may be able to handle “16-bit” Unicode data. Note, however, that this may actually mean UCS-2 data and not UTF-16; in other words, it is able to handle characters in the BMP, but not supplementary-plane characters encoded as surrogate pairs. 

The question of support for supplementary-plane characters does not necessarily apply only to UTF-16. For example, many Web browsers are able to interpret HTML pages encoded in UTF-8, but that does not necessarily mean that they can handle supplementary-plane characters. For example, the software may convert data in the incoming file into 16-bit code units for internal processing, and that processing may not have been written to deal with surrogates correctly. Or, that application may have been written with proper support for supplementary-plane characters, but may depend on the host operating system for certain processing, and the host operating system on a given installation may not have the necessary support.

In general, when choosing software, you should verify whether it supports the encoding forms you would like to use. For both UTF-8 and UTF-16, you should explicitly verify whether the software is able to support supplementary-plane characters, if that is important to you. 

### Byte order: Unicode encoding schemes

As explained in “[Character set encoding basics][iws-character-encoding-basics]”, 16- and 32-bit encoding forms raise an issue in relation to byte ordering. While code units may be larger than 8-bits, many processes are designed to treat data in 8-bit chunks at some level. For example, a communication system may handle data in terms of bytes, and certainly memory addressing with personal computers is organised in terms of bytes. Because of this, when 16- or 32-bit code units are involved, these may get handled as a set of bytes, and these bytes must get put into a serial order before being transmitted over a wire or stored on a disk.

There are two ways to order the bytes that make up a 16- or 32-bit code unit. One is to start with the high-order (most significant) byte and end with the low-order (least significant) byte. This is often referred to as **big-endian**. The other way, of course, is the opposite, and is often referred to as **little-endian**. For 16- and 32-bit encoding forms, the specification of a particular encoding form together with a particular byte order is known as a [character encoding scheme][glo-character-encoding-scheme].

In addition to defining particular encoding forms as part of the Standard, Unicode also specifies particular encoding schemes. A distinction must be made between the actual form in which the data is organised (what it really is) versus how a process might describe the data (what gets said about it).

Clearly, for data in the UTF-16 encoding form, it can only be serialised in one of two ways. In terms of how it is actually organised, it must be either big-endian or little-endian. However, Unicode allows three ways in which the encoding scheme for the data can be described: big-endian, little-endian, or unspecified-endian. The same is true for UTF-32.

Thus, Unicode defines a total of seven encoding schemes:

- UTF-8
- UTF-16BE
- UTF-16LE
- UTF-16
- UTF-32BE
- UTF-32LE
- UTF-32

Note that the labels “UTF-8”, “UTF-16” and “UTF-32” can be used in two ways: either as encoding form designations or as encoding scheme designations. In most situations, it is either clear or irrelevant which is meant. There may be situations in which you need to clarify which was meant, however.

Before a software process can interpret data encoded using the UTF-16 or UTF-32 encoding forms, the question of byte order does need to be resolved. Clearly, then, it is always preferable to tag data using an encoding scheme designation that overtly indicates which byte order is used. As Unicode was being developed, however, it was apparent that there would be situations in which existing implementation did not provide a means to indicate the byte order. Therefore the ambiguous encoding scheme designations “UTF-16” and “UTF-32” were considered necessary.

When the ambiguous designators are applied, however, the question of byte order still has to be resolved before a process can interpret the data. One possibility is simply to assume one byte order, begin reading the data and then check to see if it appears to make sense. For example, if the data were switching from one script to another with each new character, you might suspect that it was not being interpreted correctly. This approach is not necessarily reliable, though some software vendors have developed algorithms that try to detect the byte order, and even the encoding form, and these algorithms work in most situations.

To solve this problem, the codepoint U+FEFF was designated to be a [byte order mark][glo-bom] (BOM). When encountered at the start of a file or data stream, this character can always make clear which byte order is being used. The reason is that the codepoint that would correspond to the opposite byte order, U+FFFE, is reserved as a non-character.

For example, consider a file containing the Thai text “ความจริง”. The first character “ค” THAI CHARACTER KHO KHWAI has a codepoint of U+0E04. Now, suppose that the file is encoded in UTF-16 and is stored in big-endian order, though the encoding scheme is identified ambiguously as “UTF-16”. Suppose, then, that an application begins to read the file. It encounters the byte sequence 0x0E 0x04, but has no way to determine whether to assume big-endian order or little-endian order. If it assumes big-endian order, it interprets these bytes as U+0E04 THAI CHARACTER KHO KHWAI; but if it assumes little-endian order, it interprets these bytes as U+040E CYRILLIC CAPITAL LETTER SHORT U. Only one of these interpretations is correct, but the software has no way to know which.

But suppose the byte order mark, U+FEFF, is placed at the start of the file. Thus, the first four bytes in sequence are 0xFE 0xFF 0x0E 0x04. Now, if the software attempts to interpret the first two bytes in little-endian order, it interprets them as U+FFFE. But that is a non-character and, therefore, not a possible interpretation. Thus, the software knows that it must assume big-endian order. Now it interprets the first four bytes as U+FEFF (the byte-order mark) and U+0E04 THAI CHARACTER KHO KHWAI, and it is assured of the correct interpretation.

It should be pointed out that the codepoint U+FEFF has a second interpretation: ZERO WIDTH NO-BREAK SPACE. Unicode specifies that if data is identified as being in the UTF-16 or UTF-32 encoding scheme (not form) so that the byte order is ambiguous, then the data should begin with U+FEFF and that it should be interpreted as a byte order mark and not considered part of the content. If the byte order is stated explicitly, using an encoding scheme designation such as UTF-16LE or UTF-32BE, then the data should not begin with a byte order mark. It may begin with the character U+FEFF, but if so it should be interpreted as a ZERO WIDTH NO-BREAK SPACE and counted as part of the content.

The use of the BOM works in exactly the same way for UTF-32, except that the BOM is encoded as four bytes rather than two.

Note that the BOM is useful for data stored in files or being transmitted, but it is not needed for data in internal memory or passed through software programming interfaces. In those contexts, a specific byte order will generally be assumed.20

The byte order mark is often considered to have another benefit aside from specifying byte order: that of identifying the character encoding. In most if not all existing legacy encoding standards, the byte sequences 0xFE 0xFF and 0xFF 0xFE are extremely unlikely. Thus, if a file begins with this value, software can infer with a high level of confidence that the data is Unicode, and also be able to deduce the encoding form. This also applies for UTF-32, though in that case the byte sequences would be 0x00 0x00 0xFE 0xFF and 0xFF 0xFE 0x00 0x00. It is also applicable in the case of UTF-8. In that case, the encoded representation of U+FEFF is 0xEF 0xBB 0xBF.

When the BOM is used in this way to identify the character set encoding of the data, it is referred to as an **encoding signature**.

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

[canonical]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#6c203953
[casing]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#72b37972
[characters-code-charts]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#29876e62
[code-converter]: https://r12a.github.io/app-conversion/
[compose-decompose]: https://scripts.sil.org/cms/scripts/page.php?id=nfc_vs_nfd&site_id=nrsi
[decomposition]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#a9054ead
[dotless-letters]: https://scriptsource.org/entry/k3fmzy7abd
[encoding-forms]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#96f19a02
[glo-bom]: /reference/glossary#bom
[glo-character-encoding-form]: /reference/glossary#charencform
[glo-character-encoding-scheme]: /reference/glossary#charencsch
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
[script-blocks]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04a&site_id=nrsi#e2cd27ff
[semantics]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter04b&site_id=nrsi#4c028a78
[string-length]: https://www.youtube.com/watch?v=wCExnGiMeF0
[ucd-spreadsheet]: https://github.com/silnrsi/unicode-resources/tree/main/ucd-spreadsheet
[unicode-bidi-algorithm]: /topics/encoding/unicode-bidi-algorithm
[uni-confusables]: https://util.unicode.org/UnicodeJsps/confusables.jsp
[uni-encoding-forms]: https://www.unicode.org/versions/latest/core-spec/chapter-2/#G13708
[uni-where-character]: https://www.unicode.org/standard/where/
[wsig]: https://scripts.sil.org/wsi_guidelines.html

[iws-character-encoding-basics]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter03&site_id=nrsi