---
title: Testing Shaping Engines
description: Tools for testing different OpenType shaping engines
sidebar:
  order: 5631
lastUpdated: 2026-01-30
---

For the most part, fonts with OpenType shaping will display the same across different OpenType shaping engines[^shaping].
However, sometimes there are differences so you need to know what shaping engine is used by the operating system and/or application.
In addition, you should test with different operating systems and applications.

## Testing

### HarfBuzz

HarfBuzz is the mostly widely used OpenType shaping engine, and some of the applications that use HarfBuzz are scriptable,
so testing with HarfBuzz first generally works well. Firefox, LibreOffice, XeTeX, and SILE are all useful.
These applications also support Graphite, so if a font has Graphite tables then the HarfBuzz OpenType shaping will not be used.

If more detailed debugging is needed then two command line tools, `hb-shape` and `hb-view`, from HarfBuzz are very useful.
These tools do not do script itemization nor apply the Unicode Bidirectional Algorithm.

Adobe InDesign can now use HarfBuzz (depending on the [version of InDesign and what script](#indesign) is being shaped).
Even when using HarfBuzz, shaping can be different since the script itemizer that InDesign uses is not as good as with other applications.

### DirectWrite

Available only on Microsoft Windows, and used mostly in Microsoft Office. Testing with Word is good,
but you want to test with Notepad and [DWBox][dwbox] as well, as different features are turned on or off by default in Word.

Note that web browsers on Windows (including Edge) use HarfBuzz for text shaping, not DirectWrite.

### CoreText

Available only on Apple products. Safari is good, as well as iWork applications (such as Pages), and TextEdit.

Note that most web browsers on macOS (but not Safari) use HarfBuzz for text shaping, not CoreText.
On iOS, all web browsers use CoreText.

## Debugging

The following information might be useful to understand why a particular shaping engine does not work,
and possibly to find a work around. Ideally, bug reports should be filed against the shaping engines.

### Universal Shaping Engine (USE)

Microsoft came up with the idea for the [USE][use], and implemented it in DirectWrite. HarfBuzz then implemented USE as well. The USE shapes text based on Unicode properties, both DirectWrite and HarfBuzz have [overrides to these properties][use_overrides] for situations where the logical classification of a Unicode property for a character results in poor shaping. The UTC has [stated they will not change properties][use_utc] just to make implementing shaping with the USE easier.

### Script Tags and the USE

Generally, the script tag specified in a font will determine what OpenType shaper (`dev2`, `arab`, etc.) are used for shaping.

For [Limbu][limbu] and [Lepcha][lepcha] (as an example) scripts (and maybe others) if the script tag is `DFLT` then HarfBuzz applications will use the [default OpenType shaper][dflt]. If the script is specified (`limb` or `lepc`) then HarfBuzz will use the USE. DirectWrite applications seem to route Limbu and Lepcha text to the USE, even if the only script tag is `DFLT`. The issue is the USE might [re-order characters based on their Unicode properties][use_reordering], while the default shaper does not re-order characters, resulting in a shaping difference between DirectWrite and HarfBuzz. The script [latn might be interpreted the same as the script DFLT][latn].

### InDesign

HarfBuzz can be used in InDesign with scripts that are also supported by Lipika (Adobe's OpenType shaping engine).
HarfBuzz is also used for South East Asian scripts that were never supported by Lipika (such as Burmese),
even if the default shaping engine is Lipika that would be used for other scripts.

HarfBuzz has now become the default OpenType shaping engine for InDesign, as seen in the following table.

InDesign CC | InDesign version | Option for HarfBuzz | Option for Lipika
---- | ---- | ---- | ----
2019 | 14.x.x | no | default, no other option
2020 | 15.x.x. | yes | default (except for SE Asian scripts)
2021 | 16.x.x | yes | default (except for SE Asian scripts)
2022 | 17.x.x | yes | default (except for SE Asian scripts)
2023 | 18.x.x | yes | default (except for SE Asian scripts)
2024 | 19.x.x | default | yes

InDesign 2025 (v20.x.x) or later requires Windows 11.

To switch, follow [Adobe’s instructions][adobe].
Two files are needed to switch between HarfBuzz and Lipika.

File | Contents
---- | ----
`HarfbuzzOverrideOn.js` | `app.textPreferences.shapeIndicAndLatinWithHarbuzz = true;`
`HarfbuzzOverrideOff.js` | `app.textPreferences.shapeIndicAndLatinWithHarbuzz = false;`

Yes, the setting needs to be `Harbuzz` (with no **f**, the correct name of the software is Har**f**buzz (with an **f**)).

The override files to enable (or disable) the HarfBuzz option are placed in a folder:

C:\\Program Files\\Adobe\\Adobe InDesign **YYYY**\\Scripts\\Scripts Panel

or

C:\\Users\\username\\AppData\\Roaming\\Adobe\\InDesign\\Version **XX.X**\\**langtag**\\Scripts\\Scripts Panel

Both of which are specific to the year of the version of InDesign CC that you are using.
Values in **bold** need to be adjusted for the specific installation of InDesign.
Therefore, it is possible to have 2020 using HarfBuzz, but 2021 using Lipika.

The rendering with HarfBuzz in InDesign is fiddly. InDesign caches the displayed (and already shaped) glyphs. This affects testing in two ways:

1. Installing a new font for testing, and restarting InDesign, will probably display the cached glyphs, and not use the newly installed font.  
2. After enabling HarfBuzz rendering in InDesign, the cached glyphs are still displayed, and the newly enabled rendering engine is not used.

The solution to both issues is to force InDesign to redraw the glyphs (thus using the new font or rendering engine). This can be done by changing the point size or, easier to do, setting the weight of the text to Bold (or Italic, and then back to Regular if desired) Another font setting might also work.

[^shaping]: The most common OpenType shaping engines are
[DirectWrite][directwrite],
[HarfBuzz][harfbuzz],
[Coretext][coretext],
and [Lipika][lipika].
The term shaping engine can be confusing, as both HarfBuzz and CoreText do both OpenType and AAT shaping.
DirectWrite and Lipika only do OpenType shaping.
On this page, references to HarfBuzz and CoreText refer to the OpenType shaping that each library does.

[directwrite]: /reference/glossary#directwrite
[harfbuzz]: /reference/glossary#harfbuzz
[coretext]: /reference/glossary#coretext
[lipika]: /reference/glossary#lipika

[dwbox]: https://github.com/miloush/dwbox

[use]: /reference/glossary#use
[use_overrides]: https://github.com/harfbuzz/harfbuzz/issues/1012
[use_utc]: https://github.com/harfbuzz/harfbuzz/issues/1012#issuecomment-518075773
[limbu]: https://github.com/googlefonts/noto-fonts/issues/1623
[lepcha]: https://github.com/harfbuzz/harfbuzz/issues/2000
[dflt]: https://docs.microsoft.com/en-us/typography/script-development/standard
[use_reordering]: https://docs.microsoft.com/en-us/typography/script-development/use#reordering
[latn]: https://bugzilla.mozilla.org/show_bug.cgi?id=719366
[adobe]: https://community.adobe.com/t5/indesign/script-for-enabling-harfbuzz-workflow-in-indesign/m-p/11319835
