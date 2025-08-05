---
title: What is a Writing System?
description: Basic definition of writing systems from WSI Guidelines
authors: Victor Gaultney, Melinda Lyons
sidebar:
    order: 1100
lastUpdated: 2025-07-16
---

Language is primarily a spoken means of communication. _Writing systems_ (also called _orthographies_) are ways of communicating on printed or visual media, and are usually, but not always, based on spoken languages. A _script_, sometimes referred to using terms such as _alphabet_ and _syllabary_, is a collection of symbols (typically with accompanying rules of behavior) that forms the basis for writing many languages.

This leads to a basic definition of a _writing system_: **the use of one or more scripts to form a complete system for writing a particular language**. Note that a writing system is unique to a specific language, or language family. Although Russian and Ukrainian share the same Cyrillic script, they represent two distinct writing systems.

A _writing system implementation_ (WSI) refers to **a set of software components that allow computer users to process textual data in that script and language**; making it possible, for instance, to enter data using a keyboard and display it on the screen. Because writing systems are language-specific, there is no guarantee that an implementation of a certain script on a computer will work for all languages that use that script. A WSI that works for Farsi, for example, may not work for Sindhi, although they share the same Arabic script.

Common examples of WSIs would be those computer systems found in newspaper publishing houses around the world. WSIs can be very simple, such as for English, for which only a simple font is needed. They can also be complex and include expensive, dedicated software applications. For instance, to use Chinese on a computer requires a combination of fonts, input systems, and publishing software that can write both horizontally and vertically.

The following sections address topics of [writing system identification][language-tagging] and [locale data][locale-data]. For more information on writing system implementations, see the [writing systems computing model][ws-computing-model].

### Additional resources

- [Writing system (Wikipedia)][wiki-writing-system]
- [Types of writing system (Omniglot)][omni-types-of-ws]
- [On the Typology of Writing Systems][fedorova2020]
- [Orthography development][sil-orthography-dev]

_Portions of this content first appeared in [Guidelines for Writing System Support][wsig], copyright © 2003 UNESCO and SIL International._

[fedorova2020]: https://www.fluxus-editions.fr/gla5-fedo.pdf
[language-tagging]: /topics/writingsystems/language-tagging
[locale-data]: /topics/writingsystems/locale-data
[omni-types-of-ws]: https://www.omniglot.com/writing/types.htm
[sil-orthography-dev]: https://www.sil.org/literacy-and-education/orthography-development
[wiki-writing-system]: https://en.wikipedia.org/wiki/Writing_system
[ws-computing-model]: /topics/computing/ws-computing-model
[wsig]: https://scripts.sil.org/wsi_guidelines.html
