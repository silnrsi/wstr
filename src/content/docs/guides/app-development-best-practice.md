---
title: Application Development Best Practice
description: Guide for software developers
sidebar:
    order: 2501
    label: App Development Best Practice
lastUpdated: 2025-08-07
---

## Introduction

This guide provides best practice guidance for application developers who want their software to be able to handle a wide range of global writing systems. If the software you are writing deals with language data, you should be aware of the issues discussed here and in the linked articles. **Specific, important recommendations are highlighted in bold.**

Topics include:
- How is text encoded?
- Why do I need a language tag to identify language data?
- How is text rendered (on screen and on paper)?
- How is text typed?
- What should one be aware of when reading language data from a file (or writing to a file)?
- How is language data sorted?
- How do I deal with legacy data?

## Model for adequate writing system support

There are five different areas in which an application may need to deal with language and script data:

- _Encoding_ - How language data is stored, based on industry standards
- _Input_ - How data is entered, including keyboarding
- _Rendering_ - How data is rendered to the screen with appropriate fonts and writing system behaviors
- _Analysis_ - Actions in which data is processed or analyzed for sorting, spell-checking, line breaking, and other functions
- _Conversion_ - Processes that involve transforming data from one encoding into another 

This model is described more fully in the [Writing Systems Computing Model][ws-computing-model].

For details of what capabilities are needed for writing systems see [What is Adequate Support?][what-is-adequate-support].

[what-is-adequate-support]: /topics/computing/what-is-adequate-support
[ws-computing-model]: /topics/computing/ws-computing-model

## Language tags and locale data

**Text should be identified with a specific language.** There are a number of text processes that are specific to a language, such as text styling, keyboarding, and sorting. Therefore it is extremely helpful if the computer knows which language text is in. As an example, consider sorting data containing "ö". In Danish, "ö" is sorted as "ø" and comes at the end of the alphabet, after "z" and "æ". In German, "ö" is sorted together with "o". _Without knowing the language, how will you sort the data correctly?_

Language names can be ambiguous. To get around this, the computer industry uses a standard language identification string, or _language tag_, for each language. It includes information, either explicitly or implicitly, about the script (Latin script, Arabic script, Cyrillic script, etc.) and region (most often a two-letter country code, but other codes are possible). Although it is commonly called a language tag (or langtag) it actually identifies a particular writing system or orthography. It is sometimes called a _BCP 47 tag_, based on an [IETF standard][bcp47] and [extensions][bcp47ext].

Note that even though the BCP 47 standard is relatively recent, it is composed of existing standards for identifying language, script, and region which have been in use for much longer. The BCP 47 code for many languages is simply the three-letter ISO 639 code (based on the Ethnologue identification system) that indicates the language, omitting the script and region codes, since those are implied. The BCP 47 information is complex, which is not surprising given the complexity of classifying human language.

SIL curates a public _langtags_ repository that seeks to bring together the relevant information in one place and list sets of equivalent tags. Applications can use this data to properly tag text. For more information on both language tags and SIL's repository see [Language Tagging][language-tagging].

A language tag also has a broader use, and corresponds to a particular _locale_ that may include region information plus possible further specification. Data about a locale is collected in the industry-wide CLDR (Common Locale Data Repository) and stored in LDML (Locale Data Markup Language) format. SIL has a corresponding repository, the SLDR (SIL Locale Data Repository), which pulls data from the CLDR, but also accepts data that is not complete enough for submission to the CLDR. An API exists to obtain both LDML data and language tag information. For more information on locale data, the CLDR, and SLDR, see [Locale Data][locale-data].

[bcp47]: https://codehivetx.us/en/posts/2024-bcp47.html
[bcp47ext]: https://codehivetx.us/en/posts/2024-bcp47-extensions.html
[language-tagging]: /topics/writingsystems/language-tagging
[locale-data]: topics/writingsystems/locale-data

## Text encodings and Unicode

A computer program operates on data that is stored as numbers. When that data is language text there must be an encoding standard that makes the connection between the number being stored and the character it represents. Thankfully there is a global standard for associating numbers and characters: _Unicode_.

Unicode is an encoding standard that aims to support all the world's languages and scripts. It provides the best way to encode language data. **All application data should be stored according to The Unicode Standard.** If you have to deal with data in encodings other than Unicode see [Legacy Encodings][legacy-encodings], however, any data in other encodings should be converted to Unicode for storage and application use.

For guidance on Unicode and how to use it see the article on [The Unicode Standard][the-unicode-standard].

The article on [Unicode Concepts][unicode-concepts] addresses important topics, such as:

- _Transformation Formats_ for storing Unicode code points as multiple bytes. **Text should be read and interpreted according to the proper encoding and transformation format.**
- _Character Properties_ that associate a character with one or more scripts and set basic behavior (direction, casing, combining, and others). **Characters need to be used in ways that are consistent with their properties.**
- _Normalization Forms_ for handling both _composed_ (NFC) and _decomposed_ (NFD) sequences. **Applications should carefully consider how composition, decomposition and normalization affects both data input and export.**
- _Glyph Similarities_, _Case Mapping_, _Canonical Ordering_, _Rendering Behaviors_, and other concepts.

Unicode has reserved several blocks of characters for private use. These [Private Use Area (PUA)][private-use-area] characters only have meaning if everyone using that data agrees on it.

[legacy-encodings]: /topics/encoding/legacy-encodings
[private-use-area]: /topics/encoding/private-use-area
[the-unicode-standard]: /topics/encoding/the-unicode-standard
[unicode-concepts]: /topics/encoding/unicode-concepts

## Input and keyboarding

Text is usually input using a physical or on-screen keyboard, but may also be entered through other input methods. Keyboard-based methods are defined through keyboard layouts that may match national standards or reflect a unique language community's preference.

