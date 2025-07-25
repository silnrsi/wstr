---
title: LDML
description: Description of LDML as used in the CLDR and SLDR
sidebar:
    order: 1520
lastUpdated: 2025-07-25
---

Locale Data Markup Language (LDML) is an XML format used for locale data. The most prolific user of LDML is the CLDR. 

The specifications for LDML structure are described in [Unicode Technical Standard #35][uts35], though that documentation is quite dense. For that reason, an abridged example of the LDML file  `es.xml` (Spanish) is depicted below for reference:

```
<?xml version="1.0" encoding="utf-8"?>
<ldml xmlns:sil="urn://www.sil.org/ldml/0.1">
    <identity>
        <language type="es"/>
        <special>
            <sil:identity source="cldr" defaultRegion="ES" script="Latn"/>
        </special>
    </identity>
    <localeDisplayNames>
        <languages>
            <language type="es">Español</language>
            <language type="en">Inglés</language>
        </languages>
    </localeDisplayNames>
    <layout>
        <orientation>
            <characterOrder>left-to-right</characterOrder>
        </orientation>
    </layout>
    <characters>
        <exemplarCharacters>[a á b c d e é f g h i í j k l m n ñ o ó p q r s t u ú ü v w x y z]</exemplarCharacters>
        <exemplarCharacters type="auxiliary">[ª à ă â å ä ã ā æ ç è ĕ ê ë ē ì ĭ î ï ī º ò ŏ ô ö ø ō œ ù ŭ û ū ý ÿ]</exemplarCharacters>
        <exemplarCharacters type="index">[A B C D E F G H I J K L {LL} M N Ñ O P Q R S T U V W X Y Z]</exemplarCharacters>
        <exemplarCharacters type="numbers">[\- ‑ , . % ‰ + 0 1 2 3 4 5 6 7 8 9]</exemplarCharacters>
        <exemplarCharacters type="punctuation">[\- ‐‑ – — , ; \: ! ¡ ? ¿ . … '‘’ "“” « » ( ) \[ \] § @ * / \\ \&amp; # † ‡ ′ ″]</exemplarCharacters>
    </characters>
    <collations>
        <collation type="standard">
            <cr><![CDATA[
                &L < ll <<< Ll <<< LL
                &N < ñ <<< Ñ
            ]]></cr>
        </collation>
    </collations>
    <special>
        <sil:external-resources>
            <sil:font name="Charis" types="default" features="ss04=1 cv43=2 cv68=1 cv77=1 cv90=1">
                <sil:url>https://lff.api.languagetechnology.org/family/charis</sil:url>
            </sil:font>
            <sil:font name="Noto Sans">
                <sil:url>https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf</sil:url>
            </sil:font>
            <sil:font name="Noto Serif">
                <sil:url>https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSerif/NotoSerif-Regular.ttf</sil:url>
            </sil:font>
            <sil:kbd id="basic_kbdla" type="kmp">
                <sil:url draft="generated">https://keyman.com/go/keyboard/basic_kbdla/download/kmp</sil:url>
            </sil:kbd>
            <sil:sampletext type="udhr">
                <sil:url>http://efele.net/udhr/d/udhr_spa.txt</sil:url>
            </sil:sampletext>
        </sil:external-resources>
    </special>
</ldml>
```

This is not an all-inclusive list of the potential elements that could be included in an LDML file, nor a complete representation of the actual file for Spanish in the CLDR or SLDR. Rather, it is an example of the formatting and some of the more easily-recognized information within, such as names of languages in said language (locale display names), an alphabet (exemplar characters), sort order (collation), and special elements unique to the SLDR. 

Note that I also added the traditional separated 'LL' back into this example for the purpose of demonstration. It is no longer present as a separate multigraph in the current version of the CLDR. 

## The Building Blocks of LDML

This page will assume you understand how to write and use XML files. If you are unfamiliar with this markup language, [W3Schools' XML Tutorial](https://www.w3schools.com/xml/xml_whatis.asp) is an excellent place to start.

The list of elements, their child elements, and attributes used in an LDML file is found in the `ldml.dtd`. The SLDR has its own `sil.dtd` with some additional SLDR-specific elements, which are listed under "special". Both of these files can be found in the [auxdata][dtds] folder of the SLDR. 

This next section will not explain in-detail all of the different elements of an LDML file. Rather, it will link to the specific sections of UTS #35 that explain each element for your own reference. 

- [Identity](https://unicode.org/reports/tr35/#Identity_Elements)
- [Locale Display Names](https://unicode.org/reports/tr35/tr35-general.html#Display_Name_Elements)
- [Layout](https://unicode.org/reports/tr35/tr35-general.html#Layout_Elements)
- [Characters](https://unicode.org/reports/tr35/tr35-general.html#Character_Elements)
- [Delimiters](https://unicode.org/reports/tr35/tr35-general.html#Character_Elements)
- [Measurement](https://unicode.org/reports/tr35/tr35-general.html#Measurement_System_Data)
- [Dates](https://unicode.org/reports/tr35/tr35-dates.html#Overview_Dates_Element_Supplemental)
- [Numbers](https://unicode.org/reports/tr35/tr35-numbers.html)
- [Units](https://unicode.org/reports/tr35/tr35-general.html#Unit_Elements)
- [List Patterns](https://unicode.org/reports/tr35/tr35-general.html#ListPatterns)
- [Collations](https://www.unicode.org/reports/tr35/tr35-collation.html)
- [Posix](https://unicode.org/reports/tr35/tr35-general.html#POSIX_Elements)
- [Character Labels](https://unicode.org/reports/tr35/tr35-general.html#Character_Labels)
- [Segmentations](https://unicode.org/reports/tr35/tr35-general.html#Segmentations)
- [Rule-Based Number Formatting](https://unicode.org/reports/tr35/tr35-numbers.html#Rule-Based_Number_Formatting)
- [Typographic Names](https://unicode.org/reports/tr35/tr35-general.html#Typographic_Names)
- [Person Names](https://unicode.org/reports/tr35/tr35-personNames.html)
- [Annotations](https://unicode.org/reports/tr35/tr35-general.html#Annotations)
- [Metadata](https://unicode.org/reports/tr35/tr35-info.html#Metadata_Elements)
- References: Deprecated, but still referenced in the DTDs
- Special

Of the elements listed above, a handful benefit from a more in-depth description on this site:

### Identity

The "identity" element contains information about the locale described in the LDML file. The most important child elements are "language", "script", "territory", "variant", and the SLDR-specific "special/sil:identity". 

Not all of these elements are required. Only the elements used in the locale's minimal langtag are included. For example, in the file `enq.xml`, only the language element will be included. In the file `sat_Deva_IN`, the language ("sat"), script ("Deva"), and territory ("IN") elements will all be included. 

The sil:identity element is the child of a "special" element within the identity element. It contains attributes for the script and region of the locale, regardless of their inclusion in the previous elements. In addition, it contains a "source" attribute that indicates whether the file was imported from the CLDR. If there is no "source" attribute in the sil:identity element, the file is unique to the SLDR. Finally, an optional "draft" attribute will indicate the draft status of the file, which is explained in more depth in the ["Draft Attributes"](https://writingsystems.info/topics/writingsystems/ldml/#draft-attributes) section of this page. 

### Locale Display Names

Locale Display Names are translations of words related to displaying information about a locale. Specifically, these are translations of the names of languages, countries, regions, language variants, number systems, calendar systems, and measurement systems. It also contains vocabulary used to describe the information contained within an LDML file, such as words for "language", "script", "territory", "collation", "currency", etc. 

All of this information allows for someone looking for the correct locale to read and understand it. After all, if you only speak English and are looking for an English setting on a Chinese phone, the word "英语" wouldn't help you to find the English setting! 

It's important that all information within the Locale Display Names element is in the language and script used by the locale in question. For example, the file `ff_Adlm.xml` (Pulaar written in Adlam script) would contain the line `<language type="ff">𞤆𞤵𞤤𞤢𞤪</language>` (AKA the language 'ff' is called "𞤆𞤵𞤤𞤢𞤪"), rather than "Pulaar" as it is spelled by those who use Latin script to write the language. If anything within this element uses a different script or language from the locale the file is named for, something is wrong. 

In the SLDR, the most important piece of information needed for the Locale Display names is the autonym (the name and spelling of the language used by the locale). For example, in the Spanish example above, that would be "Español". 

Many SLDR files also have a child element under Locale Display Names, called `special/sil:names/sil:name`, which contains the name of the locale used in SIL's internal systems for categorization purposes. For example, here is what this child element looks like in the SLDR file `pkr.xml`.

```
<special>
    <sil:names>
        <sil:name xml:lang="en">Kurumba, Attapady</sil:name>
    </sil:names>
</special>
```

### Characters

The Characters element primarily consists of multiple child elements called "exemplarCharacters", often simply called "Exemplars". These exemplars are lists of characters used for different contexts in the locale. These contexts are "main" (sometimes also called "standard"; it's the exemplar without a 'type' attribute), "auxiliary", "index", "numbers", and "punctuation". 

While there are other child elements contained within the "Characters" element, these are the most important, and will be the focus of this section. 

***Main***

The "main exemplar" is the list of characters used consistently within the locale. For example, the main exemplar in an LDML file for English would contain the standard 26 letters of the English alphabet, a-z, while the one for Spanish would also contain all of the diacritic characters used in Spanish, such as "á", "ñ", etc. Correct alphabetical order technically does not matter, but is HEAVILY encouraged. All characters should be lowercase. 

Ideally, every character-diacritic combination possible should be listed individually. For example, Spanish should contain "a á e é i í n ñ o ó u ú ü" instead of "a e i n o u \u0301 \u0303 \u0308". This rule is not always consistently reflected within the files of the SLDR and CLDR, but should be considered "good practice". 

Similarly, multigraphs, such as the Spanish "ll", are sometimes included as separate entries, but this is not always consistent. Some files only list separate multigraphs that contain characters that do not appear by themselves. For example, many languages do not use "h" except for in the multigraph "ch". Ideally, {ch} would be listed in the main exemplar, while the solo "h" would be left out of the main and listed in the "auxiliary" exemplar instead. Some of these files do simply list "h" as an entry in the main exemplar anyway, but, like with diacritics, the other method is considered "better practice".  

The above two practices regarding combining diacritics and multigraphs are ignored in cases where there are a huge amount of potential combinations, such as with Indic mantras. In those cases, they are listed separately. 

***Auxiliary***

The "auxiliary exemplar" is the list of characters that appear sometimes within the locale, but rarely. This can include characters from loanwords, such as the "ç" in the word "façade", or characters that may need to be represented when writing foreign names, such as the "å" used in many Danish names. Like the main exemplar, all characters should be lowercase and alphabetical order is encouraged, but not necessarily required. If a character appeared in the main exemplar, it cannot also appear in the auxiliary exemplar, and vice versa. 

Here are a few good rules of thumb to determine if a character should be in the auxiliary instead of the main exemplar:

- The character cannot be typed using the default keyboards used in this locale.
- The character is not taught or represented in primers or other literacy material.
- The loanwords using this character have alternate spellings that replace the character for one in the main exemplar (e.g. "facade" and "naive" are both acceptable English spellings of "façade" and "naïve").
- The character is an alternative codepoint used interchangeably with a codepoint already featured in the main exemplar.
  - This most often occurs with word-forming apostrophes, which are often used to represent the glottal stop sound ⟨ʔ⟩ and are NOT punctuation. Different apostrophe shapes are often used interchangeably by different writers of the language, often using whichever is most easily typed on their local keyboard. For example, different people might use `'` (U+0027) and `’` (U+2019) and `ꞌ` (U+A78C) and `ʼ` (U+02BC) to mean the same thing, not realizing that the computer sees them all as completely different. The main exemplar shouldn't contain multiple versions of the same character, so alternative versions are sometimes placed in the auxiliary instead. 

***Index***

The "index exemplar" is the list of characters one might use to categorize and sort an indexed list, such as a dictionary or glossary. Unlike the other exemplars, the index exemplar MUST be in the correct alphabetical order. 

All characters in the index exempar must be uppercase versions of characters that appeared in the main or auxiliary exemplars, but not every character in the main exemplar necessarily belongs in the index exemplar. For example, Spanish dictionaries typically do not separate "a" from "á", resulting in "á appearing in the main exemplar, but "Á" being absent from the index exemplar. 

On the other hand, a character from the auxiliary exemplar may need to be represented in the index as well. For example, if "v" is technically a loan character that only appears twice, but those two instances happen to be the first letter of the word (e.g. "vino" (wine) appears in a lot of languages in areas with a history of Spanish colonialism that otherwise don't use "v"), then that "v" from the auxiliary exemplar needs to be listed in the index exemplar as "V". 

Multigraphs that are common enough to be used as distinct characters for sorting purposes would usually be featured in the index exemplar as well, depending on how prevelent they are. Spanish used to sort words starting with "LL" separately from words starting with "L", so "{LL}" would be listed in the index exemplar to reflect this. Many languages separate "c" from "ch", or "g" from "gb".  

The easiest way to find which characters would be featured in an index exemplar is to track down a large dictionary in the locale and look at the table of contents. Just make sure that whoever published the dictionary wasn't accidentally using the default sorting methods used by a nearby majority language, such as English or Spanish.

***Numbers***

The "numbers exemplar" is fairly self-explanatory; it contains the characters used for mathematics. This includes digits and basic mathematical symbols, but does NOT include units or currency symbols, which are located elsewhere in an LDML file. There may be some overlap with the "punctuation exemplar". 

***Punctuation***

As the name implies, the "punctuation exemplar" contains the characters used for punctuation in the locale. This is the exemplar that is most likely to need careful escaping (see the sub-section "Escaping" under ["Formatting Text in an Exemplar"][escaping] below).

While this may overlap with the numbers exemplar, it CANNOT overlap with any of the other exemplars. This is again important for languages that use word-forming apostrophes to represent the glottal stop sound. Thankfully, most languages that do use an apostrophe in this way will distinguish its punctuation apostrophes with a different shape or format entirely, but unfortunately not all of them do so. 

### Dates

The Dates element contains the vocabulary and patterns used to speak about time and date. It consists of three main child elements: calendars, fields, and timeZoneNames. 

***Calendar Elements***

The calendars element contains vocabulary and formatting conventions relating to how time and date are described in different world calendars. It consists of multiple "calendar" child elements, each with a type attribute describing the specific calendar (i.e. "gregorian", "buddhist", "islamic", etc.) These calendar elements then have their own child elements with the vocabulary and formatting patterns related to that calendar. 

It's important to note that "gregorian" and "generic" usually contain the same data, except "generic" contains eras alongside years. "Generic" is mainly used to provide a consistent set of date formats for locales that don't use gregorian as their primary calendar. This means that you should consider the calendar element with the "gregorian" type as the default for locales that use it as their main calendar, and "generic" as secondary. 

Vocabulary in a calendar element is fairly straightforward. Months and quarters are identified with number values (i.e. 1 = January, 2 = February, etc.). However, since there is no universally accepted "start" of the week, days of the week are identified with short strings reflecting their English names (i.e. sun = Sunday, mon = Monday, etc.). Different formats of these terms will also be included, such as abbreviated versions (Sun, Mon, Tue, Wed, Thu, Fri, Sat), narrow single-letter versions (S, M, T, W, T, F, S), short versions that are even shorter than the abbreviated ones (Su, Mo, Tu, We, Th, Fr, Sa), and the wide versions that spell the whole word (Sunday, Monday, etc). 

For more information on how vocabulary is entered into a calendar element, see the [section on Calendar elements in UTS #35](https://unicode.org/reports/tr35/tr35-dates.html#Calendar_Elements)

The most complicated part of a calendar element are the "formats". These describe the conventions of writing out a date or time in different contexts. For example, is January 30th, 2025 written with the month first as 01/30/2025 or with the day first as 30/01/2025? Is the time two hours before midnight written as 10:00pm or 22:00? 

The way these date and time patterns are notated in an LDML file is described in the [Date Format Patterns section of UTS#35](https://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns). That page contains a [substantial table](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) describing what each piece of shorthand means. For a sneak peek at how month patterns might be notated:
- M means writing the month using the minimum number of digits, such as using '9' for September
- MM means writing the month using two digits no matter what, such as using '09' for September
- MMM means using the abbreviated form of the month's name, such as using 'Sep' for September
- MMMM means using the full "wide" name of the month, such as using 'September' for September
- MMMMM means using the narrow form of the month's name, such as using 'S' for September

As you can see, this gets pretty complicated. Time adds an additional layer of complexity in the form of casing, as an uppercase 'H' is used to notate 24-hour time, while a lowercase 'h' is used to notate 12-hour time. My recommendation would be to reference the chart linked above as often as possible to avoid confusion when entering date and time format data into an LDML file manually. 

***Calendar Fields***

The fields element contains vocabulary describing parts of a calendar and other words or phrases related to describing dates and times, such as "yesterday", "week", "n hour(s) ago", "day after tomorrow", etc. For more information and examples, see the [section on Calendar Fields in UTS #35.](https://unicode.org/reports/tr35/tr35-dates.html#Calendar_Fields)

***Time Zone Names***

The timeZoneNames element, as the name implies, contains vocabulary used to describe different time zones. This includes names that change based on daylight savings time ("Pacific Standard Time" for UTC-8 versus "Pacific Daylight Time" for UTC-7), the generic name ("Pacific Time"), abbreviations for all three terms ("PST", "PDT", "PT"), and an example city used as a reference point ("San Francisco"). For more information, see the [section on Time Zone Names in UTS #35](https://unicode.org/reports/tr35/tr35-dates.html#Time_Zone_Names).

### Collations

Collation is the process of defining the sort order used for strings of characters within a given locale. For example, English collations sorts A, then B, then C, etc. The collations element defines these rules within an LDML file. 

A "tailored" collation is a sort order that differs from the [Default Unicode Collation Element Table (DUCET)](https://www.unicode.org/reports/tr10/#Default_Unicode_Collation_Element_Table) inherited from `root.xml` (see the section on [Inheritance][inheritance] below). In order to tailor a collation, arrows are used to "insert" specific characters or multigraphs after other characters. For example:

```
    <collations>
        <collation type="standard">
            <cr><![CDATA[
                &L < ll <<< Ll <<< LL
                &N < ñ <<< Ñ
            ]]></cr>
        </collation>
    </collations>
```

In the collation above, "ll" now comes after "L" and "ñ" now comes after "N". Note that, for the multigraph "ll", this means that any instances of "ll" will be sorted as if it were a distinct letter from "l"; i.e. the word "llamar" would be sorted after the word "luna". 

There are three levels of collation tailoring, as described in [Unicode Technical Report #10](https://www.unicode.org/reports/tr10/#Tailoring). Each level is marked with the number of arrows between two sets of characters. Level 1 collation is what comes to mind when one thinks of sort order, and is marked with one arrow (`&A < b`). Level 3 is used for capitalization, with lowercase before uppercase, and is marked with three arrows (`&A < b <<< B`). Level 2 is used for characters that are often left unsorted as part of the character that they follow, usually used for diacritics. For example, `&A << ä` means that "ä" is not sorted separately from "a" most of the time, but if someone *wanted* to also sort these diacritic marks, they could use the secondary sort strength to do so. 

If a multigraph is in a tailored collation, it is good practice to include the full lowercase, titlecase, and full uppercase combinations in your level 3 tailoring. For example, the multigraph "NGB" would look like `&N < ngb <<< Ngb <<< NGB`. Other combinations of upper and lowercase are not necessary, as they are unlikely to appear in practical use. 

A line of tailored collation can be as long as needed, so long as the next "jump" is on a new line. For example, this is a tentative collation written for `avu.xml` (Avokaya):

```
    <collations>
        <collation type="standard">
            <cr draft="tentative"><![CDATA[
                &B < ꞌb <<< ꞌB
                &D < ꞌd <<< ꞌD < dr <<< Dr <<< DR
                &G < gb <<< Gb <<< GB
                &K < kp <<< Kp <<< KP
                &M < mb <<< Mb <<< MB < mv <<< Mv <<< MV
                &N < nd <<< Nd <<< ND < ndr <<< Ndr <<< NDR < ng <<< Ng <<< NG < ngb <<< Ngb <<< NGB < nj <<< Nj <<< NJ < ny <<< Ny <<< NY < ŋ <<< Ŋ
                &T < tr <<< Tr <<< TR
                &W < ꞌw <<< ꞌW
                &Y < ꞌy <<< ꞌY
                &Z < ꞌ
            ]]></cr>
        </collation>
    </collations>
```

Note that multiple additions after N are listed in the same line, since they all follow in a sequence. There is no reason to make a new line stating `&ND < ndr` when "ND" is already listed at the end of the previous line. 

For more information, see the [Unicode Sort Tailoring: Tutorial](https://scriptsource.org/entry/pnrnlhkrq9) and [Resources](https://scriptsource.org/entry/lcepuup9ga) on ScriptSource.

***Simple Collations***

SLDR files may also include an element under collation called `special/sil:simple`. This is the format in which sort order is managed for Paratext, Toolbox, and older Flex projects, but they may not always be correct. The SLDR converts these simple collations into the format used in the Unicode Standard, as described above. 

A simple collation looks like the following:
```
    <special>
        <sil:simple>a/A á/Á â/Â ã/Ã 
        b/B
        c/C
        d/D
        e/E é/É ê/Ê ẽ/Ẽ
        f/F
        g/G
        h/H
        i/I í/Í î/Î ĩ/Ĩ
        j/J
        k/K
        l/L
        m/M
        n/N 
        ŋ/Ŋ
        o/O ó/Ó ô/Ô õ/Õ
        p/P
        q/Q
        r/R
        s/S
        t/T
        u/U ú/Ú û/Û ũ/Ũ
        v/V
        w/W
        x/X
        y/Y
        z/Z
        ꞌ</sil:simple>
    </special>
```
As you can see, a simple collation contains a full list of all characters used in the locale. Primary/Level 1 sort levels are indicated by new lines, secondary/Level 2 sort levels are listed in the same line, and teritary/Level 3 (casing) sort levels are marked with a forward slash. 

If a simple collation is included in an SLDR file, it is used for internal reference only. SLDR files do not need a simple collation, nor are they ever written by individuals managing the SLDR. Rather, they are imported from other datasets and used to generate the main collation element or kept for reference. If a simple collation does not match the tailored collation in an LDML file, that likely means that the simple data is being kept "just in case", but that the tailored collation is more likely to be correct. 

### Special

The special element holds a child element called `sil:external-resources`, which contains data that is unique to the SLDR. The SLDR uses this space for external resources related to the locale, such as fonts, keyboards, sample texts, spell-checking, transforms, and wordlists. Of these, fonts, keyboards, and sample texts are the most common, with fonts being a required element of every non-redundant SLDR file. 

***Fonts***

An `sil:font` element can contain a variety of attributes, but the most important ones are "name", "types", "features", and "lang".

```
<sil:font name="Charis" types="default" features="ss04=1 cv43=2 cv68=1 cv77=1 cv90=1">
    <sil:url>https://lff.api.languagetechnology.org/family/charis</sil:url>
</sil:font>
```

The "name" attribute holds the name of the font. 

The "types" attribute lists the context in which the font would be used. Currently, only one value is in use in the "types" attribute: "default", meaning this should be the de-facto font choice if the end user doesn't want to be given multiple options. Multiple fonts can be listed as "default", in which case the first font listed (usually the one with the name that appears earliest in the alphabet) would be treated as the true default by the LFF API.  

The "features" attribute lists any font features that should be active by default when using this font in this locale. For details on what each code means, find the font on the [SIL Font Catalogue][fonts] and click the link for "font features" to see a full list of features supported by that font. Not every font will have features. 

Finally, the "lang" attribute is used to set "language features" used primarily with Arabic fonts to reflect the differences in character shaping between different Arabic-script languages. For example, Scheherazade New supports Urdu, Kurdish, Kyrgyz, Sindhi, Rohingya, and Wolof, and these parameters are set using the "lang" attribute instead of listing several different codes under the "features" attribute. To see differences within the same font using different "lang" attributes, look at the examples on the [Font Features page for the Scheherazade New font][sch features].

In addition, each font entry contains an `sil:url` child element containing the URL for that font. Most of these links, including all SIL fonts, direct to the Language Font Finder (LFF) API. In some cases, however, the link directs to the source of the font, such as the Google Fonts GitHub repository for several Noto fonts. 

***Keyboards***

The `sil:kbd` attribute contains data for keyboards that can be used to type the locale. It contains attributes for "id" and "type" and has a child element `sil:url` that holds the link to the keyboard. 

```
<sil:kbd id="basic_kbdla" type="kmp">
    <sil:url draft="generated">https://keyman.com/go/keyboard/basic_kbdla/download/kmp</sil:url>
</sil:kbd>
```

The "id" attribute, as the name implies, contains the ID of the keyboard. This is not the full name, but rather the string used to identify the keyboard in the URL. For example, the full name of the keyboard with the ID "basic_kbdla" is "Latin American Basic". 

The "type" attribute lists the file type of the keyboard. As of February 2025, all of the keyboards in the SLDR come from Keyman, and therefore all have the type "kmp". 

***Sample Text***

The `sil:sampletext` element contains links to official examples of texts written in the locale. It contains a "type" attribute and has a child element `sil:url` that holds the link to the text. 

```
<sil:sampletext type="udhr">
    <sil:url>http://efele.net/udhr/d/udhr_spa.txt</sil:url>
</sil:sampletext>
```

The "type" attribute lists the category of sample text contained in the link. As of February 2025, all of the sample texts in the SLDR are translated portions of the UDHR (Universal Declaration of Human Rights) and therefore all have the type "udhr". 

## Draft Attributes

Draft attributes are attributes that can be added to any element in an LDML file, and are used to define the level of vetting and confidence given to the data contained within an LDML element. There are two categories of draft attributes: those from the CLDR, and those added for the SLDR. In order, from highest to lowest confidence, they are:
- Approved
- Contributed
- Provisional
- Unconfirmed
- Proposed (SLDR only)
- Tentative (SLDR only)
- Generated (SLDR only)
- Suspect (SLDR only)

CLDR draft attributes, as defined in the section ["Attribute draft" on page 1 of UTS #35](https://www.unicode.org/reports/tr35/#Attribute_draft), listed from least to greatest level of vetting, are "unconfirmed", "provisional", "contributed", and "approved". These are determined through the CLDR's Survey Tool, using the [CLDR Data Submission and Vetting Process](https://cldr.unicode.org/index/process). "Unconfirmed" means that there has been no official vetting done via the Survey Tool for this data. "Provisional" means that there has been some vetting, but not enough for official confirmation. In leu of other data, a locale may choose to use elements labeled as "provisional" until higher-level data is added. "Contributed" is often referred to as "minimally/partially approved" by the CLDR technical committee, while "Approved" means that the information has been completely vetted to the CLDR's standards. If a draft attribute is not indicated anywhere on an element, nor inherited from the file or a parent locale (see [Inheritance][inheritance] below), the draft attribute is assumed to be "Approved".  This is not a perfect system, but it helps the CLDR to make changes while maintaining data stability. 

The SLDR adds three additional levels of vetting. From least to greatest level of confidence, these values are "suspect", "generated", "tentative", and "proposed". The difference between "tentative" and "proposed" is ambiguous, and as a result, these draft attributes are instead often left unused in favor of the CLDR's lowest level "unconfirmed". "Generated", as the name implies, refers to data generated using a primary text, usually a Bible translation project from the Digital Bible Library (DBL), and is automatically assigned to the appropriate elements during the data generation process. "Suspect" is also applied to data that has been generated, but from a process that is less refined and more likely to include errors. This lowest draft level is rarely used anymore, but is preserved for the files that contain old data with this attribute. 

As described in the ["Valid Data" section on page 1 of UST #35](https://unicode.org/reports/tr35/tr35.html#Valid_Data), elements can inherit the draft attributes of parent elements. However, it is considered best practice in the CLDR to specifically list the draft attribute in the leaf/lowest child node, rather than leaving it to inherit from a higher node. 

In the SLDR, a similar concept is applied. All draft attributes must appear in the leaf/lowest child nodes, or else they will disappear during the file normalization process. However, a draft attribute for the entire file can be assigned in the `identity\special\sil:identity` element, described in the ["Identity"](https://writingsystems.info/topics/writingsystems/ldml/#formatting-text-in-collation) section earlier in this page. Below is an example of this element with a draft attribute:

```
    <identity>
        <special>
            <sil:identity script="Latn" defaultRegion="ID" draft="generated"/>
        </special>
    </identity>
```

In the example above, the `sil:identity` has a draft attribute of "generated". This means that the entire file was likely created during a process such as the DBL Import, and all elements within this LDML file should also be considered "generated" unless otherwise marked. All other draft attributes in this file will only need to be marked if they differ from "generated."

It is especially important to note the draft attribute of an SLDR file when making manual changes to the data within. If you make a manual edit to one of these files, you must change the draft attribute of element containing that new data to a higher draft level, such as "unconfirmed". Similarly, if changing an element with a "generated" draft attribute in a file that is otherwise a higher draft level, it is important that one removes the "generated" draft attribute after making manual edits. 

These steps are necessary to prevent future import processes from overriding any changes made to the files. For example, if the DBL import creates a main exemplar from a half-finished Bible translation in 2020, then finds slightly different characters when running the DBL import on the finished text in 2025, one would obviously want the newer, more up-to-date characters to override the older ones. However, if an SLDR curator did manual research and found data describing the new orthography and added it manually in 2024, complete with diacritic combinations, multigraphs, and other details that a simple character counter might not catch, all of that work would be overwritten if they do not mark those changes with a higher draft level. All import processes will not override any data with a draft level above "generated". 

The most common elements to contain a variety of draft attributes in the SLDR are character exemplars and collations. For the latter, make sure that the draft attribute is located in the \<cr> part of the element, and not one of its children, as this is an exception to the "lowest child/leaf node" rule. 

## Inheritance

An individual LDML file may not contain all of the information relevant to that locale if that information is already described in that file's "parent" locale. LDML files will "inherit" data from other files in the CLDR or SLDR. This allows for LDML files to only contain data unique to that locale. 

For example, the file `en.xml` (English in the United States) is the parent locale for any LDML files concerning English spoken in other countries. An LDML file for `en_GB.xml` (English spoken in Great Britain) would be considerably shorter than `en.xml` because it assumes that the file should "inherit" any missing information from the base `en.xml` file. Since English in Great Britain uses the same characters as English in the US, there would be nothing listed for the Characters element, and the file would inherit that information from `en.xml`. However, unlike the United States, Great Britain formats dates with the day before the month (e.g. 31/12/2025 instead of 12/31/2025). As a result, the `en_GB.xml` file would include that information in the Dates element, overriding the information that would have otherwise been inherited from `en.xml`.

At minimum, every locale has at least one parent in the form of `root.xml`. This file is a generic locale that attempts to be as language and territory neutral as possible. Many of the fields within this file are empty or placeholders, such as calling the first month "M01" or listing the main exemplar as "[]" (an empty regex). Due to the nature of the global technical landscape, many of the placeholder values in `root.xml` are in English. As a result, the base file for English, `en.xml`, actually contains less data than many other base language files, as it can inherit much of the information from `root.xml` without needing any changes. 

Due to the existence of `root.xml`, many files have to chain through multiple parents to inherit all of their information. For example, the file for `en_GB.xml` (English spoken in Great Britain) must first fall back to `en.xml`, which in turn falls back to `root.xml`. The information at the top of the chain has priority, but if no data is given for a field by the end of the chain, it all goes back to root. 

Note that, while in the SLDR, elements to be inherited from a parent locale are simply absent from the child locale, the CLDR indicates that an element should inherit data from its parent with three upward-pointing arrows in the element's field, such as:

``` 
<exemplarCharacters>↑↑↑</excemplarCharacters>
```
This is a visual reminder of the inheritance process for human ease-of-use, and is not required.

***Non-Standard Parent Locales***

Unfortunately, identifying a parent file for inheritance is not always as simple as "remove the extra parts of a langtag". Most notably, files do NOT fall back to the file for the base language if they use a different script. For example, the file `ru.xml` (Russian) uses Cyrillic script. The file `ru_Latn.xml` uses Latin script. If `ru_Latn.xml` were to inherit from `ru.xml`, the flattened form of `ru_Latn.xml` would contain inherited data written in Cyrillic, which is not correct. Therefore, `ru_Latn.xml` falls back directly to `root.xml`. 

There is no official term for these unique fallback chains, but for the puroses of this page, I will be refering to them as "non-standard" parent locales. 

There are other reasons for non-standard parent locales beyond script differences. Some files need to fall back to a specific region before the base file, such as the files for Spanish spoken in any Latin American country, which need to first fall back to `es_412.xml` (Spanish spoken in Latin America) before that file falls back to `es.xml` (Spanish spoken in Spain). Some files even fall back to a file using the same script and/or region for a different language: `hi_Latn.xml` (Hindi using Latin Script) falls back to `en_IN.xml` (English spoken in India) instead of `hi.xml` (Hindi spoken in India), while `ht.xml` (Haitain Creole) falls back to `fr_HT.xml` (French spoken in Haiti) instead of inheriting directly from `root.xml`.

The CLDR stores the rules for non-standard parent locales in their supplemental data file, which is described on [page 6 of UTS#35](https://unicode-org.github.io/cldr/ldml/tr35-info.html#Parent_Locales). 

***Flattening***

Regardless of the complexity of the inheritance chain, when referencing an LDML file, it's important to either "flatten" the file or ensure that the parent files are also included in that reference process. "Flattening" an LDML file refers to creating a substancially larger version of a file that explicitly contains any information that is inherited from its parents, rather than leaving those spots empty. 

Full details on inheritance can be found on page 1 of UTS#35, under the heading [Locale Inheritance and Matching](https://unicode-org.github.io/cldr/ldml/tr35.html#Locale_Inheritance).

## Text Formatting Tips

For those who are primarily interacting with the SLDR and the data within, here are some useful tips about text formatting when manually entering and modifying data in an LDML file.

### Formatting Text in an Exemplar

For the most part, the contents of an LDML file follow the standard rules of an XML file. With the exception of collation (see the section on [Formatting Test in a Collation](https://writingsystems.info/topics/writingsystems/ldml/#formatting-text-in-collation) below), the contents within the square brackets (including the square brackets themselves) are Regular Expressions (regexes).

Information about regexes can be found online in a number of places, though not all of it will be relevant to an LDML file. The most important things to know are how to escape non-ASCII characters and how to notate multigraphs and combining diacritics. 

***Escaping***

Escaping in a regex is done by adding a backslash immediately before the character that needs escaping. You can see examples of this in the punctuation exemplar in the example above: the very first character, a hyphen (`\-`), is escaped in this way. Similarly, the backslash listed as a punctuation mark in this list is also escaped by adding a second backslash (`\\`). 

Finally, a handful of characters require the whole character to be replaced with an HTML character reference, such as the ampersand, which is indicated as `\&amp;`. Notice that the escaping backslash is still present. The other two commonly-used character references are `&lt` and `&gt`, aka 'less than' (<) and 'greater than' (>). These do need to be written as their character references in an LDML file, but they do not need to be preceded by an escaping backslash like the ampersand. 

A third situation that uses escaping is Unicode codepoints. If, for whatever reason, it is preferable to reference a character by its Unicode codepoint instead of by typing the actual character, it is written as `\uXXXX`, where 'X' indicates one of the characters in the 4-digit hex code. If the hex code is less than 4 digits long, zeros (0) should be used at the beginning to fill the remaining spaces. If the hex code is longer than 4 digits, it should instead be written as `\UXXXXXXXX`, with 8 total digits, once again with zeros filling in any empty spaces. While the initial 'u' after the backslash is case-sensitive, the characters of the hex code itself are not; `\u00E1` and `\u00e1` are the same. 

For example, 'A' has the unicode codepoint 'U+41', aka 'U+0041'. Therefore, the codepoint would be written as `\u0041`. Similarly, the Miao letter '𖼃' has the unicode codepoint 'U+16F03', so it would be written as `\U00016F03`.  

This is most commonly used when the character will not display nicely when displayed in a coding environment, such as combining diacritics or PUA  characters. It's also sometimes used when working on non-latin scripts, when the person working on the file doesn't have easy access to a keyboard that types the characters and doesn't want to copy-paste for the entire list. The latter use-case isn't necessarily recommended, but it technically works the same either way. 

***Multigraphs and Combining Diacritics***

Multigraphs are an orthographic phenomenon in which two characters put together are treated as one single unit. In an LDML file, these are denoted by surrounding the grouped characters in curly brackets, such as the {LL} in the example at the top of this page. This is important because the spaces between individual characters are only in these lists for human convenience; they do not indicate anything on a codified scale, nor are they required for the LDML file to function properly. To a computer, [s t] and [st] mean the same thing, so if you want to specifically indicate that "st" is a multigraph, you need to enter it as [{st}].  

Note that this is also required for any characters that use combining diacritics. This gets into the territory of Normalization, which is described in far greater detail in [Unicode Technical Standard #15][normalization]. Essentially, some characters with diacritics have their own unique codepoint that is separate from the two individual codepoints for the character and combining diacritic. For example, 'á' is codepoint U+00E1, while 'a' is U+0061 and the combining acute accent is U+0301. In this case, since 'á' has a single codepoint, no brackets are needed. However, in cases where there is no single codepoint for a specific character-diacritic combination, brackets are needed to ensure that the diacritic remains "attached" to its respective character. 

For example, there is no single codepoint for 'a̱'. It consists of 'a' (U+0061) and the combining macron below (U+0331). If left without brackets in an exemplar list, the regex would assume that 'a' and the macron were two separate letters of the alphabet. Written with brackets as '{a̱}', however, causes the regex to treat it as a single unit, just as it would act with 'á'. 

A good rule of thumb if you aren't sure if a diacritic is part of the same codepoint or not: hit the backspace after typing/copying the character. If the diacritic disappears, but the base character remains, the combined character is made of multiple codepoints. If both the base character and diacritic disappear simultaneously, they are already a single unique codepoint. Feel free to try it out with 'á' and 'a̱' right now, if you'd like. Just be sure you understand [normalization][normalization] and ensure that you are using the most composed version of the character possible (i.e. if there is a codepoint such as U+00E1 that combines the character and diacritic, prioritize using the composed one instead of placing two codepoints inside of the curly brackets). 

### Formatting Text in Collation

Tailored coalition follows different formatting rules than most other data found within the text sections of an XML file, particularly in regard to escaping and multigraphs. 

An escaped symbol in a collation is surrounded in single quotation marks/apostrophes, such as `'-'`, with the exception of an apostrophe itself, which is simply denoted by two apostrophes back to back: `''`. 

Multigraphs do not need brackets to mark them as a single unit in a collation sequence, as every unit in a collation sequence is already separated by sets of arrows. Note in the example LDML file above, the various iterations of 'LL' do not have any additional markings surrounding them. 

[normalization]: https://unicode.org/reports/tr15/
<!--- Eventually, the links that direct to UTS15 may link to a dedicated normalization page --->
[uts35]: https://www.unicode.org/reports/tr35/ 
[uts35gen]: https://unicode.org/reports/tr35/tr35-general.html
[dtds]: https://github.com/silnrsi/sldr/tree/master/auxdata
[fonts]: https://software.sil.org/fonts/
[sch features]: https://software.sil.org/scheherazade/features/
[inheritance]: https://writingsystems.info/topics/writingsystems/ldml/#inheritance
[escaping]: https://writingsystems.info/topics/writingsystems/ldml/#formatting-text-in-an-exemplar