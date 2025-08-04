---
title: Character Support
description: Choosing which characters should be supported
sidebar:
  order: 5350
lastUpdated: 2025-07-23
---

It may seem obvious that a font must contain symbols for each _letter_ or _character_ of the writing system in focus. However, each of those _characters_ may be visually represented by one or more _glyphs_ - the individual graphic shapes defined in the font. At this point it's really important to have a clear understanding of the differences and interrelationships between [characters, keystrokes, codepoints and glyphs][characters-codepoints-glyphs].

## Which characters should be supported?

**When choosing which characters to support we recommend that you consider the full range of uses for the font, both linguistic and typographic.** In addition to the basic letters, numerals, and punctuation, you may need to consider:

- letters and diacritics used for loan words, foreign terms, or names
- punctuation used in publishing applications, such as formal quote marks, text markers, footnote symbols, and special-width spaces

You may also need to consider alternate glyphs for special purposes, and create smart font rules for them:

- different numeral forms (old-style and tabular in Latin, for example)
- contextual alternates and ligatures

**Non-Latin fonts should also contain a basic set of Latin glyphs.** For technical reasons, the font is less likely to cause problems in certain operating systems and environments if a basic Latin set is present. Our recommendation is that you support the following list: [Basic Set of characters needed in a Non-Roman font][pysilfont-req-chars]. Some characters from that list may only be needed if the font supports right-to-left text - See the [legend][pysilfont-req-chars-legend].

If you don't want to draw all of these Latin glyphs yourself, and are making a font that will be released freely under the [SIL Open Font License][ofl], you can get the glyphs from some other OFL font as long as you acknowledge the source and follow the conditions of the OFL.

### Avoid encoding characters below U+0020 SPACE

**We recommend that fonts not encode characters below U+0020 SPACE.** Specifically, the glyphs `.null` (sometimes called `NULL`), `CR` (may be called `nonmarkingreturn`), `tab`, or anything else before the `space` glyph should not be assigned Unicode values. The reason for this is that some applications will try to render any glyph that is encoded, including `CR`, which could affect paragraphs of right-aligned text.

These Unicode values are typically assigned to glyphs using font design programs, however, be careful that no other tool is overriding them. For example, Microsoft VOLT `.vtp` files can reencode glyphs using `DEF_GLYPH`.

## Indicating which Unicode ranges are supported

There are two means within an OpenType font to indicate which scripts and Unicode ranges a font supports: the OpenType _ulUnicodeRange_ bits in the `OS/2` table and the newer `meta` table.

### ulUnicodeRange

The [OpenType OS/2 table specification][otspec-os2ur] lists the ranges defined by _ulUnicodeRange_ and which bits must be set to indicate support for that range. Most font editors provide a user interface that lists the ranges and allows you turn ranges on and off, so hacking bit fields is rarely necessary.

According to [Peter Constable's presentation at TYPO Labs 2018][constable2018] the _ulUnicodeRange_ field is rarely used anymore by OSes to determine font script coverage. One major reason is that the field has run out of space, and no new ranges can be added. However there are older systems that still look at this info, so **the _ulUnicodeRange_ bits should be set if the font is intended to support any of the ranges defined in the [spec][otspec-os2ur]**.

One special case: **If the font includes any supplemental plane characters, then the _Non-Plane 0_ bit (57) should be set. This is true whether or not the character is in a range that has a _ulUnicodeRange_ bit defined**. So in the case of Phoenician, which is in a supplemental plane (10900-1091F) and has a defined bit (58), both that bit and the _Non-Plane 0_ bit (57) should be set.

### `meta` table

Because of the above-mentioned limitations of the existing _ulUnicodeRange_ field, the [meta table][otspec-meta] was added to the OpenType specification (starting with version 1.8 in 2016). Use of this table is rare, and many font developers still do not include it in their fonts. **You may want to include the 'meta' table describing the languages and scripts for which the font was designed as well as the languages and scripts that the font is capable of supporting.**

[characters-codepoints-glyphs]: /topics/encoding/characters-codepoints-glyphs
[constable2018]: https://www.youtube.com/watch?v=eVWWAvhzrq8
[ofl]: https://openfontlicense.org
[otspec-os2ur]: https://www.microsoft.com/typography/otspec/os2.htm#ur
[otspec-meta]: https://learn.microsoft.com/en-us/typography/opentype/spec/meta
[pysilfont-req-chars]: https://github.com/silnrsi/pysilfont/blob/master/src/silfont/data/required_chars.csv
[pysilfont-req-chars-legend]: https://github.com/silnrsi/pysilfont/blob/master/src/silfont/data/required_chars.md
