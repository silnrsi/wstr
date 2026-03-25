---
title: File Testing
lastUpdated: 2026-03-25
---

:::note
This is a test document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## Markdown-style link

Here is an example of a normal markdown link to a local file: [File Title](/files/test-pdf.pdf). The disadvantage is that there is no visible difference between this and links to other pages. It may be possible to write a remark plugin that will add an indicator to files with certain extensions, but that would be extra work.

```md
[File Title](/files/test-pdf.pdf)
```

## Markdown-style link with PDF indicator

Here is the same link but with a manually added indicator: [File Title (PDF)](/files/test-pdf.pdf).

```md
[File Title (PDF)](/files/test-pdf.pdf)
```

## Raw HTML anchor

This is the same link but constructed as a raw HTML anchor with no additional info: <a href="/files/test-pdf.pdf">File Title (PDF)</a>.

```md
<a href="/files/test-pdf.pdf">File Title (PDF)</a>
```

## HTML anchor with explicit download attribute

This is the same link but with the `download` attribute to tell browsers to download the file instead of show it: <a download href="/files/test-pdf.pdf">File Title (PDF)</a>.

```md
<a download href="/files/test-pdf.pdf">File Title (PDF)</a>
```

## HTML anchor with explicit download attribute and class

This is the same link but with the `download` attribute to tell browsers to download the file instead of show it: <a download href="/files/test-pdf.pdf" class="download-link">File Title (PDF)</a>.

```md
<a download href="/files/test-pdf.pdf" class="download-link">File Title (PDF)</a>
```
