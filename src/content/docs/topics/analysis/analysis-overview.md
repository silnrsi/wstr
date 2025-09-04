---
title: Analysis Overview
description: Types of analysis related to writing systems
sidebar:
  order: 7001
lastUpdated: 2025-08-27
---

Even after the basic needs for an [encoding][characters-codepoints-glyphs], [keyboard][from-keystrokes-to-codepoints], and [font][finding-and-using-fonts] are met, people understandably want more. They want to be able to do things with their text. There are a number of processes which fall under the label _analysis_. The purpose of this article is to introduce these various processes and some of the terms used in describing them.

## Searching

Computers are great at searching mounds of data. The core activity in searching is the comparison of two strings as to whether they are equal or not. The simplest approach to this is simply to do a binary comparison of the two strings, but that will often miss many good matches. The issues involved in searching include:

- _Canonical equivalence_ where two different strings are required to be considered equal, according to the Unicode standard.
- _Foldings_ where different characters are considered equal. For example, a caseless search where lower and uppercase are considered equal to each other.
- _Ignored characters_ such as ZWNJ or ZWSP or even spaces. This is where certain characters may occur anywhere in the string but should be ignored for comparison.

In addition to simple string comparison, there are more sophisticated comparison techniques such as regular expressions. Many modern regular expression languages have good integration with Unicode allowing access to classes of characters based on Unicode properties.

Difficulties in comparison occur when two strings that should be considered equal are not. This may be due to weaknesses in the encoding design where two different strings look valid and the same and so people enter the same text in different ways. Either the string comparison has to be aware of that or the encoding has to be improved to ensure the same text is stored the same way.

## Collation

Just as searching resolves down to comparing two strings, sorting resolves down to collating two strings; that is to say, which of two strings is sorted earlier and which later.

The modern [Unicode Collation Algorithm][uts-10] consists of giving each character (or group of characters) one or more collation keys. A collation key consists of a primary, secondary, and tertiary order. Strings are then compared at the primary order and if there is a difference, then that gives the result. If there is not then the strings are compared with their secondary orders and if necessary tertiary orders. Unicode has a [Default Unicode Collation Element Table (DUCET)][uts-10-ducet] that has a set of default keys covering every character in Unicode. This default ordering is pretty good, but languages often want some difference from that. For this, a language can provide a tailoring of the default collation order. There is a standard syntax for describing this, based on the [ICU library][icu], and applications can make use of that.

## Segmentation

There are a number of contexts in which text needs to be broken into substrings. For example, when double-clicking to select a word, or when breaking lines. Breaking only on spaces is insufficient. When double-clicking, does one include the initial quotation marks or final period? There are also many languages that do not have interword spaces. How do we decide where to break a line? See [Line Breaking][line-breaking] for more details.

Unicode [specifies algorithms][uax-29] for breaking text into words, lines, sentences, and even into [grapheme][glo-grapheme] clusters. A grapheme cluster is used to find which characters occur between one cursor position and the next. A cursor is always considered to move forward in the text and to only change direction when the bidirectionality of the text changes.

## Spell checking

Spell checking involves looking up words in a language in a lexicon. A lexicon is a list of possible words in a language, which is much like a dictionary but with just the head words and no description. Unfortunately, getting from the surface form of a word to its components in the lexicon can be far from trivial. In fact, writing a spell checker was once considered one of the hardest problems to solve in computing. Agglutinating languages can express whole sentences in a single word and scripts without marked word breaks can have 'words' that are longer than a line of text.

A common open source library to help with spell checking is [hunspell][hunspell]

## Cross script conversion

Many languages are written in more than one script. For example, a language that spans a national border, where the two nations use different scripts for their national language, can mean that speakers of the language in each country will want or need to use a different script. People do not want to have to retype their text just to change the script it is in. Writing a computer tool to do the conversion is far preferable. The basis for writing such tools is a description of the orthographies in each of the scripts. In some cases a script conversion tool can be used for many languages that use both scripts. In other cases a converter has to be created for each language.

## OCR

Optical Character Recognition is a process whereby a computer 'reads' the text in an image. There are numerous non-language specific issues in doing OCR well. At the language level OCR is a kind of input method that is very visually based. It types what it sees with no knowledge of the underlying structure of the text. For most scripts this is not an issue, but some scripts may need their encoding adjusted to support a visual based input.

## Large Language Models

Linguistic computing is currently undergoing something of a revolution as some long standing difficult problems are starting to fall at the feet of large language models. These include problems like converting text to audible speech or the reverse: speech to text. Machine translation is also a task that LLMs help with. Given we are at the start of such a revolution, the support is particularly weak for what are classed as digitally disadvantaged languages and is highly application-specific. This means that the general principles of description and sharing between applications are yet to be worked out. This does not, though, reduce the demand and expectation of users of languages that they not be left behind.

[uts-10]: https://www.unicode.org/reports/tr10/
[uts-10-ducet]: https://www.unicode.org/reports/tr10/#Default_Unicode_Collation_Element_Table
[characters-codepoints-glyphs]: /topics/encoding/characters-codepoints-glyphs
[from-keystrokes-to-codepoints]: /topics/input/from-keystrokes-to-codepoints
[finding-and-using-fonts]: /topics/fonts/finding-and-using-fonts
[line-breaking]: /topics/layout/line-breaking
[glo-grapheme]: /reference/glossary#grapheme
[icu]: https://icu.unicode.org
[uax-29]: https://unicode.org/reports/tr29/
[hunspell]: https://hunspell.github.io
