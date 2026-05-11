---
title: Dataset - Characters
lastUpdated: 2025-11-21
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

_This file must be reworked when the data format and processes are determined._

## File location(s)

`data/characters.csv`

## Data format and model

CSV

## Source and licensing

The data was originally exported from the characters table in ScriptSource. Eventually it should be generated directly from Unicode files.

## Uses

The data is read by low-level `coredata` routines and is ultimately used by mechanisms that can display characters by USV, glyph, and name - `<Character>`, `:usv[]`, `:char[]`, etc. as well as the `<CharacterTable>` component.

## History

- **2025 September** Added by Tim Eves along with coredata Astro components for displaying character data.

## Maintenance processes

To be determined. Eventually this data needs to be taken directly from Unicode files.
