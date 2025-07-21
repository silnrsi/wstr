---
title: Font Formats
description: Production and source formats
sidebar:
  order: 5210
lastUpdated: 2025-07-21
---

## Installable production formats

The most common format for fonts used on computers and mobile devices is [OpenType][wiki-opentype]. There are two primary _flavors_ of OpenType fonts, TrueType (.ttf) and CFF (.otf). The primary difference between them is how glyph outlines are defined. Both offer the same advanced typograpic features. Font design tools happily read, write, and convert between them. The older [TrueType ][wiki-truetype] (only) format, which confusingly shares the same file extension (.ttf), did not offer advanced features.

Web fonts have also had a variety of _flavors_ (WOFF, SVG, EOT, and others), however the current standard is [WOFF/WOFF2][wiki-woff], which repackages OpenType fonts into a highly compressed and efficient file. All font design tools and current web browsers support WOFF.

[Variable fonts][moz-variable-fonts] (a.k.a. OpenType Font Variations) are a special type of OpenType font that can incorporate multiple design axes (e.g. weight, width, optical size) in a single file and in a highly efficient manner. This is particularly useful for webfonts where font payload is a concern.  

## Development source formats

Although many font tools can use production formats as source for derivative fonts, it is more common to store master font data in formats specifically designed for that purpose. These are not installable fonts — they contain the information needed to produce installable fonts. These source formats are usually associated with a particular application. They contain additional data (e.g. guidelines, multiple layers, notes) that may be useful in the design process but are not present in the end-user font. The formats vary in their levels of openness and documentation. Here are some applications and their source formats:

- [Glyphs][glyphs] (.glyphs, .glyphspackage)
- [FontLab][fontlab] (.vfb, .vfc, .vfj)
- [FontForge][fontforge] (.sfd)

**We recommend that new font projects avoid these proprietary formats and instead adopt open, platform-neutral standards:**

- [Unified Font Objects (UFO)][ufo] (.ufo) — for individual glyphs and fonts
- [Designspace][designspace] (.designspace) - for defining font family structures

UFO is a public, human-readable, text-based source format for storing font source data. It's now being used by many foundries, including Adobe, as their primary source format. [Read more about using UFO][unifed-font-objects-ufo]. Designspace is a companion standard that can be use to define both the relationship between source UFOs in a font family and the instances generated from them in the production process.

All main font design and production tools support UFO import/export. The [glyphsLib][glyphslib] project provides a programmatic bridge between Glyphs and UFO formats.

[designspace]: https://fonttools.readthedocs.io/en/stable/designspaceLib/xml.html#document-xml-structure
[fontforge]: https://fontforge.org/
[fontlab]: https://www.fontlab.com/
[glyphs]: https://glyphsapp.com/
[glyphslib]: https://github.com/googlefonts/glyphsLib
[ufo]: https://unifiedfontobject.org/
[unifed-font-objects-ufo]: /topics/fonts/unifed-font-objects-ufo
[wiki-opentype]: https://en.wikipedia.org/wiki/OpenType
[wiki-truetype]: https://en.wikipedia.org/wiki/TrueType
[wiki-woff]: https://en.wikipedia.org/wiki/Web_Open_Font_Format
[moz-variable-fonts]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide
