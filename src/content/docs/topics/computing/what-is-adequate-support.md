---
title: What is Adequate Support?
description: How to decide what can be considered adequate support for a writing system
authors: Victor Gaultney, Melinda Lyons
sidebar:
    order: 2200
lastUpdated: 2025-07-25
---

Language communities need writing system implementations (WSIs) in order for them to express their languages through digital technology. A WSI is needed to do even the most basic communications, such as printing out a letter for mass reproduction. Because of the critical importance of digital communications WSIs will continue to be essential.

Every language deserves to have its writing system working on computers and communication devices. But what does this mean? WSIs can differ in their breadth and depth of support. So what level of support does a WSI need to provide for a language in order to be sufficient? At what point can the need be considered to be met? And what should be the goal of a WSI development program?

## Levels of computing support

### Minimal — type, see, print, store

At a foundational, minimal level, people must be able to:

- Type their language in a manner that is sensible to them. Aspects of the input experience, such as the layout or typing order, should usually match up with the way people think about writing their language, and not require a shift in linguistic understanding. For writing systems with hundreds or thousands of letters, this means that the correct symbol should be accessible in a reasonably intuitive manner.
- See the results on the screen and view the text as it will be viewed or printed. A WSI needs to provide basic feedback to users and allow them to catch and change mistakes.
- View and print their document with text rendered correctly. Lettershapes need to be accurate for the language, with accents and diacritics positioned appropriately. Words need to be formed using the right word-formation rules. For writing systems that require ligatures—the joining of two or more letters to form a combined shape that is different than the individual letters—the ligatures need to be present, and correct.
- Store the text in a format that retains all important information. This should include everything needed to present the text content legibly and facilitate common text processes (editing, sorting, spell-checking, etc.) in a manner that is appropriate to that writing system. For example, if a language is written with special tone marks, those marks need to be stored as an integral part of the text, not as separate graphics or manually positioned marks.

This allows for basic functionality. If any one of these four attributes are missing, the WSI should be considered foundationally inadequate.

### Reasonable — interchange, process, analysis

In today’s digital world, print publishing is not enough. People need to be able to share information in their language with others—through email, websites, portable documents, even interactive presentations. It is reasonable to expect that every language needs the ability to communicate in a wider world.

A WSI that enables broader communication would need to support:

- Transmission of adequate language data via text messaging and email. Information needs to be encoded so that it could be sent to another computer or device without loss of important language information.
- Preparation of webpages that display the language correctly. This is, however, highly dependent on individual browsers. Development of a WSI that supports webpage design that displays correctly in most browsers is a reasonable expectation.
- Preparation of portable documents, such as PDFs. WSIs need to allow the embedding of language data into documents that can be viewed on a variety of operating system platforms.

In addition to information sharing, a WSI ought to provide for an appropriate level of language processing or analysis. This can include word sorting (for dictionaries and directories), spell-checking, hyphenation and other algorithmic processes. The technology needed to support these activities already exists in some cases, but is often in an early state of development.

### Ideal — parity

Ideally, communicating in any language should be as easy as it currently is for English or other European languages. This is sometimes technologically or economically unfeasible. Nevertheless, there is no reason to be satisfied with a minimal solution for a writing system. As a language community grows in its technical ability and desire for communication, there should be no artificially imposed barriers on their use of computers.

## Completeness

There remains, however, a question of completeness. For many activities, there may be a range of WSI support that is sufficient. In the end, WSIs can only be deemed to be complete if they fully meet the need for which they were intended.

Publishing, for example, is a term that covers the production of everything from a leaflet to a glossy airline magazine. For anything but the most basic publishing, a wider range of support is needed. For example, people typesetting Hebrew text (which runs right-to-left on the page), often need to mix words or phrases from left-to-right writing systems into their text. There is a whole set of paragraph and line construction rules that need to be applied when mixing such diverse scripts. A WSI may be sufficient for basic Hebrew publishing without supporting these rules, but more complex publishing requires them.

## Accessibility

Finally, a WSI needs to be accessible to those who need it. There are a number of barriers to this:

- System complexity. A WSI may meet all the technical needs for a writing system, but be too complex for the general public to use. It may meet the need for a smaller segment of the community, but generally useful WSIs are still needed.
- Available software platforms. To be adequate for a broad population, WSIs need to be usable on operating system and application platforms that are available to the public. For example, a WSI that only works on a Windows computer would not be sufficient in a location where most people have access to only mobile devices.
- Economic cost. Although commercial investment is often necessary for the development of WSIs, solutions that are affordable by only a small segment of the community may not be sufficient. It will take creativity and cooperation to develop WSIs for the general public.

These three issues need consideration in the planning, development and evaluation of WSIs.

## Further resources

[Full Stack Language Enablement](loomis2018) provides another view on what constitutes adequate support for a writing system.


_Portions of this content first appeared in [Guidelines for Writing System Support][wsig], copyright © 2003 UNESCO and SIL International._

[loomis2018]: https://srl295.github.io/2017/06/06/full-stack-enablement/
[wsig]: https://scripts.sil.org/wsi_guidelines.html
