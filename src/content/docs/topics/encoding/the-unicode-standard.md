---
title: The Unicode Standard
description: History, background, and processes
sidebar:
    order: 3200
lastUpdated: 2025-08-08
---

Unicode is an industry standard character set encoding developed and maintained by The Unicode® Consortium. The Unicode character set has the capacity to support over one million characters, and is being developed with an aim to have a single character set that supports all characters from all scripts, as well as many symbols, that are in common use around the world today or in the past. Currently, the Standard supports over 150,000 characters representing a large number of scripts. The benefits of a single, universal character set and the practical considerations for implementation that have gone into the design of Unicode have made it a success.

## A brief history of Unicode

In order to understand Unicode, it is helpful to know a little about the history of its development. By the early 1980s, the software industry was starting to recognize the need for a solution to the problems involved with using multiple character encoding standards. Inspired by early innovative work by Xerox, the Unicode project began in 1988, with representatives from several companies collaborating to develop a single character set encoding standard that could support all of the world’s scripts. This led to the formation of the Unicode Consortium in January of 1991, and the publication of Version 1.0 of the Unicode Standard in October of the same year.

There were four key original design goals for Unicode:

- To create a universal standard that covered all writing systems.
- To use an efficient encoding that avoided mechanisms such as code page switching, shift-sequences and special states.
- To use a uniform encoding width in which each character was encoded as a 16-bit value.
- To create an unambiguous encoding in which any given 16-bit value always represented the same character regardless of where it occurred in the data.

How well these goals have been achieved as the Standard has developed is probably a matter of opinion. There is no question, however, that some compromises were necessary along the way. To fully understand Unicode and the compromises that were made, it is also important to understand another, related standard: ISO/IEC 10646.

In 1984, a joint ISO/IEC working group was formed to begin work on an international character set standard that would support all of the world’s writing systems. This became known as the Universal Character Set (UCS). By 1989, drafts of the new international standard were starting to get circulated.

At this point, people became aware that there were two efforts underway to achieve similar ends, those ends being a comprehensive standard that everyone could use. Of course, the last thing anybody wanted was to have two such standards. As a result, in 1991 the ISO/IEC working group and the Unicode Consortium began to discuss a merger of the two standards.

The complete details of the merger were worked out over many years, but the most important issues were resolved early on. The first step was that the repertoires in Unicode and the draft 10646 standard were aligned, and an agreement was reached that the two character sets should remain aligned.

The Unicode Standard has continued to be developed up to the present, and work is still continuing with an aim to make the Standard more complete, covering more of the world’s writing systems, to correct errors in details, and to make it better meet the needs of implementers. 

## The Unicode Consortium and the maintenance of the Unicode Standard

The  Unicode Consortium is a not-for-profit organization that exists to develop and promote the Unicode Standard. Anyone can be a member of the consortium, though there are different types of memberships, and not everyone gets the privilege of voting on decisions regarding the Standard. That privilege is given only to those in the category of Full Member. There are two requirements for Full Membership: this category is available only for organizational members, not to individuals; and there is an annual fee.

The work of developing the Standard is done by the Unicode Technical Committee (UTC). Every Full Member organization is eligible to have a voting position on the UTC, though they are not required to participate.

There are other categories of membership including Individual Member, Associate Member, Supporting Member, and Liaison Member. Each of these has increasing levels of privileges. Membership categories are available [here][unicode-membership].

## Unicode and ISO/IEC 10646

The UTC maintains a liaison relationship with the corresponding body within ISO/IEC that develops and maintains ISO/IEC 10646. Any time one body considers adding new characters to the common character set, those proposals need to be evaluated by both bodies. Before any new character assignments can officially be made, approval of both bodies is required. This is how the two standards are kept in synchronization.

Because the process of developing the Unicode Standard involves interaction with ISO/IEC and the international standard ISO/IEC 10646, it is worth mentioning briefly the workings of the international standards body as it relates to Unicode. The Joint Technical Committee 1 (JTC1) of ISO and IEC is responsible for standards related to information technologies, and the work of this technical committee is divided among multiple sub-committees. Sub-committee 2 (JTC1/SC 2) is responsible for standards related to character encoding, and that work is divided among various working groups. Among these, working group 2 (JTC 1/SC 2/WG 2) is responsible for the development of ISO/IEC 10646.

The combined standards body ISO/IEC is an international standards organization — the members of which are national standards bodies from various countries. Standards bodies from any country are potentially eligible to participate in the work of any ISO or ISO/IEC technical committee or sub-committee, including work on ISO/IEC 10646.

In order to ensure quality standards that facilitate domestic and international commerce without providing unfair advantage to certain countries over others, a very formal process is used that includes several stages of review and balloting before something is published as part of an international standard. Thus, if a standards institute of a given country wishes to influence the development of ISO/IEC 10646 (and, in turn, Unicode), they should become a member of ISO/IEC, become a participating member of JTC 1/SC 2, and then actively contribute to the work by voting on ballots, preparing and commenting on draft revisions, and attending meetings of JTC 1/SC 2/WG 2 whenever possible.

## Types of information

The Unicode Standard includes different types of information:

- Firstly, there is no longer a printed version of The Unicode Standard (TUS). The [Core Specification][core-spec] is available in both html and pdf formats. The [Character Code Charts][code-charts] are also available online.
- The Unicode Consortium publishes a variety of documents known as [Unicode Technical Reports (UTRs)][utr] on its Web site. These discuss specific issues relating to implementation of the Standard, and some even become parts of the Standard. A UTR with this status is identified as a Unicode Standard Annex (UAX). These annexes may include documentation of a minor version release, or information concerning specific implementation issues.
- The Unicode Standard includes a collection of data files that provide detailed information about semantic properties of characters in the Standard that are needed for implementations. The most up-to-date versions are always available from the [Unicode Web site][ucd]. Further information on the data files is available [here][uni-online].
- [Unicode Technical Notes][utn] are not a formal part of the Unicode Standard. They are provided "as-is" for the convenience of users.

### Additional resources

- [The Unicode Standard][tus]
- [Everyday Unicode][everyday-unicode]
- [Unicode information on ScriptSource][ss-unicode]
- [Unicode Character Browsing][ss-char-browsing]
- [Unicode Status in ScriptSource][ss-unicode-status]
- [Understanding Unicode I][understanding-unicode-i] and [Understanding Unicode II][understanding-unicode-ii]

_Portions of this content first appeared in [Guidelines for Writing System Support][wsig], copyright © 2003 UNESCO and SIL International._

[code-charts]: https://www.unicode.org/charts/
[core-spec]: https://www.unicode.org/versions/latest/core-spec/
[everyday-unicode]: https://scriptsource.org/entry/mhzqeygkuz
[ss-char-browsing]: https://scriptsource.org/entry/tubkvb6y8f
[ss-unicode-status]: https://scriptsource.org/entry/tn9r6q9euj
[ss-unicode]: https://scriptsource.org/entry/z3hs8db5ct
[tus]: https://www.unicode.org/standard/standard.html
[ucd]: https://www.unicode.org/Public/UNIDATA/
[understanding-unicode-i]: https://scriptsource.org/source/c6rwvqz3gn
[understanding-unicode-ii]: https://scriptsource.org/source/hqj8q8b4xv
[uni-online]: https://www.unicode.org/onlinedat/online.html
[unicode-membership]: https://home.unicode.org/membership/membership-levels/
[utn]: http://www.unicode.org/notes/
[utr]: https://www.unicode.org/reports/
[wsig]: https://scripts.sil.org/wsi_guidelines.html