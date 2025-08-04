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

[Fonts and Layout for Global Scripts][cozens-flgs] has some excellent foundational material on font concepts and a detailed introduction to the complexities of OpenType. (Even if some sections are still being written).

The [Google Fonts Guide][gf-guide] contains information for font developers wishing to submit their fonts to the [Google Fonts service][gf]. Although some of the guidance is unique to Google Fonts, much of it is generally good practice.

The [Glyphs site][glyphs-learn] has many useful tutorials and technical articles. Most of them focus on using Glyphs, but also document good design techniques.

The [Design With FontForge book][design-with-fontforge] can also be of interest.

## Background knowledge

These articles assume a certain amount of background knowledge. Some of this depends on the specific subject. For example, a font designer who is drawing glyphs needs to know different things than a script engineer who is constructing OpenType tables.

The most important background knowledge that all those involved in font development need to have is an understanding of the differences and interrelationships between [characters, keystrokes, codepoints and glyphs][characters-codepoints-glyphs]. It is also important to understand the basic contents and structure of an OpenType/TrueType font. [An Introduction to TrueType Fonts][iws-c8] provides a brief orientation for designers and engineers.

## Design, engineering, and production tools

There are five primary visual font design tools, each with their particular strengths:

- [Glyphs][glyphs] - The _de facto_ current standard for font design. macOS only.
- [FontLab][fontlab] - Excellent cross-platform (macOS & Windows) tool with particularly good support for variable font development.
- [Robofont][robofont] - Powerful, flexible, and highly extensible design tool, especially for working with [UFO][unified-font-objects-ufo] sources. macOS only.
- [Fontra][fontra] - Free and open source cross-platform tool based on web technologies (macOS, Linux and Windows, and any browser really). Designed for collaborative workflows and variable fonts. Provides support for formats used by other editors.
- [FontForge][fontforge] - Free and open source cross-platform tool (Linux, macOS, and Windows). No longer under active maintenance and can be difficult to use, but continues to be used successfully.

[Python Tools][python-tools] describes some very useful libraries and scripts for font development and production.

[Opentype Cookbook][otcookbook] is a introduction to OpenType

[Google Font Knowledge][gf-knol] is a knowledge base with various articles around font design and typography

[Font Engineering notes][fonteng-notes] is a series of technical notes by Google font engineers

Font design tools can export fonts in common formats (.ttf, .otf, .woff) but the process can be complex and time consuming for a large font family or portfolio of font families. Foundries often develop their own automated internal font build systems and workflows to produce fonts from Glyphs or UFO sources. These connect a variety of tools to compile and test fonts from the sources formats to the final binaries. Two of the openly licensed and publicly-available systems are:

- [fontmake][fontmake] - This is the most widely used build system, developed by Google, it provides easy access to fonttools, glyphsLib and related libraries (although it's only one part of their overall workflow which requires makefiles).
- [Smith][smith] - SIL-developed python framework for building, testing, maintaining and releasing fonts. It integrates and orchestrates various libraries, scripts and utilities to make font development easier.

Using standardized and predictable toolchains, especially ones using only unencumbered free and open source components, working on source stored in open formats across multiple font projects rather than a bespoke hard-coded one for each single project makes it much easier for CI (Continuous Integration) and QA (Quality Assurance) efforts.

## Technical topics

The articles linked below touch on some of the key topics in font development and engineering.

[Font formats][font-formats] describes the main production font formats and the separate development source formats used to produce them, including the text-based open [Unified Font Objects (UFO)][unified-font-objects-ufo] format.

Important font metadata and font family structures are addressed in [Font & Style Naming][font-and-style-naming] and [Versioning][versioning].

[Design Metrics][design-metrics] gives important guidance on how to set the relative size of your font in relation to others. [Line Metrics][line-metrics] describes the many different internal values that affect default line spacing and gives three techniques for making them consistent across platforms and devices.

[Character Support][character-support] discusses how to choose which characters your font should support, including a basic minimal list, and how to set Unicode range settings. [Glyph naming][glyph-naming] describes how to set both working and production glyph names, including detailed information on the [Adobe Glyph List (AGL)][adobe-glyph-list] standard.

[Shaping & Rendering][shaping-and-rendering] gives links to the main technologies used to implement complex script behaviors. The most important of these is discussed in [OpenType][opentype], with a special focus on custom _stylistic set_ and _character variant_ features and the [User Interface Strings][user-interface-strings] used to describe them to font users.

[Copyright & Licensing][copyright-and-licensing] focuses on how to properly declare copyright for fonts you create and indicate the license used to distribute them. It also gives more information on how to use the [OFL][ofl] (SIL Open Font License) and how to use, modify and distribute open fonts. The [OFL FAQ (Frequently Asked Questions)][ofl-faq] has various practical answers for anyone using, modifying or creating open fonts.

_Font testing is not currently covered in this guide, but will be in the future._

## Building and modifying SIL fonts

See the [SIL Font Development Guide][silfontdev] for detailed guidance on how to build, modify, and contribute to [SIL font projects][sil-fonts].

[adobe-glyph-list]: /topics/fonts/adobe-glyph-list
[character-support]: /topics/fonts/character-support
[characters-codepoints-glyphs]: /topics/encoding/characters-codepoints-glyphs
[copyright-and-licensing]: /topics/fonts/copyright-and-licensing
[cozens-flgs]: https://simoncozens.github.io/fonts-and-layout/
[design-metrics]: /topics/fonts/design-metrics
[design-with-fontforge]: http://designwithfontforge.com
[font-and-style-naming]: /topics/fonts/font-and-style-naming
[fonteng-notes]: https://rsheeter.github.io/
[font-formats]: /topics/fonts/font-formats
[fontforge]: https://fontforge.org/
[fontlab]: https://www.fontlab.com/
[fontra]: https://fontra.xyz/
[fontmake]: https://github.com/googlefonts/fontmake
[gf]: https://fonts.google.com/
[gf-guide]: https://googlefonts.github.io/gf-guide/
[gf-knol]: https://fonts.google.com/knowledge
[glyph-naming]: /topics/fonts/glyph-naming
[glyphs]: https://glyphsapp.com/
[glyphs-learn]: https://glyphsapp.com/learn
[iws-c8]: http://scripts.sil.org/IWS-Chapter08
[line-metrics]: /topics/fonts/line-metrics
[ofl]: https://openfontlicense.org
[ofl-faq]: https://openfontlicense.org/ofl-faq
[opentype]: /topics/fonts/opentype
[otcookbook]: https://opentypecookbook.com/
[python-tools]: /topics/fonts/python-tools
[robofont]: https://robofont.com/
[shaping-and-rendering]: /topics/fonts/shaping-and-rendering
[silfontdev]: https://silnrsi.github.io/silfontdev/en-US/index.html
[sil-fonts]: https://software.sil.org/fonts/
[smith]: https://github.com/silnrsi/smith
[unified-font-objects-ufo]: /topics/fonts/unified-font-objects-ufo
[user-interface-strings]: /topics/fonts/user-interface-strings
[versioning]: /topics/fonts/versioning
