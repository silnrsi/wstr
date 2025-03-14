---
title: Style Guide
description: Guidance on writing style and markdown use
sidebar:
  order: 9800
---

This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.

## Writing style

The writing style for site content should be appropriate to the type of content, so may not be consistent throughout the site. Some reference articles may need a more formal, neutral-observer, academic style, with no use of 'you' and limited or no contractions (e.g. _shouldn't_). Guides and less formal articles may communicate more effectively through a more informal style, where guidance is given in a personal manner, such as 'At this point you may want to consider...'.

In all cases avoid the personal pronoun 'I' except when quoting directly. 'We' can be used, but only to refer to the Writing Systems Technology (WSTech) team as a collective author (_We recommend that..._).

When providing guidance regarding best practice try to provide some indication of whether it is subjective opinion or objective fact. Recommendations should generally be in **bold**, and fall into four loose types:

- **Developers may choose to** - There is no single good option, and developers should consider various alternatives.
- **We recommend that** - There seems to be one option that is best for most developers, that we ourselves have chosen and that we suggest that others follow.
- **Ascender and descender values should** - There is clearly a best option and to do otherwise would be asking for problems.
- **Production glyph names must** or **Font names need to** - if you don’t do this then your font is unlikely to work properly.

## Language, spelling, punctuation, and dates

Content should mainly be in English, however, that is not a rule, and content in other languages is welcome. If there is a need for multiple versions of a page in different languages we may wish to install extensions that make it easier to author and navigate between content languages.

English spelling may be American, International, or British to reflect the diversity and personal style of team members. It should, however, remain consistent throughout a page or pages of interrelated content. British text should use Oxford spelling, with the _-ize_ ending for words such as _organize_, _realize_, and _privatize_, but with words ending in _-yse_ retaining the _s_, as in _analyse_ and _catalyse_ etc_.

Punctuation should follow general guidelines:

- Quotations can use either single (British) or double (American) quotes as long as they are consistent throughout a page. Place punctuation marks outside of quotation marks unless the punctuation is part of the quotation itself. This practice is sometimes referred to as 'logical punctuation'. Source files can use either straight or 'curly' quotes—rendered pages will convert them to typographic ones.
- Comma-separated lists should use the 'Oxford comma' to provide clarity, as in: _The design process involves initiating, experimenting, forming, harmonizing, and adapting_.
- Ampersands should only be used when they are part of a name or title or heading, such as _Scripts & Languages_.

Dates should generally be formatted as _yyyy-mm-dd_ (e.g. 2025-02-27) to avoid confusion. Use specific dates where known. Avoid terms that assume the present time, such as 'ten years ago' or 'currently'.  

## Referencing


## Page metadata

Metadata is defined in the YAML header of each page. Here is a complete example including all optional fields. Note that formatting and indentation is very important, particularly for sidebar.

```
---
title: Page Title
subtitle: Page subtitle
description: General description
sidebar:
    order: 1234
    label: Alternate sidebar title
    hidden: true
lastUpdated: 2025-02-27
draft: true
---
```
Here are details, with required fields in **bold**. 

- **`title`** - required by system, should be unique
- `subtitle` - optional
- **`description`** - required by us, but not normally shown to viewers
- **`sidebar: order`** - required by us, use topic # from the WSTR Classification
- `sidebar: label` - optional, replaces title in sidebar only, useful if page title is too long for sidebar
- `sidebar: hidden` - optional, keeps page from being listed in sidebar
- `lastUpdated` - optional, use yyyy-mm-dd format, only needed if it makes sense for a page to display it
- `draft` - optional, hides page from production builds, not currently recommended

## Markdown use


## Markdown extensions


## AI use

Although in some cases it may be difficult to avoid using or consulting AI-generated content when authoring content for this site, it may only be used for reference purposes and never to directly prepare text or image content. All content must be authored and edited by one of the site's authors. Use of AI should also reflect SIL's [AI Ethics Statement](https://www.sil.org/ai-ethics-statement).
