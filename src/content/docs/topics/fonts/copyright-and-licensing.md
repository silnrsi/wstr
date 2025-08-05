---
title: Copyright and Licensing
description: Font copyright and licensing best practice
sidebar:
  order: 5170
  label: Copyright & Licensing
lastUpdated: 2025-08-05
---

Fonts are licensed for use through either proprietary or open licenses chosen by their copyright holder.

Proprietary licenses are usually unique to the font developer or distributor and require some payment for use. Fees for use may be one-time or by subscription, and vary by what uses are allowed. Web fonts often have a completely different fee structure that may depend on the number of visitors. Proprietary licenses rarely allow any sort of modification or redistribution. 

Free and open font licenses require no payment for use, modification, or distribution. Although there are a few different open licenses that have been applied to fonts, the industry standard is the SIL Open Font License (OFL). For more information see the [SIL Open Font License (OFL) site][ofl].

The following sections provide specific guidance for font developers regarding copyright and licensing.

## Copyright

**All fonts should contain a copyright statement that accurately reflects the legal copyright holder of the font software.**  It is important that the copyright holder be a legal entity - an individual, organization, company. In the case of joint copyright this may be multiple legal parties. The copyright holder is the only legal entity that can choose the license under which a font is distributed. Without a copyright statement, or a copyright statement that does not state a real legal entity, the font is in legal limbo and should be strongly avoided.

The basic copyright statement takes the form:

> Copyright (c) 2025 Sarah Singh

The use of `(c)` is preferred over the typographic copyright symbol due to potential cross-platform encoding issues. The statement may span multiple years, with optional comma, and even include multiple joint copyright holders, as in:

> Copyright (c) 2009-2025, Sarah Singh and Fred Johnson

If different portions of the software have different copyright holders, two copyright statements would be used, each indicating the part of the software that it applies to:

> Glyph outlines copyright (c) 2004-2025, Sarah Singh. OpenType routines copyright (c) 2022 Fred Johnson.

It can be very helpful to add a URL or domain to the copyright holder, as in:

> Copyright (c) 2025 SIL Global (www.sil.org)

**The copyright statement(s) should be in at least two places in the font package, the font internal copyright field and the separate user documentation.**

The internal copyright field is stored inside the font file, and most font design software provides an interface for entering it, usually in _Font Info_. Technically, this information is stored in the font's `name` table, in the entry with ID = 0.

The same copyright statement(s) should also be in the font documentation, typically in a LICENSE or ReadMe file. **For OFL-licensed fonts this should be at the very top of the OFL.txt file.**

## License

**All fonts should contain a license statement that governs use and distribution of the font. We strongly recommend use of well-established licenses, whether free and open or restrictive.** We strongly recommend against using "Public Domain" or "This font may be freely used and distributed", as they have widely varying legal interpretations.

**Fonts that are intended to be distributed and modified freely should use the [SIL Open Font License (OFL) version 1.1][ofl].** This is the standard license in the font industry for such font projects. Please consult the [OFL site][ofl] for detailed information, especially [How to use the OFL][ofl-how], and the more complete [OFL-FAQ][ofl-faq].

### Using the OFL

In general, the process of licensing a font under the OFL has five steps:

(1) _Put your copyright and the OFL text with any chosen Reserved Font Name(s) into your internal font copyright and license fields._ Here is a minimal example:

> Copyright (c) 2025 Adina Masaro.

> This Font Software is licensed under the SIL Open Font License, Version 1.1. This license is copied below, and is also available with a FAQ at: https://openfontlicense.org...

It is also allowed by the OFL, but not recommended, to replace the full OFL text with a reference to the OFL online, as in:

> Copyright (c) 2025 Adina Masaro.

> This Font Software is licensed under the SIL Open Font License, Version 1.1. This license is available with a FAQ at: https://openfontlicense.org

(2) _Add the same statement to any additional files that are in the project, such as build scripts, control files, smart font code, etc._

(3) _Put the same statement at the top of the standard OFL.txt file and include it in your release package._

(4) _Write an initial FONTLOG.txt for your font and include it in the release package._

(5) _Include the current OFL-FAQ.txt file in the release package._

### Using OFL Reserved Font Names

Reserved Font Names (RFNs) are a useful way to establish unique names by which only unmodified versions of your fonts are known. Some web fonts services (Google in particular) do not recommend using them because it makes more work for them, but don't be scared away from using them. For more detail see the [OFL-FAQ][ofl-faq].

If you do choose to declare any RFNs, use this format for the License field:

> Copyright (c) 2016 Adina Masaro with Reserved Font Name "Anaconda".

> This Font Software is licensed under the SIL Open Font License, Version 1.1. This license is copied below, and is also available with a FAQ at: https://openfontlicense.org...

## Internal copyright and license locations

Internal license information is stored in a font's `name` table alongside the copyright statement(s). There are two separate entries for `License` (also called License Description; ID 13) and `License URL` (ID 14). It can be difficult to find where to set these in a font, so here are some specific instructions:

| | |
| - | - |
| FontForge | _Element > Font Info > TTF Names > New._ Choose the Language (typically 'English (US)'). Click on 'Styles (SubFamily)' to find the license fields. There is also a helpful OFL button that will add these automatically, then you can edit them. |
| FontLab | _Font Info > Names and Copyright > License information._ |
| Glyphs | _Font Info > Custom Parameter._ Click + then find the license fields under New Value |
| in a UFO | Add _openTypeNameLicense_ and _openTypeNameLicenseURL_ keys to the `dict` |


For OFL projects `License URL` should be https://openfontlicense.org

Technically, the Copyright field was intended to be used only for the copyright string and the License only for the license. However the OFL model includes the copyright notice with the license text as a header. **We recommend that the internal License field should include both, as in (1) above.**

If you are creating WOFF versions of fonts, be sure that the copyright and license metadata in the WOFF 'wrapper' matches what is in the font.

[ofl]: https://openfontlicense.org
[ofl-how]: https://openfontlicense.org/how-to-use-the-ofl/
[ofl-faq]: https://openfontlicense.org/ofl-faq/
