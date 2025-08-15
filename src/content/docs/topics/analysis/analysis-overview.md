---
title: Analysis Overview
description: Types of analysis related to writing systems
sidebar:
  order: 7001
lastUpdated: 2025-08-15
---
# An Overview of Script Text Analysis

Placeholder: Basic description of the types of analysis with links: Seg, sort, coll, search, spell, cross.

## Introduction

The cry of "I can't type my text" has been heard and a
[font](topics/fonts/finding-and-using-fonts),
[keyboard](topics/input/from-keystrokes-to-codepoints) and
[encoding](topics/encoding/unicode-concepts) are all available.
But people, understandably, want more. They want to be able to do
things with their text. There are a number of processes which fall under the
label analysis. The purpose of this article is to introduce these various
processes and some of the terms used in describing them.

## Search

Computer are great at searching mounds of data. The core activity in searching
is the comparison of two strings as to whether they are equal or not. The
simplest approach to this is simply to do a binary comparison of the two
strings. But that will often miss many good matches. The issues involved in
searching include:

- Canonical equivalence where two different strings are required to be considered
  equal.
- Foldings where different characters are considered equal. For example a
  caseless search where lower and uppercase are considered equal to each other.
- Ignored characters such as ZWNJ or ZWSP or even space. This is where certain
  characters may occur anywhere in the string but should be ignored for
  comparison.

In addition to simple string comparison, there are more sophisticated comparison
techniques such as regular expressions. Many modern regular expression languages
have good integration with Unicode allowing access to classes of characters
based on Unicode properties.

Difficulties in comparison occur when two strings that should be considered
equal are not. This may be due to weaknesses in the encoding design where two
different strings look valid and the same and so people enter the same text in
different ways. Either the string comparison has to be aware of that or the
encoding has to be improved to ensure the same text is stored the same way.

## Collation

Just as searching resolves down to comparing two strings, sorting resolves down
to collating two strings; that is to say which of two strings is sorted earlier
and which later.

The modern collation algorithm consists of giving each character (or group of
characters) one or more collation keys. A collation key consists of a primary,
secondary and tertiary order. Strings are then compared at the primary order and
if there is a difference, then that gives the result. If there is not then the
strings are compared with their secondary orders and if necessary tertiary
orders. Unicode has a Default Unicode Collation Element Table (DUCET) that has a set of
default keys convering every character in Unicode. This default ordering is
pretty good, but languages often want some difference from that. For this, a
langauge can provide a tailoring of the default collation order. There is a
standard syntax for describing this and applications can make use of that.

## Segmentation

There are a number of contexts in which text needs to be broken into sub
strings. For example, when double clicking to select a word, or when line
breaking. Just breaking on spaces is insufficient. For example, when double
clicking does one include the initial quotation marks or final period? Then
there are the many langauges that do not have inter word spaces. How do we
decide where to break a line? See [Line Breaking](topics/layout/line_breaking)
for more details.

Unicode specifies algorithms for breaking text into words, lines, sentences and
even into grapheme clusters. A grapheme cluster is used to find which characters
occur between one cursor position and the next. A cursor is always considered to
move forward in the text and to only change direction when the bidirectionality
of the text changes.

## Spell Checking

Spell checking involves looking up words in a langauge in a lexicon. A lexicon
is a list of possible words in a language, which is much like a dictionary but
with just the head words and no description. Unfortunately, getting from the
surface form of a word to its components in the lexicon can be far from trivial.
In fact writing a spell checker was once considered one of the hardest problems
to solve in computing. Agglutinating languages can express whole sentences in a
single word and scripts without marked word breaks can have 'words' that are
longer than a line of text.

## Cross script conversion

Many languages are written in more than one script. For example, a language that
spans a national border, where the two nations use a different script for their
national language, can mean that speakers of the language in each country will
want or need to use a different script. People do not want to have to retype
their text just to change the script it is in. Writing a computer tool to do
the conversion is far preferable. The basis for writing such tools is a
description of the orthographies in each of the scripts. In some cases a script
conversion tool can be used for many languages that use both scripts. In other
cases a converter has to be created for each language.

## Large Language Models

Linguistic computing is currently undergoing something of a revolution as some
long standing difficult problems are starting to fall at the feet of large
langauge models. These include problems like converting text to audible speech
or the reverse: speech to text. Machine translation is also a task that LLMs
help with. Given we are at the start of such a revolution, the support is
particularly weak for what are classed as digitally disadvantaged languages and
is highly application specific. This means that the general principles of
description and sharing between applications are yet to be worked out.
This does not, though, reduce the demand and expectation of users of languages
that they not be left behind.
