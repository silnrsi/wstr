---
title: Roles and Actors
description: Crossing the digital divide through bridge building
sidebar:
    order: 2310
lastUpdated: 2026-05-29
---

## Introduction

Crossing the digital divide brings us into the realm of bridge building. Many of the analogies with traditional bridge building &mdash; bridge types, bridge building roles and actors, etc. &mdash; hold when thinking about the digital world. Writing system implementations (WSI) correspond to a bridge where the computer takes the place of the construction site and its environs.

This section examines the main roles that need to be filled in order to build the bridge and then examines various actors who directly and indirectly take on those roles in crossing the divide. In different contexts, different actors may take on different roles. So by separating roles and actors we can see more clearly the activities that need to take place and then find appropriate actors to take on those roles.

## Roles

Roles arise from activities. The overall activity is building WSIs suitable for use by the user community, but there are many different specific activities that are necessary to that process.

### Language expert

The role of being the language expert involves providing information about the language and orthography. Those involved in this role also need to be able to answer questions about cultural aspects that relate to their writing system. For example, the shape of some special characters may be important to the community since they help identify a text as being from _their_ language. Other important questions may involve such issues as keyboard layouts and font styles suitable for new readers &mdash; though the list of all possible questions is endless. Helpful information can range from detailed answers to “it doesn’t matter”, “we don’t care”, or “either will do”.

### Researcher

The role of researcher is taken up by someone or some group interested in the language and orthography sufficiently to study it. In conjunction with the language community, they study and analyze the orthography (and with it the language). Good research includes anthropological aspects of reading and writing, printing, and computer or mobile use within the community. The researcher then takes the results and makes them available, in the appropriate language, to WSI implementers. This may be in the form of published papers or via private correspondence. One of the most important contributions a researcher can make is to provide a clear description of the orthography in question.

### Sample implementer

The first WSI for a writing system is often a proof of concept. Although this is not necessarily required, it is unlikely that the first bridge built across a river is going to be a three-lane highway. As such, the task of the sample implementer is to create as good an initial bridge as they can &mdash; even if it is only one made of rope.

A sample implementation has a number of benefits. It proves that the orthography can be implemented, thus increasing the awareness among the language community. It also validates the WSI description, and proves that it is sufficient for a WSI to be created. It can also provide a model for other WSI implementers to follow. It is this latter role which encourages the sample implementer to do the best job they can.

One of the characteristics of the sample implementation is that it is tested within the language community with close feedback between the community and the implementer. Due to its reliance upon primary contact, in effect, the sample implementation is the completion of the research. As a tool for future development, therefore, the sample implementation should be as complete and thorough as possible. This often results in two types of sample implementations: a rough solution that allows for basic data entry and printing within a limited context; and a more thorough, standards-based solution that may be used as a basis for future development.

### Standardizer

The standardization process for WSIs is not necessarily one of creating new standards. Often an existing standard is enhanced to include the new orthography. For example, instead of creating a new encoding standard for a particular orthography, the extra characters needed can be proposed as additions to the [Unicode standard][unicode-home].

The standardizer also has the task of deciding what needs to be standardized across WSIs. For example, there is no standard keyboard layout for the Myanmar script beyond the limited typewriter layout. As a result, there are many different layouts, causing difficulties for users. This is an area ripe for standardization.

### WSI provider

Sample implementations are usually not sufficient to meet all the needs of the language community. Higher quality solutions are needed. The development of these solutions may be tied into a particular product or combined with a number of other WSI components into a wider solution. The final result is a higher quality solution for the targeted users.

The WSI provider role acknowledges that a single WSI may not meet all needs. There are specialist needs (high speed databases, high quality typesetting, etc.) which may need specialist solutions.

### Encourager

The Encourager stimulates the whole process of WSI creation to take place. Encouragement takes two forms. Promotion involves actively encouraging actors to be involved in the process, via funding, recognition, etc. Regulation is sometimes used to encourage standardization.

