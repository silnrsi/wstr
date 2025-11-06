---
title: Font and Style Naming
description: Font naming standards
sidebar:
  order: 5310
  label: Font & Style Naming
tags: [naming, opentype]
lastUpdated: 2025-07-21
---

Fonts typically have two names by which they're identified: the internal font name that appears in application menus and the font filename. **These two names should be synchronized in a particular way.**

## Internal font family names

The most effective font family names (those seen in application menus, etc.) have a few characteristics:

- They are unique to the particular font family.
- They do not include "Unicode", as most fonts are Unicode-encoded. If the font is _not_ Unicode-encoded, then an indication of that may be added to the name, as in "Anaconda L" (for legacy).
- They do not include specific script or language names. If a font family has multiple language-specific versions, then some indication of the language (such as an [Ethnologue][ethnologue] code), may be added, as in "Anaconda GDX".
- They are not strongly geographic, such as the name of a province or city. In some situations a font named after a particular place can cause people in other areas to not use it.
- They are not references to particular people, such as political leaders or recent cultural heroes. Legendary or historic names are much better, as long as they are not strongly exclusive to a certain subculture.
- They may include spaces, but not numerals or any punctuation. There are some rare situations in which numbers can cause technical problems.

New font names should be checked for conflicts with existing fonts. The easiest way to do that is to search on [namecheck.fontdata.com][namecheck], although a thorough Google search would also be a good idea.

**Because of technical limits on the combination of family name and style name the combined `FamilyName StyleName` should be no more than 30 characters, including any spaces.** Some sources suggest that 27 is a safer limit. If a font family may someday include an `ExtraLightItalic` style, then the family name is effectively limited to 13 characters or less.

## Font filenames

An individual font file name is typically no different from that of other files in an operating system, and is (for the most part) only bound by the limitations on legal names in that operating system. **However there is a pattern of font file naming that has become reasonably common, and that we recommend:**

> FontFamilyName-StyleName.otf

Filenames should reflect the internal family and style names in the font. Here the spaces are removed in the family name and between any weight or style names, then a single hyphen is placed between the two. For example, the Bold Italic weight of "Source Sans Pro" would be named:

> SourceSansPro-BoldItalic.otf

Note that even if there is only one style in the family, that style should be included in the font filename, for example:

> Lateef-Regular.ttf

## Style names

Style names should use names that reflect common CSS values. Note that there are no spaces. Special capitalization is also very important for styles such as _SemiBold_:

| CSS | Upright | Italic |
| - | - | - |
| 100 | Thin | ThinItalic |
| 200 | ExtraLight | ExtraLightItalic |
| 300 | Light | LightItalic |
| 400 | Regular | Italic |
| 500 | Medium | MediumItalic |
| 600 | SemiBold | SemiBoldItalic |
| 700 | Bold | BoldItalic |
| 800 | ExtraBold | ExtraBoldItalic |
| 900 | Black | BlackItalic |

For guidance on how these family names and styles names should be reflected in specific font data tables, and suggestions about how fonts in extended style families (e.g. Condensed) should be named, see [Google's spec for static fonts][gf-statics]. However, Google's recommendations are primarily for fonts that are to be hosted on their webfont service and may be unnecessarily limited.

## Name strings stored in OpenType fonts

Within the OpenType font file, the naming table (tag `name`) allows multilingual strings to be associated with the font. These strings can represent copyright notices, font names, family names, style names, feature names and values, etc.. Within the naming table, such strings are organized by Platform, Encoding, Language, and NameID.

### Platform-specific names

In the early days of TrueType and OpenType, different operating systems needed different encodings for these strings. Apple operating systems needed names stored using "script manager" encodings, while Microsoft operating systems used UCS-2. In those days for a font to work on multiple platforms, each name (e.g., the _family name_ or _style name_) had to be included in the naming table multiple times (once for each platform).

While today's OpenType specification still permits inclusion of multiple platform-specific versions of each name, it is no longer necessary to do so, and they only serve to increase the size of the font file with no benefit. Operating systems generally use the PlatformID 3 (Windows) and EncodingID 1 (Unicode BMP) values.

**We recommend that OpenType fonts do not include any strings with PlatformID values other than 3 (Windows) in the (`name`) table**, as all modern operating systems will use naming tables constructed in this way.

### Language-specific names

The naming table allows for any given name (e.g., _family name_) to be provided in more than one language. However, **every naming (`name`) table entry must be provided in at least the English language.**

[ethnologue]: https://www.ethnologue.com/
[gf-statics]: https://googlefonts.github.io/gf-guide/statics.html
[namecheck]: https://namecheck.fontdata.com
