---
title: Unicode Sort Tailoring
description: Resources and a Tutorial for Unicode Sort Tailoring
tags: [collation, contractions, equivalence, ignorables, tailorings, reordering]
authors: Martin Hosken, David Rowe
lastUpdated: 2021-09-23
---

## Resources

Here are a number of resources for creating and using a sort tailoring.

- Sort trainer program: The [collation GitHub repository][collation] contains a sort trainer program. It was written in Python 2 and runs on Linux. It has not been updated for Python 3 and may be difficult to install on other operating systems. (The following item may be a better option.)
- The [ICU Collation Demo][icu-collation] page provides an online tool similar to the "sort trainer program" listed above.
- The **Unicode Sort Tailoring: Tutorial** is below. This tutorial elaborates the process of using the ICU (International Components for Unicode) collation tailoring language to establish a Unicode sort tailoring. When originally written (2006), it used the sort trainer program (above) for the exercises. The revised (2021) version offers the alternative ICU Collation Demo page as an option for the exercises.
- Once a sort tailoring is created, how is it used? [simplesortdemo.py][simplesortdemo] is a simple Python 3 script demonstrating ICU sorting in Python.
- [Enabling Languages - Introduction to collation][el-collation] has more advanced examples of ICU sorting.

## Tutorial

This tutorial is designed to give readers some experience in tailoring sort orders using the ICU (International Components for Unicode) collation tailoring language. Readers wanting just an appreciation level understanding should aim to complete Exercise 3. Those needing to create their own tailorings for a Roman based script should complete Exercise 5 or 6.

Those needing a deeper understanding sufficient for troubleshooting and for more complex sorting problems should aim to complete as many of the exercises as they can, particularly those pertinent to the types of sort tailoring issues they may encounter. The later exercises have valuable discussion in the answers. Readers are encouraged to attempt those exercises at least to the level of being able to understand the answers.

NB: Specific values for sort keys have not been updated since the tutorial was first written, so values in this tutorial will likely be different from sort keys that you generate, but the principles remain the same.

### Unicode Collation

