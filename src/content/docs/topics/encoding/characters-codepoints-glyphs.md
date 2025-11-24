---
title: Characters, Codepoints, Glyphs
description: How these three things interrelate
sidebar:
    order: 3100
authors: Peter Constable
lastUpdated: 2025-11-24
---

Software systems used for working with multilingual data are evolving, and it is increasingly important for users and support personnel to have an understanding of how these systems work. This section serves as an introduction to remaining technical sections, and explains some of the most basic concepts involved in working with multilingual text: characters, keystrokes, codepoints, and glyphs. Each notion is explained, as is the way they relate to one another and interact within a computer system.

## Characters

There are, in fact, different senses of the word character that are important for us. In common usage, though, the distinctions are not typically recognized. These differences must be understood in working with multilingual software technologies.

### Orthographies, characters and graphemes

The first and most common sense of the term [character][glo-character] has to do with orthographies and writing systems: languages are written using orthographies,[^1] and a character in this first sense, an orthographic character, is an element within an orthography. For example, the lower case letter “a” used to write English, the letter “&#x1A47;” used for Tai Tham, and the IPA symbol for a voiced, inter-dental fricative, “ð”, are characters.

[^1]: The familiar term **orthography** is used here in place of the more correct and more specialized but less well-known term **writing system**. Writing systems include not only conventional systems of graphic objects used for written linguistic communication—commonly known as **orthographies**, but also systems of written notation used to describe or transcribe language and linguistic utterances, such as IPA or shorthand.

It is easy to provide clear examples of characters in this sense of the word. Providing a formal definition is not so easy, though. To see why, let’s consider some of the things that can occur in an orthography.

Some orthographies contain elements that are complex, using multiple components to write a single sound. For example, in Spanish as well as in Slovak, “ch” functions as a single unit. This is an example of what is sometimes called a **digraph**. Some languages may have orthographies with even more complex elements. For instance, the orthographies of some languages of Africa have elements composed of three letters, such as “ngb”. Such combinations of two or more letters or written symbols that are used together within an orthography to represent a single sound are sometimes referred to as **multigraphs** or **polygraphs**.

Also, many languages use dependent symbols known as **accents** or **diacritics**. These are common in European languages; for example, in Danish “ë” and “å”, or French “é” and “ô”.

So, are multigraphs one character or several characters? And are the diacritics by themselves considered characters? There are not always clear answers to these kinds of questions. For a given written symbol, different individuals or cultures may have different perceptions of that symbol based on their own use of it. Speakers of English would not recognize the dot in “i” as a character, but they also would not hesitate to acknowledge the components of the digraph “th” as characters since “t” and “h” function independently in English orthography. The case of “th” might not be as clear to users of another language if, suppose, that language does not make independent use of “h”. Likewise, English speakers would probably not be as confident in commenting about the ring in “å”.

This uncertainty could be avoided by using a distinct term: [grapheme][glo-grapheme]. _A grapheme is anything that functions as a distinct unit within an orthography._ By this definition, the status of multigraphs are clear: multigraphs, such as Spanish “ch”, and “ngb” in the orthography of some Bantu languages, are all graphemes.[^2] Diacritics, either by themselves or in combination with base letters, may or may not be graphemes, depending on whether they function as distinct units with an orthography.

[^2]:Note that graphemes are not necessarily related to phonemes. For example, the English phoneme /ð/ is written as “th”, but “th” does not function as a unit in terms of the behaviors of English orthography.

The notion of **grapheme** is important for us. Obviously, though, it would still be helpful to be able to talk about things like the “h” in “th” or the ring diacritic in general terms, even if they don’t correspond to a grapheme in a given orthography. An approximate, informal definition could be: when speaking in terms of writing systems and orthographies, a **character** (or **orthographic character**) is _a written symbol that is conventionally perceived as a distinct unit of writing in some writing system._

### Characters as elements of textual information

A second sense of the term character, important to Writing System Implementation development, is particularly applicable within the domain of information systems and computers: _a minimal unit of textual information that is used within an information system._ In any given case, this definition may or may not correspond exactly with either our informal sense of the term **character** (i.e. **orthographic character**) or with the term **grapheme**. This will be made clearer as we consider some examples.

Note that this definition for **character** is dependent upon a given system. Just as the definition given for **grapheme** was dependent upon a given orthography, such that something might be a grapheme in one orthography but not in another, so also something may exist as a character in one information system but not in another.

For example, a computer system may represent the French word “hôtel” by storing a string consisting of six elements with meanings suggested by the sequence &lt;h, o, ^, t, e, l&gt;. Each of those six component elements, which are directly encoded in the system as minimal units, is a character within that system.

Note that a different system could have represented the same French word differently by using a sequence of five elements, &lt;h, ô, t, e, l&gt;. In this system, the O-CIRCUMFLEX is a single encoded element, and hence is a character in that system. This is different from the first system, in which O and CIRCUMFLEX were separate characters.

Up to now the characters which have been considered are all visible, orthographic objects (or are direct representations of such graphical objects within an information system). In using computers to work with text, other characters of a more abstract nature that may not be visible objects, such as “horizontal tab”, “carriage return” and “line feed” must be defined.

In technical discussions related to information systems, in talking about multilingual software, for example, it is the sense of the term **character** discussed in this section that is usually assumed. From here on, this usage will be adopted, referring to (**abstract**) **characters** as meaning units of textual information in a computer system, and using the term **grapheme** when talking about units within orthographies. Thus, something like this could be, “The Dutch grapheme ‘ij’ is represented in most systems as a character sequence, &lt;i, j&gt;, but in this system as a single character, &lt;ij&gt;.” Where the informal sense for  (**orthographic**) **characters** is used, that will be stated explicitly.

In developing a system for working with multilingual text, it is important to understand the distinction between abstract characters and graphemes. Systems are implemented to serve the needs of users, and users think in terms of the concrete objects with which they are familiar: the graphemes and orthographic characters that make up orthographies. They do not need to be aware of the internal workings of the system. In other words, it does not matter what abstract characters are used internally to represent text, just so long as users get the behavior and results they expect. 

[glo-character]: /reference/glossary#char
[glo-grapheme]: /reference/glossary#grapheme


