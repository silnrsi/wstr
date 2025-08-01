---
title: Unified Font Objects (UFOs)
description: Open font source format
sidebar:
  order: 5221
lastUpdated: 2025-07-21
---

UFO (Unified Font Object) is our recommended format for new font projects, and can offer advantages for existing projects. The [UFO specification][ufo] calls it a "cross-platform, cross-application, human readable, future proof format for storing font data". It is a text-based format that draws on XML and plist structures. A UFO is a folder with a .ufo extension that contains files for font-wide metadata and a 'glyphs' folder that contains each glyph as a separate .glif file.

## UFO versions, or 'flavors'

UFO is actually not one single standard. There are multiple versions, or 'flavors' of UFO:

- *UFO 1* - The original from 2004. Rarely used now.
- *UFO 2* - The most common version (since 2009), with the broadest application support. Only slightly different from UFO 1. Still lacks some basic features, such as explicit glyph anchor elements.
- *UFO 3* - A much-improved and expanded spec from 2012.

**We currently recommend the UFO3 format.**

There are [various discussions][ufo-issues] going on concerning future UFO versions beyond 3, by both the original UFO authors and others, but there is no clear successor at this point.

## Application support

Every major font design program supports UFO, but to varying degrees.

- [Robofont][robofont] provides the most seamless and native support (requires Mac OS X 10.9 or later, though older versions are available for OS X 10.6 or later; commercial).
- [Glyphs][glyphsapp] can use UFO as a native format (requires Mac OS X 10.9 or later; commercial).
- [FontForge][fontforge] can import and export UFOs, including the UFO3 format (available for Windows, Mac, Linux; free).
- [Fontlab][fontlab] can import and export UFOs to some extent, though some issues remain (available for Windows, Mac; commercial).

**We have used each of the above successfully in UFO development, and can recommend their use. The key to successful use is to store UFOs in a normalized format then re-normalize them after editing them.**

In addition to these visual design programs there are other applications and utilities that support UFO:

- [The Adobe Font Development Kit for OpenType][adobe-afdko]
- [Smith][smith]
- [Tools from TypeSupply][typesupply]
- [pysilfont][pysilfont]

## UFO Normalization

A weakness of the UFO format is that there is no normalized form. The ordering and normal default settings for various elements can differ between applications. The unfortunate result is that opening a UFO with an app, changing one point coordinate, then saving, can result in hundreds of changes, even to files seemingly unrelated to the single coordinate change. This makes source code version control very difficult.

The solution is to define a *normalized* form and always *normalize* the UFO prior to committing any changes to a source code repository (such as one on Github). This will ensure that the master version is always in normalized form, and any changes can be easily compared.

The [pysilfont] project provides one style of UFO normalization through the `psfnormalize` command. After installing [pysilfont], the workflow then becomes:

- Check out (or clone) project from source code repository
- Open UFO in editing application
- Save changes
- Run psfnormalize on the UFO with the command `psfnormalize filename.ufo`
- Review changes via your version control client
- Commit your changes

The normalization scheme imposed by psfnormalize has been reviewed by many people and although it is not a standard, it is reasonably well accepted by those who care about UFO normalization. **We recommend that any UFO-based font projects stored in version control repositories always store the UFO in normalized form as set by psfnormalize.**

## Example projects

Adobe has a number of public projects that are based on UFO. [Source Sans Pro][adobe-source-sans-pro] is a good example.

All current SIL Global font projects are based on UFO sources. Two of our first UFO font projects were [Nokyung][nokyung] and [Andika Mtihani][andika-mtihani].

## Why use UFO?

Our main motivation is that it is a well-supported, open, application-neutral format. We do not want to require that someone use a particular commercial program on a particular platform in order to access and use our font source. It also allows us to use common industry tools, and frees us from being locked into any one tool. It is handled well by version control systems, and has strong long-term readability.

[adobe-afdko]: https://github.com/adobe-type-tools/afdko
[adobe-source-sans-pro]: https://github.com/adobe-fonts/source-sans-pro
[andika-mtihani]: https://github.com/silnrsi/font-andika-mtihani
[fontforge]: https://fontforge.github.io
[fontlab]: https://www.fontlab.com/font-editor/fontlab/
[glyphsapp]: https://glyphsapp.com/
[nokyung]: https://github.com/silnrsi/font-nokyung
[pysilfont]: https://github.com/silnrsi/pysilfont
[robofont]: https://robofont.com/
[sil-fonts]: https://software.sil.org/fonts
[smith]: https://github.com/silnrsi/smith
[typesupply]: https://github.com/typesupply
[ufo]: https://unifiedfontobject.org/
[ufo-issues]: https://github.com/unified-font-object/ufo-spec/issues
