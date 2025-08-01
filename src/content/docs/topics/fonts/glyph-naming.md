---
title: Glyph Naming
description: Standards and conventions for glyph names
sidebar:
  order: 5420
lastUpdated: 2025-07-25
---

For various reasons (historical, technical, convenience) most font development tools and formats provide mechanisms to name glyphs with human-readable strings (as opposed to just index numbers, for example). This article documents conventions, restrictions, and best practices for glyph naming.

## Why use glyph names?

**We recommend that all glyphs in released fonts have names that are _AGL-compliant_.** Because of their original association with Adobe PostScript, glyph names are often referred to as *PostScript names* or sometimes, more simply, *psnames*.

Given the ubiquitous support for TrueType/OpenType fonts, one might ask _why do we even have glyph names?_ Nothing _inside_ an OpenType font requires glyphs to have names—complex layout tables `GSUB` and `GPOS`, for example, do all their work in terms of glyph indexes. Even for the `post` table itself (where glyph names are stored), one of the allowed forms, called Version 3, is one that has no names. So one might reasonably ask: _if functional fonts can be produced without glyph names, why have them at all?_

The answer starts in the era before TrueType came along, in which Adobe's sophisticated page layout engine accessed glyphs by their names—glyphs had no other way to be located other than by their name. In fact, glyph names were simply another identifier in the PostScript programming language—and that is why even today glyph names have a very strict allowed form.

Going even further, some software packages are able to infer certain properties of a glyph from just its name. The most commonly cited case of this is that some PDF files do not include any representation of the _character_ stream that the document represents, but yet you can still copy _characters_ from the document to the clipboard. The reason this works at all—and it doesn't always work perfectly—is that Acrobat is able to deduce the character stream (or something close to it) by looking only at the names of the glyphs in the file.

All of this can work, however, only if the glyphs have been correctly named—meaning named according to Adobe standards.

_Glyph names used in development can differ from those used in released fonts and do not necessarily need to follow Adobe standards. See [Working names vs production names](#working-names-vs-production-names)._

## Glyph name limitations

According to the [Adobe Glyph List Specification (AGL)][adobe-agl] specification, glyph names, whether working names or production names, **should be no longer than 31 characters, must be entirely composed of characters from the following set: A–Z, a–z, 0–9, . (period, U+002E FULL STOP) and _ (underscore, U+005F LOW LINE), and must not start with a digit**. It also specifies how those names should be chosen and constructed. For more details see the article on the [Adobe Glyph List][adobe-glyph-list].

Some tools and standards have more restrictive limitations:

- THe Adobe Font Development Kit (AFDKO) [Feature File Specification][adobe-fea] allows name length up to 63 but requires that names, with the exception of `.notdef`, must not start with a digit or a period. 
- [ISO/IEC 14496-22 "Open Font Format"][iso-open-font-format] recommends that names, with the exception of `.notdef` and `.null`, must start with a letter. This is not a strict requirement. For example, it is common for glyphs that are only used as components of composite glyphs to have names that start with an underscore, as in `_dot`.
- Various font tools may have other restrictions but such are not derived from any official font specifications.

## Working names vs production names

The glyph names that should be in a font when it is shipped (i.e. released) are not necessarily the most friendly and memorable names. Therefore many developers use a different set of glyph names for development purposes and, as a last step of production, change the glyph names to the "official" names. We will call these two sets of glyph names the **working names** and the **production names**, respectively.

As an example, the acceptable *production name* for a glyph representing U+0628 ARABIC LETTER BEH would be one of:

- `uni0628`
- `u0628`
- `afii57416`

However, as none of these is particularly memorable, designers might, for example, choose a *working name* of `beh`.

The use of working and production glyph names is common enough that at least one modern font format (the UFO format) provides a mechanism to manage both glyph names, and font editing applications can automatically convert names from working to production during export. [Glyphs even provides an internal working names system][glyphs-nice-names] that they call _nice names_.

### Not all glyphs need production names

Note that even in a shipping font, there may be glyphs that do not need production names based on the AGLFN. Any glyphs used _only_ as components of some other composite glyph need not have separate production names because the component glyphs can never end up in the output glyph stream of rendered text.

For example, many letters in the Arabic script are distinguished from each other only by the pattern of dots drawn above or below the main shape. A font might use component glyphs for each pattern of dots (one dot below, one dot above, two dots below, etc.) and also for each main shape, and then construct the desired glyph repertoire using composites that reference the appropriate base and dot glyphs. The glyphs for various patterns of dots can never appear in the output stream, so they do not need production names.

[adobe-agl]: https://github.com/adobe-type-tools/agl-specification
[adobe-aglfn]: https://github.com/adobe-type-tools/agl-aglfn
[adobe-fea]: https://cdn.rawgit.com/adobe-type-tools/afdko/master/FDK/Technical%20Documentation/OpenTypeFeatureFileSpecification.html#2.f.i
[adobe-glyph-list]: /topics/fonts/adobe-glyph-list
[glyphs-nice-names]: https://glyphsapp.com/learn/getting-your-glyph-names-right
[iso-open-font-format]: https://standards.iso.org/ittf/PubliclyAvailableStandards/c066391_ISO_IEC_14496-22_2015.zip
