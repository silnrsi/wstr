---
title: Line Breaking
description: Methods and tools for line breaking
authors: Martin Hosken and Lorna Priest
sidebar:
    order: 6210
lastUpdated: 2025-09-05
---

In typesetting the Latin script, text is [justified][glo-justification] on a line by first seeing how much fits on a line, then checking to see if there is a word break there (for example, a space), next checking to see if a word can be broken (hyphenated) at that point, then adding space between words and finally (although strongly deprecated!) between letters to fill out the line.

Line breaking becomes more difficult if scripts do not have word breaks, as in Khmer or Thai, or if the word break is represented by a character rather than a space, as with the Tibetan Tsheg (&#x0F0B;) or Ethiopic _Hulet Neteb_ (&#x1361;). See [Justification][justification] and [Hyphenation][hyphenation] for details.

The basic algorithm for modern line breaking is to assess a text for the possible line breaking positions and then to use those to guide the text layout engine in its choice of actual line breaks. This article is about how to determine those possible line break positions.

There are three general methods used by applications to determine line breaking: character category based, [hyphenation][glo-hyphenation], and dictionary based.

## Character category based

The Unicode Consortium has created a [standard][uax-14] that describes how to do algorithmic line breaking. Characters are categorized by their line breaking properties, and from these, rules decide where a line break may occur. Or in the case of [UAX #14: Unicode Line Breaking Algorithm][uax-14], more commonly, where line breaks may not occur. This algorithm handles languages that use interword spaces very well. It handles punctuation, digits, hyphens, etc. Languages that do not have interword spaces may use zero width spaces to mark word boundaries and then use this algorithm.

A common library for doing line breaking is [ICU][uni-icu] and it has the capability to tailor the line breaking rules according to the needs of a particular language. It also has limited support for hyphenation and dictionary based line breaking.

## Hyphenation

[Hyphenation][hyphenation] is used as a refinement to normal line breaking in that it gives more line break opportunities, and thus allows a layout engine to make justified text look more balanced without excessively wide interword spaces. It also provides a second level of line breaking in terms that hyphenation points are considered secondary to the primary interword line break.

## Dictionary 

Dictionary based breaking schemes are typically used where there are not marked word breaks. Unlike hyphenation which is only used sparsely to improve layout, texts without word breaks must use more complex means to break lines at all, or at least not in unhelpful places. The typical approach to dictionary based breaking is to use a dictionary to split a paragraph into words. The aim is to minimize the amount of 'unknown' material. That is characters not found in words, or sequences of characters that are unknown to the dictionary. There are three approaches to breaking a text into words:

### Longest match

This is also known as greedy matching. The engine starts by finding the longest word that matches at the start of the text, and then keeps trying from there, looking for the longest match each time. The engine may backtrack if it can't find a match in the hope of finding a match starting from a slightly different position. For text that is all known words, longest matching is fast and easy to implement, but it can result in some undesirable matches where it breaks some longer words into shorter ones.

### Perfect match

The ideal solution is perfect matching in which the dictionary has other information (e.g. grammatical) by which the choice as to the best way to break the text into words can be achieved. Unfortunately, there is no way to do absolutely perfect matching without a full understanding of the discourse of the text. Perhaps some [LLMs][glo-llm] can get close.

### Maximal match

Instead a compromise algorithm is the most common solution to the problem, called maximal matching, it breaks the text into the least number of segments, or makes each segment as long as possible (hence 'maximal'). The algorithm at its worst is a _O(n!)_, but using simply dynamic programming techniques can be brought down to _O(n)_. In addition, the dictionary may be enhanced with probabilities that can help split excessively long words into more common shorter words if appropriate.

### Language tagging

One of the difficulties with dictionary based approaches is using the right dictionary. If all text were marked with its language, and marked correctly, there would be no problem. This is particularly a problem for minority languages. For majority languages, of which there is usually only one per script, the assumption that text in a particular script is in that language, is usually correct. Libraries like [ICU][uni-icu] identify the language based on the script and then break the text according to the dictionary of that language. This is fine for users of that language but causes problems for users of a minority language since the dictionary is wrong.

One approach for minority language users is to use ZWSP (ZERO WIDTH SPACE) to identify the words in the text and then somehow to tell the line breaking engine not to use dictionary breaking. Either that or the text must be appropriately marked for its language and the line breaking engine to be given a dictionary to use for the line breaking of text in that language.

See also: [Language Tagging][langtag].

## Line breaking and paragraph balance

In laying out a paragraph, there are various algorithms used to choose where lines are broken. The simplest is to fit as much text on a line as possible and then go on to the next line and repeat until the paragraph is complete. Other algorithms try to balance the look of the paragraph including whether one line has been shrunk followed by another line being stretched. The [TeX][texbook] line breaking algorithm is in such a class.

_Portions of this content first appeared in [Implementing Writing Systems][iws], copyright © 2001 SIL International._

[glo-hyphenation]: /reference/glossary#hyphen
[glo-justification]: /reference/glossary#justify
[glo-llm]: /reference/glossary#llm
[hyphenation]: /topics/layout/hyphenation
[iws]: https://scripts.sil.org/iws-toc.html
[justification]: /topics/layout/justification
[langtag]: /topics/writingsystems/language-tagging
[texbook]: https://books.google.co.uk/books?id=zqgQAQAAMAAJ
[uax-14]: https://www.unicode.org/reports/tr14/
[uni-icu]: https://icu.unicode.org/
