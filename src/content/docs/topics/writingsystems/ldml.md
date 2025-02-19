---
title: LDML
sidebar:
    order: 1510
---

!!!! UNFINISHED. also some of the links dont work yet do not be alarmed by that !!!

### What is LDML?

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
                &L < ll <<< lL <<< Ll <<< LL
                &N < ñ <<< Ñ
            ]]></cr>
        </collation>
    </collations>
    <special>
        <sil:external-resources>
            <sil:font name="Charis SIL" types="default" features="ss04=1 cv43=2 cv68=1 cv77=1 cv90=1">
                <sil:url>https://lff.api.languagetechnology.org/family/charissil</sil:url>
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

This is not an all-inclusive list of the potential elements that could be included in an LDML file, nor a complete representation of the actual file for Spanish in the CLDR. Rather, it is an example of the formatting and some of the more easily-recognized information within, such as names of languages in said language (locale display names), an alphabet (exemplar characters), and sort order (collation). 

Note that I also added the traditional separated 'LL' back into this example for the purpose of demonstration. It is no longer present as a separate multigraph in the current version of the CLDR. 

### The Building Blocks of LDML

!!!!!!!!!! THIS BIT IS UNFINISHED BTW THIS IS A PLACEHOLDER !!!!!!!!!

This page will assume you know how XML files work, otherwise this will become a novel. 

The list of elements, their child elements, and attributes used in an LDML file is found in the `ldml.dtd`. The SLDR has its own `sil.dtd` with some additional SLDR-specific elements, which are listed under "special". Both of these files can be found in the [auxdata][dtds] folder of the SLDR. 

This next section will not explain in-detail the different elements of an LDML file. Rather, it will link to the specific sections of UTS #35 that explain each element for your own reference. 

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

#### Identity

The "identity" element contains information about the locale described in the LDML file. The most important child elements are "language", "script", "territory", "variant", and the SLDR-specific "special/sil:identity". 

Not all of these elements are required. Only the elements used in the locale's minimal langtag are included. For example, in the file `enq.xml`, only the language element will be included. In the file `sat_Deva_IN`, the language ("sat"), script ("Deva"), and territory ("IN") elements will all be included. 

The sil:identity element is the child of a "special" element within the identity element. It contains attributes for the script and region of the locale, regardless of their inclusion in the previous elements. In addition, it contains a "source" attribute that indicates whether the file was imported from the CLDR. If there is no "source" attribute in the sil:identity element, the file is unique to the SLDR. Finally, an optional "draft" attribute will indicate the draft status of the file, which is explained in more depth in the "Draft Attributes" section of this page. 

#### Locale Display Names

Locale Display Names are translations of words related to displaying information about a locale. Specifically, these are translations of the names of languages, countries, regions, language variants, number systems, calendar systems, and measurement systems. It also contains vocabulary used to describe the information contained within an LDML file, such as words for "language", "script", "territory", "collation", "currency", etc. 

All of this information allows for someone looking for the correct locale to read and understand it. After all, if you only speak English and are looking for an English setting on a Chinese phone, the word "英语" wouldn't help you to find the English setting! 

It's important that all information within the Locale Display Names element is in the language and script used by the locale in question. For example, the file `ff_Adlm.xml` (Pulaar written in Adlam script) would contain the line `<language type="ff">𞤆𞤵𞤤𞤢𞤪</language>` (AKA the language 'ff' is called "𞤆𞤵𞤤𞤢𞤪"), rather than "Pulaar" as it is spelled by those who use Latin script to write the language. If anything within this element uses a different script or language from the locale the file is named for, something is wrong. 

In the SLDR, the most important piece of information needed for the Locale Display names is the autonym (the name and spelling of the language used by the locale). For example, in the Spanish example above, that would be "Español". Many SLDR files also have a child element under Locale Display Names, called `special/sil:names/sil:name`, which contains the name of the locale used in SIL's internal systems for categorization purposes. For example, here is what this child element looks like in the SLDR file `pkr.xml`.

```
<special>
    <sil:names>
        <sil:name xml:lang="en">Kurumba, Attapady</sil:name>
    </sil:names>
</special>
```

#### Characters

