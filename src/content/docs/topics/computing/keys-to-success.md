---
title: Keys to Success
description: Reducing the chance of failure and building a strong foundation for development
sidebar:
    order: 2320
lastUpdated: 2026-05-29
draft: true
---

Writing system implementation (WSI) development can be very complicated, both technically and organizationally. It requires a team of people or companies to work toward a single goal &mdash; enabling a certain group of people to use their language and writing system on computers. Their knowledge, background and skills may be very different, and they will likely make unique contributions to the end solution. The technologies involved are also challenging and continue to evolve.

Because of this complexity, it can be very easy for a WSI development effort to fail. There are ways, however, to reduce the chance of failure and build a strong foundation for development. Each of the keys to success discussed here is important. A serious weakness in any one can cause a WSI effort to break down. At the same time, even modest efforts to improve in any area can greatly enhance the end product and streamline the development process.

## Understanding of writing system needs

The first key to success is an _adequate understanding of writing system needs_. Before the project starts, there needs to be an assessment of the end goal: what users want to accomplish. A statement of writing system needs should be:

- **Clear.** It should state what users want to do (exchange email, publish a community newsletter, prepare educational materials, etc.) in very direct terms. If the WSI needs to operate within a specific application or operating system, those constraints should be listed. The style should be simple &mdash; an outline with bullet points can be ideal. This will also aid in building consensus (see [Consensus between stakeholders](#consensus-between-stakeholders)).
- **Complete.** It needs to address the full scope of the need, both technically and linguistically. For example, details about the writing system should include a full list of symbols and their spoken equivalents, as well as shaping behaviors (such as spelling rules, required ligatures, details on diacritic alignment, etc.). This will take considerable time to complete, but will make the development phase much more rapid and less likely to be delayed due to ambiguous goals or language behavior.
- **Detailed.** It should be written with computing in mind, and give detailed instructions. For example: ‘the iota subscript is found only after lower- and upper-case vowels: alpha, eta and omega. For lower case, it should be centered under the previous glyph, except under the eta, where it should be aligned under the left leg. Following upper-case, it is usually written as a normal iota after the vowel.’ An even more useful description could be:

```
alpha + iotasub = alpha with iotasub centered beneath 
eta + iotasub = eta with iotasub centered under left leg
omega + iotasub = omega with iotasub centered beneath
Alpha + iotasub = Alpha, iota 
Eta + iotasub = Eta, iota
Omega + iotasub = Omega, iota
```

- **User-focused.** The statement should also specify how users expect the system to work, particularly for keyboarding and editing. In writing systems where the glyph order is different from the spoken order (such as with many Indic scripts), which order should be used for typing? And what should happen if the user clicks in the middle of a sequence of characters and hits the backspace key? In the case of an Indic script where reordering is happening, the desired effect will likely be different than for, say, English.
- **Broad.** It should address how this specific project should relate to other WSIs. If the writing system is based upon the Khmer script, but with some additional conjuncts, there ought to be a clear statement of those differences. It should also state those things that are to be the same as existing Khmer WSIs, such as keyboard layout and typing order. This exercise can also make it easier for a single WSI to serve multiple language communities.

The objective of this key is to produce a needs statement. This does not have to follow a specific model or framework, but must clearly state the need and outline how the WSI ought to work in the end. There is no requirement to have all the information in a single document or form, as long as all needs are addressed in adequate detail. 

For example, one component should be an orthography statement &mdash; a description of how the individual written shapes express the language &mdash; and how they interrelate with one another. Without this it will be difficult to build a system that takes the full breadth of the written language into account. 

## Understanding of technical issues

The second key is an _adequate understanding of technical issues_. A WSI development team must include people with enough technical ability to research, digest and understand the technologies that are needed to reach their goal. It is rare that a single person will be able to grasp all the technical issues, especially for a complex project. The team then needs to understand:

- **The basic model for complex script computing.** The [Writing Systems Computing Model](/topics/computing/ws-computing-model/) model can be very helpful in planning the architecture of a system and explaining it to others.
- **Foundational concepts.** These would be concepts such as the distinction between [characters, codepoints, and glyphs](/topics/encoding/characters-codepoints-glyphs/), and the [basic principles of Unicode](/topics/encoding/unicode-concepts/#principles--compromises). This is important for every member of the technical development team, whatever their role might be.
- **The logical framework behind key technologies.** If a team member needs to address complex script rendering, then they will have to understand the similarities and differences between the various smart font technologies (see [Shaping and Rendering](/topics/fonts/shaping-and-rendering/)). Keyboard developers need to understand the difference between modifier keys and dead keys (see [Keyboards and Tools](/topics/input/keyboards-and-tools/)).
- **Specific limitations of operating systems and applications.** For example, an application might advertise that it supports OpenType fonts, but that does not guarantee that it will support the specific OpenType behavior required. The developer may have to read documentation, interact with experts on Web forums, and experiment with the applications themselves.
- **Data transfer and conversion issues.** WSI developers must understand how their data will be encoded, and how that data will be moved in and out of applications. This is especially important if a WSI already exists for the writing system, and data will need to migrate back and forth between different WSIs. Detailed discussion of this topic is out of the scope of this limited introduction.

Here the objective is to gather the necessary personnel and link them with resources that will enable them to be technically successful. The remaining main sections of this document go into detail regarding many of the technical issues involved in WSI development, and can be considered an introductory guide.

## Consensus between stakeholders

The third key is _consensus between stakeholders_ &mdash; people who have some sort of interest or investment in the project. Communication is often a neglected and overlooked component of WSI projects. Yet it is this which is the greatest cause of delays and unfinished efforts. The stakeholders need to make a commitment to:


- **Agreement upon goals.** It is important for those planning WSIs to work toward clearly understood and agreed upon goals and development timelines. Assumptions should be stated clearly, as should known limitations on what can be expected from the WSI.
- **Communication on technical issues.** There ought to be regular, scheduled meetings to review project status, identify roadblocks and solutions, and discuss technical details. Experience has shown that without such meetings, many WSI projects can flounder and lose momentum. Recent advances in communication technologies can be a great help &mdash; tele-and video-conferencing, instant messaging, web logs, and the like can make communication easier and more frequent. Even a simple telephone call to a fellow developer can save hours of research.
- **Early agreement regarding distribution and IP issues.** WSI planners tend to avoid discussion of these topics, especially if the WSI is being built up from small parts contributed by a variety of sources. Early discussion of ownership and revenue may seem to spoil the cooperative spirit, but if those issues are left until later, serious disagreement can result and threaten the whole project. 

The objective should be to have a written record of any agreements, however minor, and to develop a working procedure that promotes and encourages regular interaction between stakeholders and between technical personnel.

## Adequate software applications

The fourth key is the _existence of adequate software applications**. WSIs do not exist in a vacuum, and must work within specific software applications. So it is important that those operating systems and applications provide adequate support for the technologies that have been chosen. Applications chosen for WSIs need to:

- **Support necessary behaviors.** The application should support all basic functions needed for the writing system, or allow other WSI components to override default behaviors. For example, an application for processing text in an Arabic-based script obviously needs to support right-to-left text direction, but it should also manage right-to-left paragraph shaping and (usually) mixed direction line layout.
- **Be reasonably extensible in how they handle text.** Proprietary “black boxes” should be avoided, as they often do not allow enough control over script behaviors. An example of this would be a Hindi word processor that uses its own special routines to handle vowel rearrangement and conjunct formation, and does not document those routines, or allow them to be modified. Such restrictions can make WSI development for minority languages difficult if not impossible. In the Hindi example, it might be better to use an application that is based upon more open and well-defined technologies such as OpenType and Uniscribe.
- **Allow for adequate import/export.** Even if a certain WSI is the first and only one for a writing system, and data import and export are not important, it is very likely that it will not remain the only WSI in the future. Care must be taken to ensure that textual data does not get imprisoned within a single application. Hardware and software both become obsolete with time, and the inability to migrate data out of (and back into) a system can lead to unrecoverable data loss.

This key is usually outside the control of the WSI developers, so the objective is not to modify the applications, but to have a clear understanding of their capabilities (as highlighted in [Understanding of technical issues](#understanding-of-technical-issues)). It can be productive to actively discuss needs with application developers, but it is very risky to assume that any changes will be made until those changes appear in released versions of the software.

## Inclusion of characters in Unicode

The final key to success is the _inclusion of all needed characters in the Unicode Standard_. It is still possible to create WSIs that do not use Unicode, but more and more applications are becoming Unicode-based, and require text to be in that encoding. Both Windows and Macintosh operating systems now use Unicode internally, and the major application development frameworks do as well.

If even a single character is missing, the cost to the WSI development process can be great &mdash; applications may not support shaping behaviors, import and export of text data may be compromised, etc. For example, if a special character from an Arabic-based script is not yet in Unicode, it may be impossible to get an application to recognize that character and give it the appropriate initial, medial and final forms.

The final objective and goal of this key is to verify that every character in the writing system has been accepted into the Unicode Standard, and if it has not, to navigate through the Unicode proposal process until that is the case. The good news is that thanks to the hard work of many people over the years, the great majority of scripts and characters that will be needed for WSIs are already in place. If that is not the case for a WSI need, then a strong commitment to the process &mdash; and a good deal of patience &mdash; will be required. See [Unicode Concepts](/topics/encoding/unicode-concepts/#byte-order-unicode-encoding-schemes).

<Attribution type='Article' copyyears='2003-2026' copyholder='UNESCO and SIL International Inc.' author='Victor Gaultney' license='CC BY-SA 3.0' licenseUrl='https://creativecommons.org/licenses/by-sa/3.0/'/>

<CaptionText text='This article formerly appeared on scripts.sil.org.'/>


