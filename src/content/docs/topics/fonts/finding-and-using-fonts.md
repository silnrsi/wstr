---
title: Finding & Using Fonts
description: Font finding, evaluation, installation, and licensing
sidebar:
  order: 5100
lastUpdated: 2025-08-06
---

Fonts that support specific scripts and writing systems come from a variety of sources: those distributed with an operating system or application, freely-licensed fonts available from websites, and commercial fonts licensed though foundry websites and e-commerce platforms. It is important to determine whether the font is truly suitable for the writing system and intended use.

- _Does it support all the needed characters and shaping rules?_
- _Does it meet the necessary visual and technical requirements (see [Evaluating Fonts][evaluating-fonts])?_
- _Is the licensing appropriate for how it will be used and by whom (see [Copyright & Licensing][copyright-and-licensing])?_
- _Does it work in all the environments where it is needed (computers, mobiles, etc.)?_

## Sources for freely-licensed fonts

It would be impossible to list all the sources for commercially-licensed fonts, so the focus here is mainly on fonts that are licensed using free and open licenses such as the [SIL Open Font License][ofl]. Here are a few sources:

- [SIL Global][sil-fonts] creates fonts for over 25 scripts that support thousands of languages around the world.
- [Google Fonts][gf] is a high-performance, global webfont service that also provides over 1700 fonts for download for self-hosting, desktop use and app bundling. These fonts, including the full Noto families, support over 100 writing systems.
- [Adobe][adobe-open-source] provides many of the same fonts as Google Fonts, but also has notable open source projects that support multiple scripts, such as [Source Sans][adobe-source-sans].

A longer list of sources and projects is available on the [OFL website showcase][ofl-fonts].

## Finding fonts for a specific language or writing system

Both Adobe and Google allow their font catalogs to be filtered by language or writing system. SIL fonts are grouped by region. However, it can be difficult to find fonts for languages that are not directly listed in any of those catalogs.

[comment]: # (add info on how to use the [LFF][lff] to get language-specific suggestions.)

SIL has developed a "Language Font Finder" service so that software applications can choose a reasonable default font for a specific language code. The service combines information about specific languages, what script a language is likely to use, and what fonts are suitable for specific scripts. The returned value is a JSON object with information about a font (or fonts) suitable for the language. The [LFF][lff] service documents the API access.

[comment]: # (As of Aug 2025, there's no end user interface to LFF.)

[adobe-open-source]: https://fonts.adobe.com/foundries/open-source
[adobe-source-sans]: https://github.com/adobe-fonts/source-sans
[copyright-and-licensing]: /topics/fonts/copyright-and-licensing
[evaluating-fonts]: /topics/fonts/evaluating-fonts
[gf]: https://fonts.google.com/
[lff]: https://github.com/silnrsi/langfontfinder
[ofl]: https://openfontlicense.org
[ofl-fonts]: https://openfontlicense.org/ofl-fonts/
[sil-fonts]: https://software.sil.org/fonts
