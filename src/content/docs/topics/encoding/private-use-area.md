---
title: Private Use Area
description: Definition of PUA and link to SIL's registry
sidebar:
    order: 3700
lastUpdated: 2025-08-07
---

Unicode has reserved several blocks of characters for private use by individuals, organizations, or groups. These Private Use Area (PUA) characters only have meaning if everyone using that data agrees on it. 

The need for private use characters is much less than in the past, since nearly all scripts are properly encoded. They are sometimes useful for internal processes, but are rarely if ever stored or shared now.

SIL maintains a list of characters assigned to specific PUA code points - [SIL's Private Use Area registry][sil-pua]. These are generally characters that have been proposed to Unicode, but which have not yet made it through the process, or characters which are never going to be encoded and yet which some may need to use. When a character is included in Unicode and assigned a code point, the PUA code point in SIL's list is deprecated.

If data uses PUA code points from the SIL list, and the character is now in Unicode, SIL has provided an [SIL PUA mapping file][pua-mapping] for use with [TECkit][teckit] to convert that data to Unicode.

[teckit]: https://software.sil.org/teckit/
[sil-pua]: https://github.com/silnrsi/unicode-resources/tree/main/sil-pua
[pua-mapping]: https://github.com/silnrsi/wsresources/tree/master/scripts/Latn/mappings/sil-pua
