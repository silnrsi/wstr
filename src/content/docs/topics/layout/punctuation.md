---
title: Punctuation
description: Description and examples of punctuation
sidebar:
    order: 6250
lastUpdated: 2025-07-25
---

Punctuation behaviors vary between scripts, and even between writing systems that share the same script (e.g. French and English). Most of these differences in punctuation, such as variations in quotation marks, are fairly straightforward and addressed by using different Unicode characters. In some cases, language-specific punctuation can be adjusted with OpenType features.

Each writing system may have specific punctuation conventions that need to be supported. Here are just a few examples.

## Sentence ending

Although the reader’s eye may not register it, good Latin script typography adds a small amount of extra space between a full stop and the next word than between other words. This is usually accomplished by adding width to the full stop. A simple difference in Cyrillic is that full stops don’t have any more extra space after them than between words (Kolodin et al, 2000), thus it might be useful to be able to disable that additional spacing, possibly with OpenType.

Tibetan (&#x0F0D;), Devanagari (&#x0964;), and Ethiopic (&#x1362;) all have different symbols for sentence ending, each with differing amounts of space before and after the marker. Some Ethiopic languages use a different question mark (&#x1367;) than the more standard Roman style.

Some Latin-script languages (such as Spanish) use an opening and closing mark for questions and exclamations. If a non-Roman script did this, that would need to be implemented as well.

## Abbreviated text

Punctuation around abbreviated text can be different. There may be space between abbreviations or there may not (i.e. A.D. Jones or A. D. Jones), and the punctuation will quite likely not be a full stop (Ethiopic: &#x12A5;/&#x12A5; instead of &#x12A5;.&#x12A5;.) (Yacob, 1999).

## References

Kolodin, M.Y., O.V. Eterevksy, O.G. Lapko, I.A. Maknovaya. 2000. “‘Russian style’ with LaTeX and Babel: what does it look like and how does it work,” *TUG 2000 Preprints*.

Yacob, Daniel. 1999. *Notes on Ethiopic Localization*. http://abyssiniagateway.net/fidel/l10n/index.uni.html.
