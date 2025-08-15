---
title: Unicode Concepts
description: Fundamental ideas and definitions for understanding Unicode
sidebar:
    order: 3300
lastUpdated: 2025-08-07
---

[Encoding][glo-encoding] refers to the process of representing information in some form. In computer systems, we encode written language by representing the [graphemes][glo-grapheme] or other **text elements** of the writing system in terms of sequences of [characters][glo-character], units of textual information within some system for representing written texts. These characters are in turn represented within a computer in terms of the only means of representation the computer knows how to work with: binary numbers.

A [character set encoding][glo-character-set-encoding] (or **character encoding**) is such a system for doing this. Any character set encoding involves at least these two components: a set of characters and some system for representing these in terms of the processing units used within the computer. 

Unicode is a standard encoding which is being developed to have a universal character set that covers all of the scripts in the world.

## Codepoints and the Unicode codespace

The Unicode coded character set is coded in terms of integer values, which are referred to in Unicode as **Unicode scalar values** (USVs). By convention, Unicode codepoints are represented in hexadecimal notation with a minimum of four digits and preceded with “U+”; so, for example, “U+0345”, “U+10345” and “U+20345”. Also by convention, any leading zeroes above four digits are suppressed; thus we would write “U+0456” but not “U+03456”.

Every character in Unicode can be uniquely identified by its codepoint, or also by its name. Unicode character names use only ASCII characters and by convention are written entirely in upper case. Characters are often referred to using both the codepoint and the name; e.g. U+0061 LATIN SMALL LETTER A. In discussions where the actual characters are unimportant or are assumed to be recognisable using only the codepoints, people will often save space and use only the codepoints. Also, in informal contexts where it is clear that Unicode codepoints are involved, people will often suppress the string “U+”. For clarity, this document will continue to use “U+”.

The Unicode codespace ranges from U+0000 to U+10FFFF. Borrowing terminology from ISO/IEC 10646, the codespace is described in terms of 17 [planes][glo-plane] of 64K codepoints each. Thus, Plane 0 includes codepoints U+0000..U+FFFF, Plane 1 includes codepoints U+10000..U+1FFFF, etc.

In the original design of Unicode, all characters were to have codepoints in the range U+0000..U+FFFF. In keeping with this, Plane 0 was set apart as the portion of the codespace in which all of the most commonly used characters were encoded, and is designated the **Basic Multilingual Plane** (BMP). The remainder of the codespace, Planes 1 to 1610, are referred to collectively as the **Supplementary Planes**. As space ran out in the BMP, not only ancient scripts, but modern characters and scripts have been encoded in the Supplementary Multilingual Plane (SMP).

There are gaps in the Unicode codespace: codepoints that are permanently unassigned and reserved as non-characters. These include the last two codepoints in each plane, U+*n*FFFE and U+*n*FFFF (where *n* ranges from 0 to 10<sub>16</sub>). These have always been reserved, and characters will never be assigned at these codepoints. One implication of this is that these codepoints are available to software developers to use for proprietary purposes in internal processing. Note, however, that care must be taken not to transmit these codepoints externally.

Unassigned codepoints can be reserved in a similar manner at any time if there is a reason for doing so. This has been done specifically in order to make additional codes available to programmers to use for internal processing purposes. Again, these should never appear in data.

<a id='surrogates'></a>There is another special range of 2,048 codepoints that are reserved, creating an effective gap in the codespace. These occupy the range U+D800..U+DFFF and are reserved due to the mechanism used in the UTF-16 encoding form (see [Chapter 2 of the Unicode Standard][uni-ch2-encoding-forms]). In UTF-16, codepoints in the BMP are represented as code units having the same integer value. The code units in the range 0xD800–0xDFFF, serve a special purpose, however. These code units, known as **surrogate code units** (or simply **surrogates**), are used in representing codepoints from Planes 1 to 16. As a result, it is not possible to represent the corresponding codepoints in UTF-16. Hence, these codepoints are reserved.

## Blocks & Extensions

As mentioned above, the Basic Multilingual Plane is intended for those characters that are most commonly used. This implies that the BMP is primarily for scripts that are currently in use, and that other planes are primarily for scripts that are not in current use. This is no longer completely true. As the BMP has filled up, the SMP is also used for modern scripts.

As development of Unicode began, characters were first taken from existing industry standards. For the most part, those included characters used in writing modern languages, but also included a number of commonly used symbols. As these characters were assigned, they were added to the BMP. Assignments to the BMP were done in an organised manner, with some allowances for possible future additions.

The overall organisation of the BMP is illustrated below.

![Organisation of the BMP](images/3300-1-bmp.png "Overall organisation of the BMP")

There are a couple of things to be noted straight away. Firstly, note the range of unused codepoints. This is the range U+D800..U+DFFF that is reserved to allow for the surrogates mechanism in UTF-16, <a href='#surrogates'>as mentioned in the section above</a>.

Secondly, notice the range of codepoints designated “Private Use”. This is a block of codepoints called the [Private Use Area][glo-pua] (PUA). These codepoints are permanently unassigned, and are available for custom use by users or vendors. This occupies the range U+E000..U+F8FF, giving a total of 6,400 private-use codepoints in the BMP. In addition, the last two planes, Plane 15 and Plane 16, are reserved for private use, giving an additional 131,068 codepoints. Thus, there are a total of 137,468 private-use codepoints that are available for private definition. These codepoints will never be given any fixed meaning in Unicode. Any meaning is purely by individual agreement between a sender and a receiver or within a given group of users.

Before commenting further on the characters in the BMP, let us briefly outline the organisation of the supplementary planes. As just mentioned, Planes 15 and 16 are set aside for private use. Prior to TUS 3.1, no character assignments had been made in the supplementary planes. In TUS 3.1, however, a number of characters were assigned to Planes 1, 2 and 14. Plane 1 is being used for modern scripts, characters that need adding for scripts in the BMP and for which there is no more space in the BMP, scripts that are no longer in use, and for large sets of symbols used in particular fields, such as music and mathematics. Plane 2 is set aside for additional Han Chinese characters. Plane 14 is designated for special-purpose characters; for example, characters that are required for use only in certain communications protocols.

In any of the planes, characters are assigned in named ranges referred to as **blocks**. Each block occupies a contiguous range of codepoints, and generally contains characters that are somehow related. Typically, a block contains characters for a given script. For example, the Thaana block occupies the range U+0780..U+07BF and contains all of the characters of the Thaana script.

the Unicode Standard includes a collection of data files that provide detailed information about semantic properties of characters in the Standard that are needed for implementations. These data files are always available from the Unicode Web site. These can be found online: [Unicode Character Database][uni-UCD]. Further information on the [data files is also available on the Unicode web site][uni-data-files].

One of these data files, [Blocks.txt][uni-blocks], lists all of the assigned blocks in Unicode, giving the name and range for each.

While a given language may be written using a script for which there is a named block in Unicode, that block may not contain all of the characters needed for writing that language. Some of the characters for that language’s writing system may be found in other blocks. For example, there are six Cyrillic blocks (U+0400..U+04FF, U+0500..U+052F, U+2DE0..U+2DFF, U+A640..U+A69F, U+1C80..U+1C8F, U+1E030..U+1E08F). However, those blocks do not contain most of the punctuation characters required for writing in Cyrillic. The writing system for a language such as Russian will require punctuation characters in the Basic Latin block (U+0020..U+007F) as well as the General Punctuation block (U+2000..U+206F).

