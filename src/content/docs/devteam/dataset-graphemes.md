---
title: Dataset - Graphems and Phonemes
lastUpdated: 2026-09-23
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## Data format and model

Grapheme and phoneme data is dispersed through a number of files.

### Phonemes

- phonemes.json

- phoneme-charts.mdx - charts for consonants, vowels, and diphthongs, with links to phoneme pages

- phonemes pages - MDX files in scrlang/phonemes; display graphemes associated with the phoneme and related phonemes; e.g., aff-pal-vd.mdx, vwl-bk-op-rnd.mdx

### Graphemes

- ws-graphemes.json

- grapheme pages - MDX files located in scrlang/graphemes; display grapheme and phoneme information for writing systems; e.g., ar-arab.mdx, nat-latn.mdx

## Source and licensing

The grapheme data was originally contributed to ScriptSource by writing system experts.

## Uses

The data is used by the phoneme and grapheme MDX pages mentioned above.

Components that work with this data include:

- Phoneme charts - these are implemented using components to allow more complicated HTML than what an MDX file will handle:
    - PhChartCons.astro 
    - PhChartDiph.astro
    - PhChartVowel.astro
- Phoneme.astro - used by phoneme pages to display a table of graphemes and phonograms that represent a given phoneme
- WsGraphemes.astro - used by grapheme pages to display a table of graphemes and phonograms used by a given writing system
- Phonemes.mts - auxiliary file containing functions used by Phoneme.astro and WsGraphemes.astro.
- GraphemeWsList.astro - included in phoneme-charts.mdx; uses a component in order to put the list inside of a "Details" twisty.

## History

- **2026 August** - implemented in WSTR with data imported from ScriptSource, by Sharon Correll

## Maintenance processes

### Adding a new grapheme set

Currently grapheme sets must be added by hand. The process is:

- Create or obtain a spreadsheet describing all the phonemes, graphemes, and phonograms used by the writing system. The template spreadsheet was used by ScriptSource.
- Note the official writing system code; this is the identifier for the data.
- Ensure that all necessary phonemes are present in the current phonemes.json file; add any new ones (see below).
- Add the grapheme and phonogram data to the ws-graphemes.json file, modeled after current data.*
    - Also add information for the writing system in the 'intros' and 'names' section at the bottom of the file. The 'intros' section is not currently used; the introductory information is hard-coded in the .mdx file.
- Add an .MDX file for writing system in the scrlang/graphemes directory, modeled after a similar writing system.
- Add the writing system to the list in GraphemeWsList.astro.
- Find the .MDX file in the scrlang/scripts directory for the writing system's script. If it is not already there, add a section under **Resources** called "Grapheme and phoneme data"; this goes between the "Related articles" and the "External links" sections. Include a link to the new grapheme page in the scrlang/graphemes directory. Also include a link to data for the same language in a different script, if any. (See arab.mdx as an example.)

*In the future we could write a script to generate the JSON data, but that has currently not been done since we have little expectation of new grapheme sets being added.

### Adding a new phoneme

Adding a new phoneme is unlikely to be needed but might be necessary if a writing system is added with unusual phonology.

- Add the phoneme to phonemes.json, being sure to follow the conventions for the phoneme key (see below). Sortkeys are not currently used, but it is recommended to fill them out anyway. Add the new phoneme in sortkey order. Slugs are needed when there is a mismatch between the page containing the display for the phoneme and the phoneme key.

- If the new phoneme is a modification of an existing phoneme (eg, nasalized, lengthened, etc.):
    - Add the modified form of phoneme to the phoneme MDX file for the base form.
    - Add the new phoneme to phonemes.json. Place it in the file near related phonemes, ordered by sort key. All phonemes require a key, symbol, label, and sortkey. You probably don't need to include a slug. 

