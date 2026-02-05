---
title: Other Input Methods
description: Review of other input methods
sidebar:
    order: 4800
lastUpdated: 2026-02-05
---

Although a keyboard (either a physical keyboard or a touch screen keyboard) is likely the most common means of data input, other possibilities exist. Among these are:

- Web-based pickers
- Character pickers (across multiple OSes)
- USV (Unicode Scalar Value) entry
- Voice recognition
- Handwriting recognition
- Optical character recognition

## Web-based pickers

With these, the text is entered in a text box within the picker, running directly in a browser. The text can then be copied into any document/application that supports Unicode. These can be used with any operating system provided the corresponding fonts are available (and smart rendering is available for certain advanced scripts).

- [Unicode character pickers][ishida] - The Unicode character apps allow you to produce, analyse and manipulate runs of text for a given language or script. Character apps are especially useful for people who don't know a script well, as characters are displayed in ways that aid identification and input (unlike a regular character map). The apps are written in HTML and JavaScript, so no need to download anything – just use any browser. You can easily cut and paste text between the apps and your own document. The apps are just as useful for analysing text copied from other locations as they are for creating text.
- [Uniview][uniview] - On his website, Richard Ishida has published a number of useful Unicode-related tools and resources. Relevant to this topic, Richard's UniView page is a very capable and useful character browser. By default UniView displays server-generated graphics for each character, meaning you don't have to have the fonts on your local machine. There is an option to display characters as text rather than graphics, in which case you would need to configure the desired fonts into your browser settings. In addition to browsing the Unicode character database, UniView can serve as a character picker and as a clipboard viewer, allowing one to see exactly what Unicode characters are in the clipboard text.
- [Branah.com][branah] - Online keyboards for quite a few languages.
- [TypeIt][typeit] - About a dozen online keyboards.
- [FileFormat.info][fileformat] - One of the strengths of this site is that it shows how the character would be expressed in various Unicode Encoding Forms and programming languages. Another useful aspect of this site is that you can put the character you want directly in the URL for example: `https://www.fileformat.info/info/unicode/char/067b/index.htm`. Thus you could set up quick-searches in your browser to go directly to the character.
- [Tools for indigenous languages on the web][languagetools]- This site includes basic tools and prototypes for some indigenous languages. Some of these pickers provide a search feature or allow an existing string of text to be analysed.
- [Unicode's collation charts][collationcharts]: Unicode lists all the characters in collation order. This makes it easy to find the character you are looking for, especially for Latin, if you are familiar with how the script is collated. These characters can be copy and pasted into your application.
- [fontdrop][fontdrop] - An online utility to reveal what characters are available in a font and to be able to select and copy them

## Character pickers

Character pickers (either hosted on a website or on the user's device) present an array of characters and allow the user to select the desired ones. This is generally a slower method for data input than a keyboard, but may be useful for entering small amounts of text.

Some examples are listed below for different operating systems.

Windows:

- [Unibook][unibook] - The Unicode Consortium itself provides a useful character browser called Unibook. The original (and continuing) purpose of this program was to print the code charts used to publish the Unicode standard, but it has evolved into a general purpose and useful Unicode character browser. In the Unibook browser window you can click on any character cell and a popup will give additional details (user configurable) about that character. You can also copy any character to the clipboard, thereby providing character-picker functionality. Unibook's sophisticated search facilities can find and highlight characters based on up to four criteria including Unicode property values, character names, font coverage, and even user-supplied property files. Other advanced capabilities include Bidi and Line Break algorithm demos, legacy character set views, and flexible font selections. One of Unibook's main strengths is that it runs locally and does not require an internet connection. Unfortunately it has two weaknesses: it is Windows only, and can display glyphs only for those characters for which you have fonts installed on your system. Nonetheless it has been a mainstay of Unicode developers for years.
- [Babelmap][babelmap] - BabelMap is a free character map application for Windows that allows you to browse through the entire Unicode character repertoire, or search for a particular character by name or by code point. Characters can then be copied to the clipboard for use in any Unicode-aware application.
- [Keyman font helper][keymanfonthelper] - A utility to help identify fonts on your system that work best with the characters needed by your keyboard layout.

Desktop Linux:

- [GNOME Character Map][gucharmap] - A GNOME application that provides a simple interface that shows some of the Unicode character properties of the selected character, and it can be used as a character picker. Also like Unibook, it requires fonts to be installed in your system.
- [KCharSelect][kcharselect] - This is a tool to select special characters from all installed fonts and copy them into the clipboard.
- [Characters][characters] - This is a simple utility application to find and insert unusual characters. It allows you to quickly find the character you are looking for by searching for keywords.
- [Runemaster][runemaster] - This is another utility allowing you to browse and search for Unicode characters and display their properties.
- [Font-manager][fontmanager] - This is a utility to visualize and manage font collections and their character coverage and properties, it also allows searching by orthographies.

macOS:

- [UnicodeChecker][unicodechecker] - This is a macOS application to explore Unicode. Analyse and convert Unicode strings for HTML or programming. Supports UniHan, Services, AppleScript and more.
- [Font Book][fontbook] - This is the default font utility in macOS and allows you to browse, examine, search for fonts as well as install and uninstall them.

Android:

- [UnicodePad][unicodepad] - Input, search and preview every character in Unicode (depending on fonts available on the device).

Cross-platform applications:

- [Libreoffice][libreoffice] also provide glyph palettes (or “Insert special characters”) to find, copy and paste the characters you need.
Selecting a USV like U+1f968, and then typing ALT+X allows you to swap the USV for its corresponding Unicode character, typing ALT+X again will revert it back to the USV.

Cross-platform command-line utilities:

- [Uniscribe][uniscribe] - a utility to describe a string of letters and see what they contain.
- [chars][chars] - a similar utility to describe and search for characters and their properties.
- [fontfor][fontfor] - a utility to query installed fonts for particular characters with a comparison feature via a web-based preview.

## USV entry

Operating systems or a specific software applications may offer the possibility of entering a character by typing its USV (Unicode Scalar Value), that is the four-, five-, or six-digit hexadecimal value introduced by "U+". This is a slow input method, only suitable for entering occasional characters.

- On many Windows applications this can be achieved by typing the USV, selecting the USV and typing ALT+X. Another method can be used if you are willing to edit the Windows registry. This is achieved by holding down the Alt key and entering "+" followed by the USV number using the numeric keypad in a text area. This method is described in [Unicode Hex Input Windows Registry setting][regedit].
- On Ubuntu this is achieved by holding down Shift and Ctrl, and entering 'U' followed by the USV number then Enter in any text area.

This method of finding characters is sometimes referred to as “using Alt Codes”. The drawback is that you need to know the numerical value corresponding to the character you are looking for. Making use of a character picker when the existing collection of characters is searchable is usually a more useful solution.

## Voice recognition

With voice recognition (also known as speech-to-text), a person speaks into the microphone of a computer or phone. The device then analyzes the recorded sounds and matches them to information about a particular language, attempting to produce the corresponding text. Because this method may require large amounts of written text and corresponding recordings, it may not be feasible for a language that is relatively new in the digital space. Text produced in this manner needs to be verified for accuracy.

See [Speech recognition][speechrecognition] for more details.

## Handwriting recognition

With hand writing recognition, a person draws characters, often with a stylus on a touch-sensitive screen, and the device (phone, tablet or computer) translates these drawings into characters.

See [Handwriting recognition][handwritingrecognition] for more details.

## Optical character recognition

Optical character recognition (or OCR) involves taking a visual copy of text (usually printed text, but possibly handwritten text) and attempting to detect what characters are there. Text produced in this manner needs to be verified for accuracy.

See [Optical character recognition][ocr] for more details.

[babelmap]: https://www.babelstone.co.uk/Software/BabelMap.html
[branah]: https://www.branah.com/
[characters]: https://apps.gnome.org/Characters/
[chars]: https://github.com/boinkor-net/chars
[collationcharts]: https://www.unicode.org/charts/collation/
[fileformat]: https://www.fileformat.info/index.htm
[fontbook]: https://support.apple.com/guide/font-book/install-and-validate-fonts-fntbk1000/mac
[fontdrop]: https://fontdrop.info/
[fontfor]: https://github.com/7sDream/fontfor
[fontmanager]: https://github.com/FontManager/font-manager
[gucharmap]: https://gitlab.gnome.org/GNOME/gucharmap
[handwritingrecognition]: https://en.wikipedia.org/wiki/Handwriting_recognition
[ishida]: https://r12a.github.io/pickers/
[kcharselect]: https://apps.kde.org/kcharselect/
[keymanfonthelper]: https://help.keyman.com/products/windows/current-version/basic/toolbox/font-helper
[languagetools]: https://languagetools-153419.appspot.com/
[libreoffice]: https://www.libreoffice.org/
[ocr]: https://en.wikipedia.org/wiki/Optical_character_recognition
[regedit]: https://scriptsource.org/entry/tmhr3s5nsc
[runemaster]: https://flathub.org/en/apps/io.github.johnfactotum.Runemaster
[speechrecognition]: https://en.wikipedia.org/wiki/Speech_recognition
[typeit]: https://www.typeit.org/
[unibook]: https://unicode.org/unibook/
[unicodechecker]: https://earthlingsoft.net/UnicodeChecker/
[unicodepad]: https://f-droid.org/en/packages/jp.ddo.hotmist.unicodepad/
[uniscribe]: https://github.com/janlelis/uniscribe
[uniview]: https://r12a.github.io/uniview/
