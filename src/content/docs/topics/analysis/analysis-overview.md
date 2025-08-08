---
title: Analysis Overview
description: Types of analysis related to writing systems
sidebar:
  order: 7001
lastUpdated: 2025-08-08
---

Placeholder: Basic description of the types of analysis with links to more info

## Segmentation (hypenation, word breaking)

[Unicode conversion of non-breaking hyphens in MS Word](https://scriptsource.org/entry/xvbp4378bg)


## Sorting (collation)

Different languages sort words in different orders. Strictly speaking, in computing, "sorting" is about the algorithm that puts things into order as quickly as possible, while "collation" is about the comparison of two strings to say which should sort earlier and which later. For text processing, therefore, we are more concerned with this later collation question. Since different languages collate in different ways, there needs to be ways for software to use language specific collation. This again calls for the system to know what language the text is in.

Resource: [Unicode Sort Tailoring: Tutorial](https://scriptsource.org/entry/pnrnlhkrq9) and [Resources](https://scriptsource.org/entry/lcepuup9ga)

## Searching

When accepting input for searching, it is essential to normalize the search item to the same format as the data. Increasingly, this detail is handled by the collation library your programming language provides.

Searching is both simple and incredibly complicated. This is not a solved problem. For example, when searching, are we concerned about case? format characters? phonetic equivalence? and so on. Just comparing bytes is one form of search, but often people want more choice over how they search. This is an opportunity to provide a real difference in language support for your software.

## Spell checking

## Text conversion

## Cross-script transliteration

[Introduction to Text Conversion and Transliteration](https://scriptsource.org/entry/xlzd6n5aqt)
