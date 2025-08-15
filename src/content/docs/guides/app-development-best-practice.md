---
title: Application Development Best Practice
description: Guide for software developers
sidebar:
    order: 2500
    label: App Development Best Practice
lastUpdated: 2025-08-15
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

Language names can be ambiguous. To get around this, the computer industry uses a standard language identification string, or _language tag_, for each language. It includes information, either explicitly or implicitly, about the script (Latin script, Arabic script, Cyrillic script, etc.) and region (most often a two-letter country code, but other codes are possible). Although it is commonly called a _language tag_ (or _langtag_) it actually identifies a particular writing system or orthography. It is sometimes called a _BCP 47 tag_, based on an [IETF standard][bcp47] and [extensions][bcp47ext].

Note that even though the BCP 47 standard is relatively recent, it is composed of existing standards for identifying language, script, and region which have been in use for much longer. The BCP 47 code for many languages is simply the three-letter ISO 639 code (based on the Ethnologue identification system) that indicates the language, omitting the script and region codes, since those are implied. The BCP 47 information is complex, which is not surprising given the complexity of classifying human language.

SIL curates a public _langtags_ repository that seeks to bring together the relevant information in one place and list sets of equivalent tags. Applications can use this data to properly tag text. For more information on both language tags and SIL's repository see [Language Tagging][language-tagging].

A language tag also has a broader use, and corresponds to a particular _locale_ that may include region information plus possible further specification. Data about a locale is collected in the industry-wide CLDR (Common Locale Data Repository) and stored in LDML (Locale Data Markup Language) format. SIL has a corresponding repository, the SLDR (SIL Locale Data Repository), which pulls data from the CLDR, but also accepts data that is not complete enough for submission to the CLDR. An API exists to obtain both LDML data and language tag information. For more information on locale data, the CLDR, and SLDR, see [Locale Data][locale-data].

[bcp47]: https://codehivetx.us/en/posts/2024-bcp47.html
[bcp47ext]: https://codehivetx.us/en/posts/2024-bcp47-extensions.html
[language-tagging]: /topics/writingsystems/language-tagging
[locale-data]: /topics/writingsystems/locale-data

## Text encodings and Unicode

Applications operate on data that is stored as numbers. When that data is language text there must be an encoding standard that makes the connection between the number being stored and the character it represents. Thankfully there is a global standard for associating numbers and characters: _Unicode_.

Unicode is an encoding standard that aims to support all the world's languages and scripts. It provides the best way to encode language data. **All application data should be stored according to The Unicode Standard.** If you have to deal with data in encodings other than Unicode see [Legacy Encodings][legacy-encodings], however, any data in other encodings should be converted to Unicode for storage and application use.

For guidance on Unicode and how to use it see the article on [The Unicode Standard][the-unicode-standard].

The article on [Unicode Concepts][unicode-concepts] addresses important topics, such as:

- _Transformation Formats_ for storing Unicode code points as multiple bytes. **Text should be read and interpreted according to the proper encoding and transformation format.**
- _Character Properties_ that associate a character with one or more scripts and set basic behavior (direction, casing, combining, and others). **Characters need to be used in ways that are consistent with their properties.**
- _Normalization Forms_ for handling both _composed_ (NFC) and _decomposed_ (NFD) sequences. **Applications should carefully consider how composition, decomposition and normalization affect both data input and export.**
- _Glyph Similarities_, _Case Mapping_, _Canonical Ordering_, _Rendering Behaviors_, and other concepts.

Unicode has reserved several blocks of characters for private use. These [Private Use Area (PUA)][private-use-area] characters only have meaning if everyone using that data agrees on it.

[legacy-encodings]: /topics/encoding/legacy-encodings
[private-use-area]: /topics/encoding/private-use-area
[the-unicode-standard]: /topics/encoding/the-unicode-standard
[unicode-concepts]: /topics/encoding/unicode-concepts

