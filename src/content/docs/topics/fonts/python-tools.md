---
title: Python Tools
description: Font development tools and utilities
sidebar:
  order: 5610
lastUpdated: 2025-08-13
---

It is often helpful to use scripts to modify fonts, either changing source files (e.g. UFO) or the compiled fonts (e.g. ttf files). This could apply during the design process (for example, automatically creating composite glyphs) or during the build process (for example, automatically updating glyph names from working names to production names).

Python has been the standard for such scripting, and there are several python-based collections of font tools available. These include both pre-written scripts to perform specific tasks as well as python libraries which can be used when writing new scripts or when modifying existing scripts to meet specific needs. Some useful open-source projects are:

- [Pysilfont][pysilfont] - SIL's collection of command-line tools for font development and building.
- [fontTools][fonttools] - a library for manipulating OpenType fonts.
- [FontParts][fontparts] - a library for creating and editing UFO fonts
- [FontForge][fontforge] - as well as being a font editor, FontForge comes with a python object library that can work with FontForge’s own format (.sfd), as well as with UFOs and ttf files.

Both Glyphs and FontLab font editors also support python scripting within their application.


## Pysilfont

This is a growing collection of tools, initially written by members of SIL Global’s _Writing Systems Technology_ team, with a broader set of contributors welcome. Included are a UFO object library, support for testing fonts, and scripts for specific tasks. These tools are designed with a UFO-based workflow in mind, though many would also be useful in other workflows.

Most scripts are written to use a standard framework which is included in the libraries. This framework provides for help text, parameter handling, file opening, and error reporting. This simplifies script writing and gives users a standard interface.

In addition to the built-in UFO object library, the framework supports [FontParts][fontparts] (a different UFO object library) as well as [fontTools][fonttools] (an object library for OpenType fonts) workflows. 

There is further [documentation in GitHub][pysilfont-docs].

## fontTools

fontTools is a library useful for manipulating TrueType and OpenType fonts (e.g. `.ttf` files). The project also includes the TTX command-line tool, which can convert TrueType and OpenType fonts (or individual tables within a font) to and from an XML text format (also called TTX). It supports TrueType, OpenType, AFM and, to an extent, Type 1 and some Mac-specific formats.

## FontParts

FontParts is a Python API for programmatically creating and editing parts of fonts during the type design process, and it is application-independent to allow scripts to be portable across multiple applications. 

Some of the Pysilfont scripts use FontParts as an alternative to the built-in UFO object library.


[fontforge]: https://fontforge.github.io/en-US
[fonttools]: https://github.com/behdad/fonttools
[pysilfont-docs]: https://github.com/silnrsi/pysilfont/blob/master/docs/docs.md
[pysilfont]: https://github.com/silnrsi/pysilfont
[unified-font-objects-ufo-normalization]: /topics/fonts/unified-font-objects-ufo#ufo-normalization
[fontparts]: https://github.com/robotools/fontParts
