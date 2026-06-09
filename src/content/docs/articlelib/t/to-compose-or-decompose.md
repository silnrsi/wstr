---
title: To compose or decompose, that is the question
description: Whether 'tis nobler in the mind to suffer NFC or NFD...
authors: Bob Hallissy
tags: ["nfc", "nfd"]
lastUpdated: 2026-06-09
---

**Question:** In our workflow, should we standardize on composed (e.g., NFC) or decomposed (e.g., NFD) character encoding for our Unicode data?

**Answer:** Neither. Or both.

The problem is that the question is not reasonable, and points to a misunderstanding of Unicode. This misunderstanding has spawned a number of myths and led to debates such as the above.

In fact, Unicode declares that there is an equivalence relationship between decomposed and composed sequences, and conformant software should not treat canonically equivalent sequences, whether composed or decomposed or something inbetween, as different. This means, for example, that conformant software should treat the following five sequences as identical:

- :usv[0063]{usv char name} + :usv[0301]{usv char name} + :usv[0327]{usv char name}
- :usv[0063]{usv char name} + :usv[0327]{usv char name} + :usv[0301]{usv char name}
- :usv[00E7]{usv char name} + :usv[0301]{usv char name}
- :usv[0207]{usv char name} + :usv[0327]{usv char name}
- :usv[1E09]{usv char name}

For convenience we sometimes refer to the above items as being different **representations** of the same Unicode text, the text in this example being c with a cedilla and acute. There are lots of text fragments that can have multiple representations in terms of Unicode character sequences.

Unicode further states that software is free to change the character stream from one representation to another, i.e., to decompose, compose and/or re-order, whenever it wants. The only requirement is that the resultant string is canonically equivalent to the original.

So the original question is not reasonable: A team might think they can choose to use NFD (decomposed) for their data, but software just might change the data — and it doesn't even have to say it is doing this, because (by definition) this does not change the meaning of the encoded data in any way.

Now it is appropriate to consider selecting a specific convention for a specific process. For example, suppose I wanted to write a Perl or CC program that searches the text for all unique diacritics. The algorithm to locate these is considerably simpler if the data is fully decomposed. So for the purposes of this process, it is helpful to ask that the input data be decomposed. Similarly, for some other process (e.g., spelling check) it may be equally valid for that process to require, even for the exact same text, fully composed representations.

To give a concrete example, when designing an encoding conversion mapping for  TECkit, it is sometimes easier to write the conversion rules in terms of fully decomposed text, and sometimes easier in terms of fully composed text, and it is often quite hard, actually, to write a set of rules that successfully handles any arbitrary representation. For this reason the TECkit mapping author can specify that the mapping rules are assuming either NFD or NFC input, and the TECkit engine enforces the correct input by normalizing the data before processing it with the mapping rules.

In summary then, we have this axiom:

:::note
**Axiom.** As far as Unicode text is concerned, fully decomposed (NFD), fully composed (NFC) and any other canonically equivalent representation are all interchangeable — all are equally correct representations of the Unicode text in question, and no one representation is considered preferred by the Unicode Standard.
:::

which, with little difficulty, yields these corollaries:

:::note
**Corollary.** Text processes are free to change data at will to any canonically equivalent representation.
:::

:::note
**Corollary.** It is inappropriate to speak of standardizing on one particular representation such as NFD or NFC except in the context of a specific text process or data interchange format.
:::

---

**Question:** "But", I hear you say, "speakers of language X think of a+acute as a single letter, but those of language Y think of the a and the acute as separate elements of the text. Doesn't that mean I should use NFC for one and NFD for the other?"

**Answer:** No. Whether a particular language group think of a combining mark as a separate letter or not may have an impact on appropriate user interface behavior, e.g., what happens when the backspace key is pressed, but that behavior needs to operate whether or not the data is stored as composed or decomposed.

In the same way that searching or spellchecking may be simpler if the data is normalized first, it may be that keyboard design, or font design, or other user interface elements may be easier to implement if, for that specific process, a particular normal form can be assumed. But this does not imply that the data must always be maintained in that form; it may be transparently transformed to other equivalent representations for other purposes.

Unlike the TECkit situation, not all of today's text-processing software environments provide mechanisms to specify what representation is needed by a process. Until this happens, things like keyboard and font design are always going to be a bit tricky: it may be impractical to make the designs bullet-proof against all possible data representations.

---

**Question:** What about software products that I use — which ones are going to change encoding representations or have particular requirements?

**Answer:** Here are some that we know about:

**Microsoft Office** doesn't enforce any particular representation, nor does it typically change things behind your back. However, features like auto-spell-correction could make such changes if you set it up that way. Also, if you use a macro to process document data through some other process, that process could make changes (example: using the  [SIL Converters][sil-converters] package). Note, however, that the spell-checking dictionaries, at least in some cases, appear to work only with composed data.

[Fieldworks][fieldworks] normalizes all document and database text to NFD. However, when saving as XML or when rendering with non-Graphite fonts, a temporary conversion to NFC takes place. By default, FLEx stores projects as .fwdata XML (using NFC) rather than databases. Data copied out of FLEx will also first be converted to NFC before it's placed in the clipboard.

**DirectWrite** contains logic that composes some sequences during rendering — font designers will need to be aware of this when implementing smart font logic. 

[XeTeX][xetex] simply passes input text to the rendering system (ATSUI or the [HarfBuzz][harfbuzz] OpenType engine), so support for alternative representations will depend on the capabilities of the fonts being used.

[TECkit][teckit], as mentioned above, can normalize incoming Unicode data to either NFC or NFD, at the mapping author's request. Moreover, when generating Unicode output it can provide either NFC or NFD from the same mapping.

**XML**, starting with version 1.1, strongly encourages NFC.

---

**Question:** Given all of the above, are there any specific recommendations?

**Answer:** A colleague suggests the following:

- programmers:
  - output data that may become input to unknown processes in NFC.
  - don't assume any normalization on input unless you control the data source.
- people (consultants?) configuring processes:
  - find out what each process requires and produces.
  - make sure each gets what it needs.
  - if there's an option, produce NFC for files that may be used (later) by unknown processes.
- end users:
  - don't worry about it unless you observe a problem.
  - if you have an option, archive in XML/NFC.
    - if you don't know what a process requires and can control the input, try NFC first (or as soon as you observe a problem). Then try NFD.

<CaptionText text='This article formerly appeared on scripts.sil.org.'/>


[sil-converters]: https://software.sil.org/silconverters/
[teckit]: https://software.sil.org/teckit/
[fieldworks]: https://software.sil.org/fieldworks/
[xetex]: https://tug.org/xetex/
[paratext]: https://paratext.org/
[toolbox]: https://software.sil.org/toolbox/
[harfbuzz]: https://github.com/harfbuzz/harfbuzz
