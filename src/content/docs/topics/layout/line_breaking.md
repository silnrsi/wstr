---
title: Line Breaking
sidebar:
    order: 6210
---

Here is an outline on this topic

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
