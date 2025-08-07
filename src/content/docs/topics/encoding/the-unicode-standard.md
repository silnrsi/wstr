---
title: The Unicode Standard
description: History, background, and processes
sidebar:
    order: 3200
lastUpdated: 2025-08-07
---

Placeholder: This could be an update of WSIG 6.2. There may also be useful additional info in Understanding Unicode ch 2 that could be copied over.

Here is some info copied from WSBP:

Unicode is an encoding standard that aims to support all the world's languages and scripts. (Although new scripts and characters are still being added, the rate of additions has slowed.) Unicode provides the best way to encode language data.

Language data should be encoded as Unicode "code points." (A code point is sometimes called a "Unicode scalar value" or "USV".) These are numbers in the range 0 to hexadecimal 10FFFF. Each assigned USV has an unambiguous and immutable association with a single character.

Unicode characters are organized in 17 "planes", each with 65536 code points (numbered from 0 to hexadecimal FFFF). Plane zero (0000-FFFF) is the Basic Multilingual Plane (BMP). The next plane (10000-1FFFF) is the Supplementary Multilingual Plane (SMP). Each plane contains "blocks" of similar characters, often by script (Latin, Devanagari, etc.).

The convention is to preface the hexadecimal code point with "U+" and to include at least four digits. Each code point has an official name, for example, U+0041 is "LATIN CAPITAL LETTER A". (The official character name will not change, even if it is later discovered to be inaccurate.)

The Unicode Standard didn't have widespread adoption until the late 1990s. Older documents, sites, or other imported data may differ from the modern Unicode standard. (See [Legacy Encodings](/topics/encoding/legacy-encodings).) However, all new data should *always* use the Unicode Standard. 

Resources:

[The Unicode Standard](https://www.unicode.org/standard/standard.html)

[Everyday Unicode](https://scriptsource.org/entry/mhzqeygkuz)

[Unicode information on ScriptSource](https://scriptsource.org/entry/z3hs8db5ct)

[Unicode Character Browsing](https://scriptsource.org/entry/tubkvb6y8f)

[Unicode Status in ScriptSource](https://scriptsource.org/entry/tn9r6q9euj)

[Understanding Unicode I](https://scriptsource.org/source/c6rwvqz3gn) and [II](https://scriptsource.org/source/hqj8q8b4xv)