Also, the characters for some scripts are distributed between two or more blocks. For example, the Basic Latin block (U+0020..U+007F) and the Latin 1 Supplement block (U+00A0..U+00FF) were assigned as separate blocks because of the relationship each has to source legacy character sets. There are many other blocks also containing Latin characters. Thus, if you are working with a writing system based on Latin script, you may need to become familiar with all of these various blocks. Fortunately, only a limited number of scripts are broken up among multiple blocks in this manner. There is also a data file, [Scripts.txt][uni-scripts], which identifies exactly which Unicode codepoints are associated with each script. The format and contents of this file are described in [UAX #24][uni-utr24]. You are best off simply familiarising yourself with the character blocks in the Unicode character set, but if you need some help, these files are available.

The Unicode Standard gives a layout of all of the [blocks and scripts in the BMP][uni-bmp] as well as a similar layout for the existing (and projected) [blocks and scripts in the SMP][uni-smp]. Clicking on a particular block will take the user to the code chart for that particular block. (Note that there are a large number of additional Han ideographs in Plane 2.) In addition, there are a number of blocks containing various dingbats and symbols, such as arrows, box-drawing characters, mathematical operators and Braille patterns. Apart from the Braille patterns, most symbols were taken from various source legacy standards. 
			
The [Unicode Core Specification][uni-core-spec] contains individual chapters that describe groups of related scripts. For example, Chapters 12-15 discuss scripts of South and Central Asia. If you need to learn how to implement support for a given script using Unicode, then the relevant chapter in the Standard for that script is essential reading. 

### Getting acquainted with Unicode characters and the code charts

In addition to the chapters in the Standard that describe different scripts, the Standard also contains a complete set of code charts, organised by block. The best way to learn about the characters in the Unicode Standard is to read the Standard and browse through its charts.

The [Character Code Charts][uni-charts] are available online. The code charts include tables of characters organised in columns of 16 rows. The column headings show all but the last hexadecimal digit of the USVs; thus, the column labelled “21D” shows glyphs for characters U+21D0..U+21DF. Within the charts, combining marks are shown with a dotted circle that represents a base character with which the mark would combine (as explained at the start of this paper). Also, unassigned codepoints are indicated by table cells that are shaded in grey or that have a diagonal lined pattern fill.

The regular code charts are organised in the numerical order of Unicode scalar values. There are also various other charts available online that are organised in different orders. In particular, there are a set of charts available in [UAX #24][uni-utr24] that show all characters from all blocks for a given script, sorted in a default collating order. This can provide a useful way to find characters that you are looking for. Note that these other charts do not necessarily use the same presentation as the regular code charts, such as using tables with 16 rows. Also, you will probably find it helpful to use both these charts that are organised by scripts as well as the regular charts that are organised by blocks. Because the text describing characters and scripts and the code charts in the Standard itself are organised around blocks, it is important that you not only become familiar with the individual characters used in the writing systems that you work with but also with the blocks in which they are located.

Each of the regular code charts is accompanied by one or more pages of supporting information that is known as the names list. The names list includes certain useful information regarding each character. This includes some of the normative character properties, specifically the character name and the canonical or compatibility decompositions. In addition, it includes a representative glyph for each character as well as some additional notes that provide some explanation as to what this character is and how it is intended to be used.

If you take a quick glance at the names list, you will quickly note that certain special symbols are used. The organisation and presentation of the names list is fully explained in the [introduction to Chapter 24][uni-ch24-code-charts]. As a convenience, we will briefly describe the meaning of some of the symbols. To illustrate, let us consider a sample entry:

![Names list entry](images/3300-2-annotations.png)

This example is useful as it contains each of the different types of basic element that may be found in an names list entry.

The first line of an entry always shows the Unicode scalar value (without the prefix “U+”), the representative glyph, and the character name.

If a character is also known by other names, these are given next on lines beginning with the equal sign “=”. If there are multiple aliases, they will appear one per line. These are generally given in lower case. In some cases, they will appear in all caps; that indicates that the alternate name was the name used in TUS 1.0, prior to the merger with ISO/IEC 10646.

Lines beginning with bullets “&#x00B7;” are informative notes. Generally, these are added to clarify the identity of the character. For example, the note shown above helps to prevent confusion with an over-striking (combining) macron. Informative notes may also be added to point out special properties or behaviour, such as a case mapping that might otherwise not have been expected. Notes are also often added to indicate particular languages for which the given character is used.

Lines that begin with arrows “&#x2192;” are cross-references. The most common purpose of cross-references is to highlight distinct characters with which the given character might easily be confused. For example, U+00AF is similar in appearance to U+02C9, but the two are distinct. Another use of cross-references is to point to other characters that are in some linguistic relationship with the given character, such as the other member of a case pair (see, for instance, U+0272 LATIN SMALL LETTER N WITH LEFT HOOK), or a transliteration (see, for instance, U+045A CYRILLIC SMALL LETTER NJE).

Lines that begin with an equivalence sign “≡” or an approximate equality sign “≈” are used to indicate canonical and compatibility decompositions respectively.

At first, you might not always remember the meaning of these symbols in the names list. You may wish to book this page for quick reference.

The complete [NamesList.txt][uni-nameslist] is available online as an ASCII-encoded plain text file (without representative glyphs for characters). The format used for this file is documented at [NamesList File Format][uni-nameslist-html].

As you look through the code charts and the names list, bear in mind that this is not all of the information that the Standard provides about characters. It is just a limited amount that is generally adequate to establish the identity of each character. That is the main purpose they are intended for. If you need to know more about the intended use and behaviour of a particular character, you should read the section that describes the particular block containing that character ([Chapters 7–20 of TUS Core Specification][uni-core-spec]), and also check the semantic character properties for that character in the relevant parts of the Standard.

There are additional things you need to know in order to work with the characters in Unicode, particularly if you are trying to determine how the writing-system of a lesser-known language should be represented in Unicode. Before we look further at the details of the Unicode character set, however, we will explore the various encoding forms and encoding schemes used in Unicode.

## Transformation Formats

**All text should be read and interpreted according to the proper encoding and transformation format.**

Resource: [Online comparison of formats][res-code-converter]

## Unicode encoding forms and encoding schemes

Earlier, we briefly introduced the three encoding forms that are part of Unicode: UTF-8, UTF-16 and UTF-32. These will be described in greater detail in this section. (Explicit specifications are provided in the section below: “<a href='#mapping-code'>Mapping codepoints to Unicode encoding forms</a>”.) We will also look at two encoding forms used for ISO/IEC 10646, and consider the relative merits of these various alternatives. Finally, the various encoding schemes defined as part of Unicode, and also the mechanism provided for resolving byte-order issues are described.

### UTF-16

Because of the early history of Unicode and the original design goal to have a uniform 16-bit encoding, many people today think of Unicode as a 16-bit-only encoding. This is so even though Unicode now supports three different encoding forms, none of which is, in general, given preference over the others. UTF-16 might be considered to have a special importance, though, precisely because it is the encoding form that matches popular impressions regarding Unicode.

The original design goal of representing all characters using exactly 16 bits had two benefits. First it made processing efficient since every character was exactly the same size, and there were never any special states or escape sequences. Secondly, it made the mapping between codepoints in the coded character set and code units in the encoding form trivial: each character would be encoded using the 16-bit integer that is equal to its Unicode scalar value. Although it is no longer possible to maintain this fully in the general case, there would still be some benefit it this could be maintained in common cases. UTF-16 does this.

As mentioned earlier, the characters that are most commonly used, on average, are encoded in the Basic Multilingual Plane (BMP). Thus, for many texts it is never necessary to refer to characters above U+FFFF. If a 16-bit encoding form were used in which characters in the range U+0000..U+FFFF were encoded as 16-bit integers that matched their scalar values, this would work for such texts, but fail if any supplementary-plane characters occurred. If, however, some of the codepoints in that range were permanently reserved, perhaps they could somehow be used in some scheme to encode characters in the supplementary planes. This is precisely the purpose of the **surrogate code units** in the range 0xD800–0xDFFF.

The surrogate range covers 2,048 code values. UTF-16 divides these into two halves: 0xD800–0xDBFF are called **high surrogates**; 0xDC00–0xDFFF are called **low surrogates**. With 1,024 code values in each of these two sub-ranges, there are 1,024 x 1,024 = 1,048,576 possible combinations. This matches exactly the number of codepoints in the supplementary planes. Thus, in UTF-16, a pair of high and low surrogate code values, known as a surrogate pair, is used in this way to encode characters in the supplementary planes. Characters in the BMP are directly encoded in terms of their own 16-bit values.

So, UTF-16 is a 16-bit encoding form that encodes characters either as a single 16-bit code unit or as a pair of 16-bit code units, as follows:

Codepoint range|Number of UTF-16 code units per codepoint
--- | ---
U+0000..U+D7F|one
U+D800..U+DFFF|none (reserved—no characters assignable)
U+E000..U+FFFF|one
U+10000..U+10FFFF|two: one high surrogate followed by one low surrogate

It should be pointed out that a surrogate pair must consist of a high surrogate followed by a low surrogate. If an unpaired high or low surrogate is encountered in data, it is considered ill-formed, and must not be interpreted as a character.

The calculation for converting from the code values for a surrogate pair to the Unicode scalar value of the character being represented is described in the section below: “<a href='#mapping-code'>Mapping codepoints to Unicode encoding forms</a>”.

One of the purposes of Unicode was to make things simpler than the existing situation with legacy encodings such as the multi-byte encodings used for Far East languages. On learning that UTF-16 uses either one or two 16-bit code units, many people ask how this is any different from what was done before. There is a very significant difference in this regard between UTF-16 and legacy encodings. In the older encodings, the meaning of a code unit could be ambiguous. For example, a byte 0x73 by itself might represent the character U+0073, but it might also be the second byte in a two-byte sequence 0xA4 0x73 representing the Traditional Chinese character &#x5C71; ‘mountain’. In order to determine what the correct interpretation of this byte should be, it is necessary to backtrack in the data stream, possibly all the way to the beginning. In contrast, the interpretation of code units in UTF-16 is never ambiguous: when a process inspects a code unit, it is immediately clear whether the code unit is a high or low surrogate. In the worst case, if the code unit is a low surrogate, the process will need to back up one code unit to get a complete surrogate pair before it can interpret the data.

### UTF-8

The UTF-8 encoding form was developed to work with existing software implementations that were designed for processing 8-bit text data. In particular, it had to work with file systems in which certain byte values had special significance. (For example, 0x2A, which is “*” in ASCII, is typically used to indicate a wildcard character). It also had to work in communication systems that assumed bytes in the range 0x00 to 0x7F (especially the control characters) were defined in conformance to certain existing standards derived from ASCII. In other words, it was necessary for Unicode characters that are also in ASCII to be encoded exactly as they would be in ASCII using code units 0x00 to 0x7F, and that those code units should never be used in the representation of any other characters.

UTF-8 uses byte sequences of one to four bytes to represent the entire Unicode codespace. The number of bytes required depends upon the range in which a codepoint lies.

The details of the mapping between codepoints and the code units that represent them is described in the below section: “<a href='#mapping-code'>Mapping codepoints to Unicode encoding forms</a>”. An examination of that mapping (see <a href='#table3'>Table 3</a>) reveals certain interesting properties of UTF-8 code units and sequences. Firstly, sequence-initial bytes and the non-initial bytes come from different ranges of possible values. Thus, you can immediately determine whether a UTF-8 code unit is an initial byte in a sequence or is a following byte. Secondly, the first byte in a UTF-8 sequence provides a clear indication, based on its range, as to how long the sequence is.

These two characteristics combine to make processing of UTF-8 sequences very efficient. As with UTF-16, this encoding form is far more efficient than the various legacy multi-byte encodings. The meaning of a code unit is always clear: you always know if it is a sequence-initial byte or a following byte, and you never have to backup more than three bytes in the data in order to interpret a character.

Another interesting by-product of the way UTF-8 is specified is that ASCII-encoded data automatically also conforms to UTF-8.

It should be noted that the mapping from codepoints to 8-bit code units used for UTF-8 could be misapplied so as to give more than one possible representation for a given character. The UTF-8 specification clearly limits which representations are legal and valid, however, allowing only the shortest representation. This matter is described in detail in the section below: “Mapping codepoints to Unicode encoding forms”.

### UTF-32

The UTF-32 encoding form is very simple to explain: every codepoint is encoded using a 32-bit integer equal to the scalar value of the codepoint. This is described further the section below: “Mapping codepoints to Unicode encoding forms”.

### ISO/IEC 10646 encoding forms: UCS-4 and UCS-2

It is also useful to know about two additional encoding forms that are allowed in ISO/IEC 10646. UCS-4 is a 32-bit encoding form that supports the entire 31-bit codespace of ISO/IEC 10646. It is effectively equivalent to UTF-32, except with respect to the codespace: by definition UCS-4 can represent codepoints in the range U+0000..U+7FFFFFFF (the entire ISO/IEC 10646 codespace), whereas UTF-32 can represent only codepoints in the range U+0000..U+10FFFF (the entire Unicode codespace).

UCS-2 is a 16-bit encoding form that can be used to encode only the Basic Multilingual Plane. It is essentially equivalent to UTF-16 but without surrogate pairs, and is comparable to what was available in TUS 1.1. References to UCS-2 are much less frequently encountered than was true in the past. You may still come across the term, though, so it is helpful to know. Also, it can be useful in describing the level of support for Unicode that certain software products may provide.

## <a id='mapping-code'></a>Mapping codepoints to Unicode encoding forms

In the section above (“Unicode encoding forms and encoding schemes”), we examined each of the three character encoding forms defined within Unicode. This section describes in detail the mappings from Unicode codepoints to the code unit sequences used in each encoding form.

In this description, the mapping will be expressed in alternate forms, one of which is a mapping of bits between the binary representation of a Unicode scalar value and the binary representation of a code unit. Even though a coded character set encodes characters in terms of numerical values that have no specific computer representation or data type associated with them, for purposes of describing this mapping, we are considering codepoints in the Unicode codespace to have a width of 21 bits. This is the number of bits required for binary representation of the entire numerical range of Unicode scalar values, 0x0 to 0x10FFFF.

### UTF-32

The UTF-32 encoding form was formally incorporated into Unicode as part of TUS 3.1. The definitions for UTF-32 are specified in TUS 3.1 and in [The Unicode Standard Core Specification, Chapter 3: Conformance][uni-conformance]. The mapping for UTF-32 is, essentially, the identity mapping: the 32-bit code unit used to encode a codepoint has the same integer value as the codepoint itself. Thus if U represents the Unicode scalar value for a character and C represents the value of the 32-bit code unit then:

>U = C

The mapping can also be expressed in terms of the relationships between bits in the binary representations of the Unicode scalar values and the 32-bit code units, as shown below.

Codepoint range|Unicode scalar value (binary)|Code units (binary)
---|---|---
U+0000..U+D7FF, U+E000..U+10FFFF|xxxxxxxxxxxxxxxxxxxxx|00000000000xxxxxxxxxxxxxxxxxxxxx

_<a id='table1'></a>Table 1: UTF-32 USV to code unit mapping_

### UTF-16

The UTF-16 encoding form was formally incorporated into Unicode as part of TUS 2.0. The current definitions for UTF-16 are specified as:

>U = (C<sub>H</sub> – D800<sub>16</sub>) * 400<sub>16</sub> + (C<sub>L</sub> – DC00<sub>16</sub>) + 10000<sub>16</sub>

Likewise, determining the high and low surrogate values for a given Unicode scalar value is fairly straightforward. Assuming the variables CH, CL and U as above, and that U is in the range U+10000..U+10FFFF,

>C<sub>H</sub> = (U – 10000<sub>16</sub>) 400<sub>16</sub> + D800<sub>16</sub>

>C<sub>L</sub> = (U – 10000<sub>16</sub>) mod 400<sub>16</sub> + DC00<sub>16</sub>

where “&#x005C;” represents integer division (returns only integer portion, rounded down), and “mod” represents the modulo operator.

Expressing the mapping in terms of a mapping of bits between the binary representations of scalar values and code units, the UTF-16 mapping is as shown below:

Codepoint range|Unicode scalar value (binary)|Code units (binary)
---|---|---
U+0000..U+D7FF, U+E000..U+EFFF|00000xxxxxxxxxxxxxxxx|xxxxxxxxxxxxxxxx
U+10000..U+10FFFF|Uuuuuxxxxxxyyyyyyyyyy|110110wwwwxxxxxx 110111yyyyyyyyyy (where uuuuu = wwww + 1)

_<a id='table2'></a>Table 2: UTF-16 USV to code unit mapping_

### UTF-8

The UTF-8 encoding form was formally incorporated into Unicode as part of TUS 2.0. As with the other encoding forms, calculating a Unicode scalar value from the 8-bit code units in a UTF-8 sequence is a matter of simple arithmetic. In this case, however, the calculation depends upon the number of bytes in the sequence. Similarly, the calculation of code units from a scalar value must be expressed differently for different ranges of scalar values.

Let us consider first the relationship between bits in the binary representation of codepoints and code units. This is shown for UTF-8 below:

<a id='table3'></a>Codepoint range|Scalar value (binary)|Byte 1|Byte 2|Byte 3|Byte 4
---|---|---|---|----|----
U+0000..U+007F|00000000000000xxxxxxx|0xxxxxxx|||
U+0080..U+07FF|0000000000yyyyyxxxxxx|110yyyyy|10xxxxxx||
U+0800..U+D7FF, U+E000..U+FFFF|00000zzzzyyyyyyxxxxxx|1110zzzz|10yyyyyy|10xxxxxx|
U+10000..U+10FFFF|uuuzzzzzzyyyyyyxxxxxx|11110uuu|10zzzzzz|10yyyyyy|10xxxxxx

_Table 3: UTF-8 USV to code unit mapping_

>**Note:** There is a slight difference between Unicode and ISO/IEC 10646 in how they define UTF-8 since Unicode limits it to the roughly one million characters possible in Unicode’s codespace, while for the ISO/IEC standard, it can access the entire 31-bit codespace. For all practical purposes, this difference is irrelevant since the ISO/IEC codespace is effectively limited to match that of Unicode, but you may encounter differing descriptions on occasion.

As mentioned, UTF-8 byte sequences have certain interesting properties. These can be seen from the table above. Firstly, note the high-order bits in non-initial bytes as opposed to sequence-initial bytes. By looking at the first two bits, you can immediately determine whether a code unit is an initial byte in a sequence or is a following byte. Secondly, by looking at the number of non-zero high-order bits of the first byte in the sequence, you can immediately tell how long the sequence is: if no high-order bits are set to one, then the sequence contains exactly one byte. Otherwise, the number of non-zero high-order bits is equal to the total number of bytes in the sequence.

<a href='#table3'>Table 3</a> also reveals the other interesting characteristic of UTF-8 that was described above. Note that characters in the range U+0000..U+007F are represented using a single byte. The characters in this range match ASCII codepoint for codepoint. Thus, any data encoded in ASCII is automatically also encoded in UTF-8.

Having seen how the bits compare, let us consider how code units can be calculated from scalar values, and vice versa. If **U** represents the value of a Unicode scalar value and C<sub>1</sub>, C<sub>2</sub>, C<sub>3</sub> and C<sub>4</sub> represent bytes in a UTF-8 byte sequence (in order), then the value of a Unicode scalar value **U** can be calculated as follows:

---
If a sequence has one byte, then

U = C<sub>1</sub>

Else if a sequence has two bytes, then

U = (C<sub>1</sub> – 192) * 64 + C<sub>2</sub> – 128

Else if a sequence has three bytes, then

U = (C<sub>1</sub> – 224) * 4,096 + (C<sub>2</sub> – 128) * 64 + C<sub>3</sub> – 128

Else

U = (C<sub>1</sub> – 240) * 262,144 + (C<sub>2</sub> – 128) * 4,096 + (C<sub>3</sub> – 128) * 64 + C<sub>4</sub> – 128

End if

---

Going the other way, given a Unicode scalar value **U**, then the UTF-8 byte sequence can be calculated as follows:

---

If U <= U+007F, then

C<sub>1</sub> = U

Else if U+0080 <= U <= U+07FF, then

C<sub>1</sub> = U &#x005c; 64 + 192

C<sub>2</sub> = U mod 64 + 128

Else if U+0800 <= U <= U+D7FF, or if U+E000 <= U <= U+FFFF, then

C<sub>1</sub> = U &#x005c; 4,096 + 224

C<sub>2</sub> = (U mod 4,096) &#x005c; 64 + 128

C<sub>3</sub> = U mod 64 + 128

Else

C<sub>1</sub> = U &#x005c; 262,144 + 240

C<sub>2</sub> = (U mod 262,144) &#x005c; 4,096 + 128

C<sub>3</sub> = (U mod 4,096) &#x005c; 64 + 128

C<sub>4</sub> = U mod 64 + 128

End if

---

where “&#x005c;” represents integer division (returns only integer portion, rounded down), and “mod” represents the modulo operator.

If you examine the mapping in <a href='#table3'>Table 3</a> carefully, you may notice that by ignoring the range constraints in the left-hand column, certain codepoints can potentially be represented in more than one way. For example, substituting U+0041 LATIN CAPITAL LETTER A into the table gives the following possibilities:

Codepoint|Pattern|Byte 1|Byte 2|Byte 3|Byte 4
---|---|---|---|---|---
000000000000001000001|00000000000000xxxxxxx|01000001|||
000000000000001000001|0000000000yyyyyxxxxxx|11000001|10000001||
000000000000001000001|00000zzzzyyyyyyxxxxxx|11100000|10000001|10000001|
000000000000001000001|uuuzzzzzzyyyyyyxxxxxx|11110000|10000000|10000001|10000001

_<a id='table4'></a>Table 4 “UTF-8” non-shortest sequences for U+0041_

Obviously, having these alternate encoded representations for the same character is not desirable. Accordingly, the UTF-8 specification stipulates that the shortest possible representation must be used. In TUS, this was made more explicitly clear by specifying exactly what UTF-8 byte sequences are or are not legal. Thus, in the example above, each of the sequences other than the first is an illegal code unit sequence.

Similarly, a supplementary-plane character can be encoded directly into a four-byte UTF-8 sequence, but someone might (possibly from misunderstanding) choose to map the codepoint into a UTF-16 surrogate pair, and then apply the UTF-8 mapping to each of the surrogate code units to get a pair of three-byte sequences. To illustrate, consider the following:

&#x00A0; | &#x00A0;
---|---
Supplementary-plane codepoint|U+10011
Normal UTF-8 byte sequence|0xF0 0x90 0x80 0x91
UTF-16 surrogate pair|0xD800 0xDC11
“UTF-8” mapping of surrogates|0xED 0xA0 0x80 0xED 0xB0 0x91

_Table 5: UTF-8-via-surrogates representation of supplementary-plane character_

Again, the Unicode Standard expects the shortest representation to be used for UTF-8. For certain reasons, non-shortest representations of supplementary-plane characters are referred to as irregular code unit sequences rather than illegal code unit sequences. The distinction here is subtle: software that conforms to the Unicode Standard is allowed to interpret these irregular sequences as the corresponding supplementary-plane characters, but is not allowed to generate these irregular sequences. In certain situations, though, software will want to reject such irregular UTF-8 sequences (for instance, where these might otherwise be used to avoid security systems), and in these cases the Standard allows conformant software to ignore or reject these sequences, or remove them from a data stream.

The main motivation for making the distinction and for considering these 6-byte sequences to be irregular rather than illegal is this: suppose a process is re-encoding a data stream from UTF-16 to UTF-8, and suppose that the source data stream had been interrupted so that it ended with the beginning of a surrogate pair. It may be that this segment of the data will later be re-united with the remainder of the data, it also having been re-encoded in UTF-8. So, we are assuming that there are two segments of data out there: one ending with an unpaired high surrogate, and one beginning with an unpaired low surrogate.

Now, as each segment of the data is being trans-coded from UTF-16 to UTF-8, the question arises as to what should be done with the unpaired surrogate code units. If they are ignored, then the result after the data is reassembled will be that a character has been lost. A more graceful way to deal with the data would be for the trans-coding process to translate the unpaired surrogate into a corresponding 3-byte UTF-8 sequence, and then leave it up to a later receiving process to decide what to do with it. Then, if the receiving process gets the data segments assembled again, that character will still be part of the information content of the data. The only problem is that now it is in a 6-byte pseudo-UTF-8 sequence. Defining these as irregular rather than illegal is intended to allow that character to be retained over the course of this overall process in a form that conformant software is allowed to interpret, even if it would not be allowed to generate it that way.

## Principles & Compromises

### Which encoding is the right choice?

With three different encoding forms available, someone creating content is faced with the choice of which encoding they should use for the data they create. Likewise, software developers need to consider this question both for what they use as the internal memory representation of data and what they use when storing data on a disk or transmitting it over a wire. The answer depends on a variety of factors, including the nature of the data, the nature of the processing, and the contexts in which it will be used.

One of the original concerns people had regarding Unicode was that a 16-bit encoding form would automatically double file sizes in relation to an 8-bit encoding form. Unicode’s three encoding forms do differ in terms of their space efficiency, though the actual impact depends upon the range of characters being used and on the proportions of characters from different ranges within the codespace. Consider the following:

Codepoint range|Number of bytes: UTF-8|Number of bytes: UTF-16|Number of bytes: UTF-32
--- | --- | --- | ---
U+0000..U+007F|one|two|four
U+0080..U+07FF|two|two|four
U+0800..U+D7FF, U+E000..U+FFFF|three|two|four
U+10000..U+10FFFF|four|four|four

_Table 4. Bytes required to represent a character in each encoding form_

Clearly, UTF-32 is less efficient, unless a large proportion of characters in the data come from the supplementary planes, which is usually not likely. (For supplementary-plane characters, all three encoding forms are equal, requiring four bytes.) For characters in the Basic Latin block of Unicode (equivalent to the ASCII character set), i.e. U+0000..U+007F, UTF-8 is clearly the most efficient. On the other hand, for characters in the BMP used for Far East languages, UTF-8 is less efficient than UTF-16.

Another factor particularly for software developers to consider is efficiency in processing. UTF-32 has an advantage in that every character is exactly the same size, and there is never a need to test the value of a code unit to determine whether or not it is part of a sequence. Of course, this has to be weighed against considerations of the overall size of data, for which UTF-32 is generally quite inefficient. Also, while UTF-32 may allow for more efficient processing than UTF-16 or UTF-8, it should be noted that none of the three encoding forms is particularly inefficient with respect to processing. Certainly, it is true that all of them are much more efficient than are the various legacy multibyte encodings.

For general use with data that includes a variety of characters mostly from the BMP, UTF-16 is a good choice for software developers. BMP characters are all encoded as 16-bits, and testing for surrogates can be done very quickly. In terms of storage, it provides a good balance for multilingual data that may include characters from a variety of scripts in the BMP, and is no less efficient than other encoding forms for supplementary-plane characters. For these reasons, many applications that support Unicode use UTF-16 as the primary encoding form.

There are certain situations in which one of the other encoding forms may be preferred, however. In situations in which a software process needs to handle a single character (for example, to pass a character generated by a keyboard driver to an application), it is simplest to handle a single UTF-32 code unit. On the other hand, in situations in which software has to cooperate with existing implementations that were designed for 8-bit data only, then UTF-8 may be a necessity. UTF-8 has been most heavily used in the context of the Internet for this reason.

On first consideration, it may appear that having three encoding forms would be less desirable. In fact, having three encoding forms based on 8-, 16- and 32-bit code units has provided considerable flexibility for developers and has made it possible to begin making a transition to Unicode while maintaining operability with existing implementations. This has been a key factor in making Unicode a success within industry.

There is another related question worth considering here: Given a particular software product, which encoding forms does it support? Some software may be able to handle “16-bit” Unicode data. Note, however, that this may actually mean UCS-2 data and not UTF-16; in other words, it is able to handle characters in the BMP, but not supplementary-plane characters encoded as surrogate pairs. 

The question of support for supplementary-plane characters does not necessarily apply only to UTF-16. For example, many Web browsers are able to interpret HTML pages encoded in UTF-8, but that does not necessarily mean that they can handle supplementary-plane characters. For example, the software may convert data in the incoming file into 16-bit code units for internal processing, and that processing may not have been written to deal with surrogates correctly. Or, that application may have been written with proper support for supplementary-plane characters, but may depend on the host operating system for certain processing, and the host operating system on a given installation may not have the necessary support.

In general, when choosing software, you should verify whether it supports the encoding forms you would like to use. For both UTF-8 and UTF-16, you should explicitly verify whether the software is able to support supplementary-plane characters, if that is important to you. 

### Byte order: Unicode encoding schemes

As explained in “[Character set encoding basics][iws-character-encoding-basics]”, 16- and 32-bit encoding forms raise an issue in relation to byte ordering. While code units may be larger than 8-bits, many processes are designed to treat data in 8-bit chunks at some level. For example, a communication system may handle data in terms of bytes, and certainly memory addressing with personal computers is organised in terms of bytes. Because of this, when 16- or 32-bit code units are involved, these may get handled as a set of bytes, and these bytes must get put into a serial order before being transmitted over a wire or stored on a disk.

There are two ways to order the bytes that make up a 16- or 32-bit code unit. One is to start with the high-order (most significant) byte and end with the low-order (least significant) byte. This is often referred to as **big-endian**. The other way, of course, is the opposite, and is often referred to as **little-endian**. For 16- and 32-bit encoding forms, the specification of a particular encoding form together with a particular byte order is known as a [character encoding scheme][glo-character-encoding-scheme].

In addition to defining particular encoding forms as part of the Standard, Unicode also specifies particular encoding schemes. A distinction must be made between the actual form in which the data is organised (what it really is) versus how a process might describe the data (what gets said about it).

Clearly, for data in the UTF-16 encoding form, it can only be serialised in one of two ways. In terms of how it is actually organised, it must be either big-endian or little-endian. However, Unicode allows three ways in which the encoding scheme for the data can be described: big-endian, little-endian, or unspecified-endian. The same is true for UTF-32.

Thus, Unicode defines a total of seven encoding schemes:

- UTF-8
- UTF-16BE
- UTF-16LE
- UTF-16
- UTF-32BE
- UTF-32LE
- UTF-32

Note that the labels “UTF-8”, “UTF-16” and “UTF-32” can be used in two ways: either as encoding form designations or as encoding scheme designations. In most situations, it is either clear or irrelevant which is meant. There may be situations in which you need to clarify which was meant, however.

Before a software process can interpret data encoded using the UTF-16 or UTF-32 encoding forms, the question of byte order does need to be resolved. Clearly, then, it is always preferable to tag data using an encoding scheme designation that overtly indicates which byte order is used. As Unicode was being developed, however, it was apparent that there would be situations in which existing implementation did not provide a means to indicate the byte order. Therefore the ambiguous encoding scheme designations “UTF-16” and “UTF-32” were considered necessary.

When the ambiguous designators are applied, however, the question of byte order still has to be resolved before a process can interpret the data. One possibility is simply to assume one byte order, begin reading the data and then check to see if it appears to make sense. For example, if the data were switching from one script to another with each new character, you might suspect that it was not being interpreted correctly. This approach is not necessarily reliable, though some software vendors have developed algorithms that try to detect the byte order, and even the encoding form, and these algorithms work in most situations.

To solve this problem, the codepoint U+FEFF was designated to be a [byte order mark][glo-bom] (BOM). When encountered at the start of a file or data stream, this character can always make clear which byte order is being used. The reason is that the codepoint that would correspond to the opposite byte order, U+FFFE, is reserved as a non-character.

For example, consider a file containing the Thai text “ความจริง”. The first character “ค” THAI CHARACTER KHO KHWAI has a codepoint of U+0E04. Now, suppose that the file is encoded in UTF-16 and is stored in big-endian order, though the encoding scheme is identified ambiguously as “UTF-16”. Suppose, then, that an application begins to read the file. It encounters the byte sequence 0x0E 0x04, but has no way to determine whether to assume big-endian order or little-endian order. If it assumes big-endian order, it interprets these bytes as U+0E04 THAI CHARACTER KHO KHWAI; but if it assumes little-endian order, it interprets these bytes as U+040E CYRILLIC CAPITAL LETTER SHORT U. Only one of these interpretations is correct, but the software has no way to know which.

But suppose the byte order mark, U+FEFF, is placed at the start of the file. Thus, the first four bytes in sequence are 0xFE 0xFF 0x0E 0x04. Now, if the software attempts to interpret the first two bytes in little-endian order, it interprets them as U+FFFE. But that is a non-character and, therefore, not a possible interpretation. Thus, the software knows that it must assume big-endian order. Now it interprets the first four bytes as U+FEFF (the byte-order mark) and U+0E04 THAI CHARACTER KHO KHWAI, and it is assured of the correct interpretation.

It should be pointed out that the codepoint U+FEFF has a second interpretation: ZERO WIDTH NO-BREAK SPACE. Unicode specifies that if data is identified as being in the UTF-16 or UTF-32 encoding scheme (not form) so that the byte order is ambiguous, then the data should begin with U+FEFF and that it should be interpreted as a byte order mark and not considered part of the content. If the byte order is stated explicitly, using an encoding scheme designation such as UTF-16LE or UTF-32BE, then the data should not begin with a byte order mark. It may begin with the character U+FEFF, but if so it should be interpreted as a ZERO WIDTH NO-BREAK SPACE and counted as part of the content.

The use of the BOM works in exactly the same way for UTF-32, except that the BOM is encoded as four bytes rather than two.

Note that the BOM is useful for data stored in files or being transmitted, but it is not needed for data in internal memory or passed through software programming interfaces. In those contexts, a specific byte order will generally be assumed.20

The byte order mark is often considered to have another benefit aside from specifying byte order: that of identifying the character encoding. In most if not all existing legacy encoding standards, the byte sequences 0xFE 0xFF and 0xFF 0xFE are extremely unlikely. Thus, if a file begins with this value, software can infer with a high level of confidence that the data is Unicode, and also be able to deduce the encoding form. This also applies for UTF-32, though in that case the byte sequences would be 0x00 0x00 0xFE 0xFF and 0xFF 0xFE 0x00 0x00. It is also applicable in the case of UTF-8. In that case, the encoded representation of U+FEFF is 0xEF 0xBB 0xBF.

When the BOM is used in this way to identify the character set encoding of the data, it is referred to as an **encoding signature**.

## Character Properties

Software creates the impression of understanding the behaviours of writing systems by attributing **semantic character properties** to encoded characters. These properties represent parameters that determine how various text processes treat characters. For example, the SPACE character needs to be handled differently by a line-breaking process than, say, the U+002C  COMMA character. Thus, U+0020 SPACE and U+002C COMMA have different properties with respect to line-breaking.

One of the distinctive strengths of Unicode is that the Standard not only defines a set of characters, but also defines a number of semantic properties for those characters. Unicode is different from most other character set encoding standards in this regard. In particular, this is one of the key points of difference between Unicode and ISO/IEC 10646.

In addition to the semantic properties, Unicode also provides reference algorithms for certain complex processes for which the correct implementation may not be self evident. In this way, the Standard is not only defining semantics properties for characters, but is also guiding how semantics should be interpreted. This has an important benefit for users in that it leads to more consistent behaviour between software implementations. There is also a benefit for software developers who are suddenly faced with supporting a wide variety of languages and writing systems: they are provided with important information regarding how characters in unfamiliar scripts behave.

**It is important that characters are used in a way that is consistent with their properties**

## Character semantics and behaviours

As explained in “[Character set encoding basics][iws-character-encoding-basics]”, software creates the impression of understanding the behaviours of writing systems by attributing **semantic character properties** to encoded characters. These properties represent parameters that determine how various text processes treat characters. For example, the SPACE character needs to be handled differently by a line-breaking process than, say, the U+002C , COMMA character. Thus, U+0020  SPACE and U+002C , COMMA have different properties with respect to line-breaking.

One of the distinctive strengths of Unicode is that the Standard not only defines a set of characters, but also defines a number of semantic properties for those characters. Unicode is different from most other character set encoding standards in this regard. In particular, this is one of the key points of difference between Unicode and ISO/IEC 10646.

In addition to the semantic properties, Unicode also provides reference algorithms for certain complex processes for which the correct implementation may not be self evident. In this way, the Standard is not only defining semantics properties for characters, but is also guiding how semantics should be interpreted. This has an important benefit for users in that it leads to more consistent behaviour between software implementations. There is also a benefit for software developers who are suddenly faced with supporting a wide variety of languages and writing systems: they are provided with important information regarding how characters in unfamiliar scripts behave.

### Where the character properties are listed and described

The character properties and behaviours are listed and explained in various places, including the [Unicode Core Specification][uni-core-spec], some of the [technical reports and annexes][uni-utr], and in [online data files][uni-data-files]. An obvious starting point for information on character properties is [Chapter 4 of TUS][uni-ch4]. That chapter describes or lists some of the properties directly, and otherwise indicates the place in which many other character properties are covered. 

The complete listing of character properties is given in the data files that comprise the Unicode Character Database (UCD). These [data files][uni-data-files] are available online. A complete reference regarding the files that make up the UCD and the place in which each is described is provided in the document at [UnicodeCharacterDatabase.html][uni-UCD-html].

The original file that contained the character properties is `UnicodeData.txt`. This is considered the main file in the UCD and is one that is perhaps most commonly referred to. It is just one of several, however. This file was first included as part of the Standard in Version 1.1.5. Like all of the data files, it is a machine readable text database. As new properties were defined, additional files were created. This was done rather than adding new fields to the original file in order to remain compatible with software implementations designed to read that file. 

### Normative versus informative properties and behaviours

Unicode distinguishes between **normative properties** and **informative properties**. Software that conforms to Unicode is required to observe all normative properties. The informative properties are provided as a guide, and it is recommended that software developers generally follow them, but implementations may override those properties while still conforming to the Standard. All of the properties are defined as part of the Standard, but only the normative properties are required to be followed.

One reason for this distinction is that some properties are provided for documentation purposes and have no particular relevance for implementations. For example, the **Unicode 1.0 Name** property is provided for the benefit of implementations that may have been based on that version. Another similar property is the **10646 comment** property, which records notes from that standard consisting primarily of alternate character names and the names of languages that use that character. Another example is the informative notes and cross-references in `NamesList.txt`, which provide supplementary information about characters that is helpful for readers in identifying and distinguishing between characters.

Another reason for the distinction is that it may not be considered necessary to require certain properties to be applied consistently across all implementations. This would apply, for instance, in the case of a property that is not considered important enough to invest the effort in giving careful thought to the definition and assignment of the property for all characters. For example, the **kMainlandTelegraph** property identifies the telegraph code used in the People’s Republic of China that corresponds to a given unified Han character. This property may be valuable in some contexts, but is not likely to be something that is felt to need normative treatment within Unicode.

For some properties, it may also be considered inappropriate to impose particular requirements on conformant implementations. This might be the case if it is felt that a given category of processes is not yet well enough understood to specify what the normative behaviour for those processes should be. For example, **Line Breaking** properties are defined in Unicode for each character, and they reflect what are considered to be best practices to the extent that line breaking is understood. The treatment of line breaking properties is thought to largely reflect best practices that are valid for many situations, but is not considered to have completely covered all aspects of line breaking behaviour. Current knowledge regarding line breaking is not complete enough to make a complete and normative specification of line breaking behaviour that becomes a conformance requirement on software. As a result, some line breaking properties are normative—for instance, a break is always allowed after a ZERO-WIDTH SPACE and is always mandatory after a CARRIAGE RETURN—but most line-breaking properties are informative and can be modified in a given implementation.

It is also inappropriate to impose normative requirements in the case of properties for which the status of some characters is controversial or simply unclear. For example, a set of case-related properties exist that specify the effective case of letter-like symbols. For instance, U+24B6 &#x24B6; CIRCLED LATIN CAPITAL LETTER A is assigned the **Other_Uppercase** property. For some symbols, however, it is unclear what effective case they should be considered to have. The character U+2121 &#x2121; TELEPHONE SIGN, for instance, has been realised using a variety of glyphs. Some glyphs use small caps while others use all caps. It is difficult to have any confidence in making a property such as Other_Uppercase normative when the status of some characters in relation to that property is unclear.

The normative and informative distinction applies to the specification of behaviours as well as to character properties. For example, [UAX #9][uni-utr9] describes behaviour with regard to the layout of bi-directional text (the “bi-directional algorithm”) and that behaviour is a normative part of the Standard. Likewise, the properties in `ArabicShaping.txt` (described in [The Unicode Core Specification, Chapter 9][uni-ch9-arabic]) that describe the cursive shaping behaviour of Arabic and Syriac characters are also normative. On the other hand, [UAX #14][uni-utr14] describes an algorithm for processing the line breaking properties, but that algorithm is not normative. Similarly, [Section 5.13 of TUS][uni-ch5.13] discusses the handling of non-spacing combining marks in relation to processes such as keyboard input, but the guidelines it presents are informative only.

There is one other point that is important to note in relation to the distinction between normative and informative properties: the fact that a property is normative does not imply that it can never change. Likewise, the fact that a property is informative does not imply that it is open to change. For example, the Unicode 1.0 Names property is informative but is not subject to change. On the other hand, several changes were made in TUS 3.0 to the **Bi-directional Category**, **Canonical Combining Class** and other normative properties in order to correct errors and refine the specification of behaviours. As a rule, though, it is the case that changes to normative properties are avoided, and that some informative properties can be more readily changed.

It is also true that some normative properties are not subject to change. In particular, the Character name property is not permitted to change, even in cases in which, after the version of the Standard in which a character is introduced is published, the name is found to be inappropriate. The reason for this is that the sole purpose of the character name is to serve as a unique and fixed identifier.

### A summary of significant properties

The properties that are probably most significant are those found in the main character database file, `UnicodeData.txt`. 

The format for the UnicodeData.txt file is described in [UAX #44][uni-utr44]. `UnicodeData.txt` is a semicolon-delimited text database with one record (i.e. one line) per character. There are 15 fields in each record, each field corresponding to a different property. All of the properties in this file apart from the Unicode 1.0 Name and 10646 comment (described above) are normative.

The first field corresponds to the codepoint for a given character, the significance of which is obvious. The next field contains the character name, which provides a unique identifier in addition to the codepoint. There is an importance to the character name as an identifier over the codepoint in that, while the codepoint is applicable only to Unicode, the character name may be constant across a number of different character set standards, facilitating comparisons between standards.

The next field contains the **General Category** properties. This categorises all of the characters into a number of useful character types: **letter**, **combining mark**, **number**, **punctuation**, **symbol**, **control**, **separator**, and **other**. Each of these is further divided into subcategories. Thus, letters are designated to be **uppercase**, **lowercase**, or **titlecase**. Each of these subcategories is indicated in the data file using a two-letter abbreviation. The complete list of general category properties and their abbreviations is listed below:

&#x00A0;| | | &#x00A0;
---|---|---|---			
Cc|Other, Control|No|Number, Other
Cf|Other, Format|Pc|Punctuation, Connector
Cn|Other, Not Assigned|Pd|Punctuation, Dash
Co|Other, Private Use|Pe|Punctuation, Close
Cs|Other, Surrogate|Pf|Punctuation, Final quote
Ll|Letter, Lowercase|Pi|Punctuation, Initial quote
Lm|Letter, Modifier|Po|Punctuation, Other
Lo|Letter, Other|Ps|Punctuation, Open
Lt|Letter, Titlecase|Sc|Symbol, Currency
Lu|Letter, Uppercase|Sk|Symbol, Modifier
Mc|Mark, Spacing Combining|Sm|Symbol, Math
Me|Mark, Enclosing|So|Symbol, Other
Mn|Mark, Non-Spacing|Zl|Separator, Line
Nd|Number, Decimal Digit|Zp|Separator, Paragraph
Nl|Number, Letter|Zs|Separator, Space

_General category properties and their abbreviations_

This set of properties forms a partition of the Unicode character set; that is, every character is assigned exactly one of these general category properties.

Space does not permit a detailed description of all of these properties. General information can be found in [Chapter 4.5 of the Unicode Core Specification][uni-ch4.5]. Some of these properties are not discussed in detail in the Standard using these explicit names, so information may be difficult to find. For some of the properties, it may be more likely to find information about individual characters than about the groups of characters as a whole. Many of these categories are significant in relation to certain behaviours, though. Several are discussed in [Chapter 5 of TUS][uni-ch5]. Many of them are particularly relevant in relation to line breaking behaviour, described in [UAX #14][uni-utr14].

The control, format and other special characters are discussed in [Chapter 23][uni-ch23] of TUS. Numbers are described in [Chapter 22][uni-ch22-numerals] and in most of the various sections covering different scripts in Chapters 7–20. Punctuation and spaces are discussed in [Chapter 6][uni-ch6] of TUS. Symbols are the topic of [Chapter 22][uni-ch22] of TUS. Line and paragraph separators are covered in [Chapter 5][uni-ch5.8].

**It will be worth describing letters and case in a little more detail, and I will do so after finishing this general survey of character properties. I will also discuss combining marks in some detail in Section 9.**

Returning to our discussion of the fields in the `UnicodeData.txt` database file, the fourth, fifth and sixth fields contain particularly important properties: the **Canonical Combining Classes**, **Bi-directional Category** and **Decomposition Mapping** properties. Together with the general category properties, these three properties are the most important character properties defined in Unicode. Accordingly, each of these will be given additional discussion. The canonical combining classes are relevant only for combining marks (characters with general category properties of Mn, Mc and Me), and will be described in more detail in **Section 9**. The bi-directional categories are used in relation to the bi-directional algorithm, which is specified in [UAX #9][uni-utr9]. I will provide a brief outline of this in **Section 8.1**. Finally, the character decomposition mappings specify canonical and compatibility equivalence relationships. I will discuss this further in **Section 7.5**.

Most of the next six fields contain properties that are of more limited significance. Fields seven to nine relate to the numeric value of numbers (characters with general category properties (Nd, Nl and No)). These are covered in **Section 4.6 of TUS 3.0**. The tenth field contains the **Mirrored** property, which is important for right-to-left scripts, and is described in **Section 4.7 of TUS 3.0** and also in [UAX #9][uni-utr9] (the bi-directional algorithm). I will say more about it in **Section 8.1**. Fields eleven and twelve contain the Unicode 1.0 Name and 10646 properties.

The last three fields contain case mapping properties: **Uppercase Mapping**, **Lowercase Mapping**, and **Titlecase mapping**. These are considered further in **the next section**.

As mentioned earlier, `UnicodeData.txt` is a semicolon-delimited text database. Now that each of the fields have been described, here are some examples:

```
0028;LEFT PARENTHESIS;Ps;0;ON;;;;;Y;OPENING PARENTHESIS;;;;
0031;DIGIT ONE;Nd;0;EN;;1;1;1;N;;;;;
0061;LATIN SMALL LETTER A;Ll;0;L;;;;;N;;;0041;;0041
0407;CYRILLIC CAPITAL LETTER YI;Lu;0;L;0406 0308;;;;N;;Ukrainian ;;0457;
```

Note that not every field necessarily contains a value. For example, there is no uppercase mapping property for U+0028. Every entry in this file contains values, however, for the following fields: codepoint, character name, general category, canonical combining class, bi-directional category, and mirrored.

Looking at the first of these entries, we see that U+0028 has a general category of “Ps” (opening punctuation—see **Table 5**), a canonical combining class of “0”, a bi-directional category of “ON”, and a mirrored property of “Y”. It also has a Unicode 1.0 name of “OPENING PARENTHESIS”.

The entry for U+0031 shows a general category of “Nd” (decimal digit number), a combining class of “0”, a bi-directional category of “EN”, and a mirrored property of “N”. Since this character is a number, fields seven to nine (having to do with numeric values) contain values, each of them “1”.

The character U+0061 has a general category of “Ll” (lowercase letter), a combining class of “0”, a bi-directional category of “L”, and a mirrored property of “N”. It also has uppercase and titlecase mappings to U+0041.

Finally, looking at the last entry, we see that U+0407 has a general category of “Lu” (uppercase letter), a combining class of 0, a bi-directional category of “L”, and a mirrored property of “N”. It also has a canonical decomposition mapping to < U+0406, U+0308 >, a 10646 comment of “Ukrainian”, and a lowercase mapping to U+0457.

`UnicodeData.txt` has been described the main file in the Unicode character database in some detail. There are a number of other files listing character properties in the Unicode character database. Some of the more significant files have been mentioned in earlier sections. Of the rest, it would be beyond the scope of an introduction to explain every one, and all of them are described in **Davis and Whistler (2001b)**. **I will be giving more details on those that are most significant in the sections that follow.** In particular, additional properties related to case are discussed in **Section 7.4** together with a fuller discussion of the case-related properties mentioned in this section; and the properties listed in the `ArabicShaping.txt` and `BidiMirroring.txt` files will be described in **Section 8.1**, together with further details on the mirrored property mentioned here.

Resource: [Unicode Character Properties spreadsheet][ucd-spreadsheet]

## Glyph Similarities

The Unicode Standard does not unify letter shapes or characters across scripts (unless those characters are common to all, for example combining diacritics). Thus there is both a Latin "A" (U+0041 LATIN CAPITAL LETTER A) and a Cyrillic "А" (U+0410 CYRILLIC CAPITAL LETTER A). A font supporting both Latin and Cyrillic scripts might use the exact same glyph to display both of these Unicode characters. 

The existence of these "confusable" characters also offers the possibility of deliberate, malicious attempts to deceive users. 

**You will do your users a great service if your software can warn users when they use a character from a different script.**

Resources: 
- [Dotless letters and movable combining marks][dotless-letters]
- [Unicode Utilities: Confusables][res-confusables]
- [Unicode's Where is my Character?][uni-where-character]


## Case Mappings

Case is an important property for characters in Latin, Greek, Cyrillic, Armenian, Georgianm and a few other scripts. For these scripts, both upper- and lowercase characters are encoded. Because some Latin and Greek digraphs were included in Unicode, it was necessary to add additional case forms to deal with the situation in which a string has an initial uppercase character. Thus, for these digraphs there are upper-, lower- and titlecase characters; for example, U+01CA Ǌ LATIN CAPITAL LETTER NJ, U+01CB ǋ LATIN CAPITAL LETTER N WITH SMALL LETTER J, and U+01CC ǌ LATIN SMALL LETTER NJ. Likewise, there are properties giving uppercase, lowercase and title case mappings for characters. Thus, U+01CA has a lowercase mapping of U+01CC and a titlecase mapping of U+01CB.

Case has been indicated in Unicode by means of the general category properties “Ll”, “Lu” and “Lt”. These have always been normative character properties. Prior to TUS 3.1, however, case mappings were always informative properties. The reason was that, for some characters, case mappings are not constant across all languages. For example, U+0069 i LATIN SMALL LETTER I is always lower case, no matter what writing system it is used for, but not all writing systems consider the corresponding uppercase character to be U+0049 I LATIN CAPITAL LETTER I. In Turkish and Azeri, for instance, the uppercase equivalent to “i” is U+0130 İ LATIN CAPITAL LETTER I WITH DOT ABOVE. The exceptional cases such as Turkish and Azeri were handled by special casing properties that were listed in a file created for that purpose: `SpecialCasing.txt`.

The `SpecialCasing.txt` file was also used to handle other special situations, in particular situations in which a case mapping for a character is not one-to-one. These typically involve encoded ligatures or precomposed character combinations for which the corresponding uppercase equivalent is not encoded. For example, U+01F0 ǰ LATIN SMALL LETTER J WITH CARON is a lowercase character, and its uppercase pair is not encoded in Unicode as a precomposed character. Thus, the uppercase mapping for U+01F0 must map to a combining character sequence, &lt;U+004A LATIN CAPITAL LETTER J, U+030C COMBINING CARON&gt;. This mapping is given in `SpecialCasing.txt`.

Note that not all characters with case are given case mappings. For example, U+207F ⁿ SUPERSCRIPT LATIN SMALL LETTER N is a lowercase character (indicated by the general category “Ll”), but it is not given uppercase or titlecase mappings in either `UnicodeData.txt` or in `SpecialCasing.txt`. This is true for a number of other characters as well. Several of them are characters with compatibility decompositions, like U+207F, but many are not. In particular the characters in the IPA Extensions block are all considered lowercase characters, but many do not have uppercase counterparts.

In TUS 3.1, case mappings were changed from being informative to normative. The reason for the change was that it was recognised that case mapping was a significant issue for a number of processes and that it was not really satisfactory to have all case mappings be informative. Thus, the mappings given in `UnicodeData.txt` are now normative properties. Special casing situations are still specified in `SpecialCasing.txt`, but this file is now considered normative as well.

Note that `UnicodeData.txt` indicates the case of characters by means of the general categories “Ll”, “Lu” and “Lt”, and not by case properties that are independent of the “letter” category. There are instances, however, in which a character that does not have one of these properties should be treated as having case or as having case mappings. This applies, for example, to U+24D0 ⓐ CIRCLED LATIN SMALL LETTER A, which has an uppercase mapping of U+24B6 Ⓐ CIRCLED LATIN CAPITAL LETTER A but does not have a case property since it has a general category of “So” (other symbol). As an accident of history in the way that the general category was developed, case was applied to characters that are categorised as **letters**, but not to characters categorised as **symbols**. This made case incompatible with being categorised as a symbol, even though case properties should be logically independent of the letter/symbol categories.

To deal with such situations, extended properties **Other_Lowercase** and **Other_Uppercase** have been defined. These are two of various extended properties that are listed in the file `PropList.txt` (described in PropList.htm). Furthermore, derived properties Lowercase and Uppercase have been defined (described in DerivedProperties.htm) that combine characters with the general categories “Ll” and “Lu” together with characters that have the **Other_Lowercase** and **Other_Uppercase** properties. Thus, the lowercase property (as listed in `DerivedCoreProperties.txt`) can be thought of as identifying all characters that can be deemed to be lowercase, regardless of their general category. This may be useful for certain types of processing. Note, however, that these extended and derived case-related properties are as yet only informative, not normative.

For some types of processing, there may be additional issues related to case that need to be considered. See the Unicode Standard sections [Default Case Algorithms][uni-dflt-case-algorithms], [Case][uni-case-normative], and [Case Mappings][uni-case-mappings] for further discussion of case-related issues.

## Canonical Ordering

When multiple combining marks occur with a single base, those combining marks may or may not interact typographically. If they don’t, then the order in which they occur in the file doesn’t correspond to any change in appearance, and therefore doesn’t correspond to any meaningful difference. This results in another way in which a given text element can have different encoded representations in Unicode.

If the combining marks do interact typographically, however, then different orders do correspond to different appearance—typically the diacritics are stacked out from the base. This will represent a difference in meaning to the user. Thus, there are some cases in which differently ordered sequences are semantically different, and other cases in which they should be considered equivalent.

A canonical combining class is assigned to every character in order to indicate when combining marks do or do not interact typographically—those with the same combining class do interact. This can be used by software to determine when a difference in ordering is significant or not: different orderings only matter when the combining classes are the same.

Canonical ordering is a process that puts combining marks into a specific order. The sole purpose of this is in determining whether or not two combining sequences are canonically equivalent or not: put two combining sequences into canonical order; then if the sequences are identical, they are canonically equivalent. It is not necessary for data to be stored with combining marks in canonical order; software should be able to accommodate combining marks in any order. In many situations, though, it may not be a bad idea to generate data in canonical order. Note, however, that there are some cases in which the canonical order is not what one might normally encounter in actual data. This is not a problem, however, since strictly speaking the only purpose for canonical ordering is in comparing strings to tell whether they are canonically equivalent or not.

The possibility of equivalent sequences of combining marks occurring in different orders can have implications for other processes. For example, a sorting specification or a rendering system might be configured assuming a particular order. As a result, it is important that such processes allow for alternate equivalent orderings, or that canonical ordering be included in a pre-processing stage. Processes should be designed anticipating different but equally valid possibilities in the data.

Canonical ordering is an important part of normalization which is discussed next.

## (De)Composition & Normalization

Unicode was originally designed to round trip to many of the smaller standards of the day. This means that some "composed characters" have two ways of being stored in Unicode, either as a single code that can be roundtripped to a smaller standard, or a sequence of a base and diacritic.

For instance, the following are two ways of representing the same data:

- á U+00E1 - LATIN SMALL LETTER A WITH ACUTE
- a U+0061 - LATIN SMALL LETTER A  +  ́ U+0301 - COMBINING ACUTE ACCENT

They are "canonically equivalent", that is, they both represent the same item and your software should treat them as identical (for example, when searching text). Fortunately most programming languages have functions available to convert between these forms.

Unicode defines normalization forms, with specific rules on how to create them. The most common forms are:

- Normalization Form Composed (NFC)
- Normalization Form Decomposed (NFD)

In NFD, each component has a separate code point. In NFC, components will be combined, provided a composite character exists in Unicode, according to specific algorithms. In the example above, the first sequence is NFC and the second is NFD. 

In many cases, the NFC and NFD forms are identical. For example, U+0254 U+0301 is the "open o" character with an acute accent. Since there is no composite character for "open o with acute" in Unicode, this sequence is already as composed as possible.

NFC often provides the most compact storage. NFD may provide advantages for working with the data, since each component is a separate character. 

**Applications should not assume any normalization on data input unless it controls the data source, and should generally output data in NFC.** See [To compose or decompose: that is the question][compose-decompose].

Resources:

- [Precomposed Characters in Unicode][res-precomposed]
- Video (27min) [Why Determining the Length of a String is More Complicated Than You Think][res-string-length] (IUC 44, Oct 2020 presentation)

## Character decomposition mappings

The notions of canonical and compatibility equivalence **were introduced in Section 6**. There, we saw cases in which a Unicode character is identical in meaning to a decomposed sequence of one or more characters, and that these two representations are said to be canonically equivalent. We also considered other cases in which a Unicode character duplicates a sequence of one or more characters in some more limited sense: the two representations are equivalent in certain contexts only, or the one character is equivalent to the sequence when supplemented with certain non-textual information. In these cases, the two representations are said to be compatibility equivalent.

For both types of equivalence, the relationship between two encoded representations is formally expressed by means of a decomposition mapping. These mappings are given in the sixth field of `UnicodeData.txt`. So, for example, the character U+1EA1 &#x1EA1; LATIN SMALL LETTER A WITH DOT BELOW is canonically equivalent to the combining sequence &lt;U+0061 LATIN SMALL LETTER A, U+0323 COMBINING DOT BELOW&gt;. This relationship is indicated by the decomposition mapping given in the entry in `UnicodeData.txt` for U+1EA1:

```
1EA1;LATIN SMALL LETTER A WITH DOT BELOW;Ll;0;L;0061 0323;;;;N;;; 1EA0;;1EA0
```

_Decomposition mapping in UnicodeData.txt entry for U+1EA1_

The same field in `UnicodeData.txt` is used to list both canonical and compatibility decomposition mappings. The two types of equivalence do need to be distinguished, however. As noted, characters with compatibility decompositions typically have some additional non-character element of meaning or some specific contextual associations. Accordingly, when giving a decomposition mapping for such a character, it makes sense also to indicate what this additional element of meaning is. This is precisely what is done: in compatibility decomposition mappings, the mapping includes the decomposed character sequence as well as a tag that indicates the additional non-character information contained in the compatibility character. This is illustrated in the figure below:

```
02B0;MODIFIER LETTER SMALL H;Lm;0;L;<super> 0068;;;;N;;;;;
2110;SCRIPT CAPITAL I;Lu;0;L;<font> 0049;;;;N;SCRIPT I;;;;
FB54;ARABIC LETTER BEEH INITIAL FORM;Lo;0;AL;<initial> 067B;;;;N;;;;;
FF42;FULLWIDTH LATIN SMALL LETTER B;Ll;0;L;<wide> 0062;;;;N;;;FF22;; FF22
```

_Sample entries from UnicodeData.txt with compatibility decomposition mappings_

This additional tag in the decomposition mappings is what distinguishes between canonical equivalence relationships and compatibility equivalence relationships.16

There are a total of 16 tags used to indicate compatibility decompositions. A brief description of each is given in the table below:

Tag|Description
--- | -----
&lt;font&gt;|A font variant (e.g. a blackletter form).
&lt;nobreak&gt;|A non-breaking version of a space or hyphen.
&lt;initial&gt;|An initial presentation form (for Arabic).
&lt;medial&gt;|A medial presentation form (for Arabic).
&lt;final&gt;|A final presentation form (for Arabic).
&lt;isolated&gt;|An isolated presentation form (for Arabic).
&lt;circle&gt;|An encircled form.
&lt;super&gt;|A superscript form.
&lt;sub&gt;|A subscript form.
&lt;vertical&gt;|A vertical layout presentation form.
&lt;wide&gt;|A wide variant form.
&lt;narrow&gt;|A narrow variant form.
&lt;small&gt;|A small variant form.
&lt;square&gt;|A Far East compatibility form involving internal square character layout
&lt;fraction&gt;|A precomposed fraction.
&lt;compat&gt;|Other unspecified compatibility relationships

_Table: Tags used in compatibility decomposition mappings_

The following table gives examples showing the use of each of these tags:

Tag|Sample character|Decomposition mapping for sample
---|-----|----
&lt;font&gt;|U+2110 SCRIPT CAPITAL I|&lt;font&gt; 0049
&lt;nobreak&gt;|U+00A0 NO-BREAK SPACE|&lt;nobreak&gt; 0020
&lt;initial&gt;|U+FB54 ARABIC LETTER BEEH INITIAL FORM|&lt;initial&gt; 067B
&lt;medial&gt;|U+FB55 ARABIC LETTER BEEH MEDIAL FORM|&lt;medial&gt; 067B
&lt;final&gt;|U+FB53 ARABIC LETTER BEEH FINAL FORM|&lt;final&gt; 067B
&lt;isolated&gt;|U+FB52 ARABIC LETTER BEEH ISOLATED FORM|&lt;isolated&gt; 067B
&lt;circle&gt;|U+2460 CIRCLED DIGIT ONE|&lt;circle&gt; 0031
&lt;super&gt;|U+00B9 SUPERSCRIPT ONE|&lt;super&gt; 0031
&lt;sub&gt;|U+2080 SUBSCRIPT ZERO|&lt;sub&gt; 0030
&lt;vertical&gt;|U+FE31 PRESENTATION FORM FOR VERTICAL EM DASH|&lt;vertical&gt; 2014
&lt;wide&gt;|U+FF42 FULLWIDTH LATIN SMALL LETTER B|&lt;wide&gt; 0062
&lt;narrow&gt;|U+FF66 HALFWIDTH KATAKANA LETTER WO|&lt;narrow&gt; 30F2
&lt;small&gt;|U+FE50 SMALL COMMA|&lt;small&gt; 002C
&lt;square&gt;|U+3315 SQUARE KIROGURAMU|&lt;square&gt; 30AD 30ED 30B0 30E9 30E0
&lt;fraction&gt;|U+00BC VULGAR FRACTION ONE QUARTER|&lt;fraction&gt; 0031 2044 0034
&lt;compat&gt;|U+0132 LATIN CAPITAL LIGATURE IJ|&lt;compat&gt; 0049 004A

_Table: Examples of different types of compatibility decomposition mappings_

Note that the &lt;compat&gt; tag is used for a variety of characters that stand in one of several types of relationship to their corresponding decomposed counterparts. For example, the ligature presentation forms described in **Section 6.4 and the digraphs described in Section 6.5** use this tag. It is also used for several of the types of compatibility decomposition described in “[A review of characters with compatibility decompositions][iws-appendix-b]”.

It was noted in **Section 6** that some cases of equivalence involve one-to-one relationships, for example in the case of the exact character duplicates discussed in **Section 6.1**. Hence, not all of the decomposition mappings contain sequences of two or more characters, as illustrated in the following figure:

```
212A;KELVIN SIGN;Lu;0;L;004B;;;;N;DEGREES KELVIN;;;006B;
```

_Figure: Single-character decomposition mapping in the entry for U+212A_

Compatibility decomposition mappings always gives the completely decomposed representation. This is illustrated by the entry for U+3315:

```
3315;SQUARE KIROGURAMU;So;0;L;<square> 30AD 30ED 30B0 30E9 30E0;;;; N;SQUARED KIROGURAMU;;;;
```

_Figure: Multiple-character compatibility decomposition mapping_

As a consequence of this, it should be noted that an instance of compatibility equivalence always involved exactly two representations: the compatibility character and the corresponding decomposed representation given in the mapping.

For canonical decompositions, the decomposition mapping lists a sequence of one or two characters, but never more than two. In the case of precomposed characters that involve multiple diacritic characters, this generally means that the precomposed character decomposes into a partially decomposed sequence. If a fully decomposed sequence is needed, further decomposition mappings can be applied to the partially decomposed sequences. So, for example, U+1FA7 &#x1FA7; GREEK SMALL LETTER OMEGA WITH DASIA AND PERISPOMENI AND YPOGEGRAMMENI has a decomposition involving two characters, one of which is U+1F67 &#x1F67; GREEK SMALL LETTER OMEGA WITH DASIA AND PERISPOMENI , which in turn has a decomposition of two characters, and so on.

```
1FA7;GREEK SMALL LETTER OMEGA WITH DASIA AND PERISPOMENI AND YPOGEGRAMMENI;Ll;0;L;1F67 0345;;;;N;;;1FAF;;1FAF
1F67;GREEK SMALL LETTER OMEGA WITH DASIA AND PERISPOMENI;Ll;0;L;1F61 0342;;;;N;;;1F6F;;1F6F
1F61;GREEK SMALL LETTER OMEGA WITH DASIA;Ll;0;L;03C9 0314;;;;N;;; 1F69;;1F69
```

_Figure: Decomposition of precomposed characters with multiple diacritics_

In principle, it would be possible for Unicode to include a precomposed character involving multiple diacritics but not to include any precomposed character involving some subset of those diacritics. In such a situation, the character would decompose directly into the fully decomposed combining sequence, meaning that the decomposition mapping includes more than two characters. In practice, though, this situation does not occur in the Unicode character set. Furthermore, the Unicode Consortium has given an explicit guarantee that canonical decompositions will never involve mapping to more than two characters.

As explained in **Section 6.3**, the fact that a precomposed character with multiple diacritics has a decomposition involving partially composed forms means that there may be several canonically equivalent representations for a given text element **(as illustrated in Figure 16 on page 90)**. Canonical equivalence is a transitive relationship, and so we intuitively know that all of the representations are canonically equivalent. Software processes cannot rely on such intuition, however. Software requires explicit and efficient algorithms that let it know that all of these representations are canonically equivalent. This is accomplished by means of normalization, which was discussed in the above section on "(De)Composition & Normalization."

## Rendering Behaviors

the Unicode character set assumes a design principle of encoding characters but not glyphs. This in turn implies an assumption that applications that use Unicode will incorporate rendering processes that can do the glyph processing required to make text appear the way it should, in accordance with the rules of each given script and writing system. Unicode does not specify in complete detail how the rendering process should be done. There are a number of approaches that an application might utilise to deal with the many details involved, and it is outside the scope of the Unicode Standard to stipulate how such processing should be done.

This does not mean that Unicode has nothing to say regarding the rendering process, however. There are some key issues that pertain to the more complex aspects of rendering that require common implementation in order to ensure consistency across all implementations. For example, under certain conditions consonant sequences in Devanagari script can be represented as ligatures, though in certain circumstances the sequence can also be rendered with the first consonant in a reduced “half” form instead. It is considered necessary that this distinction be reflected in plain text, and thus in the encoding of data. It is important that different implementations employ the same mechanisms for controlling this, and so the encoding mechanism is defined as a normative part of the Unicode Standard. One implication of this is that Unicode specifies how that aspect of the rendering of Devanagari script is to be done.

There are three major areas in which Unicode specifies the rendering behaviour of characters. The control of Indic conjuncts and half-forms is one of these. A second has to do with the connecting behaviour of cursive scripts, specifically Arabic and Syriac. The third has do with bi-directional text, meaning horizontal text with mixed left-to-right and right-to-left line directions. I will give a brief overview of each of these here, beginning with bi-directional text and the bi-directional algorithm.

Those three areas are of particular significance because they affect important scripts in rather pervasive ways; one simply cannot render Arabic script, for example, without addressing the issues of bi-directionality and cursive connection. There are some other less significant rendering-related issues that Unicode addresses. These are described briefly.

### Bi-directional text and the bi-directional algorithm

There are two issues that need to be dealt with in relation to bi-directional text. The bigger issue is the mixing of text with different directionality. The other has to do with certain characters that require glyphs for right-to-left contexts that are mirror images of those required for left-to-right contexts. Both of these issues are dealt with in Unicode by the [Unicode Bidirectional Algorithm][wstr-unicode-bidi-algorithm].

## Cursive connections

Certain scripts, such as Arabic and Syriac, have a distinctive characteristic of being strictly cursive: they are never written in non-cursive styles. The implication is that characters typically have at least four shapes corresponding to initial, medial, final and isolated (non-connected) contexts. Not all characters connect in all contexts, however. Thus, some characters connect to characters on both sides, others connect only on one side, and other never connect. Ultimately, the joining behaviour of a character depends upon the properties of that character as well as the properties of the characters adjacent to it.

Another behaviour that is closely associated with cursive writing is ligature formation. Both Arabic and Syriac scripts make use of a number of ligatures, many of which are optional, though some are obligatory in all uses of those scripts.

Unicode assigns normative properties to characters in the Arabic and Syriac blocks that specify their joining behaviour. These are described and listed in the Unicode chapter on [Middle East][uni-middle-east] scripts, and are also listed in machine-readable form in the `ArabicShaping.txt` data file. Explicit rules for interpreting the joining properties, as well as rules specifying the formation of obligatory ligatures in Arabic are also discussed. For most of the rules, the action of the rule is essentially predictable from the meaning of the character properties involved. For example,

> **R2** A right-joining character X that has a right join-causing character on the right will adopt [a right-joining glyph form].

Thus, for those concerned with Arabic or Syriac rendering, it is the joining properties that are most significant.

Most Arabic and Syriac characters are in one of two joining classes: **dual-joining**, that is, characters that join to characters on both sides; and **right-joining**, that is characters that join to characters on the right side only. The other significant classes of characters are non-joining, transparent and join-causing. The join-causing characters are U+200D ZERO WIDTH JOINER and U+0640 ARABIC TATWEEL. The non-joining characters include U+0621 &#x0621; ARABIC LETTER HAMZA, U+0674 &#x0674; ARABIC LETTER HIGH HAMZA, U+06D5 &#x06D5; ARABIC LETTER AE, U+200C ZERO WIDTH NON-JOINER as well as spaces, digits, punctuation and, of course, characters from other scripts. The transparent characters include all combining marks, such as U+0654 ARABIC HAMZA ABOVE, and all other format control characters.

There are some additional rules and classes for Syriac that pertain to the shaping of U+0710 &#x0710; SYRIAC LETTER ALAPH. Details are presented in the [Syriac section][uni-ch9-syriac] of the Unicode Standard.

It should be noted that certain characters happen to occur only word-finally. These are classed as **right-joining**, even though these are derived from other characters that are classed as **dual-joining**. For example, U+0629  &#x0629; ARABIC LETTER TEH MARBUTA is classified as right-joining, although that Arabic letter is derived from the letter heh (U+0647 &#x0647; ARABIC LETTER HEH), which is a dual-joining character.

The characters U+200C ZERO WIDTH NON-JOINER (ZWNJ) and U+200D ZERO WIDTH JOINER (ZWJ) are control characters that can be used to control the shape of cursively-connecting characters. ZWNJ can be used to prevent a cursive connection that otherwise would occur. Likewise, ZWJ can be used to cause a connecting shape for a character to be used that otherwise would not occur. This is illustrated below:

![ZWNJ and ZWJ](images/3300-3-ZWNJ-ZWJ.png "Affect of ZWNJ and ZWJ on cursively-connecting characters")

Note, however, that adding U+200D to the left of (following) a right-joining character does not force it to become dual-joining or to join on the left.

The fact that the joining properties of characters are normative can have an important bearing on how to apply characters in the Syriac or Arabic blocks to the writing of lesser-known languages. In particular, if a language community adopts Arabic script for writing their language but uses a character with different joining behaviour than is common, it may not be clear how to encode that character. The two scenarios that would be problematic would be if a character that is classified in Unicode as right-joining only is used in a given writing system with dual-joining behaviour, or if a character that is classified as non-joining is used in a given writing system with joining behaviour. There are no clear guidelines as to what the best course of action might be in such situations. Because the right-joining property of the encoded character is normative, a conformant application is expected to treat it as such. In this event, there are three options: to request that the property of the existing Unicode character be revised, to propose that a new character be added to Unicode, or to convince that language community to revise their orthography. The latter option may be feasible if literacy in that language is just being introduced and orthography decisions are still open. It would not likely be an option, however, if the orthography is in established usage. It should be noted that, although the joining properties are normative, it is possible for them to be amended, though such changes are not generally made lightly as they may have an impact on existing data and implementations.

### Indic shaping behaviour

Placeholder

### Stacking of non-spacing combining marks

When multiple non-spacing combining marks are applied to a single base character, the different marks might each have the same default position in relation to the base character. For example, there may be a pair of marks that would be centred directly over the base character if they occurred on their own. When they occur together, however, they would not both occur in exactly the same position. That would lead to an illegible result. In these situations, the usual way in which this is handled is to have the combining marks stack vertically outward from the base character, with the marks that are nearest after the base character in the data corresponding to the glyphs that are positioned most closely to the glyph of the base. This can be seen in the following example:

![Vertical stacking](images/3300-4-vertical-stacking.png "Vertical stacking of combining marks")

Note that this is not followed in all writing systems, however. In some situations, certain combinations of combining marks that have the same positioning behaviour will be positioned side-by-side rather than vertically. This happens, for example, in Vietnamese. The two behaviours are illustrated in the following example:

![Comparison](images/3300-5-vertical-side-by-side.png "Typical stacking of diacritics, and alternate side-by-side positioning")

### Variation selectors

Unicode includes some special control characters known as **variation selectors**. The purpose of these characters is to control the actual shape of a graphic character where the choice is not required by the context or otherwise determined by the behaviours for that script as a whole. The kind of variation this might be designed to deal with might be comparable to a change between similar font designs, such as between selecting between “g” **(displayed wrong!)** and “&#x0261;”, yet for certain reasons it is decided in the given instances that this should be controlled by a character-based mechanism. Note however, that these variation selector characters are not open to free use by users or font vendors as they might determine. When Unicode adds a variation selector to the standard, it is done on the basis that it has only a local effect, operating on a single character and not a run of text, and that it can be used only with specific characters and only with specific effects, both of which are specified in the Standard.

There are three of these variation selectors that were introduced for Mongolian in TUS 3.0, such as U+180B MONGOLIAN FREE VARIATION SELECTOR ONE, and additional variation selectors are **under consideration for future versions** to be applied to other scripts. No details are available as yet, however, regarding exactly which Mongolian characters these can be applied to, or what the specified affect on those characters is.

### Control of ligature formation

It was mentioned above that a script may have obligatory ligatures that are always required, such as the _lam-alef_ ligature in Arabic. Many scripts have discretionary ligatures, which can be added as the user considers appropriate by applying font formatting properties in rich-text data. In certain circumstances, however, it may be necessary for the choice of ligatures to be preserved in plain text, implying the need for a character-based control mechanism.

The semantics of U+200C ZERO WIDTH NON-JOINER and of U+200D ZERO WIDTH JOINER were extended in TUS 3.1 in order to control ligature formation as well as their original functions of controlling the shaping behaviour of cursively-connected characters. Specifically, ZWJ can be used to request a ligature form, and ZWNJ can be used to prevent a ligature form. For example, a ligature for “” would not typically be expected in text, but it could be requested by encoding the sequence &lt;U+0063 LATIN SMALL LETTER C, U+200D ZERO WIDTH JOINER, U+0074 LATIN SMALL LETTER T&gt;. Similarly, the “” ligature is relatively common, but one could ensure that the ligature is avoided by encoding the sequence &lt;U+0066 LATIN SMALL LETTER F, U+200C ZERO WIDTH NON-JOINER, U+0069 LATIN SMALL LETTER I&gt;.

It is important to note that this use of ZWJ does not require conformant implementations to produce ligatures; it merely requests that a ligature be used if possible. Thus, older fonts that do not support this behaviour are not considered non-conformant. At the same time, font developers should take note of this new mechanism in order to provide support for it in fonts. Because of the nature of ligatures and the mechanism for using ZWNJ to block ligatures, however, it should not require any special steps in order to make it work, as long as an instance of ZWNJ in data does not result in the display of a visible glyph.

It should also be noted that this general principle does not apply to Indic scripts, for which ZWNJ and ZWJ have specific behaviours, as described above.

For more details on the use of ZWJ and ZWNJ to control ligature formation, see Article V of UAX #27.

### Other rendering behaviours

The previous sections focused focused on particular rendering behaviours because they are likely to be highly important for many implementations, because they involve important issues that apply in a number of situations, or in the last two cases, because they are specialised behaviours that may be unfamiliar. There are a number of other rendering behaviours that are relevant to other situations, but which are not being described in any detail here. Some of these do not involve normative behaviours defined by the Standard. For example, there are different preferences for the shapes of Han ideographs in different locales. This is an important issue for certain implementations, but it is not a normative behaviour that is specified by Unicode. Also, some of these other rendering behaviours would be of less importance to many implementations. For example, the details for rendering Khmer script that differ from the common patterns described for Indic scripts in general are fairly particular to that script.

Even for the groups of scripts that pertain to the rendering behaviours described above, only a summary has been given. Thus, for any script, the reader is advised to read the appropriate section within [Chapters 7–20][uni-core-spec] of TUS to learn about the complete details that relate to that particular script.

## Deprecation

Deprecated characters are encoded characters whose use is strongly discouraged for either architectural reasons, or because they may cause implementation problems. They remain in the standard for data to remain comformant, but they should not be used. Unicode code charts explicitly indicated in the annotations.  

_Portions of this content first appeared in [Guidelines for Writing System Support][wsig], copyright © 2003 UNESCO and SIL International._


[compose-decompose]: https://scripts.sil.org/cms/scripts/page.php?id=nfc_vs_nfd&site_id=nrsi
[dotless-letters]: https://scriptsource.org/entry/k3fmzy7abd
[glo-bom]: /reference/glossary#bom
[glo-character-encoding-form]: /reference/glossary#charencform
[glo-character-encoding-scheme]: /reference/glossary#charencsch
[glo-character-set-encoding]: /reference/glossary#charsetenc
[glo-character]: /reference/glossary#char
[glo-encoding]: /reference/glossary#enc
[glo-grapheme]: /reference/glossary#grapheme
[glo-grapheme]: /reference/glossary#grapheme
[glo-plane]: /reference/glossary#plane
[glo-pua]: /reference/glossary#pua
[iws-appendix-b]: https://scripts.sil.org/cms/scripts/page.php?id=iws-appendixb&site_id=nrsi
[iws-character-encoding-basics]: https://scripts.sil.org/cms/scripts/page.php?id=iws-chapter03&site_id=nrsi
[res-code-converter]: https://r12a.github.io/app-conversion/
[res-confusables]: https://util.unicode.org/UnicodeJsps/confusables.jsp
[res-precomposed]: https://scriptsource.org/entry/r8cbwvep6z
[res-string-length]: https://www.youtube.com/watch?v=wCExnGiMeF0
[ucd-spreadsheet]: https://github.com/silnrsi/unicode-resources/tree/main/ucd-spreadsheet
[uni-UCD-html]: http://www.unicode.org/Public/UNIDATA/UnicodeCharacterDatabase.html
[uni-UCD]: https://www.unicode.org/Public/UNIDATA/
[uni-blocks]: https://www.unicode.org/Public/UNIDATA/Blocks.txt
[uni-bmp]: https://www.unicode.org/roadmaps/bmp/
[uni-case-mappings]: https://www.unicode.org/versions/latest/core-spec/chapter-5/#G21180
[uni-case-normative]: https://www.unicode.org/versions/latest/core-spec/chapter-4/#G124722
[uni-ch2-encoding-forms]: https://www.unicode.org/versions/latest/core-spec/chapter-2/#G13708
[uni-ch22-numerals]: https://www.unicode.org/versions/latest/core-spec/chapter-22/#G12146
[uni-ch22]: https://www.unicode.org/versions/latest/core-spec/chapter-22/
[uni-ch23]: https://www.unicode.org/versions/latest/core-spec/chapter-23/
[uni-ch24-code-charts]: https://www.unicode.org/versions/latest/core-spec/chapter-24/
[uni-ch4.5]: https://www.unicode.org/versions/latest/core-spec/chapter-4/#G124142
[uni-ch4]: https://www.unicode.org/versions/latest/core-spec/chapter-4/
[uni-ch5.13]: https://www.unicode.org/versions/latest/core-spec/chapter-5/#G1050
[uni-ch5.8]: https://www.unicode.org/versions/latest/core-spec/chapter-5/#G10213
[uni-ch5]: https://www.unicode.org/versions/latest/core-spec/chapter-5/
[uni-ch6]: https://www.unicode.org/versions/latest/core-spec/chapter-6/
[uni-ch9-arabic]: https://www.unicode.org/versions/latest/core-spec/chapter-9/#G20596
[uni-ch9-syriac]: https://www.unicode.org/versions/latest/core-spec/chapter-9/#G13005
[uni-charts]: https://www.unicode.org/charts/
[uni-conformance]: https://www.unicode.org/versions/latest/core-spec/chapter-3/
[uni-core-spec]: https://www.unicode.org/versions/latest/core-spec
[uni-data-files]: https://www.unicode.org/unicode/onlinedat/online.html
[uni-dflt-case-algorithms]: https://www.unicode.org/versions/latest/core-spec/chapter-3/#G33992
[uni-middle-east]: https://www.unicode.org/versions/latest/core-spec/chapter-9/
[uni-nameslist-html]: https://www.unicode.org/Public/UNIDATA/NamesList.html
[uni-nameslist]: https://www.unicode.org/Public/UNIDATA/NamesList.txt
[uni-scripts]: https://www.unicode.org/Public/UNIDATA/Scripts.txt
[uni-smp]: https://www.unicode.org/roadmaps/bmp/
[uni-utr14]: https://www.unicode.org/reports/tr14/
[uni-utr24]: https://www.unicode.org/reports/tr24/
[uni-utr44]: https://www.unicode.org/reports/tr44/
[uni-utr9]: https://www.unicode.org/reports/tr9/
[uni-utr]: https://www.unicode.org/reports/
[uni-where-character]: https://www.unicode.org/standard/where/
[wsig]: https://scripts.sil.org/wsi_guidelines.html
[wstr-unicode-bidi-algorithm]: /topics/encoding/unicode-bidi-algorithm