## Actors

Having examined the various roles and activities in the WSI creation process, we now look at the various actors that may get involved in the process. We will examine which role is most appropriate for each actor to take. Some actors may be involved in more than one role.

### Language community

Different language communities take different approaches to the role of being language experts. Some communities are very passive in their role. It is up to researchers and others to find out the community’s needs. This is common among pre-literate societies or those with little interaction with more technologically advanced groups. It is only later in the whole process that interest may develop.

Some groups have strong feelings about aspects of their orthography, and may even regard such information as private. Identity is sometimes related to orthography and certain features of the writing system or printing style are important in identifying a text as being in _their_ language. Language communities may also take an active role in promoting a certain orthography.

An example of this happening comes from Indonesia, among the Batak people. Between 1851 and 1857, H.N. van der Tuuk investigated the Batak language and script. He discovered that only the _datu_ (religious leader/healer) and his students were able to read the script. Van der Tuuk composed a standard grammar and script based on the material he received from the _datu_. Years later, in 1882, when a missionary was in the Batak region, a number of headmen got together to ask the missionary if they could give instruction in reading and writing the Batak script as well as the Latin script. The resurgence of the use of the Batak script came about because the people themselves wanted it.See [THE ENCOUNTER OF THE BATAK PEOPLE WITH RHEINISCHE MISSIONS-GESELLSCHAFT IN THE FIELD OF EDUCATION (1861-1940)][batak].

Even if the language community is not pursuing standardization efforts, they need to be approached and invited to participate throughout the whole process.

### Industry

