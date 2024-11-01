---
title: Writing Systems Best Practice
description: Guide for software developers
sidebar:
    order: 2300
lastUpdated: 2024-10-31
---

## Introduction

If the software you are writing deals with language data, you should be aware of the issues discussed here. 

Topics include:
- How is text encoded?
- Why do I need a language tag to identify language data?
- How is text rendered (on screen and on paper)?
- How is text typed?
- What should one be aware of when reading language data from a file (or writing to a file)?
- How is language data sorted?
- How do I deal with legacy data?

Resource: [Full Stack Language Enablement](https://srl295.github.io/2017/06/06/full-stack-enablement/)


## Text encoding

A computer program operates on data that is stored as numbers. When that data is language text there must be an encoding standard that makes the connection between the number being stored and the character it represents. Thankfully there is a global standard for associating numbers and characters: Unicode.

(See the [Legacy issues](#legacy-issues) section below if you have to deal with data in encodings other than Unicode.)


### Unicode

Unicode is an encoding standard that aims to support all the world's languages and scripts. (Although new scripts and characters are still being added, the rate of additions has slowed.) Unicode provides the best way to encode language data.

Language data should be encoded as Unicode "code points." (A code point is sometimes called a "Unicode scalar value" or "USV".) These are numbers in the range 0 to hexadecimal 10FFFF. Each assigned USV has an unambiguous and immutable association with a single character.

Unicode characters are organized in 17 "planes", each with 65536 code points (numbered from 0 to hexadecimal FFFF). Plane zero (0000-FFFF) is the Basic Multilingual Plane (BMP). The next plane (10000-1FFFF) is the Supplementary Multilingual Plane (SMP). Each plane contains "blocks" of similar characters, often by script (Latin, Devanagari, etc.).

The convention is to preface the hexadecimal code point with "U+" and to include at least four digits. Each code point has an official name, for example, U+0041 is "LATIN CAPITAL LETTER A". (The official character name will not change, even if it is later discovered to be inaccurate.)

The Unicode Standard didn't have widespread adoption until the late 1990s. Older documents, sites, or other imported data may differ from the modern Unicode standard. (See the [Legacy issues](#legacy-issues) section below.) However, all new data should *always* use the Unicode Standard. 

Resources:

[The Unicode Standard](https://www.unicode.org/standard/standard.html)

[Everyday Unicode](https://scriptsource.org/entry/mhzqeygkuz)

[Unicode information on ScriptSource](https://scriptsource.org/entry/z3hs8db5ct)

[Unicode Character Browsing](https://scriptsource.org/entry/tubkvb6y8f)

[Unicode Status in ScriptSource](https://scriptsource.org/entry/tn9r6q9euj)

[Understanding Unicode I](https://scriptsource.org/source/c6rwvqz3gn) and [II](https://scriptsource.org/source/hqj8q8b4xv)

Ref:

3000: Encoding

3200++: Unicode concepts (blocks, planes, etc.)

3300: "hacked" (legacy) encoding

3400: Encoding conversion


### Storage of Unicode code points

There are multiple ways that Unicode characters can be stored, or expressed as bytes. Given that a USV may be a number more than 255 (FF hexadecimal), we need a way of representing these bigger numbers in more than one byte. These are called *Unicode transformation formats*. There are advantages and disadvantages to each.

* UTF-32: 32 bits for each character
    * advantages: each character takes the same amount of space
    * disadvantages: lots of zero bytes, so uses a lot of room
* UTF-16: 16 bits for each character
    * advantages: each character in the BMP takes the same amount of space
    * disadvantages: characters above the BMP are represented by using two 16-bit "surrogate pairs"
* UTF-8: a character can take 1, 2, 3 or 4 8-bit bytes
    * advantages: most compact
    * disadvantages: variable number of bytes per character

There are well-defined (but non-trivial) algorithms defined for converting data among these formats. In all likelihood the programming language you are using has functions that will do this work.

Summary: All text needs to be read and interpreted according to the proper encoding and transformational format.

Resource: [Mapping codepoints to Unicode encoding forms](https://scriptsource.org/source/wynmmq6u9w)

Online comparison of formats: https://r12a.github.io/app-conversion/

Ref: 

3250: UTF-32, UTF-16, UTF-8, BOM


### Unicode Normalization Forms

Unicode was originally designed to round trip to many of the smaller standards of the day. This means that some "composed characters" have two ways of being stored in Unicode, either as a single code that can be roundtripped to a smaller standard, or a sequence of a base and diacritic.

For instance, the following are two ways of representing the same data:



* á  00E1 - LATIN SMALL LETTER A WITH ACUTE
* a  0061 - LATIN SMALL LETTER A \
 ́   0301 - COMBINING ACUTE ACCENT

They are "canonically equivalent", that is, they both represent the same item and your software should treat them as identical (for example, when searching text). Fortunately most programming languages have functions available to convert between these forms.

Unicode defines normalization forms, with specific rules on how to create them. The most common forms are:



* Normalization Form Composed (NFC)
* Normalization Form Decomposed (NFD)

In NFD, each component has a separate code point. In NFC, components will be combined, provided a composite character exists in Unicode, according to specific algorithms. In the example above, the first sequence is NFC and the second is NFD. 

In many cases, the NFC and NFD forms are identical. For example, U+0254 U+0301 is the "open o" character with an acute accent. Since there is no composite character for "open o with acute" in Unicode, this sequence is already as composed as possible.

NFC often provides the most compact storage. NFD may provide advantages for working with the data, since each component is a separate character. 

Resources:

[Precomposed Characters in Unicode](https://scriptsource.org/entry/r8cbwvep6z)

[To compose or decompose: that is the question](https://scripts.sil.org/cms/scripts/page.php?id=nfc_vs_nfd&site_id=nrsi)

Ref:

3260: Normalization

Ref: 

Video (27min) "Why Determining the Length of a String is More Complicated Than You Think" (IUC 44, Oct 2020 presentation) ([https://www.youtube.com/watch?v=wCExnGiMeF0](https://www.youtube.com/watch?v=wCExnGiMeF0))

Ref:

List of library resources for various programming languages.


### Unicode Character Properties

Now that we have all agreed how different characters are encoded, we can start to make assumptions about the text. Unicode does this by giving characters properties: Is a character a non-spacing mark? Lowercase? A digit (there are lots of sets of digits)? Right to left? These properties also have supporting algorithms for some key text processing activities, for example laying out text where some of it is in a right to left script like Arabic or Hebrew.

Every character has properties associated with it. Some scripts (such as Latin, Cyrillic, and Greek) have upper and lowercase characters, and a character’s Unicode property indicates whether it is uppercase, lowercase, or neither. Many scripts (such as Arabic and Devanagari) make no uppercase/lowercase distinction.

Other properties include whether a character is a combining character (such as a diacritic), how the character should be handled in a bi-directional display (when there is a mixture of left-to-right and right-to-left text), whether it functions as white space, and more.

Each character has a property indicating what script it belongs to (such as Latin, Arabic, Bengali, etc.) or whether it can be used for multiple scripts.

Some of these properties might be useful in your software, particularly script and case mappings. Low-level libraries called by your program may also make assumptions about characters based upon these properties. 

It is important that characters are used in a way that is consistent with their properties: for example, you would not want to mix up U+0410 "А" (with a Cyrillic script property) and U+0041 "A" (with a Latin script property).

Resource: [Unicode Character Properties spreadsheet](https://github.com/silnrsi/unicode-resources/tree/main/ucd-spreadsheet)

Ref: 

3230: Character properties

3240: Casing


### Glyph Similarities

The Unicode Standard does not unify letter shapes or characters across scripts (unless those characters are common to all, for example combining diacritics). Thus there is both a Latin "A" (U+0041 LATIN CAPITAL LETTER A) and a Cyrllic "А" (U+0410 CYRILLIC CAPITAL LETTER A). A font supporting both Latin and Cyrillic scripts might use the exact same glyph to display both of these Unicode characters. 

The existence of these "confusable" characters also offers the possibility of deliberate, malicious attempts to deceive users. 

You will do your users a great service if your software can warn users when they use a character from a different script.

Resource: [Dotless letters and movable combining marks](https://scriptsource.org/entry/k3fmzy7abd), 

https://util.unicode.org/UnicodeJsps/confusables.jsp

Ref: Unicode's Where is my Character? site: https://www.unicode.org/standard/where/


### Private Use Area code points

Unicode has reserved several blocks of characters for private use. These Private Use Area (PUA) characters only have meaning if everyone using that data agrees on it. 

The need for private use characters is much less than in the past, since nearly all scripts are properly encoded. Sometimes they are useful for some internal process, but are rarely if ever stored now.

SIL maintains a list of characters assigned to specific PUA code points. These are generally characters that have been proposed to Unicode, but which have not yet made it through the process or characters which are never going to be encoded and yet which some may need to use. When a character is included in Unicode and assigned a code point, the PUA code point in SIL's list is deprecated.

If data uses PUA code points from the SIL list, and the character is now in Unicode, SIL has provided a [TECkit](https://software.sil.org/teckit/) mapping file to convert that data to Unicode ([https://github.com/silnrsi/wsresources/tree/master/scripts/Latn/mappings/sil-pua](https://github.com/silnrsi/wsresources/tree/master/scripts/Latn/mappings/sil-pua)).

Resource: [SIL’s Private Use Area](https://github.com/silnrsi/unicode-resources/tree/main/sil-pua)

Ref: 

3220: Private Use Area (PUA) https://github.com/silnrsi/unicode-resources/tree/main/sil-pua


## Language tags

Language names can be ambiguous. To get around this, the computer industry uses a standard language identification string for each language. It includes information, either explicitly or implicitly, about the script (Latin script, Arabic script, Cyrillic script, etc.) and region (most often a two-letter country code, but other codes are possible). The whole thing is known as a "BCP 47 tag", also called a "language tag" (although, in effect, it defines an orthography).

Note that even though the BCP 47 standard is relatively recent, it is composed of existing standards for identifying language, script and region, which have been in use for much longer. The BCP 47 code for many languages is simply the three-letter ISO 639 code (based on the Ethnologue identification system) that indicates the language, omitting the script and region codes, since those are implied.

The BCP 47 information is complex, which is not surprising given the complexity of classifying human language. SIL's "langtags" repository seeks to bring together the relevant information in one place and list sets of equivalent tags.

Text should be identified with a language tag. There are a number of text processes that are specific to a language, such as text styling, keyboarding, and sorting. Therefore it is extremely helpful if the computer knows which language text is in. As an example, consider sorting data containing "ö". In Danish, "ö" is sorted as "ø" and comes at the end of the alphabet, after "z" and "æ". In German, "ö" is sorted together with "o". Without knowing the language, how will you sort the data correctly?

A language tag corresponds to a "locale" (language, script and region, plus possible further specification). Data about a locale is collected in the CLDR (Common Locale Data Repository) and stored in LDML (Locale Data Markup Language) format. SIL has a corresponding repository, the SLDR, which pulls data from the CLDR, but also accepts data that is not complete enough for submission to the CLDR. An API exists to obtain LDML data and language tag information.

Resource:



* [IETF BCP 47]([https://codehivetx.us/en/posts/2024-bcp47.html](https://codehivetx.us/en/posts/2024-bcp47.html))
* [IETF BCP 47 extensions]([https://codehivetx.us/en/posts/2024-bcp47-extensions.html](https://codehivetx.us/en/posts/2024-bcp47-extensions.html))
* [Language Tagging]([https://github.com/silnrsi/langtags/blob/master/doc/tagging.md](https://github.com/silnrsi/langtags/blob/master/doc/tagging.md))

Ref: 

1410: language tags

1520 LDML data

Ref: 

CLDR's "Picking the Right Language Identifier" (https://cldr.unicode.org/index/cldr-spec/picking-the-right-language-code)

specific standards: BCP 47 (and ISO 639 for language, ISO 15924 for script, ISO 3166 for region)

Ref: 

https://en.wikipedia.org/wiki/IETF_language_tag

Ref:

https://github.com/silnrsi/langtags/blob/master/doc/tagging.md


## Rendering

When text is displayed on a screen or printed on paper or when a PDF file is created, the Unicode characters of the text are "rendered" using a font that maps Unicode characters to specific glyphs (character shapes) and contains position information about those glyphs. Choosing a different font changes the glyphs used to create the visual representation of the text.

There are two aspects to rendering text: 



* **layout** which is concerned with positioning paragraphs, font selection, sizing, indentation, color, etc. and 
* **shaping** which is about the precise choice of glyphs and their positioning for text within a line in a single font.


### Fonts

The font selected to display the text needs to support all the characters in the text, plus any rendering support needed by the language and/or script. If a character is missing, the operating system will try to substitute the corresponding character from another font (which may result in characters of uneven size or design being displayed), or it may just appear as a square box. If the needed rendering information is missing, characters may end up misaligned or malformed. 


### Font features and glyph variants

In addition, a particular language may require glyph variants for a character. For example, in African languages, the uppercase eng is typically in the shape of the lowercase eng, just larger. In European and North and South American languages where the eng is used the uppercase equivalent is generally in the form of an uppercase N with a hook. The same codepoint is used for both styles. 

An application needs to allow the user to choose glyph variants, either directly or via language tag information (or both). One user-friendly way to support this is to provide a dialog that offers a  choice of the variants available in the font. Ideally the choice of variants would only be offered if relevant to the language. 

Where known, information about the preferred glyph variants for a language is stored in the SLDR file for the language tag. That information can be obtained using the LDML API.

Ref: 

5521: OpenType Features

https://software.sil.org/fonts/features/

5541: Fallback

1520: LDML: Font feature information in SLDR files (using SIL extensions to LDML)


### Complex Rendering

Those who speak and write European languages often have a very simple concept of rendering, where there is a one-to-one correspondence between characters and glyphs and those glyphs are laid out in a straightforward left-to-right order. But many scripts require much more complexity in the rendering process. Some of these complexities include:



* Contextual shaping, where the shape of the glyph depends on adjacent characters or its position within the word.
* Ligatures, where two or more characters combine into a single shape.
* Complex positioning, where diacritics must stack up or be positioned in various ways in order to be readable.
* Reordering, where glyphs appear to the left or above or below characters that precede them in the data.
* Splitting, where a single character is displayed using two disjoint glyphs.
* Bidirectionality, where in some right-to-left scripts, numbers are written left to right.

To achieve these complex behaviors, “smart fonts” include rules that are interpreted by smart rendering systems. The most common of these systems is OpenType, which is built into most operating systems.

SIL developed its own smart-font system called Graphite, which is supported by a smaller number of applications but may be needed for a few scripts. Currently, special development effort is needed to enable an application to support Graphite rendering.

Resources:

[Examples of Complex Rendering](https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=lu6terdg9u)

[Reordering and Data Storage Order](https://scriptsource.org/entry/l5bvp27v3r)

[Rendering Technologies Overview](https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter07&site_id=nrsi) (OLD)

[The Unicode Bidi Algorithm: a gentle introduction](https://scriptsource.org/entry/hunvb5t7qm)

[Graphite Web Site](https://graphite.sil.org/)

5500: Rendering systems


### Text layout

TBD

Resource: [Challenges in publishing with non-Roman Scripts](https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter09&site_id=nrsi)


## Ref:

6000: Layout


## Keyboard input

A keyboard is often used to type text. 

There are two aspects to thinking about a keyboard. On one hand there is the physical keyboard or the graphical buttons on a phone, and on the other hand there is the layout that maps the keys or buttons to the actual characters to be entered. This mapping is known as the keyboard layout and the software to implement such layouts may be quite simple or quite complex.

Operating systems offer a variety of keyboard layouts for major languages (and, for computers, often a layout is chosen that matches the key labels on the physical keyboard). For lesser resourced languages, a keyboarding solution such as [Keyman](https://keyman.com/) may be needed to allow text in that language to be typed. 

There are two ways for the association between the right keyboard, the text and the language identification of that text to be arranged. Either the application knows what language the text is in and tells the keyboarding system to use the appropriate layout, or the user selects a keyboard layout which communicates to the operating system the language tag of the text being entered so that the application can deal with it appropriately.

Resources:

[Keyboard Systems Overview](https://scriptsource.org/entry/ytr8g8n6sw)

[Installing a keyboard in order to effectively use a font](https://scriptsource.org/entry/g8m8a3jf5p)

[Keyboard for Windows Installation](http://support.microsoft.com/kb/258824)

[How to install a keyboard on a Mac](https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=vudwjrw2dm)

[Microsoft Keyboard Layout Creator (MSKLC)](https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=m98qmxx7dx)

[Smart Fonts and Keyboards](https://scriptsource.org/entry/yqlnylcbwk)

[An introduction to keyboard design](https://scriptsource.org/cms/scripts/page.php?item_id=source_detail&uid=qp8xxt9fmm)

Ref:

4100 Keyboards


## File input/output

The same encoding considerations noted in the [Storage of Unicode code points](#storage-of-unicode-code-points)
 section above apply when reading or writing a file. 

If you are importing an older file or if you find odd characters (such as ¼½®¤ª) in the midst of running text, you may have to deal with a non-Unicode encoding. See the [Legacy issues](#legacy-issues) section below.

Generally UTF-8 is a good choice for saving data to a file unless there is a good reason to use a different format. It is the most compact form. 

Some applications use specific forms (such as UTF-16 for Windows, or UTF-32 for memory-mapped files).

Resource: [Introduction to Text Conversion and Transliteration](https://scriptsource.org/entry/xlzd6n5aqt)

Ref:

3250: UTF-8, etc.; BOM


## Sorting and collation

When accepting input for searching, it is essential to normalize the search item to the same format as the data. Increasingly, this detail is handled by the collation library your programming language provides.

Different languages sort words in different orders. Strictly speaking, in computing, "sorting" is about the algorithm that puts things into order as quickly as possible, while "collation" is about the comparison of two strings to say which should sort earlier and which later. For text processing, therefore, we are more concerned with this later collation question. Since different languages collate in different ways, there needs to be ways for software to use language specific collation. This again calls for the system to know what language the text is in.

Resource: [Unicode Sort Tailoring: Tutorial](https://scriptsource.org/entry/pnrnlhkrq9) and [Resources](https://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=lcepuup9ga)


### Searching

Searching is both simple and incredibly complicated. This is not a solved problem. For example, when searching, are we concerned about case? format characters? phonetic equivalence? and so on. Just comparing bytes is one form of search, but often people want more choice over how they search. This is an opportunity to provide a real difference in language support for your software.


## Legacy issues

The Unicode standard didn't have widespread adoption until the late 1990s. (Even today Windows 11 defaults to using "code pages" instead of Unicode.)

There have been many standards over the years. Many dealt with a limited number of characters used for a limited number of languages. Without knowing the encoding, the data could not be interpreted correctly. In addition, people created their own "hacked" encodings by replacing characters they were not using with characters they needed. Without a corresponding "hacked" font, the data displays incorrectly.

Resources:

[Introduction to Text Conversion and Transliteration](https://scriptsource.org/entry/xlzd6n5aqt)

[Text Encoding Issues When Working with Multiple Scripts](https://scriptsource.org/entry/yrl9a5tk4e)

Ref:

2100: Computing model

2320: Data encoding


## Going Deeper

Resources

[Introduction to Text Conversion and Transliteration](https://scriptsource.org/entry/xlzd6n5aqt)

[Unicode conversion of non-breaking hyphens in MS Word](https://scriptsource.org/entry/xvbp4378bg)
