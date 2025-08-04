---
title: Shaping and Rendering
description: Shaping engines and smart font rendering systems
sidebar:
  order: 5510
lastUpdated: 2025-08-01
---

Shaping and rendering refers to the process of choosing [glyphs](/reference/glossary) to represent the characters in the text stream and positioning them properly according to the rules and conventions of the script.

* [State of Text Rendering 2024 paper][txtrendering2024] by Behdad Esfabod.
* [txtrendering2024](https://behdad.org/text2024/)

The following are technologies that interact with application software to provide rendering support:
* Harfbuzz
  * [GitHub project](https://github.com/harfbuzz/harfbuzz/wiki)
  * [Wikipedia](https://en.wikipedia.org/wiki/HarfBuzz)
  * [ManPagez](https://www.manpagez.com/html/harfbuzz/harfbuzz-8.4.0/what-is-harfbuzz.php)
  * [SourceForce](https://sourceforge.net/projects/harfbuzz.mirror/)
* DirectWrite
  * [Microsoft Ignite](https://learn.microsoft.com/en-us/windows/win32/directwrite/direct-write-portal)
  * [Wikipedia](https://en.wikipedia.org/wiki/DirectWrite)
* CoreText
  * [Apple Developer overview](https://developer.apple.com/library/archive/documentation/StringsTextFonts/Conceptual/CoreText_Programming/Overview/Overview.html)
  * [Wikipedia](https://en.wikipedia.org/wiki/Core_Text)

The following are smart-font systems that define font table formats and provide an engine to perform rendering:
* [OpenType](https://learn.microsoft.com/en-us/typography/opentype/)
* [Graphite](https://graphite.sil.org/)
* [AAT](https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6AATIntro.html)
