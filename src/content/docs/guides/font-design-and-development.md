---
title: Font Design & Development
description: Font development, design, structures, metadata, and production
sidebar:
  order: 5200
lastUpdated: 2025-07-28
---

Font development involves both creative graphic design and careful technical engineering. This guide and the accompanying articles have been written to document what we think are the best technical practices to use in font development. They are generally the practices we use — or intend on using as soon as practically possible.

This is not intended to be a comprehensive encyclopedia of font development information, nor to cover the full range of techniques and options. It will generally offer a single recommended procedure, setting, or tool. However, we encourage adding links to alternatives when appropriate. It is very much a work in progress.

The purpose of these articles is to give helpful guidance to those who want to create fonts that work well in the intended environments. The recommendations may seem at times dogmatic, but that's the nature of recommendations based on well-informed opinion. With each recommendation we've tried to provide some indication of whether it's subjective opinion or objective fact. Recommendations are generally in **bold**, and they fall into four loose types:

- **"Developers may choose to"** - there is no single good option, and developers should consider various alternatives.
- **"We recommend that"** - there seems to be one option that is best for most developers, that we ourselves have chosen and that we suggest that others follow.
- **"Ascender and descender values should"** - there is clearly a best option and to do otherwise would be asking for problems.
- **"Production glyph names must"** - if you don't do this then your font is unlikely to work properly.

## Other resources

There are also other reliable sources for information on good font development practice. Their guidance may differ slightly from what is here but is generally sound. 

[Fonts and Layout for Global Scripts][cozens-flgs] has some excellent foundational material on font concepts and a detailed introduction to the complexities of OpenType.

The [Google Fonts Guide][gf-guide] contains information for font developers wishing to submit their fonts to the [Google Fonts service][gf]. Although some of the guidance is unique to Google Fonts, much of it is generally good practice.

The [Glyphs site][glyphs-learn] has many useful tutorials and technical articles. Most of them focus on using Glyphs, but also document good design techniques. 

## Background knowledge

These articles assume a certain amount of background knowledge. Some of this depends on the specific subject. For example, a font designer who is drawing glyphs needs to know different things than a script engineer who is constructing OpenType tables.

The most important background knowledge that all those involved in font development need to have is an understanding of the differences and interrelationships between [characters, keystrokes, codepoints and glyphs][characters-codepoints-glyphs]. It is also important to understand the basic contents and structure of an OpenType/TrueType font. [An Introduction to TrueType Fonts][iws-c8] provides a brief orientation for designers and engineers.

## Design, development, and production tools

There are four primary visual font design tools, each with their particular strengths:

- [Glyphs][glyphs] - The _de facto_ current standard for font design. macOS only.
- [FontLab][fontlab] - Excellent cross-platform (macOS & Windows) tool with particularly good support for variable font development.
- [Robofont][robofont] - Powerful, flexible, and highly extensible design tool, especially for working with [UFO][unified-font-objects-ufo] sources. macOS only.
- [FontForge][fontforge] - Free and open source tool that can run on Linux, macOS, and Windows. No longer well-maintained and can be difficult to use, but continues to be used successfully.

[Python Tools][python-tools] describes some very useful libraries and scripts for font development and production.

Font design tools can export fonts in common formats (.ttf, .otf, .woff) but the process can be complex and time consuming for a large font family or portfolio of font families. Foundries often develop their own automated internal font build systems and workflows to produce fonts from Glyphs or UFO sources. These connect a variety of tools to compile and build fonts. Two of the publicly-available systems are:

- [fontmake][fontmake] - This is the most widely used build system, developed by Google, although it's only one part of their overall workflow.
- [Smith][smith] - SIL-developed framework for building, testing, and maintaining fonts and other writing system components.

## Technical topics

The articles linked below touch on some of the key topics in font development and engineering.

[Font formats][font-formats] describes the main production font formats and the separate development source formats used to produce them, including the text-based open [Unified Font Objects (UFO)][unified-font-objects-ufo] format.

Important font metadata and font family structures are addressed in [Font & Style Naming][font-and-style-naming] and [Versioning][versioning].

[Design Metrics][design-metrics] gives important guidance on how to set the relative size of your font in relation to others. [Line Metrics][line-metrics] describes the many different internal values that affect default line spacing and gives three techniques for making them consistent across platforms and devices.

[Character Support][character-support] discusses how to choose which characters your font should support, including a basic minimal list, and how to set Unicode range settings. [Glyph naming][glyph-naming] describes how to set both working and production glyph names, including detailed information on the [Adobe Glyph List (AGL)][adobe-glyph-list] standard.

[Shaping & Rendering][shaping-and-rendering] gives links to the main technologies used to implement complex script behaviors. The most important of these is discussed in [OpenType][opentype], with a special focus on custom _stylistic set_ and _character variant_ features and the [User Interface Strings][user-interface-strings] used to describe them to font users.

[Copyright & Licensing][copyright-and-licensing] focuses on how to properly declare copyright for your fonts and indicate the license used to distribute them. It also gives information on how to use the SIL Oopen Font License.

_Font testing is not currenty covered in this guide, but will be in the future._

## Building and modifying SIL fonts

See the [SIL Font Development Guide][silfontdev] for detailed guidance on how to build, modify, and contribute to [SIL font projects][sil=fonts].


[adobe-glyph-list]: /topics/font/adobe-glyph-list
[character-support]: /topics/font/character-support
[characters-codepoints-glyphs]: /topics/encoding/characters-codepoints-glyphs
[copyright-and-licensing]: /topics/fonts/copyright-and-licensing
[cozens-flgs]: https://simoncozens.github.io/fonts-and-layout/
[design-metrics]: /topics/font/design-metrics
[font-and-style-naming]: /topics/fonts/font-and-style-naming
[font-formats]: /topics/fonts/font-formats
[fontforge]: https://fontforge.org/
[fontlab]: https://www.fontlab.com/
[fontmake]: https://github.com/googlefonts/fontmake
[gf]: https://fonts.google.com/
[gf-guide]: https://googlefonts.github.io/gf-guide/
[glyph-naming]: /topics/font/glyph-naming
[glyphs]: https://glyphsapp.com/
[glyphs-learn]: https://glyphsapp.com/learn
[iws-c8]: http://scripts.sil.org/IWS-Chapter08
[line-metrics]: /topics/font/line-metrics
[opentype]: /topics/fonts/opentype
[python-tools]: /topics/fonts/python-tools
[robofont]: https://robofont.com/
[shaping-and-rendering]: /topics/fonts/shaping-and-rendering
[silfontdev]: https://silnrsi.github.io/silfontdev/en-US/index.html
[sil-fonts]: https://software.sil.org/fonts/
[smith]: https://github.com/silnrsi/smith
[unified-font-objects-ufo]: /topics/fonts/unified-font-objects-ufo
[user-interface-strings]: /topics/fonts/user-interface-strings
[versioning]: /topics/fonts/versioning