The Characters element primarily consists of multiple child elements called "exemplarCharacters", often simply called "Exemplars". These exemplars are lists of characters used for different contexts in the locale. These contexts are "main" (sometimes also called "standard", it's the exemplar without a 'type' attribute), "auxiliary", "index", "numbers", and "punctuation". 

While there are other child elements contained within the "Characters" element, these are the most important, and will be the focus of this section. 

***Main***

The "main exemplar" is the list of characters used consistently within the locale. For example, the main exemplar in an LDML file for English would contain the standard 26 letters of the English alphabet, a-z, while the one for Spanish would also contain all of the diacritic characters used in Spanish, such as "á", "ñ", etc. Correct alphabetical order technically does not matter, but is HEAVILY encouraged. All characters should be lowercase. 

Ideally, every character-diacritic combination possible should be listed individually. For example, Spanish should contain "a á e é i í n ñ o ó u ú ü" instead of "a e i n o u \u0301 \u0303 \u0308". This rule is not always consistently reflected within the files of the SLDR and CLDR, but should be considered "good practice". 

Similarly, multigraphs, such as the Spanish "ll", are sometimes included as separate entries, but this is not always consistent. Some files only list separate multigraphs that contain characters that do not appear by themselves. For example, many languages do not use "h" except for in the multigraph "ch". Ideally, {ch} would be listed in the main exemplar, while the solo "h" would be left out of the main and listed in the "auxiliary" exemplar instead. Some of these files do simply list "h" as an entry in the main exemplar anyway, but, like with diacritics, the other method is considered "better practice".  

The above two practices regarding combining diacritics and multigraphs is ignored in cases where there are a huge amount of potential combinations, such as with Indic mantras. In those cases, they are listed separately. 

***Auxiliary***

The "auxiliary exemplar" is the list of characters that appear sometimes within the locale, but rarely. This can include characters from loanwords, such as the "ç" in the word "façade", or characters that may need to be represented when writing foreign names, such as the "å" used in many Danish names. Like the main exemplar, all characters should be lowercase and alphabetical order is encouraged, but not necessarily required. If a character appeared in the main exemplar, it cannot also appear in the auxiliary exemplar, and vice versa. 

Here are a few good rules of thumb to determine if a character should be in the auxiliary instead of the main exemplar:

- The character cannot be typed using the default keyboards used in this locale.
- The character is not taught or represented in primers or other literacy material.
- The loanwords using this character have alternate spellings that replace the character for one in the main exemplar (e.g. "facade" and "naive" are both acceptable English spellings of "façade" and "naïve").
- The character is an alternative codepoint used interchangably with a codepoint already featured in the main exemplar.
  - This most often occurs with word-forming apostrophes, which are often used to represent the glottal stop sound ⟨ʔ⟩ and are NOT punctuation. Different apostrophe shapes are often used interchangably by different writers of the language, often using whichever is most easily typed on their local keyboard. For example, different people might use `'` (U+0027) and `’` (U+2019) and `ꞌ` (U+A78C) and `ʼ` (U+02BC) to mean the same thing, not realizing that the computer sees them all as completely different. The main exemplar shouldn't contain multiple versions of the same character, so alternative versions are sometimes placed in the auxiliary instead. 

***Index***

The "index exemplar" is the list of characters one might use to categorize and sort an indexed list, such as a dictionary or large alphebetized list. Unlike the other exemplars, the index exemplar MUST be in the correct alphabetical order. 

All characters in the index exempar must be uppercase versions of characters that appeared in the main or auxiliary exemplars, but not every character in the main exemplar necessarily belongs in the index exemplar. For example, Spanish dictionaries typically do not separate "a" from "á", so while "á appears in the main exemplar, "Á" does not appear in the index exemplar. 

If "v" is technically a loan character that only appears twice, but those two instances happen to be the first letter of the word (e.g. "vino" (wine) appears in a lot of languages in areas with a history of Spanish colonialism that otherwise don't use "v"), then that "v" from the auxiliary exemplar needs to be listed in the index exemplar as "V". 

Multigraphs that are common enough to be used as distinct characters for sorting purposes would usually be featured in the index exemplar as well, depending on how prevelent they are. Spanish used to sort words starting with "LL" separately from words starting with "L", so "{LL}" would be listed in the index exemplar to reflect this. Many languages separate "c" from "ch", or "g" from "gb".  

The easiest way to find which characters would be featured in an index exemplar is to track down a large dictionary in the locale and look at the table of contents. Just make sure that whoever published the dictionary wasn't accidentally using the default sorting methods used by a nearby majority language, such as English or Spanish.

***Numbers***

The "numbers exemplar" is fairly self-explanatory; it contains the characters used for mathematics. This includes digits and basic mathematical symbols, but does NOT include units or currency symbols, which are located elsewhere in an LDML file. There may be some overlap with the "punctuation exemplar". 

***Punctuation***

As the name implies, the "punctuation exemplar" contains the characters used for punctuation in the locale. This is the exemplar that is most likely to need careful escaping (see "escaping" in "Formatting Text in an Exemplar" below).

While this may overlap with the numbers exemplar, it CANNOT overlap with any of the other exemplars. This is again important for languages that use word-forming apostrophes to represent the glottal stop sound. Thankfully, most languages that do use an apostrophe in this way will distinguish its punctuation apostrophes with a different shape or format entirely, but unfortunatly not all of them do so. 

#### Dates

The Dates element contains the vocabulary and patterns used to speak about time and date. It consists of three main child elements: calendars, fields, and timeZoneNames. 

***Calendar Elements***

The calendars element contains vocabulary and formatting conventions relating to how time and date are described in different world calendars. It consists of multiple "calendar" child elements, each with a type attribute describing the specific calendar (i.e. "gregorian", "buddhist", "islamic", etc.) These calendar elements then have their own child elements with the vocabulary and formatting patterns related to that calendar. 

It's important to note that "gregorian" and "generic" usually contain the same data, except "generic" contains eras alongside years. "Generic" is mainly used to provide a consistent set of date formats for locales that don't use gregorian as their primary calendar. This means that you should consider the calendar element with the "gregorian" type as the default for locales that use it as their main calendar, and "generic" as secondary. 

Vocabulary in a calendar element is fairly straightforward. Months and quarters are identified with number values (i.e. 1 = January, 2 = February, etc.). However, since there is no universally accepted "start" of the week, days of the week are identified with short strings reflecting their English names (i.e. sun = Sunday, mon = Monday, etc.). Different formats of these terms will also be included, such as abbreviated versions (Sun, Mon, Tue, Wed, Thu, Fri, Sat), narrow single-letter versions (S, M, T, W, T, F, S), short versions that are even shorter than the abbreviated ones (Su, Mo, Tu, We, Th, Fr, Sa), and the wide versions that spell the whole word (Sunday, Monday, etc). 

For more information on how vocabulary is entered into a calendar element, see the [section on Calendar elements in UTS #35](https://unicode.org/reports/tr35/tr35-dates.html#Calendar_Elements)

The most complicated part of a calendar element are the "formats". These describe the conventions of writing out a date or time in different contexts. For example, is January 30th, 2025 written with the month first as 01/30/2025 or with the day first as 30/01/2025? Is the time two hours before midnight written as 10:00pm or 22:00? 

The way these date and time patterns are notated in an LDML file is described in the [Date Format Patterns section of UTS#35](https://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns). That page contains a [substancial table](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) describing what each piece of shorthand means. For a sneak peek at how month patterns might be notated:
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

#### Collations

oh boy collation 

#### Special

FONT DATA AND KEYBOARDS AND FUN SIL STUFF GOES HERE

### Draft Attributes

current draft (haha) of this section is very messy word dump but it gets the information down until i double check and clean it up

You have the big boy whole file draft attribute at the top in the sil:identity thingy. this determines the default draft attribute for everything on the file. If an element has no draft attribute, it is considered to be the same draft attribute as the draft attribute here. if there is no draft attribute in the sil:identity thingy, it defaults to... ummm... "approved" i think. lemme double check that. 

There are 5 layers of draft: approved provisional/contributed unconfirmed tentative generated. i cant remember if 2 is technically provisional or contributed. not sure. technically i think contributed is better than provisional. for context of sldr the important ones are approved tentative/unconfirmed and generated. 

If a file has "generated" in its sil:identity draft attribute, and you make a manual edit to the data within that file, you need to add a draft attribute to the element you've edited that is a rank ABOVE generated. This can be "tentative" or "unconfirmed". Otherwise, your manual edits will be overwritten the next time the file is generated from whatever source it comes from (most likely the DBL). The "tentative"/"unconfirmed" draft attribute tells the file generation to prioritize the existing data rather than generate new stuff, since the manually-entered data is considered more likely to be correct than the generated data. 

Technically you only need to do this for data that would get generated from a dbl import, aka exemplars and collation and maybe a few other things i need to double check. however in theory someday there might be other things we generate in which case other elements might need these draft attributes too. 

Make sure the draft attribute for a collation element is located in the \<cr> part of the element, and not one of its children. Otherwise it won't work. 

### Text Formatting Tips

For those who are primarily interacting with the SLDR and the data within, here are some useful tips about text formatting when manually entering and modifying data in an LDML file.

#### Formatting Text in an Exemplar:

For the most part, the contents of an LDML file follow the standard rules of an XML file. With the exception of collation (see below), the contents within the square brackets (including the square brackets themselves) are Regular Expressions (regexes).

Information about regexes can be found online in a number of places, though not all of it will be relevant to an LDML file. The most important things to know are how to escape non-ASCII characters and how to notate multigraphs and combining diacritics. 

***Escaping***

Escaping in a regex is done by adding a backslash immediately before the character that needs escaping. You can see examples of this in the punctuation exemplar in the example above: the very first character, a hyphen (`\-`), is escaped in this way. Similarly, the backslash listed as a punctuation mark in this list is also escaped by adding a second backslash (`\\`). 

Finally, a handful of characters require the whole character to be replaced with an HTML character reference, such as the ampersand, which is indicated as `\&amp;`. Notice that the escaping backslash is still present. The other two commonly-used character references are `&lt` and `&gt`, aka 'less than' (<) and 'greater than' (>). These do need to be written as their character references in an LDML file, but they do not need to be escaped. 

A third situation that uses escaping is Unicode codepoints. If, for whatever reason, it is preferable to reference a character by its Unicode codepoint instead of by typing the actual character, it is written as `\uXXXX`, where 'X' indicates one of the characters in the 4-digit hex code. If the hex code is less than 4 digits long, zeros (0) should be used at the beginning to fill the remaining spaces. If the hex code is longer than 4 digits, it should instead be written as `\UXXXXXXXX`, with 8 total digits, once again with zeros filling in any empty spaces. While the initial 'u' after the backslash is case-sensitive, the characters of the hex code itself are not; `\u00E1` and `\u00e1` are the same. 

For example, 'A' has the unicode codepoint 'U+41', aka 'U+0041'. Therefore, the codepoint would be written as `\u0041`. Similarly, the Miao letter '𖼃' has the unicode codepoint 'U+16F03', so it would be written as `\U00016F03`.  

This is most commonly used when the character will not display nicely when displayed in a coding environment, such as combining diacritics or PUA  characters. It's also sometimes used when working on non-latin scripts, when the person working on the file doesn't have easy access to a keyboard that types the characters and doesn't want to copy-paste for the entire list. The latter use-case isn't necessarily recommended, but it technically works the same either way. 

***Multigraphs and Combining Diacritics***

Multigraphs are an orthographic phenomenon in which two characters put together are treated as one single unit. In an LDML file, these are denoted by surrounding the grouped characters in curly brackets, such as the {LL} in the example above. This is important because the spaces between individual characters are only in these lists for human convenience; they do not indicate anything on a codified scale, nor are they required for the LDML file to function properly. To a computer, [s t] and [st] mean the same thing, so if you want to specifically indicate that "st" is a multigraph, you need to enter it as [{st}].  

Note that this is also required for any characters that use combining diacritics. This gets into the territory of Normalization, which is described in far greater detail [here][normalization]. Essentially, some characters with diacritics have their own unique codepoint that is separate from the two individual codepoints for the character and combining diacritic. For example, 'á' is codepoint U+00E1, while 'a' is U+0061 and the combining acute accent is U+0301. In this case, since 'á' has a single codepoint, no brackets are needed. However, in cases where there is no single codepoint for a specific character-diacritic combination, brackets are needed to ensure that the diacritic remains "attached" to its respective character. 

For example, there is no single codepoint for 'a̱'. It consists of 'a' (U+0061) and the combining macron below (U+0331). If left without brackets in an exemplar list, the regex would assume that 'a' and the macron were two separate letters of the alphabet. Written with brackets as '{a̱}', however, causes the regex to treat it as a single unit, just as it would act with 'á'. 

A good rule of thumb if you aren't sure if a diacritic is part of the same codepoint or not: hit the backspace after typing/copying the character. If the diacritic disappears, but the base character remains, the combined character is made of multiple codepoints. If both the base character and diacritic disappear simultaneously, they are already a single unique codepoint. Feel free to try it out with 'á' and 'a̱' right now, if you'd like. Just be sure you understand [normalization][normalization] and ensure that you are using the most composed version of the character possible (i.e. if there is a codepoint such as U+00E1 that combines the character and diacritic, prioritize using the composed one instead of placing two codepoints inside of the curly brackets). 

#### Formatting Text in Collation

Collation and Sorting is a complex enough topic to require a separate page on this site, found [here][collation]. However, for the sake of this article, it should be noted that tailored coalition follows different formatting rules than most other data found within the text sections of an XML file, particularly in regard to escaping and multigraphs. 

An escaped symbol in a collation is surrounded in single quotation marks/apostrophes, such as `'-'`, with the exception of an apostrophe itself, which is simply denoted by two apostrophes back to back: `''`. 

Multigraphs do not need brackets to mark them as a single unit in a collation sequence, as every unit in a collation sequence is already separated by sets of arrows. Note in the example LDML file above, the various iterations of 'LL' do not have any additional markings surrounding them. 

[normalization]: ../../encoding/normalization 
<!--- not actually a page yet, link may change :P --->
[collation]: ../collation
<!--- not actually a page yet, link may change :P --->
[uts35]: https://www.unicode.org/reports/tr35/ 
[uts35gen]: https://unicode.org/reports/tr35/tr35-general.html
[dtds]: https://github.com/silnrsi/sldr/tree/master/auxdata
