---
title: Versioning
description: Font versioning recommendations
sidebar:
  order: 5320
lastUpdated: 2025-07-18
---

A version number in a font is useful in (at least) two situations:

- Operating systems can determine when to update a package containing a font by looking at the version number.
- If users are having difficulty with a font you have created, they can let you know what version of the font they have, and then you can figure out if the installed version of the font is outdated, or has known problems.

**We recommend using a version number in the form of x.yyy (that is, three places past the decimal point).** For example, use a version number such as `1.500`, not `1.5`. This will help the version number to be correctly understood in a variety of environments.

## What to use

You _could_ use a version number based on [semantic versioning][semver] which has a form of `MAJOR.MINOR.PATCH`. However, it is not straightforward how the three parts of semantic versioning map to the two parts of a font version. A more useful recommendation is to use a font version in the form of _M.mpp_ where:

- _M_ is the major version
- _m_ is the minor version
- _pp_ is the patch version

A major change (_M_) would include any changes that significantly affect existing documents or cause document reflow. A minor (_m_) would include additional character support or features. A patch (_pp_) would include both small maintenance fixes (as in 6.301) and work leading up to a major/minor release (such as 6.381, leading up towards 6.400)

Google recommends that the major version value be greater than zero for any fonts that are widely distributed.

## Location of the version number and version string

Version information in stored in [two locations within a font][otspec]:

- `head` table - a 16.16 decimal number encoded in the `fontRevision` field.
- `name` table - a longer string that can also contain additional information

**We recommend that the version info in `head` and `name` tables be consistent.**

The `head.fontRevision` number may be the only data that operating systems and installation routines use to compare multiple font versions and choose the most recent, so **it is important that if two fonts have differences they should have different `head.fontRevision` values**.

The `name` table version string is text that can contain numbers, letters, and punctuation. **We recommend that this string have three parts, separated by spaces, in the form** `Version M.mpp extrainfo` where

- `Version` is just the word "Version"
- `M.mpp` is the major.minorpatch version number
- `extrainfo` is any additional text that may be useful to the user

This `extrainfo` may be a build number, a test version indicator such as 'beta3', a date or time stamp, or any other brief bit of information that can help the user know further information about this particular version. **We recommend that developers do not use this additional info as the only indicator that two fonts are different. Only the _M.mpp_ version number should be used to differentiate between versions.** Some operating systems show the `name` table version to users, but may not look at it when comparing font version numbers.

## Calculating `head.fontRevision`

OpenType does not specify the content of the `head.fontRevision` field, but only that it is a fixed-point number stored with 16 bits before the decimal and 16 bits after. Font vendors have been inconsistent in how they encode a font version in such a numeric field. For example is version 1.1 stored as 0x00010001 or 0x00011999 or even 0x00011000 ?

**We recommend the following calculation: Treating the 32 bit `fontRevision` as two 16 bit integers, calculate them as follows:**
- first 16 bits = _M_
- second 16 bits = _int( .mpp * 65536 )_

## Examples of version information:

| M | mpp | `head.fontRevision` | `name` version string |
| --- | --- | --- | --- |
| 1 | 290 | 0x00014A3d | Version 1.290 alpha1 |
| 1 | 295 | 0x00014B85 | Version 1.295 beta1 |
| 1 | 296 | 0x00014BC6 | Version 1.296 beta2 |
| 1 | 300 | 0x00014CCC | Version 1.300 |
| 2 | 101 | 0x000219DB | Version 2.101 build 693 |
| 3 | 560 | 0x00038F5C | Version 3.560 20170329-1 |
| 6 | 101 | 0x000619DB | Version 6.101 FW bundle |

## Development versions

**We recommend that development versions and releases should not share the same version numbers**. No two fonts should have the same version number but two different version strings. For example, there should not be two fonts that have version strings `Version 1.234` and `Version 1.234 beta`.

Development versions may have indicators such as _alpha_ or _beta_ in the version string, but that should not be used as the only indicator that two fonts are different. For example, `Version 5.678 beta3` means "This font is version 5.678, and by the way, we're using this version as a third beta test.". It does not mean "We're intending to someday release version 5.678, and this is the third beta leading up to that release."

## How to set the version number and version string

In UFO sources the information is held in three keys in `fontinfo.plist`: `openTypeNameVersion`, `versionMajor`, `versionMinor`.

FontLab (in the _Font Info_ dialog) and FontForge (go to _Element > Font Info > PS Names_) have fields for both tables.

By default, Glyphs only provides a way to set the Version major and minor numbers (in the _Font Info > Font_ panel). However there is a way to set the version string in that panel:

- Click on the + sign next to _Custom Parameter_
- Under _Property_ choose _versionString_
- Type the version string into the _Value_ field

Here is a summary of where to set version numbers and version strings:

| | FontLab | Glyphs | FontForge | UFOv2 |
| --- | --- | --- | --- | --- |
| `head` table | Complete Version record | Version | sfnt Version | versionMajor, versionMinor |
| `name` table | TrueType Version record | versionString | Version | openTypeNameVersion |

[otspec]: https://www.microsoft.com/en-us/Typography/OpenTypeSpecification.aspx
[semver]: https://semver.org/