The [Unicode Collation Algorithm (UCA)][uts10] is the Unicode standard way of comparing strings for sorting purposes. In addition to it being part of the Unicode Standard, the principles involved are used in other collation standards. The particular syntax that this tutorial covers also is used, in a modified form, in the Locale Data Markup Language ([UTS #35, LDML][uts35]) used by a number of operating systems for describing language specific information.

For complete details of the algorithm and how it works, readers are encouraged to read as much of [UTS #10][uts10] as they can handle. The more you understand of that document the better you will be at creating sort orders. Here we give the basics of the algorithm.

#### How does Collation Work?

A string is converted to a sequence of sort keys by looking up each character or run of characters in a map. The map allows for one character to map to one or more keys and also allows a sequence of characters to map to one or more keys.

The next three paragraphs have some detail of how sort keys are constructed and used. You do not need to fully understand this discussion, but a general idea of how sort keys work will be helpful.

Each key consists of four 16-bit numbers. The first number is the primary order, the second the secondary order and so on. Two strings are compared by comparing the series of primary order key values and if there is no difference then the secondary order values are compared and so on until the 4th level which is a tie-break level, such that two different strings will sort relative to each other in a repeatable way. Typically, for Latin script, level 1 is used for base characters, level 2 for diacritics and level 3 for case.

So, for example, if ‘a’ has the key [2800.0500.0500.0061] and ‘b’ has the key [2A00.0500.0500.0062] then when the two strings are compared, the first values of each key are compared with 2800 being less than 2A00 and so ‘a’ collating before ‘b’. Since the tie break value is usually just the Unicode value, we’ll ignore it for all future discussions.

Going further, consider ‘à’ with a key of [2800.0500.0500][0000.868F.0500] and ‘á’ with a key of [2800.0500.0500][0000.868D.0500]. Notice how the keys have been built as sequences (base character as primary key, diacritic as secondary key), since normalization rules say that NFD (‘decomposed’) and NFC (‘composed’) are treated the same. So we will consider things in terms of NFD. Comparing the primary keys we compare 2800 vs 2800 (any 0000 key is ignored). Thus the two characters are the same at the primary level. Secondarily we compare 0500 868F vs 0500 868D and see that the second comes before the first.

The basis, therefore, for defining a sort order is to give each character in a character set a sort key. This has been done for all of Unicode resulting in there being a default sort order. This default sort order is known as the Default Unicode Collation Element Table (DUCET). The DUCET may well be sufficient for a particular writing system’s needs, in which case there is no need to specify a tailoring for that particular writing system. But it may be that the default sort order is insufficient. Perhaps ‘á’ needs to have a primary sort order that puts it before ‘a’.

#### Tailoring

One could look at the default keys for the default sort order for Unicode, work out what key value would achieve the desired result for ‘á’ and then pass it to the sorting application to replace or add to the Unicode set. But that’s a lot of work and the Unicode default key values can change with each new version.

A better solution therefore is to find a program that will take a description of the relative order of characters and produce the sort keys for you, and better still do all the collation for you so that you never need to interact with a sort key.

[ICU (International Components for Unicode)][icu] is a library of functions produced by IBM that is freely available and has very good Unicode support. It is used in a number of programs including FieldWorks. It has also set the standard for specification of collation within Unicode.

This tutorial is about using the ICU language for collation tailoring so that you can create a tailoring for any writing system you may need to work on.

There is a limitation to ICU sorting. For ICU, collation tailoring does not involve re-ordering. ICU only handles simple key tailoring. Although it does provide a mechanism for transforming strings, this is outside the scope of this tutorial and is not part of the standard collation API.

### Introduction to the exercises

This tutorial will take the form of a series of graduated exercises. So the typical format will be some discussion followed by an exercise to reinforce what has been learned, then more discussion and so on.

The exercises instruct you to use the ‘sort trainer’ or the ‘sort training program’. This refers to the ‘sort_trainer’ program in the [collation][collation] repository. It was written for Python 2 on Linux. It has not been updated for Python 3 and may be difficult to install on other operating systems.

An alternative, provided you have Internet access, is to use the online ICU collation demo page.

Specifically:

When the tutorial says:|substitute:|
---|---|
Using the sort trainer,|Use [the ICU demo on collation][icu-collation]|
create a test data set of:|enter data in the ‘Input’ box|
and a sort order of:|enter the sort tailoring rules in the ‘Append rules’ box|
Sort the test data|click the ‘Sort’ button|
Look at the generated sort keys|The ICU Collation Demo has some display options to the right of the ‘Sort’ button. One of these is ‘sort keys’ which will display sort key information, though not in exactly the same format as the sort trainer and the tutorial. Thus, in the final exercise, where the tutorial discusses sort keys, the online demo page doesn't have the same format for sort key information.|

### Simple Collation

We start with something simple. Let’s sort ‘y’ before ‘x’. The basic syntax for describing the relative order of two characters or sequences of characters is:

```
    y < x
```

This says that ‘x’ comes after ‘y’ at the primary level. For secondary relationships we use ‘<<’ and ‘<<<’ for tertiary.

But this also says that ‘y’ comes before ‘x’, so which is it? Do we create a new key for ‘y’ or for ‘x’? ICU uses the ‘&’ character to mark a _reset_ point. So we can write:

```
    &y < x
```

Which says that ‘x’ receives a new key such that it sorts immediately after ‘y’ at the primary level. ICU doesn’t allow the syntax `y < &x`, but we will come to how to specify that ‘y’ gets a new key in a later section.

#### Exercise 1

1. Using the sort trainer, create a test data set of:

```
    x
    y
```

And a sort order of:

```
    &y < x
```

Sort the test data to ensure that the order works.

This is all very well if all we want is to consider primary ordering. But what about things like case relationships? Does the tailoring handle those as well?

2. Now add
```
    X
    Y

```

to the test data and sort. Do you get the results you would expect?

Tailoring one character does not pull with it the keys for any other characters. So we have to express the relationships for all those characters too. In the case of uppercase, we want to say that in all respects, treat an `X` like an `x`, except when there is no other difference. For this we need to use a tertiary relationship. We could write, as the complete sort tailoring:

```
&y < x
&x <<< X
```

But we can combine the definition (x) and reset (&x) together and simplify the specification to:

```
&y < x <<< X
```

3. Change your sort order to have this data sort correctly.

4. Now add:

```
    ẍ
```

which is an `x` followed by U+0308 (combining dieresis) to the test data. (You may need to use a font like **Doulos SIL** and character map to insert the letter sequence. Note that the ICU Collation Demo page will display the resulting output as ‘x\u0308’ rather than ‘ẍ’.)

When you sort, is the result what you expected?

### Diacritics

Diacritics are often used for two kinds of purposes. The first use we will examine is for
marking suprasegmental information such as tone. Such characters are usually not given a
primary sort order position, but are only considered secondarily. Thus we want them to be
ignored for the purposes of primary sorting, but have a secondary sort key. For example, if we wanted a grave accent (U+0300) to sort before an acute accent (U+0301) we could use:

```
&\u0300 << \u
```

But all that handling of specific Unicode characters can get in the way of understanding when we are learning. So, for the purposes of this tutorial, we will treat ', ` and " as being tone marks. The problem is that none of them have a DUCET key that corresponds to something that is ignored for primary sorting. Instead we have to use a special element:

```
&[first primary ignorable] << '' << '`' << '"'
```

to specify that we want these characters treated as secondary (that is, ignored at the primary level). The tailoring language has a number of special elements like this. There is a complete list below (after the last exercise).

Notice that we also have to escape the punctuation characters: apostrophe is doubled and grave and double quote are enclosed in apostrophes. This says we want to sort \' (apostrophe) before \` and \` before ", but only when the primary sort keys are equal.

#### Exercise 2

1. Without using the sort testing program, use the above tailoring to sort the following list of words by hand:

```
       ba'd bad ba"bel ba'bel baad baa`d
```

2. Use the sort tester to check whether you were right.

The other use of diacritics is to extend a set of characters, for example to add more vowels without having to create new letter shapes. Let’s consider `e'` as another vowel in the sequence `a e e' i o u`. How might we express this sort sequence?

```
&e < e''
```

Note that we can associate a single sort key with a sequence of characters (`e'`), as is done here.

### Identifying a Sort Order

We are not necessarily presented with a sort order in terms of primary, secondary and tertiary character relationships. Very often, all we have is a sorted word or syllable list. In extracting the relationships it is not obvious what is a primary and what is a secondary relationship. One rule of thumb is that primary relationships result in words being separated more widely than secondary relationships and so on.

#### Exercise 3

This exercise is made harder by having no information at all about the characters outside the
word list. This is rarely the case, so if you understand this exercise you are well on your way.

1. Using the alphabet of characters: `a b c`, derive a sort order that results in the following sorted list of words.

```
       bbc bac bca abc cac
```

2. Using the alphabet of characters: `w x y z`, derive a sort order that results in the  following sorted list of words. (Hint: one of the characters is secondary.)

```
       yywz ywyz ywyxz ywwz ywxwz ywz wyxyz wywy wywz
```

At this point we have covered the basics of sort tailoring and most tailorings can be written just from the principles we have discussed. The later sections discuss extensions to the basic sort tailoring to address situations beyond the basic language.

### Complex Simplicity

Let us return to the example in the introduction and say that we want ‘à’ to sort before ‘a’.

You might want to try writing your own sort order for this and you’ll probably end up with
something like:

```
&à < a
```

The problem is that if you do this and test it, you will find that it doesn’t work. Why?

Let’s read it from the point of view of the computer:

Leave the sort key for the sequence ‘a’ + ‘ˋ’ alone and then create a new key for ‘a’ that puts it after this sequence. The problem is that the second part is impossible since you can’t create a key such that x+y < x it would mean that y < nothing, i.e. that y sorts before nothing. We may want that but with the UCA we can’t have it.

The solution is to specify a new key for the sequence ‘a’ + ‘ˋ’ and leave the ‘a’ where it is. The ICU language provides a mechanism for this:

```
&[before 1]a < à
```

The ‘[before 1]a’ means: Create a primary key that comes before ‘a’. (The key is ‘primary’
because of the ‘1’. Use ‘[before 2]’ for secondary and ‘[before 3]’ for tertiary.) Then the rest of
the line puts ‘à’ directly after this new key, which will place it before ‘a’ as required.

#### Exercise 4

1. Create a sort order and test data for the sequence: ‘à’ ‘a’ ‘á’ in that primary order. Also handle capitals correctly.
2. Change the order so that the difference is secondary. Why is it difficult to test whether the change was done correctly?

#### Exercise 5

1. Given a collation tailoring:

```
&a < x
&a < y
```

and test data:

```
a
b
c
x
y
z
```

what result would you expect?

2. Use the sort tester to check whether you were right.

### Contextual Collation

It is possible also to specify that a string has a particular collation relationship with another string only if the string being defined occurs after a particular string context.

The syntax for this is _context_ | _string_. The effect of this command in terms of what keys are created is best described using an example:

```
&a < b|c
```

This creates a new key for `bc` that is made by making a new primary key `a+` based on the key for `a` and prepending `b` to it, i.e. `ba+`

So when ‘c’ is preceded by ‘b’, ‘c’ sorts directly after ‘a’. So

```
aa ab ac ba bb bc
```

sorts as:

```
aa ab ac ba bc bb
```

The following exercise demonstrates the use of this. It is taken from Iu Mien and, while being a cut down alphabet for exercise purposes, it covers the key difficulties in sorting this language.

#### Exercise 6

A Iu Mienh syllable consists of:

```
C V* F? T?
```

That is, an initial consonant (which may be a character sequence representing a single
consonant), some optional vowel letters, an optional final letter and an optional tone letter.

For the purposes of this exercise we will allow at most one vowel letter and the classes consist of (in sorting order):

```
C = c h hn n p
V = a e
F = n
T = h c
```

Notice how `c` and `h` change their relative order depending on whether they are functioning as an initial consonant or a tone mark.

The fact that the vowel is optional implies that Iu Mienh has an inherent vowel. This vowel
only occurs with a nasal initial, followed by an optional tone. So we can update our syllable description to be:

```
C V F? T?
N T?
```

where

```
N = hn n
```

Syllables are separated from each other by space or punctuation (including a hyphen).

1. Produce a complete set of syllables for this writing system excluding all syllables that cannot occur in the language.
2. Produce a sort tailoring that sorts the list correctly.

### Diacritics that Sort Before

Shoebox and Toolbox have the concept of a secondary sort element that sorts before an
unadorned primary element. An example of this might be the accent diacritics from Exercise 2. Is there some way of achieving the same thing generically within the UCA/ICU world?

Consider the secondary sort key value for some character, and give it a value _x_. If we then have a secondary diacritic that we place after it with a secondary sort key of _y_, the combined secondary sort key is going to be _x.y_ and this value cannot be less than _x_. (The proof is left to the more mathematically minded student.) So there is no way that we can make a sort key that is less than a character’s sort key just by appending another character. This rules out any generic approach as presented in the last section. Instead we must list all the pairs explicitly.

#### Exercise 7

1. Consider the alphabet M, N which are primary elements, and x, y which are secondary elements that have no primary order. A syllable is M or N, optionally followed by x or y. Create test data and a sort tailoring to express these relationships.
2. Add two new diacritics a and b such that a << b and Mb << M. A syllable is now M or N, optionally followed by x or y, optionally followed by a or b. Create a sort order and test data that handles this new alphabet.
3. What is the relative sort order of ‘Mxa’, ‘Mx’ and ‘My’? Why?

The following exercise takes things further. It is based on the common occurrence in Indic
scripts of Independent Vowels. For the most part, vowels in Indic scripts are diacritics. But if a word needs to start with a vowel, an independent vowel (acting much like a consonant) may be used. Sometimes, though, a simple glottal or a vowel base character is used with the dependent vowel. Which is used depends on the etymology of the word.

#### Exercise 8

In this exercise we extend the alphabet from Exercise 7.

1. For each of our diacritics, we will add independent vowel forms. So for ‘a’ there is ‘A’, ‘b’ has ‘B’, ‘x’ has ‘X’ and ‘y’ has ‘Y’. We will also consider that ‘Na’ is much like the dependent form of the vowel ‘a’ with the neutral or glottal consonant ‘N’. So we want to say that the relative ordering of ‘Na’ comes before ‘A’. We specify that Na <<< A and likewise for each of the correspondences. Change the sort order accordingly and test.
2. Add two tone marks to the alphabet: ' and ", which optionally follow a syllable. (Remember that non-alphanumeric characters are escaped by enclosing them in apostrophes, except for the apostrophe which is escaped by doubling it, thus '' and '"'.) Tone marks have a tertiary sorting such that M <<< M' <<< M". Create a new sort order and test.

### Contractions

ICU has the concept of a contraction. This is where a single sort key is created from a sequence of input codes. We have already been using such a concept with such collation orders as Mb << M. But ICU allows the use of it on the collation key being defined.

As an example, consider the phonebook ordering of German:

```
&a<<æ/e<<ä/e
```

This is equivalent to:

```
&ae<<æ
&æ<<ä
```

In fact the rule `&ae << æ` is implemented as if it were written as `&a<<æ/e`.

While such contractions are not essential to creating collation orders, understanding how they work can be helpful, particularly when it comes to dealing with problems. What the
contraction: &a<<æ/e says is that the key for æ is made by creating a new key that sorts
secondarily after ‘a’, and then appending the key for ‘e’ onto that. The resulting combined key is then given to ‘æ’. The effect of this is that æ sorts after ‘ae’.

### Reordering

There are some strange collation schemes in the world. One example is that of non-linear
sorting. This is where words are not collated left to right, but where a later character has more piority than an earlier one. In Burmese, for example, the syllable structure is basically:

Consonant Medial Vowel Final_consonant Tone (C M V F T). But when sorted the priority
order is C M F V T! One approach to addressing this would be to preprocess each string to
reorder the Final to before the Vowel and then do a more conventional collation comparison. In fact the Unicode Collation Algorithm supports this concept. But over the years preprocessing has fallen out of favour because it slows up sorting and also people have found ways of expressing the reordering using just the tailoring language.

For reordering, what we want to say is that V F sorts as if it were F V. Here is one such
tailoring rule:

```
&F = VF/V
```

This rule says: make a new key for the sequence VF that is identical to the sequence of sort keys FV.

### Miscellaneous Features

#### Equivalence

If you want to make two characters/sequences have an identical sort key use the = for example:

```
a=b
```

In fact the two elements are not given identical sort keys, but are made identical down to below the 3rd level. At the 4th level they are made different purely by their Unicode USV in some arbitrary way. This is to ensure a stable sort, so that data will always sort the same way even if you don’t care which way it is.

#### Ignorables

If you want to make a character/sequence ignored then set it equal to the empty sort key:

```
&[first tertiary ignorable]=c
```

#### Default Strength

This allows the collation order to specify at what level of sorting ‘normal’ sorting should occur. The syntax is:

```
[strength 3]
```

With 3 being the default.

#### Variable Weights

The UCA allows for a system of variable weights. For example, in some contexts one doesn’t
want to account for spaces when sorting. There are two types of alternate sorting: non-ignorable is the default with every variable sort key taking its specified value. Shifted alternate sorting makes variable sort keys ignored at all sort levels down to and including tertiary. For more details read the relevant section in UTS#10.

```
[alternate shifted]
```

In addition, it is possible to specify which keys have variable weights and which do not. Rather
than tag each sort key, we assume that all keys before a certain value are considered variable
and all those after are fixed. For example:

```
&x < [variable top]
```

#### Case Ordering

Different writing systems like to sort capitals vs lowercase in different ways. Some want
capitals first, others want lowercase first. Rather than having to tailor the whole alphabet where a writing system differs from the default Unicode order, there is an easy switch that can be used:

```
[caseFirst upper]
[caseFirst lower]
```

The default is not to force one over the other. In addition, it is possible to insert a specifically case ordering level between secondary and tertiary.

```
[caseLevel on]
```

So, for example if one wanted to sort with case specific order but ignore diacritics one can set:

```
[strength 1]
[caseLevel on]
```

#### The Backwards French

For reasons known only to the French, they like to compare their diacritics backwards. That is, given two strings they compare each primary key from beginning to end, and if equal they compare the secondary keys from the end to the beginning. This can be enabled by putting:

```
[backwards 2]
```

At the beginning of the sort order.

#### Numeric Sorting

This nifty feature allows one to specify that numbers are to be sorted as numbers rather than as letters. This means that 21 < 123 for example. If enabled, any strings of numbers in the two strings will be compared numerically rather than sort key by sort key.

```
[numeric on]
```

#### Optimisations

There are various settings that can be used to indicate optimisations to the collation engine.

```
[normalization on]
```

This specifies that only fast normalizations should occur. For more details of this read the section on [Canonical Equivalence][canonical-equivalence]. Basically it says, no data will have more than 1 diacritic or if it does those diacritics will always be guaranteed to be in canonical order.

```
[suppressContractions [first-last]]
```

This optimisation says that between the given characters there are no multicharacter sequences to be checked. Thus if we are converting a string to keys and come to a character within this range, there is no need to test for a multicharacter sequence starting with this character and we can immediately simply lookup the single character code key.

This completes the primary tutorial on collation tailoring. We have covered all the key syntax of the ICU collation language. We have seen how different collation problems can be solved
and looked at various examples cut down but motivated by real life collation issues.

### Sort Keys

In this section we look deeper at the question of sort keys. Creating a good collation order can be difficult and at times it can be hard to work out what is going on and why data sorts in a particular way. The principal approach to debugging and troubleshooting such issues is to look at the sort keys generated and to resolve why the particular collation tailoring has resulted in those sort keys.

At the beginning of the tutorial we briefly introduced sort keys. Here we will go into the details of how ICU creates its sort keys, and while not complete, we hope that you will be able to read a list of sort keys and from that understand what needs to happen to a collation tailoring to make it do what you want it to do.

#### Fractional Collation Elements

The core to a theory of collation elements is the idea of a fractional collation element. Let’s just consider one sorting level for now. The principal holds for all levels the same and there is no interaction so we can simply extend what we learn.

Rather than giving a collation element a fixed length value (say 16-bits) we can make the
length of a key variable. We do this by making the number in effect 0.xx yy zz, so a sort key of 3D 4F is 0.3D 4F which is going to sort after a sort key of 0.3D which could be 0.3D 00 or whatever. The fun thing is that we can build up fractional sort keys by merely appending values. And it doesn’t matter how long each of the keys we append are. In fact the 0.3D 4F is probably a sequence of characters. The reason we can say that is that there is one special criteria that is needed in creating keys so that this technique will work: A fractional weight may not exactly match the initial bytes of another fractional weight. So we could have 0.3D 12 76 and 0.3D 4F, but not 0.3D and 0.3D 4F. So taking these two keys and appending another element of say 0.98 43, we get 0.3D 12 76 98 43 and 0.3D 4F 98 43 which still have the same relative order.

How is a fractional collation element turned into a sort key that we recognise? First the
sequence of bytes is turned into 16-bit keys, appending 0 values as needed. Thus our two keys become [3D 12] [76 00] and [3D 4F] accordingly. Next, we consider the levels below primary and see if we can squash them, because very often the values are identical, we get things like a string of 05 05 05 05 05 (one for each character in a string). If we could reduce this we could simplify the collation element greatly.

First we look for a sequence of common bytes (of value C). Then we look for other values in
the string that are greater than C and pick a value T that is greater than C but less than the lowest of the values we find. Compression then proceeds using the approach in the following table (from the ICU Collation Design document)

Original Bytes|||||Result Bytes||||
 -- | --| --| -- |--| --| -- |--|--|
C|H||||T|H||||
C|C|H|||T-1|H|||
C|C|C|H||T-2|H|||
C|C|C|...|H|T-n|T|H|
C|C|C|...|L|C+n|C|L|
C|C|C|L||C+2|L||
C|C|C|||C+2|
C|C|L|||C+1|L
C|C||||C+1||
C|L||||C|L|

So for example a sequence of 05 05 07 would become 7E 07 and a sequence of 05 05 03 would
become 06 03.

In addition there is primary key compression that can occur. For this sequences of bytes
involving repeated initial bytes can be compressed to remove the repeated bytes. Thus:

```
xx aa xx bb xx cc xx dd mm
```

gets compressed to

```
xx aa bb cc dd ** mm
```

The value of ** depends on the relative order of mm and xx. If mm < xx then ** is a number
less than any of the possible values that can follow xx, say 02. If xx < mm then ** is the
highest number greater than all possible values that can follow xx, say FF.

So long as all the keys being compared agree on xx, this compression scheme will work. But
since it is rare for all keys to begin with xx, primary sort key compression rarely occurs.

If you are aware of the compression techniques being used it is possible to work out what the original fractional keys are and hence what may have caused the particular collation element to have the sort keys it results in.

#### Exercise 9

1. Take your answer to Exercise 1 and the list of test strings: x, X, y, Y, ẍ and enter them in the sort training program. Then press ‘Sort keys’.
2. Why does ‘x’ have a 2 byte primary sort key when normal ASCII letters have a single byte sort key normally?
3. Add z to the test set and press ‘Sort keys’ again. What further light does this shed on how keys are assigned?
4. Given only the sort keys for ‘x’ and ‘ẍ’, can you infer the sort key for ‘◌̈’ (U+0308)  given that it only has a single byte secondary sort?

## Special Collation Elements

Name|Current CE value|Note|
----|---|---|
[first tertiary ignorable]|[,,]|Start of the UCA table. This value will never change unless CEs are extended with higher level values. This key basically doesn’t exist, since it has no sort key. As noted above under Miscellaneous Features, Ignorables, you can use this key to make a character or sequence ignored for sorting purposes.|
[last tertiary ignorable]|[,,]|This value will never change unless CEs are extended with higher level values. This is identical to the first tertiary ignorable all for intents and purposes.|
[first secondary ignorable]|[,, 05]|Currently there are no secondary ignorable in the UCA table. Useful for setting tertiary sort keys. Try setting before this.|
[last secondary ignorable]|[,, 05]|Currently there are no secondary ignorable in the UCA table. Useful for setting tertiary sort keys. Try setting them after this.|
[first primary ignorable]|[, 87, 05]|Current code point is (U+0332). You want your secondary sort key (primary ignorable) to go before this, perhaps.|
[last primary ignorable]|[, E1 B1, 05]|Currently this value points to a non-existing code point, used to facilitate sorting of compatibility characters.|
[first variable]|[05 07, 05, 05]|Current code point is U+0009. This is the start of the variable section. These are characters that will be ignored on primary level when shifted option is on.|
[last variable]|[17 9B, 05, 05]|End of variable section.|
[first regular]|[1A 20, 05, 05]|Current code point is ː (U+02D0). This is the first regular code point. The majority of code points are regular.|
[last regular]|[78 AA B2, 05, 05]|Current code point is (U+10425). Use instead of [top]. This will effectively position your tailoring between regular code points and CJK ideographs and unassigned code points. If you want to rearange a large number of codepoints (rearranging CJKs for example), this is a right place to reset to.|
[first implicit]|[E0 03 03, 05, 05]|Section of implicitly generated collation elements. CJK ideographs and unassigned code points get implicit values.|
[last implicit]|[E3 DC 70 C0, 05, 05]|End of implicit section.|
[first trailing]|[E5, 05, 05]|Start of trailing section. This section is reserved for future, most probably for non starting Jamos.|
[last trailing]|[E5, 05, 05]|End of trailing collation elements section. Tailoring that starts here is guaranteed to sort after all other non-tailored code points.

## Standard Tailorings

Here we include a few major language group tailorings. Others can be found at
[https://github.com/unicode-org/cldr/tree/master/common/collation][uni-collation]. For many languages, the root collation is sufficient.

es: Spanish (two tailorings, standard then traditional, where ‘ch’ and ‘ll’ are separate elements)

&#x00A0;|&#x00A0;|
--|--|
&#x00A0;|&N<ñ<<<Ñ|
traditional|&N<ñ<<<Ñ&C<ch<<<Ch<<<CH&l<ll<<<Ll<<<LL|

et: Estonian

&#x00A0;|&#x00A0;|
--|--|
&#x00A0;|&[before 1]T<š<<<Š<z<<<Z<ž<<<Ž|
&#x00A0;|&[before 1]X<õ<<<Õ<ä<<<Ä<ö<<<Ö<ü<<<Ü|


hu: Hungarian

&#x00A0;|&#x00A0;|
--|--|
&#x00A0;|&C<cs<<<Cs<<<CS &D<dz<<<Dz<<<DZ &DZ<dzs<<<Dzs<<<DZS|
&#x00A0;|&G<gy<<<Gy<<<GY &L<ly<<<Ly<<<LY &N<ny<<<Ny<<<NY|
&#x00A0;|&S<sz<<<Sz<<<SZ &T<ty<<<Ty<<<TY &Z<zs<<<Zs<<<ZS|
&#x00A0;|&O<ö<<<Ö<<ő<<<Ő &U<ü<<<Ü<<ű<<<Ű &cs<<<ccs/cs &Cs<<<Ccs/cs|
&#x00A0;|&CS<<<CCS/CS &dz<<<ddz/dz &Dz<<<Ddz/dz &DZ<<<DDZ/DZ|
&#x00A0;|&dzs<<<ddzs/dzs &Dzs<<<Ddzs/dzs &DZS<<<DDZS/DZS &gy<<<ggy/gy|
&#x00A0;|&Gy<<<Ggy/gy &GY<<<GGY/GY &ly<<<lly/ly &Ly<<<Lly/ly|
&#x00A0;|&LY<<<LLY/LY &ny<<<nny/ny &Ny<<<Nny/ny &NY<<<NNY/NY|
&#x00A0;|&sz<<<ssz/sz &Sz<<<Ssz/sz &SZ<<<SSZ/SZ &ty<<<tty/ty &Ty<<<Tty/ty|
&#x00A0;|&TY<<<TTY/TY &zs<<<zzs/zs &Zs<<<Zzs/zs &ZS<<<ZZS/ZS|

mt: Maltese

&#x00A0;|&#x00A0;|
--|--|
&#x00A0;|[caseFirst upper] &[before 1]c<ċ<<<Ċ&[before 1]g<ġ<<<Ġ|
&#x00A0;|&[before 1]h<għ<<<gĦ<<<Għ<<<GĦ&[before 1]i<ħ<<<Ħ|
&#x00A0;|&[before 1]z<ż<<<Ż|


zh: Chinese (sort some accented vowels before unaccented forms)

&#x00A0;|&#x00A0;|
--|--|
(others cut)|&[before 2]a<<ā<<<Ā<<á<<<Á<<ǎ<<<Ǎ<<à<<<À|
&#x00A0;|&[before 2]e<<ē<<<Ē<<é<<<É<<ě<<<Ě<<è<<<È|
&#x00A0;|&e<<ê̄<<<Ê̄<<ế<<<Ế<<ê̌<<<Ê̌<<ề<<<Ề|
&#x00A0;|&[before 2]i<<ī<<<Ī<<í<<<Í<<ǐ<<<Ǐ<<ì<<<Ì|
&#x00A0;|&[before 2]m<<m̄<<<M̄<<ḿ<<<Ḿ<<m̌<<<M̌<<m̀<<<M̀|
&#x00A0;|&[before 2]n<<n̄<<<N̄<<ń<<<Ń<<ň<<<Ň<<ǹ<<<Ǹ|
&#x00A0;|&[before 2]o<<ō<<<Ō<<ó<<<Ó<<ǒ<<<Ǒ<<ò<<<Ò|
&#x00A0;|&[before 2]u<<ū<<<Ū<<ú<<<Ú<<ǔ<<<Ǔ<<ù<<<Ù|
&#x00A0;|&U<<ǖ<<<Ǖ<<ǘ<<<Ǘ<<ǚ<<<Ǚ<<ǜ<<<Ǜ<<ü<<<Ü|


## Bibliography

Aumann, Greg and Pan Chengqian "Report on the Iu-Mien—Chinese—English Dictionary"
(Asian Lexicography Conference, ChiangMai 2004)

[ICU Architectural Design][icu-arch-design]

[ICU Collation Customization][icu-customization]


## Answers

### Exercise 1

1. The results are:

```
y
x
```

2. No, the results are probably not what is expected, since the results of the sort are:

```
X
y
Y
x
```

and we want X to sort after x.

3. Using `&y < x <<< X` gives:

```
y
Y
x
X
```

4. You may have expected ẍ to sort after x, but since ẍ is x plus something else, it sorts after X.

### Exercise 2

1.

```
baad baa`d ba'bel ba"bel bad ba'd
```

### Exercise 3

1.

```
&b < a < c
```

There are other valid tailorings that achieve the same order. For example, omitting ‘c’ from the tailoring works as well, since ‘c’ is already after ‘b’ in the DUCET and inserting ‘a’ directly after ‘b’ means ‘a’ ends up before ‘c’. A tailoring doesn't need to specify every element of the writing system, because the tailoring is a modification of the DUCET.

2.

```
&y < w < z
&[first primary ignorable] << x
```

There are other valid tailorings that achieve the same order. For example, omitting ‘z’ from the first line of the tailoring works as well (for the same reason as listed above).

Analysing word lists to extract a sort order is not easy. For example, working out when a
character needs a secondary ordering rather than a primary, is not obvious. One way to
approach the question is to say that a character needs a secondary key if it cannot receive a primary key. That is, if it needs to sort both before and after another key, then it cannot have a primary relation with that key and it must be secondary or even tertiary. For example, ywwz < ywxwz implies w < x, but wyxyz < wywy implies x < w. You can't have both, so x takes a secondary key and then at a primary level we have ywwz = ywwz with x having an effect, and wyyz < wywy with x being ignored.

### Exercise 4

1.

```
&[before 1]a < à <<< À
```

But this alone does not specify the primary relation for á. The full answer is:

```
&[before 1]a < à <<< À
&a < á <<< Á
```

2.

```
&[before 2]a << à <<< À
&a << á <<< Á
```

Testing this with single characters is hard since there is no single character that we can use that will change its sorting position. But if we use the string ‘aa’ we can test to see if it sorts before á in the first case and after á in the second. Thus the sort sequences become:

1. à À a A aa á Á
2. à À a A á Á aa

### Exercise 5

You may have expected `a x y b c z`, but the resulting sort order is `a y x b c z`. The
first line says to give `x` a new key directly after `a`. The second line says to give `y` a new key directly after `a`, but this new key for `y` ends up before the new key for `x`, thus putting `y` before `x`. To specify that `x` comes after `a`, and `y` after `x`, use:

```
&a < x < y
```

(which is shorthand for `&a < x &x < y`).

### Exercise 6

1.

&#x00A0;|&#x00A0;|&#x00A0;|&#x00A0;|&#x00A0;|&#x00A0;|&#x00A0;|&#x00A0;|
--|--|--|--|--|--|--|--|
ca|cen|he|hna|hnen|nan|pa|pen|
cah|cenh|heh|hnah|hnenh|nanh|pah|penh|
cac|cenc|hec|hnac|hnenc|nanc|pac|penc|
can|ha|hen|hnan|n|ne|pan|
canh|hah|henh|hnanh|nh|neh|panh|
canc|hac|henc|hnanc|nc|nec|panc|
ce|han|hn|hne|na|nen|pe|
ceh|hanh|hnh|hneh|nah|nenh|peh|
cec|hanc|hnc|hnec|nac|nenc|pec|

2.

```
&c < h < hn < n < p < a < e
&h < a|c
&h < e|c
&h < n|c
```

### Exercise 7

1. The collation tailoring:

```
&[first primary ignorable] << x << y
```

results in: M Mx My N Nx Ny.

2. The collation tailoring:

```
&[first primary ignorable] << a << b << x << y
&[before 2]M << Ma << Mb
&[before 2]N << Na << Nb
```

Results in: Ma Mb M Mx Mxa Mxb My Mya Myb Na Nb N Nx Nxa Nxb Ny Nya Nyb

3. Relative order is: Mx Mxa My. Even though we put Ma before M, this doesn’t affect the
order of x and xa.

Again, we fall foul of the sequence problem. The only way I can think of getting around this
would be to do some preprocessing. Consider the following sort order:

```
&[before 2][first primary ignorable] << a << b << '|'
&[first primary ignorable] << x << y
```

Now we preprocess an incoming string such that a ‘|’ is inserted after every sequence of
characters involving a character with a primary sort key followed by any number of primary
ignorable characters. Thus we get the following sorted test data list:

Ma| Mb| M| Mxa| Mx| My| M|N| Na| Nb| N| Nx| Ny|

Which, if we strip the ‘|’ we find will be in the expected order, with Mxa before Mx.

But without preprocessing, we would need to list all the combinations in the tailoring.

### Exercise 8

1. The collation tailoring:

```
&[first primary ignorable] << a << b << x << y
&[before 2]M << Ma << Mb
&[before 2]N << Na <<< A << Nb <<< B
&Nx <<< X
&Ny <<< Y
```

results in: Ma Mb M Mx Mxa Mxb My Mya Myb Na A Nb B N Nx X Nxa Nxb Ny Y Nya Nyb

2. The collation tailoring:

```
&[first secondary ignorable] <<< '' <<< '"'
&[first primary ignorable] << a << b << x << y
&[before 2]M << Ma << Mb
&[before 2]N << Na <<< A << Nb <<< B
&Nx <<< X
&Ny <<< Y
```

results in: Ma Ma' Ma" Mb Mb' Mb" M M' M" Mx Mx' Mx" Mxa Mxa' Mxa" Mxb Mxb' Mxb"
My My' My" Mya Mya' Mya" Myb Myb' Myb" Na Na' Na" A A' A" Nb Nb' Nb" B B' B" N N'
N" Nx Nx' Nx" X X' X" Nxa Nxa' Nxa" Nxb Nxb' Nxb" Ny Ny' Ny" Y Y' Y" Nya Nya' Nya"
Nyb Nyb' Nyb"

### Exercise 9

Note that the specific sort key information listed here has not been updated since the tutorial was first written, so the values will likely be different than sort keys that you generate, but the principles remain the same.

1.

```

y     [5800.0500.0500]
Y     [5800.0500.8F00]
x     [5904.0500.0500]
X     [5904.0500.8600]
ẍ     [5904.869D.0600]
```

2.

We are moving x between y and z. This would give it a key of 59 but since we may want to
insert other characters between y and z and we don’t want to fall foul of the initial sequence constraint where one key may not be the initial sequence of another key, ICU gives x a 2 byte sort key starting with 59.

3.

```
y     [5800.0500.0500]
Y     [5800.0500.8F00]
x     [5904.0500.0500]
X     [5904.0500.8600]
ẍ     [5904.869D.0600]
z     [5A00.0500.0500]
```

4. `9D` is the secondary sort key for ` ̈ `  because `ẍ` has an uncompressed sequence of `05 9D` which according to the chart will be compressed into T H or `86 9D`. Not exactly great compression, but important to allow other keys to compress in the same way.


[collation]: https://github.com/silnrsi/collation
[el-collation]: https://github.com/enabling-languages/python-i18n/blob/main/notebooks/Collation.ipynb
[icu]: https://icu.unicode.org/
[icu-collation]: https://icu4c-demos.unicode.org/icu-bin/collation.html
[icu-arch-design]: https://unicode-org.github.io/icu/userguide/icu/design.html
[icu-customization]: https://unicode-org.github.io/icu/userguide/collation/customization/
[canonical-equivalence]: https://www.unicode.org/versions/latest/core-spec/chapter-5/#G24068
[uts10]: https://www.unicode.org/reports/tr10/
[uts35]: https://www.unicode.org/reports/tr35/
[uni-collation]: https://github.com/unicode-org/cldr/tree/main/common/collation
[simplesortdemo]: https://github.com/silnrsi/collation/blob/master/examples/simplesortdemo.py
