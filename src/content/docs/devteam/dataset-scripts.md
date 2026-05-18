---
title: Dataset - Scripts
lastUpdated: 2026-05-06
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## Data files and formats

### Markdown files

There are three sets of markdown files:
- **Main scripts pages:** these are .mdx files located in `scrlang/scripts`. Every script has one of these.
- **Unicode status pages:** these are .md files located in `scrlang/unicode`. Every script has one of these.
- **Language list pages:** these are .mdx files located in `scrlang/langlist`. Not all scripts have one of these, only those that have more than five writing systems.

Each of these files is named using the script four-letter code (lowercased), e.g.:
- `beng.mdx`
- `beng-unicode.md`
- `beng-langs.mdx`
- `beng-sample.jpg` (see below)

### Script sample images

Each script has a sample image that is displayed on the main script page. Those that don't have an image available use an image that says, "We do not currently have a freely available sample of this script. If you have one which we could use, please let us know!" (These latter situations could use the same file, but currently we have a separate file for each script.) These files are located in the `scrlang/images` directory (along with other script-specific images).

### Script/writing system mappings

There is a JSON file that indicates which writing systems exist for each script: `data/script-ws.json`. It is used to populate (in real time) the language lists on the main script pages and language-list pages. NOTE: Eventually this file should be auto-generated from `langtags.json`.

## Source and licensing

The official list of scripts is based on ISO 15924. In addition, we have included some but not all scripts that are not officially recognized by the standard; these have private-use script codes that start with 'Q'.

The `script-ws.json` file is derived from `langtags.json`.

## Uses

The [Script Index page](/scrlang/scripts-index/) displays a list of scripts populated by all the main script .mdx files that exist. In those there are links to the script's Unicode page (if any) and language list page. 

Script data makes use of the following components:
- The `ScriptList` component generates the list of scripts on the Script Index page. 
- The `ScriptDetails` component shows each scripts properties on the main script page. 
- The `WSList` (and `WsVarList`) components use `scripts-ws.json` to display list of languages/writing systems for each script.

## History

- **2026 May** - reworked Scripts Index to use only script pages and not a separate JSON file of scripts (Sharon)
- **2025 July-September** - export of markdown files from ScriptSource by Sharon Correll

## Maintenance processes

Scripts are updated or added on an ad hoc basis when Lorna sees a need. 

To add a new script:
- Add a section to `data/script-ws.json` for the script. [NOTE: eventually we hope for this file to be auto-generated from langtags.]

- Add a sample image file: `scrlang/images/xxxx-png`. The image should be at least 720 pixels wide if possible. Note that it must be openly licensed and the full attribute metadata, including source, must be included.

- Add a main script page: `scrlang/scripts/xxxx.mdx`. Fill in the properties, sample filename, and description, and set all the instances of the script tag appropriately. `avst.mdx` is a good one to use as a template.

- If the script has more than five languages, add a language-list page: `scrlang/langs/xxxx-langlist.mdx` using an existing page in the langlist directory as a template. The `WsList` component will automatically generate a link to it if needed. 

- If any of writing systems are unwritten or obsolete, be sure to include the appropriate note under "Languages that use this script" (see [Devanagari](/scrlang/langlist/deva-langs/) and [Bengali](/scrlang/scripts/beng/)). This note is needed on both the main and language-list pages.

- If the script description section includes images, these should be placed in the `scrlang/images` directory. The filename should start with the lowercase script tag, e.g., `beng-conjuncts.png` or `gujr-ra.png`.
code.md` is a simple one to use as a template; `arab-unicode.md` shows more complicated example. 