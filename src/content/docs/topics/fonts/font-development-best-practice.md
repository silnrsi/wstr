---
title: Font Development Best Practice
description: Guidance for font developers
sidebar:
  order: 5201
  label: Font Dev Best Practice
lastUpdated: 2025-07-18

---

The articles in this topic have been written to document what we think are the best practices to use in font development. They are generally the practices we use — or intend on using as soon as practically possible.

This is not intended to be a comprehensive encyclopedia of font development information, nor to cover the full range of techniques and options. It will generally offer a single recommended procedure, setting, or tool. However, we encourage adding links to alternatives when appropriate. It is very much a work in progress.

The purpose of these articles is to give helpful guidance to those who want to create fonts that work well in the intended environments. The recommendations may seem at times dogmatic, but that's the nature of recommendations based on well-informed opinion. There are also other reliable sources for information on good font development practice, such as [Google Fonts Guide][gf-guide] and [GlyphsApp articles][glyphs-learn]. Their guidance may differ slightly from what is here but is generally sound. 

With each recommendation we've tried to provide some indication of whether it's subjective opinion or objective fact. Recommendations are generally in **bold**, and they fall into four loose types:

- **"Developers may choose to"** - there is no single good option, and developers should consider various alternatives.
- **"We recommend that"** - there seems to be one option that is best for most developers, that we ourselves have chosen and that we suggest that others follow.
- **"Ascender and descender values should"** - there is clearly a best option and to do otherwise would be asking for problems.
- **"Production glyph names must"** - if you don't do this then your font is unlikely to work properly.

These articles assume a certain amount of background knowledge. Some of this depends on the specific subject. For example, a font designer who is drawing glyphs needs to know different things than a script engineer who is constructing OpenType tables.

The most important background knowledge that all those involved in font development need to have is an understanding of the differences and interrelationships between [characters, keystrokes, codepoints and glyphs][characters-codepoints-glyphs]. It is also important to understand the basic contents and structure of an OpenType/TrueType font. [An Introduction to TrueType Fonts][iws-c8] provides a brief orientation for designers and engineers.

[characters-codepoints-glyphs]: /topics/encoding/characters-codepoints-glyphs
[gf-guide]: https://googlefonts.github.io/gf-guide/
[glyphs-learn]: https://glyphsapp.com/learn
[iws-c8]: http://scripts.sil.org/IWS-Chapter08
