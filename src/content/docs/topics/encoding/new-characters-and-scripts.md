---
title: New characters and scripts
description: Description of the process for adding new characters and scripts to Unicode
sidebar:
    order: 3230
authors: Peter Constable, Lorna Evans
lastUpdated: 2025-11-21
---

If a language community wants to have their writing system implemented for use in information technologies, then it will be very much to their advantage to see that the writing system is supported in key industry standards. Doing so will greatly increase the likelihood that the writing system is supported in off-the-shelf products from vendors around the world. In particular, it is important to have the characters of the writing system included in the Unicode Standard.

The Unicode Standard is a work in progress, and new characters and scripts are being added on an on-going basis. The Standard is also intended to be universal in coverage; thus, small size or limited economic/market potential of a community is not an obstacle.

In this section, we will discuss how one can know when a character or script needs to be proposed for addition to the Unicode Standard, and what steps should be taken in order to get characters or scripts added to the Standard.

## Evaluating whether a writing system is already supported by Unicode

Before making a decision to request that new characters be added to the Unicode Standard, it is important first to ascertain that the characters are not, in fact, already supported by the Standard. This requires good familiarity with the Unicode Standard. If possible, someone with a thorough knowledge of the writing system should acquire a good understanding of the Standard. If that is not practical, then they should seek assistance from others with expertise in Unicode. Useful resources in either case include the [Unicode Web site][uni-home] and the [Unicode email discussion list][uni-email]; you can also contact the [Unicode Consortium][uni-help] for assistance.

Due to limited understanding of Unicode, novices in the workings of the Standard often conclude incorrectly that the language they are interested in is not supported. A few key concepts will help to avoid these mistakes.

The first is that Unicode encodes [characters][glo-character], not [phonemes][glo-phon], and not [graphemes][glo-grapheme]. For instance, the character LATIN SMALL LETTER P is used to write a bilabial consonant phoneme in English and other European languages. If, suppose, there were a language for which this symbol were used to write a vowel phoneme, that would not imply that a distinct character is required: the same character LATIN SMALL LETTER P can be used, regardless of what type of phoneme is being represented for a given language.

A more frequent misconception involves graphemes: the orthography of a language might use digraphs or trigraphs to represent a particular phoneme. So, for instance, a combination of letters such as “kp” might be considered a distinct member of the alphabet for some language; it might even have its own place in the alphabetic order. This does not imply, however, that the combination “kp” needs to be encoded in Unicode as a distinct, atomic unit: Unicode assumes that multigraphs are encoded as sequences of characters, and that if they need to be recognized as a unit in relation to some text process for some language, that it is the job of software to provide that language-specific behavior.

Another key concept is that Unicode encodes characters, not glyphs. For instance, the scripts of South Asia often use ligature forms (often referred to in the South-Asian context as [conjuncts][glo-conjunct]), but these are not encoded as distinct elements in Unicode. So, for instance, a Devanagari conjunct ksha “क्ष” is not represented directly in Unicode as an atomic element. Rather, it is represented as a sequence of characters, < ka “क”, virama “्”, ssha “ष” >. To avoid confusion regarding issues such as these, it is especially important to read the sections of the Unicode Standard that describe the particular script in question.

A third key concept is the principle of dynamic composition. The writing systems of many languages include elements that consist of base-diacritic combinations. Unicode includes many such combinations as individual characters, but certainly not every possible combination. If the writing system for some language requires a particular combination that does not exist in Unicode as a separate character, that does not imply that this new combination should be added. Rather, Unicode follows a design principle of dynamic composition, meaning that such composite text elements can be represented using character sequences involving combinations of a base character followed by a character for the combining diacritic. So for instance, a grapheme w-tilde would be represented by the character sequence `< w, combining tilde >`. (The reader may wonder why certain base-diacritic combinations exist in Unicode rather than being handled dynamically in the same manner. These were included only out of necessity for backward compatibility with pre-existing industry-standard character set encodings. Moreover, in each case, the same text element can be represented using either the precomposed character or the dynamically-composed character sequence, and it is expected that these different representations will be considered equivalent by software.)

A final consideration worth mentioning is that the location of characters in the Unicode code charts is generally organized by scripts, but this is not an absolute rule. For practical reasons, the characters in a given writing system may be located in separate areas of the Unicode code space. For this reason, it is important in determining if and how a writing system can be represented in Unicode to become familiar with the many different portions of the Unicode code space.

The problem of determining whether or not something is already supported in Unicode is discussed on the Unicode Web site page [Where is my Character?][uni-where] Before preparing any proposal to add new characters to Unicode, it is recommended that this page be read, as well as the [FAQ][uni-faq] pages on the Unicode Web site.

When investigating whether a writing system can be represented adequately using existing characters in Unicode, there may be situations in which it is unclear whether or not existing characters would be appropriate to use for a given purpose. It is recommended that questions regarding such issues be asked on the [Unicode email discussion list][uni-email].

With these considerations in mind, it is certainly possible that a user may find that some or all of the characters in their writing system are not adequately supported in Unicode. If that is the case, the next steps will be to determine what would be an appropriate approach to encoding these characters or script, and then to submit a concrete proposal for addition of characters to the Standard.

