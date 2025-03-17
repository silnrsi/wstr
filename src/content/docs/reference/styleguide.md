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

English spelling may be American, International, or British to reflect the diversity and personal style of team members. It should, however, remain consistent throughout a page or pages of interrelated content. British text should use Oxford spelling, with the _-ize_ ending for words such as _organize_, _realize_, and _privatize_, but with words ending in _-yse_ retaining the _s_, as in _analyse_ and _catalyse_ etc.

Punctuation should follow general guidelines:

- Quotations can use either single (British) or double (American) quotes as long as they are consistent throughout a pag, although single quotes are slightly preferred. Place punctuation marks outside of quotation marks unless the punctuation is part of the quotation itself. This practice is sometimes referred to as 'logical punctuation'. Source files can use either straight or 'curly' quotes—rendered pages will convert them to typographic ones.
- Comma-separated lists should use the 'Oxford comma' to provide clarity, as in: _The design process involves initiating, experimenting, forming, harmonizing, and adapting_.
- Ampersands should only be used when they are part of a name or title or heading, such as _Scripts & Languages_.
- The copyright symbol © should be used rather than (c) except in quotations or examples.


Dates should generally be formatted as _yyyy-mm-dd_ (e.g. 2025-02-27) to avoid confusion. Use specific dates where known. Avoid terms that assume the present time, such as 'ten years ago' or 'currently'.  

## Referencing

(to be added later based on further discussion)

## AI use

