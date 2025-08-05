---
title: Shaping and Rendering
description: Shaping engines and smart font rendering systems
sidebar:
  order: 5510
lastUpdated: 2025-08-01
---

Shaping and rendering refers to the process of choosing and ordering [glyphs](/reference/glossary) to represent the characters in the text stream and positioning them properly according to the rules and conventions of the script. Shaping is mainly focused on converting character sequences to glyph sequences, and is highly specific to an individual script or script family. Rendering is more concerned with choosing the proper form and position of glyphs. The boundary between the two is not well-defined, and some systems and tools address both processes

Three primary systems provide complex script shaping support for operating systems and applications:

- Harfbuzz is the most versatile text shaper and the best choice for most application developers. It supports various rendering models across multiple platforms and has the broadest script support. 
  - [GitHub project][harfbuzz-github]
  - [Wikipedia][harfbuzz-wiki]
  - [ManPagez][harfbuzz-manpagez]
  - [SourceForge][harfbuzz-sourceforge]
- DirectWrite is Microsoft's internal shaping engine for Windows applications.
  - [Microsoft Ignite][directwrite-ms-ignite]
  - [Wikipedia][directwrite-wiki]
- CoreText is Apple's internal shaping engine.
  - [Apple Developer overview][coretext-apple-developer]
  - [Wikipedia][coretext-wikipedia]

These shapers do not always agree on how text should be shaped, which can lead to platform and application differences in how text is interpreted and shaped.

The following technologies provide rendering support, although some also can do complex shaping. These smart-font systems also define font table formats:

- [OpenType][opentype] is the industry standard for complex text rendering. It is supported on all platforms and by all font design and development toools.
- [Graphite][graphite] was developed by SIL as a more powerful alternative to the early versions of OpenType and provides both shaping and rendering. OpenType now meets most needs, so Graphite is only needed for highly complex scripts such as Nastaliq. It will be retired as soon as OpenType can evolve to accommodate all needs.
- [Apple Advanced Typography (AAT)][aat] was the predecessor to other smart-font systems and remains supported in Harfbuzz and by Apple frameworks, although Apple also fully supports OpenType.

For a lengthy and detailed description of the current status of shaping and rendering systems see Behdad Esfabod's [State of Text Rendering 2024][esfabod2024].


[esfabod2024]: https://behdad.org/text2024/
[harfbuzz-github]: https://github.com/harfbuzz/harfbuzz/wiki
[harfbuzz-wiki]: https://en.wikipedia.org/wiki/HarfBuzz
[harfbuzz-manpagez]: https://www.manpagez.com/html/harfbuzz/harfbuzz-8.4.0/what-is-harfbuzz.php
[harfbuzz-sourceforge]: https://sourceforge.net/projects/harfbuzz.mirror/
[directwrite-ms-ignite]: https://learn.microsoft.com/en-us/windows/win32/directwrite/direct-write-portal
[directwrite-wiki]:https://en.wikipedia.org/wiki/DirectWrite
[coretext-apple-developer]: https://developer.apple.com/library/archive/documentation/StringsTextFonts/Conceptual/CoreText_Programming/Overview/Overview.html
[coretext-wikipedia]: https://en.wikipedia.org/wiki/Core_Text
[opentype]: /topics/fonts/opentype
[opentype-ms-documentation]: https://learn.microsoft.com/en-us/typography/opentype/
[graphite]: https://graphite.sil.org/
[aat]: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6AATIntro.html