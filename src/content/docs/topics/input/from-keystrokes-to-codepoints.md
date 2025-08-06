---
title: From Keystrokes to Codepoints
description: Explaining the relationship between pressed keys and encoded codepoints
sidebar:
    order: 4100
lastUpdated: 2025-08-06
---

Keyboards are often used to input text data. A user touches keys in a certain order, whether depressing actual keys on a physical keyboard or tapping images of keys on a touch keyboard, to communicate to the device what codepoints to store. These codepoints represent the characters the user desires to enter.

For simple writing systems, one keystroke may correspond to one character. For example, type the key labeled 'A' and an 'a' character is entered.

Writing systems with many characters may require multiple keystrokes to produce one character. For example, type the key for the Ethiopic character 'መ', which represents the syllable 'ma', then type the key for the vowel 'i' and the result is the Ethiopic character 'ሚ', a single codepoint which represents the syllable 'mi'.

In writing systems where digraphs such as 'gb' are regarded as a unit, users may prefer to assign two characters to a single key. For example, type the key labeled 'GB' and the characters 'g' and 'b' are entered.

See section 5.3 of [Guidelines for Writing System Support][wsig5-3] for a more detailed discussion.

See [Keyboards and Tools][keyboards-and-tools] for information on available keyboarding utilities. Input methods other than keyboards are covered in [Other Input Methods][other-input-methods]. 

[wsig5-3]: https://scripts.sil.org/wsi_guidelines_sec_5_3.html
[keyboards-and-tools]: topics/input/keyboards-and-tools
[other-input-methods]: topics/input/other-input-methods
