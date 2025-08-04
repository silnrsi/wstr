---
title: Shaping and Rendering
description: Shaping engines and smart font rendering systems
sidebar:
  order: 5510
lastUpdated: 2025-08-01
---

Shaping and rendering refers to the process of choosing [glyphs](/reference/glossary) to represent the characters in the text stream and positioning them properly according to the rules and conventions of the script.

* [State of Text Rendering 2024 paper][text-rendering-2024] by Behdad Esfabod.

The following are technologies that interact with application software to provide rendering support:
* Harfbuzz
  * [GitHub project][harfbuzz-github]
  * [Wikipedia][harfbuzz-wikipedia]
  * [ManPagez][harfbuzz-manpagez]
  * [SourceForce][harfbuzz-sourceforce]
* DirectWrite
  * [Microsoft Ignite][directwrite-ms-ignite]
  * [Wikipedia][directwrite-wikipedia]
* CoreText
  * [Apple Developer overview][coretext-apple-developer]
  * [Wikipedia][coretext-wikipedia]

The following are smart-font systems that define font table formats and provide an engine to perform rendering:
* [OpenType][opentype]
  * [OT Microsoft documentation][opentype-ms-documentation]
* [Graphite]
* [AAT]

[text-rendering-2024]: https://behdad.org/text2024/
[harfbuzz-github]: https://github.com/harfbuzz/harfbuzz/wiki
[harfbuzz-wiki]: https://en.wikipedia.org/wiki/HarfBuzz
[harfbuzz-manpagez]: https://www.manpagez.com/html/harfbuzz/harfbuzz-8.4.0/what-is-harfbuzz.php
[harfbuzz-sourceforce]: https://sourceforge.net/projects/harfbuzz.mirror/
[directwrite-ms-ignite]: https://learn.microsoft.com/en-us/windows/win32/directwrite/direct-write-portal
[directwrite-wikipedia]:https://en.wikipedia.org/wiki/DirectWrite
[coretext-apple-developer]: https://developer.apple.com/library/archive/documentation/StringsTextFonts/Conceptual/CoreText_Programming/Overview/Overview.html
[coretext-wikipedia]: https://en.wikipedia.org/wiki/Core_Text
[opentype]: /topics/fonts/opentype
[opentype-ms-documentation]: https://learn.microsoft.com/en-us/typography/opentype/
[Graphite]: https://graphite.sil.org/
[AAT]: https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6AATIntro.html