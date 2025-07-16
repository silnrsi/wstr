---
title: Font Design & Development
description: Font development, design, structures, metadata, and production
sidebar:
  order: 5200
lastUpdated: 2025-07-16
---

Font development involves both graphic design and technical engineering. Here are some useful resources.

## General resources

[Font Development Best Practice (FDBP)][fdbp] provides detailed technical guidance on font development. We plan to eventually migrate the contents of FDBP to this site. The information below is only a small portion of that available in FDBP.

[Fonts and Layout for Global Scripts][cozens-flgs] has some excellent foundational material on font concepts and a detailed introduction to the complexities of OpenType.

The [Google Fonts Guide][gf-guide] contains information for font developers wishing to submit their fonts to the [Google Fonts service][gf]. Although some of the guidance is unique to Google Fonts, much of it is generally good practice.

The documentation for font design tools, such as [Glyphs][glyphs] and [FontLab][fontlab] is also a rich source of information.

## Formats

The most common format for fonts used on desktop computers is [OpenType][wiki-opentype]. There are two primary _flavors_ of OpenType fonts, TrueType (.ttf) and CFF (.otf). The primary difference between them is how glyph outlines are defined. Both offer the same advanced typograpic features. Font design tools happily read, write, and convert between them. The older [TrueType ][wiki-truetype] (only) format, which confusingly shares the same file extension (.ttf), did not offer advanced features.

Web fonts have also had a variety of _flavors_ (WOFF, SVG, EOT, and others), however the growing standard is [WOFF/WOFF2][wiki-woff], which repackages OpenType fonts into a highly compressed and efficient file. All font design tools and current web browsers support WOFF.

Font sources are stored in a variety of formats. These are not installable fonts:

- [Glyphs][glyphs] (.glyphs, .glyphspackage)
- [FontLab][fontlab] (.vfb, .vfc, .vfj)
- [FontForge][fontforge] (.sfd)
- [Unified Font Object (UFO)][ufo] (.ufo)

We recommend that font projects use UFO (version 3) and avoid proprietary formats. UFO is a public, platform-neutral, human-readable, text-based source format for storing font source data. It is used by many foundries, including Adobe, as their primary source format. See the [FDBP][fdbp-ufo] for more information on using UFO.

Another common source format, Glyphs, is well-supported but tends to constantly change and does not have an well-maintained public standard. The [glyphsLib][glyphslib] project provides a bridge between the Glyphs and UFO formats.

## Font naming, versioning, metrics, and metadata

See the [FDBP sections on metadata][fdbp-metadata]

## Design and development tools

In addition to the font tools mentioned earlier ([Glyphs][glyphs], [FontLab][fontlab], [FontForge][fontforge], and [glyphsLib][glyphslib]) there are a few other notable tools for design and engineering:

- [Robofont][robofont] - Powerful and flexible design tool for UFO sources
- [fonttools][fonttools] - Python-based library for manipulating fonts
- [FontParts][fontparts] - Python-based API for creating and editing parts of fonts
- [pysilfont][pysilfont] - Python-based utilities, mainly for working with UFO sources
- [Font Bakery][font-bakery] - Automated font testing tool

## Production and distribution tools

Font design tools can export fonts in common formats (.ttf, .otf, .woff) but the process can be complex and time consuming for a large font family or portfolio of font families. Foundries often develop their own automated internal font build systems and workflows to produce fonts from Glyphs or UFO sources. These connect a variety of tools to compile and build fonts. Two of the publicly-available systems are:

- [fontmake][fontmake] - This is the most widely used build system, developed by Google, although it's only one part of their overall workflow.
- [Smith][smith] - Framework for building, testing, and maintaining fonts and other writing system components.

## Modifying and building SIL fonts

See the [SIL Font Development Guide][silfontdev] for detailed guidance on how to build, modify, and contribute to [SIL font projects][silfonts].


[cozens-flgs]: https://simoncozens.github.io/fonts-and-layout/
[fdbp]: https://silnrsi.github.io/FDBP/en-US/index.html
[fdbp-metadata]: https://silnrsi.github.io/FDBP/en-US/Font_Metadata.html
[fdbp-ufo]: https://silnrsi.github.io/FDBP/en-US/UFO.html
[font-bakery]: https://github.com/fonttools/fontbakery
[fontforge]: https://fontforge.org/
[fontlab]: https://www.fontlab.com/
[fontmake]: https://github.com/googlefonts/fontmake
[fontparts]: https://fontparts.robotools.dev/en/stable/
[fonttools]: https://github.com/behdad/fonttools
[gf-guide]: https://googlefonts.github.io/gf-guide/
[glyphs]: https://glyphsapp.com/
[glyphslib]: https://github.com/googlefonts/glyphsLib
[gf]: https://fonts.google.com/
[pysilfont]: https://github.com/silnrsi/pysilfont
[robofont]: https://robofont.com/
[silfontdev]: https://silnrsi.github.io/silfontdev/en-US/index.html
[silfonts]: https://software.sil.org/fonts/
[smith]: https://github.com/silnrsi/smith
[ufo]: https://unifiedfontobject.org/
[wiki-opentype]: https://en.wikipedia.org/wiki/OpenType
[wiki-truetype]: https://en.wikipedia.org/wiki/TrueType
[wiki-woff]: https://en.wikipedia.org/wiki/Web_Open_Font_Format
