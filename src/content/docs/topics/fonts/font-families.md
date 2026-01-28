---
title: types of font families
description: Recommendations for support the three types of font families.
sidebar:
    order: 2550
tags: [ribbi, variable, axis-based]
lastUpdated: 2026-01-28
---

_This is a work in progress._

## Three types of font families

There are three types of font families. In general, standard applications should be able to support the first two types: RIBBI and Axis-based fonts. Variable fonts may need more attention to developing a UI to handle the potential weights. 

### RIBBI fonts

Users are most familiar with fonts that have up to four different standard faces: Regular, Italic, Bold, and Bold-Italic.

### Axis-based fonts

[Axis-based][axis-based] fonts generally go beyond the standard Regular, Italic, Bold, and Bold Italic type faces. They can provide other weights such as Thin, ExtraLight, Light, Medium, SemiBold, ExtraBold, Black, etc. They can also provide other styles as well, such as different widths.

Some applications will display these other weights as separate font families (except bold). Ideally, an application should see, for example, **Gentium** as one font with ten **faces** rather than as separate fonts.

![Figure: Gentium weights](images/2540-gentium-weights.png "Display one font with ten weights")

If a user selects the Regular weight of Gentium, an application could then use the Bold weight for contrast (such as in headings).
If the user selects Medium, then the heavier weight (such as for headings) should be ExtraBold.
Applications should provide two different selections for fonts to handle these situation;
one selection for the body text (Regular or Medium), and one selection for the heaver weight (Bold or ExtraBold).

If an application uses a second weight (such as bold) then there needs to be two selections for fonts

ptxPrint handles this appropriately. 

### Variable fonts

Variable fonts have all the potential styles (axes) in one single font file. They are primarily used in web-based applications, and in that environment they can be more flexible than static fonts. Variable fonts allow for choosing any style such as

- weight (this is the most common axis)
- width
- slant
- optical size

 using sliders or input fields to get the exact style you need. Not all variable fonts support all the above axes,
 and some variable font support other axes as well.

Variable font families with italics are built as two variable fonts; one for upright styles, one for italic styles.
The slant axis is not used to select the italic styles, a different axis is uses (the italic axis).
Unlike the other axes, the italic axis only has two values, upright or italic (not a range like the other axes).

Standard CSS properties like font-weight, font-style, or font-variation-settings can be used to fine-tune the preferred values.

[Introducing variable fonts][google-vf] gives more details on Variable fonts.


[axis-based]: https://software.sil.org/fonts/axis-based-fonts/#application-support
[google-vf]: https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
