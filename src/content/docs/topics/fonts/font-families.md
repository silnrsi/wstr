---
title: types of font families
description: Recommendations for support the three types of font families.
sidebar:
    order: 2550
tags: [ribbi, variable, axis-based]
lastUpdated: 2026-01-27
---

_This is a work in progress._


## Three types of font families

There are three types of font families. In general, standard applications should be able to support the first two types: RIBBI and Axis-based fonts. Variable fonts may need more attention to developing a UI to handle the potential weights. 

### RIBBI fonts

Users are most familiar with fonts that have up to four different standard faces: Regular, Italic, Bold, and Bold-Italic.

### Axis-based fonts

[Axis-based][axis-based] fonts generally go beyond the standard Regular, Italic, Bold, and Bold Italic type faces. They can provide other styles such as Thin, ExtraLight, Light, Medium, SemiBold, ExtraBold, Black, etc.

Some Windows applications will display these other weights as separate font families (except bold). Ideally, an application should see, for example, **Gentium** as one font with ten **faces** rather than as separate fonts.

![Figure: Gentium weights](images/2540-gentium-weights.png "Display one font with ten weights")

ptxPrint handles this appropriately. 

### Variable fonts

Variable fonts are a single font with all the potential weights. They are primarily used in web-based applications, and in that environment they can be more flexible than static fonts. Variable fonts allow for choosing any weight, width, or slant, using sliders or input fields to get the exact style you need.

Standard CSS properties like font-weight, font-style, or font-variation-settings can be used to fine-tune the preferred values.

[Introducing variable fonts][google-vf] gives more details on Variable fonts.


[axis-based]: https://software.sil.org/fonts/axis-based-fonts/#application-support
[google-vf]: https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
