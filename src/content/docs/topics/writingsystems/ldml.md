---
title: LDML
sidebar:
    order: 1510
---

# What is LDML?

Locale Data Markup Language (LDML) is an XML format used for locale data. The most prolific user of LDML is the CLDR. 

The specifications for LDML structure are described in [Unicode Technical Standard #35][uts35], though that documentation is quite dense. For that reason, a brief example of an LDML file is depicted below for reference,:

```
<?xml version="1.0" encoding="utf-8"?>
<ldml xmlns:sil="urn://www.sil.org/ldml/0.1">
	<identity>
    	<language type="es"/>
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
    	<exemplarCharacters type="index">[A B C D E F G H I J K L {LL} M N Ñ O P Q R S T U V W X Y Z]</exemplarCharacters>
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
</ldml>
```

This is not an all-inclusive list of the potential elements that could be included in an LDML file, nor a complete representation of the actual file for Spanish in the CLDR. Rather, it is an example of the formatting and some of the more easily-recognized information within, such as names of languages in said language (locale display names), an alphabet (exemplar characters), and sort order (collation). 

Note that I also added the traditional separated 'LL' back into this example for the purpose of demonstration. It is no longer present as a separate multigraph in the current version of the CLDR. 

# The Building Blocks of LDML

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
- [Special]

Of the elements listed above, a handful benefit from a more in-depth description on this site:

### Identity

what file am i? 

### Locale Display Names

vocab relating to the locale (lang, script, region). most important value is the autonym (name of lang in lang AND USING THE CORRECT SCRIPT)

### Characters

exemplar time, dont forget to explain the difference between main, aux, and index

### Dates
oh boy. someone (me) needs to track down the difference between uppercase H and lowercase h again. which one is 24 hr? i never remember.

### Collations

oh boy collation 

### Special

FONT DATA AND KEYBOARDS AND FUN SIL STUFF GOES HERE

# Text Formatting Tips

For those who are primarily interacting with the SLDR and the data within, here are some useful tips about text formatting when manually entering and modifying data in an LDML file.

## Formatting Text in an Exemplar:

For the most part, the contents of an LDML file follow the standard rules of an XML file. With the exception of collation (see below), the contents within the square brackets (including the square brackets themselves) are Regular Expressions (regexes).

Information about regexes can be found online in a number of places, though not all of it will be relevant to an LDML file. The most important things to know are how to escape non-ASCII characters and how to notate multigraphs and combining diacritics. 

### Escaping
Escaping in a regex is done by adding a backslash immediately before the character that needs escaping. You can see examples of this in the punctuation exemplar in the example above: the very first character, a hyphen (`\-`), is escaped in this way. Similarly, the backslash listed as a punctuation mark in this list is also escaped by adding a second backslash (`\\`). 

Finally, a handful of characters require the whole character to be replaced with an HTML character reference, such as the ampersand, which is indicated as `\&amp;`. Notice that the escaping backslash is still present. The other two commonly-used character references are `&lt` and `&gt`, aka 'less than' (<) and 'greater than' (>). These do need to be written as their character references in an LDML file, but they do not need to be escaped. 

A third situation that uses escaping is Unicode codepoints. If, for whatever reason, it is preferable to reference a character by its Unicode codepoint instead of by typing the actual character, it is written as `\uXXXX`, where 'X' indicates one of the characters in the 4-digit hex code. If the hex code is less than 4 digits long, zeros (0) should be used at the beginning to fill the remaining spaces. If the hex code is longer than 4 digits, it should instead be written as `\UXXXXXXXX`, with 8 total digits, once again with zeros filling in any empty spaces. While the initial 'u' after the backslash is case-sensitive, the characters of the hex code itself are not; `\u00E1` and `\u00e1` are the same. 

For example, 'A' has the unicode codepoint 'U+41', aka 'U+0041'. Therefore, the codepoint would be written as `\u0041`. Similarly, the Miao letter '𖼃' has the unicode codepoint 'U+16F03', so it would be written as `\U00016F03`.  

This is most commonly used when the character will not display nicely when displayed in a coding environment, such as combining diacritics or PUA  characters. It's also sometimes used when working on non-latin scripts, when the person working on the file doesn't have easy access to a keyboard that types the characters and doesn't want to copy-paste for the entire list. The latter use-case isn't necessarily recommended, but it technically works the same either way. 

### Multigraphs and Combining Diacritics

Multigraphs are an orthographic phenomenon in which two characters put together are treated as one single unit. In an LDML file, these are denoted by surrounding the grouped characters in curly brackets, such as the {LL} in the example above. This is important because the spaces between individual characters are only in these lists for human convenience; they do not indicate anything on a codified scale, nor are they required for the LDML file to function properly. To a computer, [s t] and [st] mean the same thing, so if you want to specifically indicate that "st" is a multigraph, you need to enter it as [{st}].  

Note that this is also required for any characters that use combining diacritics. This gets into the territory of Normalization, which is described in far greater detail [here][normalization]. Essentially, some characters with diacritics have their own unique codepoint that is separate from the two individual codepoints for the character and combining diacritic. For example, 'á' is codepoint U+00E1, while 'a' is U+0061 and the combining acute accent is U+0301. In this case, since 'á' has a single codepoint, no brackets are needed. However, in cases where there is no single codepoint for a specific character-diacritic combination, brackets are needed to ensure that the diacritic remains "attached" to its respective character. 

For example, there is no single codepoint for 'a̱'. It consists of 'a' (U+0061) and the combining macron below (U+0331). If left without brackets in an exemplar list, the regex would assume that 'a' and the macron were two separate letters of the alphabet. Written with brackets as '{a̱}', however, causes the regex to treat it as a single unit, just as it would act with 'á'. 

A good rule of thumb if you aren't sure if a diacritic is part of the same codepoint or not: hit the backspace after typing/copying the character. If the diacritic disappears, but the base character remains, the combined character is made of multiple codepoints. If both the base character and diacritic disappear simultaneously, they are already a single unique codepoint. Feel free to try it out with 'á' and 'a̱' right now, if you'd like. Just be sure you understand [normalization][normalization] and that you are using the most composed version of the character possible (i.e. if there is a codepoint such as U+00E1 that combines the character and diacritic, prioritize using the composed one instead of placing two codepoints inside of the curly brackets). 

## Formatting Text in Collation

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
