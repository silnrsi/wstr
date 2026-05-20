---
title: Miscellaneous Maintenance
lastUpdated: 2026-05-20
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## Updating the WSTR version number

The WSTR version number should reflect the last completed milestone, as in `3.0.0`. To change it update the version in `package.json` and then run `npm update wstr`. That should produce a change in the version number in the `npm-shrinkwrap.json` file as well. Those two changes should be the only ones needed.