- If the new phoneme has a completely new base:
    - Decide which phoneme page the new phoneme belongs on. (It's unlikely that you will need to create a new phoneme page; just pick the most closely related existing one.) Add a new section to display the new phoneme. Include modified forms similar to existing phonemes on the same page.
    - Add the new phoneme to phonemes.json. Place it in the file near related phonemes, ordered by sort key. All phonemes require a key, symbol, label, and sortkey. You'll need to include a slug indicating the phoneme page and the section header you added.
    - Add the new phoneme to the appropriate phoneme chart file - PhChartCons.astro, PhChartVowel.astro,  or PhChartDiph.astro.

#### Phoneme keys

##### Consonant keys

Consonant keys are of the form:
- TTT-PPP - type, place of articulation
- TTT-PPP-VV - type, place of articulation, voicing
- TTT-PPP-MMMMM - type, place of articulation, modification 
- TTT-PPP-VV-MMMMM - type, place of articulation, voicing, modification
- TTT-PPP-VV-MMMMM-MMMMM - type, place of articulation, voicing, 2 modifications

An exception to these patterns is 'cons-null'.

**Type codes**
- nas = nasal; sort key = 10
- stp = stop/plosive; sort key = 20
- cli = click; sort key = 25
- aff = affricate; sort key = 30
- fri = fricative; sort key = 40
- trl = trill; sort key = 50
- tap = tap/flap; sort key = 60
- lap = lateral approximant; sort key = 75
- app = approximant; sort key = 80
- null = null; sort key = 99

**Place of articulation codes**
- bil = bilabial; sort key = 10
- llb = linguolabial; sort key = 15
- lbd = labiodental; sort key = 20
- den = dental; sort key = 30
- alv = alveolar; sort key = 35
- ret = retroflex; sort key = 40
- pav = post-alveolar; sort key = 45
- alp = alveo-palatal; sort key = 50
- pal = palatal; sort key = 55
- vel = velar; sort key = 60
- uvu = uvular; sort key = 70
- pha = pharyngeal; sort key = 80
- epi = epiglottal; sort key = 85
- glo = glottal; sort key = 90

**Voicing codes**
- vl = voiceless; sort key = 10
- vd = voiced; sort key = 20

**Modification codes**
- aspir = aspirated; sort key = 110
- breat = breathy; sort key = 70
- eject = ejective; sort key = 190
- gemin = geminate; sort key = 180
- gltzd = glottalized; sort key = 155
- implo = implosive; sort key = 185
- labzd = labialized; sort key = 120
- naszd = nasalized; sort key = 60
- palzd = palatalized; sort key = 40
- phazd = pharyngealized; sort key = 150
- pnszd = prenasalized; sort key = 160
- pglzd = preglottalized; sort key = 155
- sylla = syllabic; sort key = 195

##### Double articulation keys

Doubly-articulated consonant keys are of the form:
- dart-TTT-PPP+TTT-PPP
- dart-TTT-PPP-VV+TTT-PPP-VV
- dart-TTT-PPP-VV-MMMMM+TTT-PPP-VV-MMMMM

Note that URL slugs use '__" where the key uses '+'.

##### Vowel keys

Vowel keys are off the form:
- vwl-PP-HH-RRR - placement, height, rounding
- vwl-PP-HH-RRR-MMMMM - placement, height, rounding, modification
- vwl-PP-HH-RRR-MMM - placement, height, rounding, modification
- vwl-PP-HH-RRR-MMMMM-MMMMM - placement, height, rounding, 2 modifications

Note that in the label height is put first, but in the key and sortkey, placement is put first.

**Placement codes**
- fr = front; sort key = 10
- nf = near-front; sort key = 20
- ce = central; sort key = 30
- nb = near-back; sort key = 40
- bk = back; sort key = 50

**Height codes**
- cl = close; sort key = 10
- nc = near-close; sort key = 20
- cm = close-mid; sort key = 30
- md = mid; sort key = 40
- om - open-mid; sort key = 50
- no = near-open; sort key = 60
- op = open; sort key = 70
- ap = apical; sort key = 80
- null = null; sort key = 99

**Rounding codes**
- unr = unrounded; sort key = 10
- rnd = rounded; sort key = 20

**Modification codes**
- lngth = lengthened; sort key = 210
- naszd = nasalized; sort key = 265
- tense = tense; sort key = 175
- rtr = RTR (retracted tongue root); sort key = 235
- atr = ATR (advanced tongue root); sort key = 230 - not currently used

##### Diphthong keys

Diphthong keys are of the form:
- diph-PP-HH+PP-HH
- diph-PP-HH-RRR+PP-HH-RRR
- diph-PP-HH-RRR+PP-HH-RRR+on
etc.

Note that URL slugs use '__" where the key uses '+'. 

The anchor '#rising' corresponds to the '+on' part of the key, which indicates an "onset" or rising diphthong.
