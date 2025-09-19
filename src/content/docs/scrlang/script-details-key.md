---
title: Scripts Details Explanation
description: Documentation of the script detail items
sidebar:
    hidden: true
lastUpdated: 2025-08-29
---

The following describes information and values that are shown in the Script Details section of the script pages.

- **Code**: the _ISO 15924 Alpha-4 Code_ as defined by the [ISO 15924 standard][iso-15924]. It consists of four characters.
- **Script type** - possible values are:
    - [alphabet](/reference/glossary#alph)
    - [abjad](/reference/glossary#abjad)
    - [abugida](/reference/glossary#abugida)
    - [featural](/reference/glossary#featws)
    - [logosyllabary](/reference/glossary#logosyl)
    - [syllabary](/reference/glossary#syllabary)
- **Region** - possible values include:
    - African
    - American
    - Artificial - specifically invented rather than having developed historically over time
    - Central Asian
    - East Asian
    - European
    - Indic
    - Insular Southeast Asian - historically unrelated to other Southeast Asian scripts
    - Mainland Southeast Asian
    - Middle Eastern
    - Pacific
    - Signed Language
- **Status** - possible values are:
    - Current - currently in use for currently-spoken languages
    - Historical - used in the past
    - Academic - developed for academic purposes
    - Fictional - developed for use in books, TV shows, etc.
    - Unclear
- **Direction** - possible values are:
    - LTR - written horizontally left to right
    - RTL - written horizontally right to left
    - RTL bidirectional - written right to left with numbers written left to right
    - vertical (LTR) - written vertically with the columns laid out left to right
    - vertical (LTR) and horizontal (LTR) - may be written with either approach
    - vertical (LTR) and horizontal (RTL) - may be written with either approach
    - vertical (RTL) - written vertically with the columns laid out right to left
    - vertical (RTL) and horizontal (LTR) - may be written with either approach
    - vertical (RTL) and horizontal (RTL) - may be written with either approach
    - [boustrophedon](/reference/glossary#boust) - written LTR and RTL on alternating lines
    - other
- **Baseline** - possible values are:
    - hanging - glyphs are aligned at the top as if hanging from a "clothesline"
    - centered - glyphs are aligned at their vertical centers
    - bottom - glyphs are aligned at or near the bottom of the glyphs
    - vertical - glyphs are asligned at their horizontal centers; used for vertical scripts
    - Also see [_baseline_](/reference/glossary#baseline)
- **Case** - the script includes both upper- and lower-case forms
- **White space** - possible values are:
    - between words - white space is required between words
    - between phrases - white space is used between grammatical phrases
    - discretionary - white space may be used to enhance readability
    - none - white space is never used
- **Complex behaviors** - describes complexities such as 
    - contextual shaping - the shape of glyphs may change depending on neighboring characters
    - complex positioning - the position of glyphs may change
    - reordering - the [visible or rendered order](/reference/glossary#visorder) of the glyphs does not match the [logical or storage order](/reference/glossary#logorder)
    - split graphs - some characters are be rendered with two or more glyphs that are not visibly adjacent
    - [ligatures](/reference/glossary#ligature) - two or more characters may be rendered with a single glyph
    - Also see [_complex script_](/reference/glossary#complexscript)
- **OpenType code** - defined by the [OpenType](/reference/glossary#opentype) font system for indicating script-specific behaviors
- **ISO 15924 number** - the _ISO 15924 Numeric Code_ as defined by the [ISO 15924 standard][iso-15924]. It is  used to sort scripts by type.

[iso-15924]: https://www.unicode.org/iso15924/iso15924.txt