## Determining the best encoding solution

When a writing system cannot be adequately represented in Unicode, it is necessary to determine what revision to the Standard would constitute the most appropriate solution. In most cases, this will simply involve the addition of new characters to the Standard. In some situations, though, there may be alternate possible solutions that need to be evaluated, or there may be special considerations that require more careful consideration. It is recommended that solutions being considered are first discussed on the [Unicode email discussion list][uni-email]. This will provide opportunity for review and may bring to light important issues that had been overlooked. It will also provide opportunity to learn whether there are others who have been working toward a proposal dealing with the same or similar problems.

## Qualifying what it takes to get new characters or scripts added to Unicode

Once it has been determined that new characters or scripts need to be added to the Unicode Standard, it is time to begin the formal processes that are required to bring about a revision in an international industrial standard. This assumes that there is already a clear idea of what characters should be proposed, and how those characters should be used in representing text elements of the given writing system.

International industry standards need to be designed with care to ensure successful and problem-free implementation and utilization. For this reason, development of such standards typically proceeds slowly and methodically. In order to get characters or scripts added to the Unicode Standard, three essential elements are needed:

- Individuals that understand the requirements of the given writing system, that also understand technical aspects of implementing support for writing systems in information technologies, and who can communicate such information clearly.

The Unicode Standard involves many technical details, and a clear understanding of what is required, in full technical detail, is needed in order to make additions to the Standard. Such requirements are derived from a combination of a thorough knowledge of the writing system in question together with a solid grasp of the technical aspects in implementing writing systems on computers. That information must be communicated clearly to the committees that will be making decisions regarding the proposed additions and, if approved, to those actually making detailed changes in the Standard.

- Committed participation of such individuals in the formal processes involved in revising the Standard.

While development of Unicode and ISO/IEC 10646 involves industry bodies, standards agencies and major corporations, ultimately the actual work is undertaken by a relatively small group of individuals that has remained largely the same over the course of several years. There is more work involved in development of the standards than these individuals can do on their own. Thus, it is important that a stakeholder in the development of this writing system—one of the individuals mentioned above—takes responsibility for seeing the proposed changes followed through to completion. They need to become the champion for the cause, ensuring that necessary documents are submitted and distributed to committee members, and that the issues are added to meeting agendas. If there isn’t such a person promoting the changes that have been proposed, then those changes will not happen on their own.

- Time.

Getting from the preliminary evaluation of possible solutions through to publication of a new version of the Standard that includes the needed changes typically takes around two years. Those seeking the changes must set appropriate expectations in terms of the length of time required, and must be willing to remain committed to the process for the duration.

## The formal process for adding new characters and scripts to Unicode

As mentioned earlier, the Unicode Standard is maintained in synchronization with the corresponding international standard ISO/IEC 10646, and any changes to either requires approval of both the Unicode Technical Committee (hereafter, UTC) and ISO/IEC JTC 1/SC 2/WG 2 (hereafter, [WG2][wg2]). The formal process to add new characters or scripts to these standards can be initiated with either body. It does not matter which body you approach first. If a proposal is submitted to WG2, then in the course of the proposal being approved as part of an amendment to ISO/IEC 10646 it will be reviewed by UTC. If a proposal is submitted first to UTC, they can approve it, but then they must submit it for consideration by WG2. Hence, a proposal will eventually be considered by both bodies either way. However, UTC meets more often and may process documents more quickly.

WG2 members consist of national standards bodies from various countries. For this reason, initiating the process with WG2 is best done through a national standards body that is a participating member of JTC 1/SC 2. The list of participating member bodies is available from the private [JTC1/SC2 Web site][jtc1-sc2].

If your country is not represented in JTC1/SC2 by a national standards institute, an institute from your country can become a member. Alternately, you may find that one of the existing member bodies would be willing to assist in submitting and sponsoring the proposal.

The other approach that may be taken is to initiate the process through UTC. Membership in the Unicode Consortium is not a requirement in order to submit a proposal to UTC. Information on [how to submit a proposal to UTC][uni-char-proposal] is available on the Unicode Web site. Whether a proposal is being submitted through UTC or WG2, it is recommended that you first read this page.

There are some third-party agencies that may be able to offer assistance in preparing and submitting proposals to UTC. If you have a working relationship with one of the [members of the Unicode Consortium][uni-members], they may be able to offer assistance.

Also, the Department of Linguistics at the University of California, Berkeley has established the [Script Encoding Initiative][sei] for the express purpose of assisting in getting the remaining characters and scripts not yet in Unicode added to the Standard. Information on the Script Encoding Initiative, including how to contact them, is available from their Web site.

The Writing Systems Technology department of SIL Global has also been involved in preparing proposals to get new characters and scripts added to Unicode, and may be able to provide assistance. Contact information is available from the [WSTech Web site][wstech].

Once a proposal has been submitted to either UTC or WG2, they may accept it, they may request clarification on various issues before they make any decision, or they may request certain revisions be made. They may also respond by rejecting the proposal, with reasons why; if there has been preliminary interaction as suggested in earlier sections, however, a situation resulting in a formal rejection is unlikely to occur.

