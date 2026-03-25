---
title: File Testing
lastUpdated: 2026-03-25
---

:::note
This is a test document for site developers, primarily the Writing Systems Technology (WSTech) team.
:::

In order to give visitors a friendly way to handle links that are files rather than other pages, we need some way to indicate that those links are special and provide a download/view experience that is reasonably intuitive. Ideally the solution would not involve any additional components, although that is certainly doable.

Please respond to the Github issue or via some other medium to indicate your preferred strategy. You can use the shorthand options (e.g. HTML-C) to discuss them.

## Options

### Markdown-style link (MD)

Here is an example of a normal markdown link to a local file: [File Title](/files/test-pdf.pdf). The disadvantage is that there is no visible difference between this and links to other pages. It may be possible to write a remark plugin that will add an indicator to files with certain extensions, but that would be extra work.

```md
[File Title](/files/test-pdf.pdf)
```

### Markdown-style link with PDF indicator (MD+)

Here is the same link but with a manually added indicator added to the link text: [File Title (PDF)](/files/test-pdf.pdf).

```md
[File Title (PDF)](/files/test-pdf.pdf)
```

### Raw HTML anchor (HTML-RAW)

This is the same link but constructed as a raw HTML anchor with no additional info: <a href="/files/test-pdf.pdf">File Title (PDF)</a>. This really isn't any better or visually different than Markdown style on its own.

```md
<a href="/files/test-pdf.pdf">File Title (PDF)</a>
```

### HTML anchor with download attribute (HTML-D)

This is the same link but with the `download` attribute to tell browsers to download the file instead of show it: <a download href="/files/test-pdf.pdf">File Title</a>. We may not actually want this default behavior, as it forces the browser to download the file rather than let the browser PDF viewer display it (and give the user the option to download it if they want it). This attribute does allow us to automatically identify this as a file link and display a special icon after it. For visual comparison here is an [external link](@aat).

```md
<a download href="/files/test-pdf.pdf">File Title</a>
```

### HTML anchor with class but no download attribute (HTML-C)

This is the same link but with no `download` attribute, so the default behavior in most browsers will be to display the PDF, not download it. The added class definition allows us to add an icon, this case a special PDF one: <a href="/files/test-pdf.pdf" class="file-pdf">File Title</a>. Even if we use this technique specifically for PDF files we can use the download attribute technique (HTML-D) for other file types.

```md
<a href="/files/test-pdf.pdf" class="file-pdf">File Title</a>
```
