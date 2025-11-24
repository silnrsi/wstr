---
title: Encoding Conversion
description: Tools, techniques and related resources for doing data encoding conversion
sidebar:
    order: 3900
    label: Encoding Conversion
authors: David Raymond
lastUpdated: 2025-11-21
---

Data conversion can include a variety of types of conversion. It could be converting data from a legacy encoding to a Unicode encoding. Or, it could be converting data from one writing system to another.

This section is an introduction to text conversion tools, based around the converter tools produced by SIL Global.

Text conversion can cover various automated changes to text including:

- Encoding conversion - for example from a legacy encoding to Unicode encoding
- Script conversion - changing from one script to another by [transcription or transliteration][trans-translit-article]
- Data markup conversion - for example from usfm to xml

The same software tools are used for all types of conversion, so most of this document applies to all.

For detailed information on the different tools mentioned, follow the links to the relevant websites.

## Overview of the text conversion process

All text is contained within ‘documents’ of one sort or another, so the conversion software needs to:

1. Handle the structure of the document, to extract the raw text that needs to be converted
2. Convert the text to the destination form
3. Update the document with the converted text, including any relevant changes to the metadata related to the text

In terms of [SIL Converters][sil-converters], (1)  and (3) are covered by the “client applications” and (2) by “transduction engines”. This gives great flexibility, since the same mappings used by the transduction engines can be used with various different document types by choosing an appropriate client application, and one client application can work with various different transduction engines, so the most appropriate transduction engine for the conversion in hand can be chosen.

The client applications can be either programs that work within the main application (eg a macro running within Microsoft Word) or programs that convert multiple documents in a batch process (eg the “Bulk Word Converter”).

## Supported platforms

The main set of tools, the SIL Converters package, is Windows-based. However, much of the underlying technology, in particular TECkit, is cross-platform.  

Various other SIL tools, such as Fieldworks and AdaptIT, which have integration with these conversion tools built-in, work on various platforms. Developers can integrate TECkit conversion into their applications. The [LibreOffice Linguistic Tools][lolt] extension includes information on using Converters on Linux.

### The SIL Converters package

The [SIL Converters][sil-converters] package contains both client applications and transduction engines. The package also includes many predefined mappings for conversions. These can be used as they are - if they meet the conversion need - or as a starting point for similar conversions.

One of the strengths of SIL Converters (over a stand-alone transduction engine) is that it can chain conversions together, even ones using different transduction engines.

A central component of SIL Converters is the converter repository where mappings are stored. Once a mapping is installed in the repository, it becomes available to all client applications.

For developers, there is a simple COM interface to select and use a converter. It is easy to use from VBA, C++, C#, Perl, Python or any .NET/COM enabled language.

### Client applications

The SIL Converters package includes converters for:

- Microsoft Word (Macro and bulk conversion)
- Microsoft Access, Excel and Publisher
- XML and SFM documents
- Clipboard data

The [LibreOffice Linguistic Tools][lolt] extension includes the ability to convert LibreOffice documents by calling SIL Converters.

SIL FieldWorks, Speech Analyzer, Phonology Assistant and Adapt It software also include integration with SIL Converters.

### TECkit

The [TECkit][teckit] conversion toolkit is included in the SIL Converters package, but can also be installed and used as a standalone tool. It can be run on Windows, Mac and Linux.

The core component is the “TECkit engine”, a library that performs conversions based on mappings. This library is used in the other tools, including SIL Converters. Its mapping tables use multi-pass, context-sensitive rules, which can often be written so that the overall mapping can be used forwards or backwards. The rules are compiled into a binary form which is optimized for speed of conversion.

TECkit includes some command line tools, and, for developers, there are wrappers for C#, perl, python, C and C++.

## What else?

Besides data conversion, there are other steps that may be required. For example, a keyboard may need to be created to replace the legacy keyboard that was used. Additionally, data markup may need converting, for example from _usfm_ to _xml_.

This document does not address those issues.

## Resources

- [Text Encoding Issues When Working with Multiple Scripts][cross-script-article] - There are many languages that are written in more than one script. Texts look completely different in two scripts but sound and mean the exact same thing. There are two approaches to achieving the production of the same text in multiple scripts. One approach is to simply convert from one script to another. But what if we have more than two scripts involved, could we convert to a common interlingua type encoding from which text in any of the other scripts could be generated easily? We will examine both approaches and their relative problems and merits. 
- [Transliteration vs. Transcription][trans-translit-article] - Transliteration and transcription are both processes by which text is converted from one script to another. Strictly speaking, they are two distinct processes and a given conversion system will be of either one or the other type, not both. However, in practice, the two processes are often like two ends of a continuum, and a given system may be closer to one or to the other, but with elements of both.
- [SIL Converters][sil-converters] - contains both client applications and transduction engines
- [TECkit][teckit] - conversion toolkit
- [LibreOffice Linguistic Tools extension][lolt] - includes the ability to convert LibreOffice documents by calling SIL Converters
- [SIL Writing System Resources][wsresources] - a catch bag of writing system resource files organised by language tag, region, or script. Writing system resources are things like dictionaries, keyboards, and data conversion mappings.
- [Roman Script to Arabic Script Conversion][rs-to-as]. An example of cross-script conversion for Roman to Arabic Script
- [Osage Nation Web Keyboard, Fonts, and Converter][res-osage]
- [Lexilogos Data Conversion][res-lexilogos]
- [ISO 15919 TECkit mappings for Indic scripts][res-brahmic-maps]
- [How to Convert Text to Unicode Codepoints][res-ishida]

[cross-script-article]: /articlelib/t/text-encoding-issues-when-working-with-multiple-scripts
[lolt]: https://extensions.libreoffice.org/en/extensions/show/99202
[res-brahmic-maps]: https://github.com/davidmjones/brahmic-maps
[res-ishida]: https://rishida.net/tools/conversion
[res-lexilogos]: https://www.lexilogos.com/keyboard/
[res-osage]: https://osagelanguagetools.appspot.com/
[rs-to-as]: https://software.sil.org/arabicfonts/rs-to-as-conversion/
[sil-converters]: https://software.sil.org/silconverters/
[teckit]: https://software.sil.org/teckit/
[trans-translit-article]: /articlelib/t/transliteration-vs-transcription
[wsresources]: https://github.com/silnrsi/wsresources/