Operating systems offer a variety of keyboard layouts for major languages. For computers, a layout is often chosen that matches the key labels on the physical keyboard. For lesser resourced languages, a keyboarding solution such as [Keyman][keyman] may be needed to allow text in that language to be typed. 

There are two ways for the association between the right keyboard, the text, and the language identification of that text to be arranged:

- The application knows what language the text is in and tells the keyboarding system to use the appropriate layout.
- The user selects a keyboard layout which communicates to the operating system the language of the text being entered. Then the application can deal with it appropriately.

**Applications should consider how to manage both of these scenarios and how to support keyboard layout choices for their users.**

[From Keystrokes to Codepoints][from-keystrokes-to-codepoints] and linked articles give more information on input and keyboarding considerations.

[from-keystrokes-to-codepoints]: /topics/input/from-keystrokes-to-codepoints
[keyman]: https://keyman.com/

## Rendering

When text is displayed on a screen or printed on paper or when a PDF file is created, the Unicode characters of the text are "rendered" using a font that maps Unicode characters to specific glyphs (character shapes) and contains position information about those glyphs. Choosing a different font changes the glyphs used to create the visual representation of the text.

There are two aspects to rendering text: 



* **layout** which is concerned with positioning paragraphs, font selection, sizing, indentation, color, etc. and 
* **shaping** which is about the precise choice of glyphs and their positioning for text within a line in a single font.


### Fonts

The font selected to display the text needs to support all the characters in the text, plus any rendering support needed by the language and/or script. If a character is missing, the operating system will try to substitute the corresponding character from another font (which may result in characters of uneven size or design being displayed), or it may just appear as a square box. If the needed rendering information is missing, characters may end up misaligned or malformed. 


### Font features and glyph variants

In addition, a particular language may require glyph variants for a character. For example, in African languages, the uppercase eng is typically in the shape of the lowercase eng ('ŋ'), just larger. In North and South American and European languages where the eng is used, the uppercase equivalent is generally in the form of an uppercase 'N' with a hook. The same codepoint is used for both styles. 

An application needs to allow the user to choose glyph variants, either directly or via language tag information (or both). One user-friendly way to support this is to provide a dialog that offers a choice of the variants available in the font. Ideally the choice of variants would only be offered if relevant to the language. 

Where known, information about the preferred glyph variants for a language is stored in the SLDR file for the language tag. That information can be obtained using the LDML API.

Ref: 

5521: OpenType Features

https://software.sil.org/fonts/features/

5541: Fallback

1520: LDML: Font feature information in SLDR files (using SIL extensions to LDML)


### Complex Rendering

Those who speak and write European languages often have a very simple concept of rendering, where there is a one-to-one correspondence between characters and glyphs and those glyphs are laid out in a straightforward left-to-right order. But many scripts require much more complexity in the rendering process. Some of these complexities include:



* Contextual shaping, where the shape of the glyph depends on adjacent characters or its position within the word.
* Ligatures, where two or more characters combine into a single shape. In the Arabic script, for example, when a "lam" character (ل) is followed by an "alif" character (ا), the two characters combine to form a single shape (لا).
* Complex positioning, where diacritics must stack up or be positioned in various ways in order to be readable.
* Reordering, where glyphs appear to the left or above or below characters that precede them in the data.
* Splitting, where a single character is displayed using two disjoint glyphs.
* Bidirectionality, where in some right-to-left scripts, numbers are written left to right.

To achieve these complex behaviors, “smart fonts” include rules that are interpreted by smart rendering systems. The most common of these systems is OpenType, which is built into most operating systems.

SIL developed its own smart-font system called Graphite, which is supported by a smaller number of applications but may be needed for a few scripts. Currently, special development effort is needed to enable an application to support Graphite rendering.

Resources:

[Examples of Complex Rendering](https://scriptsource.org/entry/lu6terdg9u)

[Reordering and Data Storage Order](https://scriptsource.org/entry/l5bvp27v3r)

[Rendering Technologies Overview](https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter07&site_id=nrsi) (OLD)

[The Unicode Bidi Algorithm: a gentle introduction](https://scriptsource.org/entry/hunvb5t7qm)

[Graphite Web Site](https://graphite.sil.org/)

5500: Rendering systems


### Text layout

TBD

Resource: [Challenges in publishing with non-Roman Scripts](https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter09&site_id=nrsi)


Ref:

6000: Layout




## Sorting and collation

When accepting input for searching, it is essential to normalize the search item to the same format as the data. Increasingly, this detail is handled by the collation library your programming language provides.

Different languages sort words in different orders. Strictly speaking, in computing, "sorting" is about the algorithm that puts things into order as quickly as possible, while "collation" is about the comparison of two strings to say which should sort earlier and which later. For text processing, therefore, we are more concerned with this later collation question. Since different languages collate in different ways, there needs to be ways for software to use language specific collation. This again calls for the system to know what language the text is in.

Resource: [Unicode Sort Tailoring: Tutorial](https://scriptsource.org/entry/pnrnlhkrq9) and [Resources](https://scriptsource.org/entry/lcepuup9ga)


### Searching

Searching is both simple and incredibly complicated. This is not a solved problem. For example, when searching, are we concerned about case? format characters? phonetic equivalence? and so on. Just comparing bytes is one form of search, but often people want more choice over how they search. This is an opportunity to provide a real difference in language support for your software.


## Going Deeper

Resources

[Introduction to Text Conversion and Transliteration](https://scriptsource.org/entry/xlzd6n5aqt)

[Unicode conversion of non-breaking hyphens in MS Word](https://scriptsource.org/entry/xvbp4378bg)