Although in some cases it may be difficult to avoid encountering AI-generated content when researching and authoring content for this site, it may only be used for reference purposes and never to directly prepare text or image content. All content must be authored and edited by one of the site's authors. Use of AI should also reflect SIL's [AI Ethics Statement](https://www.sil.org/ai-ethics-statement).

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

Page sources need to use the flavor of Markdown supported by Starlight as documented in [Authoring Content in Markdown](https://starlight.astro.build/guides/authoring-content/). Additional markdown reference material can be found at the [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/).

The following examples intended as a reference but also to test all the elements with the site CSS. _If you use markdown elements that are not documented here please add them to this page. This enables us to adjust the CSS in the future and quickly see the impact it may have on page layout._

### Text formatting

Text can be **bold**, _italic_, ~~strikethrough~~, or `inline code`. Note that for clarity please use double asterisks for bold and single underscores for italic.

```
Text can be **bold**, _italic_, ~~strikethrough~~, or `inline code`. Note that for clarity please use double asterisks for bold and single underscores for italic.
```

### Headings

Heading 1 is only used by the page title. Anchors are automatically generated for all level 2 `<h2>` and level 3 `<h3>` headings. The heading title can be added to the page URL with a hash, replacing spaces with hyphens, and making it all lowercase. A heading of 'AI use' would become `#ai-use`.

## Heading 2 - main headings on a page

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

```
## Heading 2 - main headings on a page

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

### Lists

- First item
- Second item
    - Sub item
    - Another
- Third item

```
- First item
- Second item
    - Sub item
    - Another
- Third item
```

1. First item
2. Second item
3. Third item

```
1. First item
2. Second item
3. Third item
```

### Tables

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

```
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |
```
It can also be slightly simplified, without the left and right pipes:

Unicode block | Font support
------------- | ------------
C0 Controls and Basic Latin|U+0020..U+007E
C1 Controls and Latin-1 Supplement|U+00A0..U+00FF

```
Unicode block | Font support
------------- | ------------
C0 Controls and Basic Latin|U+0020..U+007E
C1 Controls and Latin-1 Supplement|U+00A0..U+00FF
```

When text requires wrapping in cells, the relative width of columns can be somewhat adjusted by tweaking the `--- | ---` line under the header:

Unicode block | Characters | Long explanation
------------- | ---- | -----------------------------
C0 Controls and Basic Latin|U+0020..U+007E|This is a longer text to describe the basic Latin block
C1 Controls and Latin-1 Supplement|U+00A0..U+00FF|

```
Unicode block | Characters | Long explanation
------------- | ---- | -----------------------------
C0 Controls and Basic Latin|U+0020..U+007E|This is a longer text to describe the basic Latin block
C1 Controls and Latin-1 Supplement|U+00A0..U+00FF|
```

Table columns can also be aligned using `:---:` syntax.

Left-aligned | Centered | Right-aligned 
:------------- | :------------: | -------------:
This is a longer text to describe the basic Latin block|C0 Controls and Basic Latin|U+0020..U+007E
More left-aligned text|C1 Controls and Latin-1 Supplement|U+00A0..U+00FF

```
Left-aligned | Centered | Right-aligned 
:------------- | :------------: | -------------:
This is a longer text to describe the basic Latin block|C0 Controls and Basic Latin|U+0020..U+007E
More left-aligned text|C1 Controls and Latin-1 Supplement|U+00A0..U+00FF
```

### Images

#### Image location, filenames, and size

Images used on a page should be placed in an `images` folder in the same location as the page, typically within a main topic (collection). They should normally be .png or .jpg. Other formats may work but are untested.

Image filenames should follow the format `pppp[-n]-shortname.png` where

- _pppp_ is the topic page number (suggestion not an absolute requirement)
- _n_ is an optional counter if you have multiple images on a page
- _shortname_ can be whatever you want (it-can-even-have-multiple-hyphens) but should be all lowercase

There should be no spaces. Use hyphens, not underscores.

If you want to reuse an image on multiple pages within the same topic name it with the topic number of one page and then reference it on another.

If you want to reuse an image from another topic you can either reference it directly using a relative path or copy and rename the file into the current topic images folder (as long as it's small).

Images can be any size, but those intended to fill the main content column should be at least 720 pixels wide, and any size above that can be used. Astro will adjust the size and optimize the image automatically. There is no need to manually optimize images for a particular size.

#### Image references

To place an image on a page use this format:

```![AltText](images/picname.png)```

Here is an example of an image reference:

![This is alt text](images/9800-full-image.png)

```
![This is alt text](images/9800-full-image.png)
```

You can also reference smaller images:

![This is alt text](images/9800-small-image.png)

```
![This is alt text](images/9800-small-image.png)
```

Or an external image:

![An illustration of planets and stars featuring the word “astro”](https://raw.githubusercontent.com/withastro/docs/main/public/default-og-image.png)

```
![An illustration of planets and stars featuring the word “astro”](https://raw.githubusercontent.com/withastro/docs/main/public/default-og-image.png)
```

Inline images are not supported.

Image references should not be broken over multiple lines. They may still work, however the Decap system does not support them.

There is currently no special support or styling for image captions, although it would be a nice addition. To add a caption add the caption text on the next line with no blank line in between.

### Links

_Note that link formats are not yet firm and may change depending on what decisions are made regarding general referencing._

Here is a link to [another section](#ai-use) (level 2 or 3) on this page.

Here is a link to [another page in this topic by slug](glossary).

Here is a link to [another page in this topic by /slug/](/glossary/).

Here is a link to [another page in this topic by ../slug](../glossary).

Here is a link to [another page in another topic by ../../slug](../../bidi).

### Blocks

Code blocks begin and end with three backticks ` ``` `. Syntax formatting including Expressive Code features are available - see [Code blocks](https://starlight.astro.build/guides/authoring-content/#code-blocks).

> Blockquotes use a `>` at the start of each line.

```
> Blockquotes use a `>` at the start of each line.
```

### Rules

Paragraph before horizontal rule - note blank line after

---

Paragraph after horizontal rule - note blank line before

```
Paragraph before horizontal rule - note blank line after

---

Paragraph after horizontal rule - note blank line before
```

### Asides

:::note
This is an aside. Details and options can be found in the [Starlight docs](https://starlight.astro.build/guides/authoring-content/#asides).
:::

```
:::note
This is an aside. Details and options can be found in the [Starlight docs](https://starlight.astro.build/guides/authoring-content/#asides).
:::
```

### Footnotes

Here is an example of a footnote[^1] that will appear at the very bottom[^anytext] of the page. Footnotes will automatically be numbered sequentially when rendered.

[^1]: Here is an example of how the footnote text is indicated. This example reference is in the text.

```
Here is an example of a footnote[^1] that will appear at the very bottom[^anytext] of the page. Footnotes will automatically be numbered sequentially when rendered.

[^1]: Here is an example of how the footnote text is indicated. This example reference is in the text.
```

## Markdown extensions

(to be added)

---

[^anytext]: Footnote references can also be text but will still get numbered correctly. The references can be placed at the bottom of the markdown page.