The computing industry has a long and complex relationship with the WSI creation process. The most natural role for the computing industry is that of WSI provider. Industry often sees the needs for standards and may be the ones who facilitate standards proposals through [ISO][iso] or [national standards bodies](#national-standards-bodies). They must know the established usage of a particular script before they try to implement it. They need to know what the expectation is from the users of how things should work. What industry does well is to provide finished solutions that work for a particular set of users or a specific software need.

Ideally, a company prefers to be the only one to have a bridge across the river and so reap the benefits of a monopoly. Unfortunately, this desire for uniqueness has made WSI creation by others difficult. The proprietary nature of these specialist solutions means that they work well in only a limited range of contexts, and are less open to refinement. The return on investment of developing a unique, specialized WSI for a small language group is low. This has resulted in expensive solutions that can be relatively poor in quality.

Larger software developers, who want to see their products used by many different language communities, often see WSI development as a cost rather than as a revenue source. As a result, increasing emphasis has been placed on producing globalized software that can work in many languages. The primary concern of this globalization process has been to cover the major language markets &mdash; those that have the most sales potential. Support for minority languages and the ability to add extra WSIs are often ignored or actively locked out. Sales potential is not the only concern for these companies &mdash; they do not want to bear the burden of supporting third-party additions or modifications to their product.

The result of all this is that there are two types of industry actors: those who see WSIs as a direct revenue source and so are interested in making their WSI unique in some way to encourage sales; and those who see WSIs as a cost necessary to enable their main product to be sold in a new market. The latter group is more likely to embrace international standards and try to see issues globally, while the former is more likely to keep WSI elements proprietary in order to encourage people to pay for them.

#### Software vendors

Software vendors can be multinational, such as Microsoft Corporation. Multinational organizations are highly motivated to help set standards. They cannot afford to implement software solutions for multiple standards and will often work with governments to stimulate standards development. In most cases, they will not even attempt to implement a writing system until there is a standard which is recognized by the government. 

Another group of software vendors are those interested in solutions for a particular country or region. 

A third type of vendors are local. Their software could be for one particular script only, or even for just one particular language using that script. Sometimes software which is developed for a particular local need is seen outside of the local community and adopted. For example, [Keyman][keyman] is a program which allows a user to type in other languages and scripts using their existing keyboard. It is easily customizable. Keyman was developed for one solution &mdash; inputting Lao. Others saw the program and wanted something similar for their language. Keyman is now used worldwide for handling complex languages including Amharic, Nepalese, Lao, and Farsi. 

#### Open source community

The open source community is rapidly growing, and is very interested in supporting minority language communities unreached by the wider industry. They often are motivated to provide inexpensive solutions for people who cannot afford expensive software. They also want to implement solutions for minority language communities in which industry has little interest. 

The open source community creates freely available solutions. This challenges the traditional computing industry model of selling expertise and focuses more towards selling services. For the open source community, software is a cost, so the community embraces standards wherever it can. The result is that open source software provides an alternative framework and environment for WSI developers. If those developers are not interested in providing WSIs for profit, they may find that the open source model is more appropriate for them. An example of an open source project was the Graphite/Mozilla project, begun by SIL Global because of needs that minority language groups had for rendering their writing system that remained unmet by industry software. Mozilla has now implemented Graphite rendering in their open source project.

### Standards organizations

Standards organizations naturally take on the standardization role, but each tends to have a particular domain of interest. This means that they will be concerned with a particular aspect of a WSI across all languages within their domain.

Standards are only effective if people use them. The result is that a standards body has a synergetic relationship with other actors in the process.

#### International Standards Organization (ISO)

The [International Standards Organization (ISO)][iso] can be described as the United Nations of standards organizations. It provides an international forum for the standards process across a wide range of standards. As such, orthography issues are well within its area of responsibility. The difficulty, as with any large organization, is knowing where and how to relate to the appropriate parts of the organization, with its sections and working groups. An important encouragement activity is to enable researchers and sample implementers to relate to the appropriate standardizers within the ISO structure. Generally, the need for a standard is brought by an industry sector to a national member body (of ISO) where the process of definition and approval is carried out. 

#### Unicode Consortium

The [Unicode Consortium][unicode-home] is the place to go for encoding standards. Without getting something into Unicode it is unlikely that multinational software companies will provide support for individual needs. The Unicode Consortium has a set of [Submission guidelines][unicode-submissions] to follow for proposing new scripts or characters. Individuals may submit proposals, but if the proposal involves the encoding of a whole script (not just additional characters), sponsorship by a relevant academic or government organizations may be helpful. See also [New characters and scripts](/topics/encoding/new-characters-and-scripts).

The Common Locale Data Repository ([CLDR][cldr]) is under the Unicode umbrella. Their mission is "To build and maintain the most trusted and comprehensive repository of locale data, reflecting common usage across the world, through active participation from organizations and community members."

Unicode also has a [Digitally Disadvantaged Languages (DDL) Working Group][ddl] running under the CDLR. Their goal is to make it easier for the digitally disadvantaged to contribute language information to the CLDR.

#### World Wide Web (W3C)

The [World Wide Web Consortium (W3C)][w3c] is the _de facto_ standards organization establishing web content and structure standards. As such, it is not directly concerned with orthography issues, but has an indirect interest in WSI needs, and can benefit from orthography descriptions.

#### Internet Engineering Task Force (IETF)

The [IETF][ietf] is a large open international community of network designers, operators, vendors, and researchers concerned with the evolution of the internet architecture and the smooth operation of the internet. Amongst other things, they are involved in setting standards for language identification &mdash; the way that language data is identified in internet documents. 

### Non-governmental organizations (NGOs)

The primary concerns of non-governmental organizations and other specialist groups are the language communities they serve. In order to ensure a wide user base for their WSIs, and increase the viability of their solutions, NGOs are interested in communicating what they are doing to a broad audience. They are also interested in training, transferring skills to the local community, facilitating workshops and facilitating processes (like setting standards). They enter the technological realm out of necessity in order to obtain technology for their needs and those of the language community. There are, therefore, two types of NGOs we consider here.

Most NGOs do not have the technical expertise to implement or manage the creation of a WSI for a particular language. Instead, they search for any possible solution that they can use. As such, they constitute another user community alongside the language community. What they bring to the WSI creation process is the ability to communicate the need to possible solution providers. They can do this very effectively and take on an encourager role, through raising awareness and funding.

A few NGOs do have the technical expertise to implement or manage the creation of a WSI, and these often take on the research and sample implementer roles. With their close relationship to the language communities concerned, they have excellent access to the information needed and can describe it well to other implementers.

#### SIL Global

[SIL Global][sil] is one such organization that functions much like an NGO. It has the expertise and access to language communities that enable it to fulfill the researcher and sample implementer roles. Due to its interest in so many languages and orthographies, it has to take a global view. As a result, it also gets involved in the standardization process and with the encouragement of various actors to enable access to technology by minority language communities.

#### Translation Commons

[Translation Commons][translation-commons] is another such organization. It  is a volunteer community of language technology experts with a vision to help every language digitize and share equally in the benefits of a connected digital world, ensuring that “no language is left behind”.

### Governments

The primary role of a government is as encourager. They encourage by:

- Funding and promoting WSI development within the country.
- Identifying and recognizing WSIs that have been implemented well.
- Encouraging the language communities to get involved in the process.
- Encouraging and regulating the use of standards where competing solutions are not being reconciled and are causing confusion.
- Promoting national standards, both their use and acceptance within the country and also on the international stage.

A common role has been for a government to encourage standards for encoding, keyboards, and more recently, sorting. For example, the Thai government based their national encoding standard (TIS620-2533) on an existing _de facto_ industry standard. This was then taken up, in its entirety, into Unicode.

#### National standards bodies

There are sometimes national standards bodies whose goals can include promoting and coordinating standardization at all levels in the country. An example of a government national standards body was the former [Quality and Standards Authority of Ethiopia (QSAE)][qsae]. It would be natural for a national standards body to be a member of [ISO][iso], as the QSAE was until 2010.

#### Technical working groups

There are also technical working groups sponsored by governments. These often do software development. The [National Electronics and Computer Technology Center of the Royal Thai Government (NECTEC)][nectec] is an example of this. As stated on its website, NECTEC’s mission is to “ensure Thailand’s competitiveness in Electronics and Computer and the use of IT to stimulate economic and social impact through own &lbrack;sic&rbrack; R&amp;D programs as well as R&amp;D funding services to universities”. NECTEC is involved in open source projects and has implemented Thai support for OpenOffice.

#### Legislation

Governments may even legislate trade based on standards support. For instance, the Government of the People's Republic of China introduced [GB18030][gb18030], a standard for the support of its national characters. GB18030 mandates that new products released in China after January 1, 2001 must support certain character sets. For Microsoft, this meant that in order to sell its software in China they had to support the standard. 

Governments are often interested in standardizing orthographies and so may have already been involved in that process. This can, however, be controversial. For instance, in 1941 the Mongolian government (under apparent pressure from Stalin) passed a law to outlaw the traditional Mongolian script and replaced it with a Cyrillic-based alphabet. This may have been an attempt to wipe out all things Mongolian and replace them with Soviet institutions. After Mongolia had free elections and instituted a new constitution in the early 1990s, the Mongolian government has been encouraging the use of the traditional vertical Mongolian script. 

Nevertheless, governments most often have good reasons for the standards they set, and may be the ones who are involved with the whole process. They may work through the academic communities or Ministry of Education, down to the language community level.

#### UNESCO

As a para-governmental organization, [UNESCO][unesco] has an important role to play in the whole process. It can encourage governments to not ignore the needs of minorities in their concern to unify their nations. It can encourage WSI development and provide resources to governments and other NGOs. They can encourage NGOs directly and help in all areas of the WSI development process, especially for those languages which may not be receiving the attention they deserve.

UNESCO is especially interested in making needs and specifications known. They can be very helpful in bringing interested parties together for setting standards, including the need for standardization of keyboard layout and transliteration.

### Academics

The academic community may include universities, academic associations, and even the individual linguist. They have a strong interest in minority languages and want to be involved in the standards process. As with the linguist, they may already have been involved in the orthography development. They will often support research and development within language communities, provide training, facilitate standards development, etc.

It is natural for academics to fall into the researcher role. Academic research can fall into two types: language-directed and technology-directed research. Language-directed research arises as a linguist studies a particular language and its community. Technology-directed research is interested in the interaction between computers and languages and tends to take a more global approach. Language-directed research tends to provide better orthography descriptions, while the technology-directed research results in sample implementations.

Linguists also have an interest in the writing system. They are likely to be the ones who have spent months and years analyzing the language and possibly know more about the technical features of the language than even mother-tongue speakers. The linguist is also one who will understand the local needs for standards from living with the language community for long periods of time. They may have been involved with the development of an orthography for that language community.

One potential source of conflict is the immediacy and flexibility of the linguist’s needs. The linguist is often working alone, needs a solution right away, and needs to be able to alter that solution easily in light of new discoveries. As a result, linguists may chose to work out their own solutions without discussing options with others. This can lead to odd orthographies and computer solutions which do not follow established standards. 

Even if the linguist is not the one pursuing standards, they would certainly be a source of information and expertise. They may also know which members of the language community would be best to approach for further information.

### Professional communities

Professional communities act as a particular type of encourager. They stimulate people with similar skills and interests to work together. Since they are not financially motivated, they are often highly motivated to support minority languages. Although professional communities rarely make standards proposals (Unicode, language identification, etc), they will often be involved in promoting or implementing standards. 

### Press

Although the press will likely not be involved in developing standards, they can have an active role as encouragers. Not only do they communicate needs and results, but also motivate implementers and conduct research to make their results known. The primary actor in this area is the academic press, who encourages the publication of papers. Although there is no natural means through which to publish orthography descriptions, papers are an important way of getting technical details to a broad audience.

The [Adlam script](/scrlang/scripts/adlm/) was invented by two brothers who decided their native language needed a new alphabet. They made wide use of the press in order to get the script encoded, and supported by the computer industry.

## Conclusion

Creating a WSI is hard work. The whole process involves many different actors taking on a variety of roles. Although this section discusses the various roles and actors in generalized terms, the precise details of who does what and even what gets done may well vary when it comes to a particular language group in a specific sociolinguistic context. But the variation is unlikely to be radically different from the model presented here.

One of the key points that arises from this model is that it is very unlikely that a complete solution will be provided by a single actor. Interaction between the various actors involved in a particular orthography is essential. As each actor acknowledges the value of the others to the process, better WSIs will result, and users will be better served.

<Attribution type='Article' copyyears='2003-2026' copyholder='UNESCO and SIL International Inc.' author='Martin Hosken and Lorna A. Priest' license='CC BY-SA 3.0' licenseUrl='https://creativecommons.org/licenses/by-sa/3.0/'/>

<CaptionText text='This article formerly appeared on scripts.sil.org.'/>

[iso]: https://www.iso.org/home.html
[keyman]: https://keyman.com/
[unicode-home]: https://home.unicode.org/
[unicode-submissions]: https://sew.unicode.org/guidelines
[w3c]: https://www.w3.org/
[ietf]: https://www.ietf.org/
[sil]: https://www.sil.org/
[qsae]: https://www.ethiomarket.com/qsae/
[nectec]: https://www.nectec.or.th/home/
[gb18030]: https://en.wikipedia.org/wiki/GB_18030
[unesco]: https://www.unesco.org/
[batak]: https://web.archive.org/web/20120219033317/http://igitur-archive.library.uu.nl/dissertations/1922364/full.pdf
[cldr]: https://cldr.unicode.org/
[ddl]: https://cldr.unicode.org/ddl
[translation-commons]: https://translationcommons.org/
[adlam]: https://en.wikipedia.org/wiki/Adlam_(Unicode_block)