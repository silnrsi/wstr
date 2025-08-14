---
title: Line Breaking
description: Issues in line breaking
authors: Lorna Priest
sidebar:
    order: 6210
lastUpdated: 2025-08-14
---

In typesetting with Roman script, text is [justified][justification] on a line by first seeing how much fits on a line, then checking to see if there is a word break there (for example, a space), next checking to see if a word can be broken (hyphenated) at that point, then adding space between words and finally (although strongly deprecated!) between letters to fill out the line.

Line breaking becomes more difficult if scripts do not have word breaks, as in Tibetan and Thai, or if the word break is represented by a character rather than a space. Ethiopic is an example of using a character rather than a space: the _Hulet Neteb_ (&#x1361;) is used between words in place of white space, unless there is other punctuation which acts as a word break. This is also an excellent illustration of how computers have changed a script. With the advent of computing, Ethiopic is now usually written on computer with white space between words. When handwriting, however, people typically still use the _Hulet Neteb_.

See [Justification][page-justification] and [Hyphenation][page-hyphenation] for details on those aspects of line breaking.

For a deeper discussion, here is an outline on this topic

- Introduction
    - Based on linebreak opportunities
        - Paragraph layout in another document
    - Different kinds of linebreaking
        - Character category based
        - Hyphenation
        - Dictionary based
- UAX#14 - Character category based
    - widely used via libicu
    - breaks based on character categories, e.g. punctuation, spaces
    - more concerned with where not to break than were to break (a good
      approach)
    - Sufficient for basic line breaking for all languages that use spaces as
      word breaks
    - using ZWSP to linebreak non word spaced text as if it were spaced
- Hyphenation
    - Details in another doc
    - Used in conjunction with character category based as a refinement
    - Manual hyphenation via SHY
- Dictionary
    - How to break a string given a wordlist
        - Maximal matching
        - Perfect matching
            - `a+b?, b*c+d*, d+a*` matching `aabcda`: `aab|cd|a` or `aa|bc|da` or
              `aa|bcd|a` (need a better example)
                - Handling unknown text
        - Frequency weighed perfect matching
    - Assumptions of language and dictionary based on script
        - How to stop those based on language tagging
        - How to mitigate them given poorly tagged text
            - What is the range of a ZWSP?


<br>

_Portions of this content first appeared in [Implementing Writing Systems][iws], copyright © 2001 SIL International._

[iws]: https://scripts.sil.org/iws-toc.html
[hyphenation]: /reference/glossary#hyphen
[justification]: /reference/glossary#justify
[page-justification]: /topics/layout/justification
[page-hyphenation]: /topics/layout/hyphenation