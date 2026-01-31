---
title: Legacy Encodings
description: Issues regarding non-Unicode encodings
sidebar:
    order: 3800
lastUpdated: 2025-08-07
---

The Unicode Standard did not have widespread adoption until the late 1990s. Even today Windows 11 defaults to using "code pages" instead of Unicode. Prior to Unicode, there were many standards. These included:

- ASCII: Used 7 bits for each character. Was designed for American English. It didn't even have accented characters. ASCII could only represent 128 different code points.
- ANSI (American National Standards Institute): Used 8 bits for each character. Other bodies standardized these different encodings. Each ANSI-standard encoding (called a code page) was given a number. ANSI could represent 256 different code points.

In addition to these "standard" encodings, people created their own "custom" (also called "hacked") encodings by replacing characters they were not using with characters they needed. Without a corresponding "custom" font, the data displayed incorrectly. 

The result of all this is that the same code points could mean different things on computers in different parts of the world.

## Unexpected Behaviors

Various problems were encountered when custom encodings were used. Most of these relate to the default properties associated with individual characters:

- Sort order: a, b, c, …, z
- Capitalization: a -> A, b -> B, c -> C, … , z -> Z
- Letters form words, limiting where lines break.
- Punctuation has different line-breaking properties than letters.

If &#x00C0; and &#x00C1; were not needed, sometimes &#x014b; and &#x014a; were placed in those positions. The computer's sorting algorithm and capitalization routines would not produce the correct behavior.

If &#x00BD; was reused for a character such as &#x014b;, software would sometimes convert it to `1/2` rather than to the character it had been redefined as. Similarly &#x00A9; was sometimes converted to `(c)`, and &#x00AE; was sometimes converted to `(r)`.

## Helpful Resources:

- [Text Encoding Issues When Working with Multiple Scripts][text-enc-script]
- [Introduction to Text Conversion and Transliteration][intro-text-conv]

[intro-text-conv]: https://scriptsource.org/entry/xlzd6n5aqt
[text-enc-script]: https://scriptsource.org/entry/yrl9a5tk4e