## Input and keyboarding

Text is usually input using a physical or on-screen keyboard, but may also be entered through other input methods. Keyboard-based methods are defined through _keyboard layouts_. These may match national standards or reflect a unique language community's preference.

Operating systems offer a variety of keyboard layouts for major languages. For computers, a layout is often chosen that matches the key labels on the physical keyboard. For lesser resourced languages, a keyboarding solution such as [Keyman][keyman] may be needed to allow text in that language to be typed. 

There are two ways for the association between the right keyboard, the text, and the language identification of that text to be arranged:

- The application knows what language the text is in and tells the keyboarding system to use the appropriate layout.
- The user selects a keyboard layout which communicates to the operating system the language of the text being entered. Then the application can deal with it appropriately.

**Applications should consider how to manage both of these scenarios and how to support keyboard layout choices for their users.**

[From Keystrokes to Codepoints][from-keystrokes-to-codepoints] and linked articles give more information on input and keyboarding considerations.

[from-keystrokes-to-codepoints]: /topics/input/from-keystrokes-to-codepoints
[keyman]: https://keyman.com/

## Shaping, rendering, and layout

When text is displayed on a screen or printed on paper or when a PDF file is created, the Unicode characters of the text are _rendered_ using a font that maps Unicode characters to specific glyphs (character shapes) and contains position information about those glyphs. Choosing a different font changes the glyphs used to create the visual representation of the text. The glyphs are then arranged in lines, paragraphs, and pages. The term _rendering_ is used to refer to both the whole process as well as one particular part.

There are three aspects to this process: 

