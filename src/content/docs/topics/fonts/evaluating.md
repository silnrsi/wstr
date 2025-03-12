---
title: Evaluating Fonts
sidebar:
    order: 5120
lastUpdated: 2025-03-12
---

In this page we look at how a font user could evaluate a font. We look at both
the technical aspects of a font and also the visual aspects.

## Visual

Text is used in various contexts: print (printed out on paper using a high
resolution printer); screen (on a screen or monitor); small screen (a phone). A
font should be assessed for all the contexts in which it is to be used and at
the various print sizes that it is expected to be used at.

How does text in the font look on the page? Consider some of the following
questions as appropriate to the font and script being evaluated:

### Intercharacter spacing
Is the intercharacter spacing even or do particular letters jump out as
seeming to stand alone because they have extra space around them? Or do two
letters seem too close together? Do particular sequences of letters stand
out as being a dark area of ink?

Is the space character to wide or too narrow?

### Diacritics
Are some diacritics too close to their base characters or too far away? Are
their combinations where the diacritic is not in the best position? Do
diacritics or other marks on different letters interact with each other
inappropriately?

### Linespacing
High quality typesetting always specifies the line spacing exactly. But is
the default linespacing too tight or wide? Is it hard to set text
efficiently without characters bumping into each other?

### Evenness
Unless a font is designed to be uneven, a printed page of text should have
an even colour of grey over the whole page. A fun way to help assess this is
to turn the page upside down.

### Sizing
When this font is used with another font that it will often be used with
(for example a non Latin font used with a Latin font), are the characters in
this font of an appropriate size? Are all the characters in this font
appropriately sized in relation to each other? For example Latin digits in a
non###Latin font?

## Technical

The technical aspects of a font are about how well a font handles the text it is
given and how easy the font is to use.

### Features
Does the font have the necessary alternatives and features needed for the
languages being written with it? Are the default settings for these features
ppropriate?

### Uniqueness
No two different sequences that are not officially canonically equivalent
should render to the same correct visual representation. For example if two
on###interacting diacritics are stored in different orders then they should
not render the same, unless Unicode says those sequences are canonically
equivalent. Generally one of the sequences should look different in some
way, for example with the insertion of a dotted circle.

It is not a problem if two sequences render to the same visual
representation if that visual form is indicating some kind of error or fault
in the sequence.


## Further reading

### The [Diátaxis framework](https://diataxis.fr/reference/) calls these Reference pages
