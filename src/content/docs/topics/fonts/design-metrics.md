---
title: Design Metrics
description: Setting a font's basic size and relative dimensions
sidebar:
  order: 5330
lastUpdated: 2025-07-21
---

The curve shapes, letter widths, diacritic positions, and contextual adjustments in a font are defined in relation to a grid of either 1000 x 1000 units (Postscript and CFF-based OpenType fonts) or 2048 x 2048 units (TrueType and TrueType-based OpenType). **Other units-per-em (UPM) values are allowed, but such situations are rare and should be  avoided unless there is a very specific reason to do so (see [Special UPM values](#special-upm-values))**. Although CFF-based fonts are supported by most systems, TrueType-based fonts have much better support, especially on older systems. **We recommend that you develop TrueType-based OpenType fonts, and set your UPM value to 2048.** The rest of this discussion on metrics assumes a 2048 UPM grid.

The 'em' is a unit that has roots in traditional type founding, but is now well removed from that heritage. The idea was that the letters of a font would normally be sized so that every letter of the design could fit within that 'em-square'. That is no longer the case, and the em/UPM is now used to mathematically determine the physical size of a letter when rendered at a particular point size. Adam Twardoch wrote (in a now-unavailable Typophile post):

> The primary meaning of the UPM size is that it determines the size of glyphs at a given point size. When a font has 1000 UPM, and the capital H is 700 units tall, then when set at 10 pt, the capital H will be exactly 7 pt tall. When the font has 500 UPM and the capital H is 700 units tall, then when set at 10 pt, the capital H will be exactly 14 pt tall.

This may make you think that you can resize a font simply by changing a font's UPM value - _but don't do it!_ It's technically true but can lead to other problems. There are better ways to size your font.

## Setting a font's perceived size

Font sizing is relative. Because designers have full freedom to make letters 300 or 1400 or 2600 units high, there is no objective standard for how tall any particular letter should be at "12pt".

For Latin-script fonts, the perceived size is determined primarily by the x-height, for example how tall your 12pt lowercase "x" is in relation to the 12pt lowercase "x" of Times or Georgia. For other scripts it is often determined by the height of the most common shapes, and how large those letters are in your font compared to the most commonly used fonts. **It makes the most sense to make your letters a similar size to other fonts in the same style or script or genre.**

To do this, first be sure you've set the UPM size correctly (2048). Most design programs will give you a choice of whether to also scale your glyphs when you change the UPM value - let it do that. Then check to see if the general size of your letters is reasonable. For Latin fonts the x-height will normally be somewhere between 800 and 1100 units. For other scripts, open up a commonly used font in your font design program, check to see that the UPM size is 2048 in that font, then see how tall the letters are in units. If you need to resize your letters, select them all and use the Transform/Scale tool or menu option to change all your letters at once.

To refine this size, create a document that compares text in your font to text in other fonts that you would consider to be in the same market or sphere as yours. For example, if you are creating a sans-serif newspaper face, compare it to other sans-serif faces used for newspapers (your competition). Then scale your whole design up or down to suit using the Transform tools. Making your font significantly larger or smaller than other fonts in your market could affect its success or acceptance.

As you do this sizing, pay no attention to line metrics - the amount of space between lines of text. **Line spacing is not automatically determined by how many units tall your letters are, or the height of your ascenders or the depth of your descenders.** Technical issues around line spacing and ascender/descender values are complex, and are addressed in the [next article][line-metrics].

## Drawing outside the box

You may have heard that you need to keep your glyph designs ‘inside the UPM box’. In other words, if you’ve set the Font Info  numeric values of ascender to 1500 and descender to -548, you cannot allow your curves to extend outside that 2048-unit ‘box’. **This is simply untrue and very misleading and can push you to make very bad decisions.** In the case of non-Latin fonts in particular, this would force you to unnecessarily shrink your glyphs to a fraction of the size they should be.

If your glyphs extend higher or lower than these ascender or descender values, then on most screens and in print you will have no trouble, though your lines may be too close together unless you make other changes (see next chapter). Only in very rare situations, such as on older Windows apps or when highlighting text, will the parts ‘outside the box’ get cut off. **In the case of some Latin diacritics and some non-Latin letters and marks you have no choice but to let the letters extended higher or lower than those arbitrary values.**

If you have set your x-height high and also have long ascenders, then your normal ascenders might end up ‘outside the box’. While not a technical problem, it may mean that your font size really is too large. You may want to reconsider the sizing - but there is no technical reason that requires you to shrink it.

For example, say you decide that you want your font to appear as large as Georgia (about 960 units in a 2048 UPM font), and you set the height of the ‘x’ to 960. But then you also decide to give it long ascenders, much longer than Georgia’s, between 1600-1800, and deep descenders as well. Then it shouldn’t be a surprise that you get lines colliding. You can fix this technically. However, it may be that you’ve simply chosen an oversized x-height for a font that also has long ascenders. You may not be able to have both the perceived size of Georgia and tall, elegant ascenders. **This is a design issue, not a technical one.**

## Special UPM values

It can be useful in certain cases to set the UPM value for a TrueType font to something other than 2048 - specifically 1000. Some of the technical reasons to avoid this are less relevant than in the past, and it's very likely that a TrueType font with a UPM of 1000 will work without problems. **It's still a good idea to use 2048 by default, however, a UPM of 1000 may be appropriate in certain situations:**

- The font is based on some other source font with a UPM size of 1000, and you want to avoid rounding errors in scaling to 2048.
- You want to import data or metrics from a font with 1000 UPM, such as kerning or hinting.
- You are working with a team of designers that are all used to working in 1000 UPM and you want to make it easier for everyone to use consistent measurements.
- When the fonts need to be delivered in multiple technology formats, such as both TrueType and OpenType/CFF.

Some designers have chosen a UPM greater than 2048 (such as 4096) to gain greater design precision, but that is quite rare.

[line-metrics]: /topics/fonts/line-metrics