UTC typically meets quarterly, and WG2, annually. Formal action on proposals is taken during these meetings, but not between. If a proposal is accepted at a given meeting, the new characters are not yet formally part of either Unicode or ISO/IEC 10646. This will not happen in the case of Unicode until the next major or minor [version][uni-version] is released. For ISO/IEC 10646, the new characters must be published as part of an amendment to the international standard, and such amendments require multiple stages of review and balloting by member bodies.

New versions of the Unicode Standard are published a little more frequently than are amendments to ISO/IEC 10646. Depending on timing, it’s conceivable that the span of time from when a proposal is submitted to UTC to the point at which those characters appear in a published version of Unicode could be as little as six months. More typically, though, you should anticipate that this will require 1 1/2 to 2 1/2 years.

## Preparing a proposal to add new characters or scripts

Proposals for adding new characters or scripts must be communicated in written proposal documents. A proposal to add new characters or scripts must also include a [Proposal Summary Form][uni-prop-summary]. 

The purpose of the proposal documents is two-fold: to communicate clearly exactly what changes or additions to the Standard are being requested, and to provide reasonable justification for those changes or additions.

Conveying exactly what characters are proposed for addition can be as simple as creating a list that includes a character name and representative glyph for each. Additional information may also be needed, however, particularly if an entire script is being proposed. For instance, if characters have special writing system behaviors such as taking on special forms in particular contexts, such details should be included so that the committees can determine that the proposal is appropriate and will actually provide what is required. If it is not clear whether information of this sort is needed in your situation, you should seek the help of experts familiar with the Standard.

When approving a proposal, the committees need to be confident that they have made a good decision: that the addition to the Standard will serve a useful purpose, and that it will meet the needs of the intended user community. A proposal, therefore, needs to provide justification—a demonstration that there is a real user community needing the additional characters, and that what is proposed will meet the needs of that community.

It is not necessary to demonstrate that the writing system in question represents a large community with substantial market potential. The size of the user community is generally not an issue, but there are limits. There must, at least, be a real potential for public usage of the characters or scripts. For instance, if two people invented a coding system, whether for their personal recreation or for some internal business purpose, and proposed that this be added to Unicode, their proposal would be rejected on the basis that they do not constitute an acceptable user community. On the other hand, if there was evidence available of usage by a significant number of independent third parties, that could provide a sufficient basis for encoding their characters. To use a real example, one proposal that was accepted by UTC was for a pair of characters for which the known user community was 700–1500 people.

The most important aspect of justification is the ability to demonstrate that each of the proposed characters is in use or required by some community of users. A recommended way to demonstrate usage is to include images (e.g. photos or photocopies) showing the characters in usage in actual publications. These sample images should include usage from various types of literature, not just from books which teach the script.

Justification can also involve demonstrating that the proposed characters reflect what is desired by the given user community. Suppose, for instance, a traditional script was formerly in use for a given language and is being revived, and that this script is being proposed for addition to Unicode. Suppose also, though, that there is some disagreement within the community regarding a particular letterform as to whether it constitutes a separate element or is merely a calligraphic variant of some other form. In this situation, the committees will very likely require that a consensus first be reached within the community regarding the status of this particular letterform. In most situations in which characters need to be added to Unicode, issues of this sort will not be a concern. If such do exist, though, it would be best to get these resolved before attempting to initiate the formal process to get characters added to the Standard.

In addition, Unicode now requires that all proposals now come from someone who has signed the Unicode [Contributor License Agreement][uni-cla].

For any character or script proposal, a font must be provided to the Unicode Consortium. This allows Unicode to produce the [character charts][uni-charts] as well as the [Core Specification][uni-core-spec].

[glo-character]: /reference/glossary#char
[glo-conjunct]: /reference/glossary#conjunct
[glo-grapheme]: /reference/glossary#grapheme
[glo-phon]: /reference/glossary#phon
[jtc1-sc2]: https://isotc.iso.org/livelink/livelink?func=ll&objId=8917016&objAction=browse&viewType=1
[sei]: https://scriptencodinginitiative.github.io/
[uni-char-proposal]: https://www.unicode.org/pending/proposals.html
[uni-charts]: https://unicode.org/charts/
[uni-core-spec]: https://www.unicode.org/versions/latest/core-spec/
[uni-cla]: https://www.unicode.org/policies/licensing_policy.html
[uni-email]: https://www.unicode.org/consortium/distlist.html
[uni-faq]: https://www.unicode.org/faq/
[uni-help]: https://home.unicode.org/connect/contact-unicode/
[uni-home]: https://home.unicode.org/
[uni-members]: https://home.unicode.org/membership/members/
[uni-prop-summary]: https://www.unicode.org/L2/summary.html
[uni-version]: https://www.unicode.org/standard/versions/
[uni-where]: https://www.unicode.org/standard/where/
[wg2]: https://www.unicode.org/wg2/
[wstech]: https://software.sil.org/wstech/
