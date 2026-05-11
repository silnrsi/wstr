---
title: Dataset - Sources
lastUpdated: 2025-11-20
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## File locations

`data/sources.yaml`

`data/sources-schema.yaml` - enables intellisense support

## Data format and model

YAML

## Source and licensing

The data was originally exported from ScriptSource and (we expect) will be extended by hand over time.

## Uses

Each source has a list of tags (`keywords` property) that serve as references to related scripts, languages, characters, and topics. Articles can display these sources by use of the `SourceLinksList` and `BibList` components. Each script page, for instance, includes an External Links section and a Bibliography that display related sources.

See [Sources Reference](https://writingsystems.info/devteam/sources-reference/).

## History

- **2026 January** - Generated from ScriptSource

## Maintenance processes

Sources should be corrected or updated on an ad hoc basis whenever there is a need. This simply involves editing the `sources.yaml` file.

To add a new source, find a source with a similar set of required fields in `sources.yaml`. Assign it a unique key and insert it at the proper place alphaetically. Edit the fields appropriately.

See [Sources Reference - Adding new sources](https://writingsystems.info/devteam/sources-reference/#adding-new-sources).