- _Shaping_ - converting character sequences to glyph sequences. This highly specific to an individual script or script family, and may be very simple or highly complex. Shaping systems are provided by operating systems (e.g. Microsoft's DirectWrite) but can also be cross-platform. **We recommend that application developers choose a text framework that supports the Harfbuzz shaping engine.** It is the most versatile shaper and supports multiple platforms. For more information see [Shaping and Rendering][shaping-and-rendering].
- _Rendering_ - choosing the proper form and position of glyphs based on the chosen font. This involves applying script-specific behaviors such as diacritic positioning and ligature formation, but also user-chosen behaviors and glyph variants (often called _features_) such as small capitals and alternate letterforms. Multiple rendering systems are in use, including SIL's Graphite, however, **applications should focus on fully supporting OpenType, including providing an interface that allows for user control of all feature settings**. These rendering systems are covered in [Shaping and Rendering][shaping-and-rendering] and in the sections below.
- _Layout_ - forming, formatting, and positioning paragraphs, including sizing, indentation, color, and many other aspects. The various properties of layouts an application supports (styles of indentation, lists, headings, etc.) depends on the purpose of the application. These need to take into account any script-specific conventions that apply to those layout elements. _This is particularly important for applications that intend to support RTL (right-to-left) scripts (e.g. Arabic, Hebrew)._ **Applications need to understand and properly support script-specific layout conventions for the layout options they provide to users.** For examples see the articles in the [Layout topic][layout-overview].

### Complex rendering

Those who speak and write European languages often have a very simple concept of rendering, where there is a one-to-one correspondence between characters and glyphs and those glyphs are laid out in a straightforward left-to-right order. But many scripts require much more complexity in the rendering process. Some of these complexities include:

- _Contextual shaping_ - where the shape of the glyph depends on adjacent characters or its position within the word.
- _Ligatures_ - where two or more characters combine into a single shape. In the Arabic script, for example, when a _lam_ character (ل) is followed by an _alif_ character (ا), the two characters combine to form a single shape (لا).
- _Complex positioning_ - where diacritics must stack up or be positioned in various ways in order to be readable.
- _Reordering_ - where glyphs appear to the left or above or below characters that precede them in the data.
- _Splitting_ - where a single character is displayed using two disjoint glyphs.
- _Bidirectionality_ - where in some right-to-left scripts, numbers are written left to right.

To achieve these complex behaviors, fonts include rules that are interpreted by rendering engines. The most common of these systems is [OpenType][opentype], which is built into most operating systems and has become the industry standard. SIL developed its own smart-font system called [Graphite][graphite], which provides more flexible support for some complex scripts, but has much less application support. See [Shaping and Rendering][shaping-and-rendering].

For visual examples of these behaviors see [Examples of Complex Rendering][ss-complex-rendering] and [Reordering and Data Storage Order][ss-reordering]. **Developers who wish to support RTL scripts need to understand the [Unicode Bidi Algorithm][unicode-bidi-algorithm].**

### Font features and glyph variants

The font selected to display the text needs to support all the characters in the text, plus any rendering support needed by the language and/or script. If a character is missing, the operating system will try to substitute the corresponding character from another font (which may result in characters of uneven size or design being displayed), or it may just appear as a square box. If the needed rendering information is missing, characters may end up misaligned or malformed. 

In addition, a language may require particular glyph variants for a character. For example, in African languages, the uppercase _eng_ is typically in the shape of the lowercase _eng_ (ŋ), just larger. In North and South American and European languages where the _eng_ is used, the uppercase equivalent is generally in the form of an uppercase 'N' with a hook. The same codepoint is used for both styles.

**Applications need to apply these glyph variants when appropriate, based on language tag and locale information and/or through user-controlled features.** This can be done in three ways, and applications should support all three possible scenarios:

- _Font contains language-specific features_ - Some fonts contain features for glyph variants that are automatically turned on when the text is tagged with a specific language tag. This requires interaction between the application and rendering engine, and is unfortunately not well supported in common applications. An example of this type of feature is the [_Serbian Cyrillic alternates_][gentium-langsr] feature in the Charis, Gentium, and Andika fonts.
- _Font contains user-controlled features_ - These are glyph variant features or behaviors that a user can explicitly choose to apply to the selected text (or style definition). These features may not be simple on/off features and may have multiple options. An example is the [_Eng_][gentium-cv43] feature that offers three glyph variants. **Applications need to provide a good user interface that allows users to control these features.** One user-friendly way to support this is to provide a dialog that offers a choice of the variants available in the font. Ideally the choice of variants would only be offered if relevant to the language.
- _Application applies appropriate features based on language and locale data_ - In some cases, the locale data for a language contains information on the preferred glyph variant features that should be used. This is stored in the SLDR file for the language tag, and can be obtained using the LDML API. See [Locale Data][locale-data] and related articles.

For more information on font features see [OpenType][opentype].

[gentium-cv43]: https://software.sil.org/gentium/features/#cv43
[gentium-langsr]: https://software.sil.org/gentium/features/#langsr
[graphite]: https://graphite.sil.org/
[layout-overview]: /topics/layout/layout-overview
[opentype]: /topics/fonts/opentype
[shaping-and-rendering]: /topics/fonts/shaping-and-rendering
[ss-complex-rendering]: https://scriptsource.org/entry/lu6terdg9u
[ss-reordering]: https://scriptsource.org/entry/l5bvp27v3r
[unicode-bidi-algorithm]: /topics/encoding/unicode-bidi-algorithm

## Text analysis and conversion

Many features of applications depend on analysis of the text - word and line breaking, sorting, searching, spell-checking - or the conversion (transformation) of the text from one encoding into another. If the text is simple, strictly LTR (left-to-right), with no diacritics or complex shaping behaviors, and straightforward script conventions, there are good, well-established tools and patterns that can be used. However, even common, well-resourced languages (e.g. English) provide some significant challenges. Complex scripts can multiply these challenges.

If your application relies on text analysis for some functions, or needs to convert text between encodings or transformation formats (NFC, NFD, and others), or needs to manage cross-script transliteration, see [Analysis Overview][analysis-overview] for important information.

[analysis-overview]: /topics/analysis/analysis-overview
