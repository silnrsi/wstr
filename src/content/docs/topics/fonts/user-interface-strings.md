---
title: User Interface Strings
description: Setting UI strings for OpenType features
sidebar:
  order: 5525
lastUpdated: 2025-07-28
---

For an application to provide a user interface for user-controllable font features, it needs human-readable (and preferably localizable) text giving the name of each feature and, where feasible, the names of the various values that feature can take on. We call this human-readable text data _User Interface Strings_, or **UI strings** for short.

Generically speaking, font features can be considered in two broad categories:

- Features required by a specific script, such as Arabic initial, medial, and final forms.
- Optional behavior that the user can enable or disable, such as small caps or lining numerals.

The second category (optional behavior) further subdivides into:

- Features whose behavior is defined by standards such as the OpenType specification, for example the _Discretionary Ligatures_ (`dlig`) and _Small Capitals From Capitals_ (`c2sc`) features. For these behaviors the suitable text for UI strings can easily obtained from the standard itself.
- Features whose behavior is defined entirely by the logic within the font. For Graphite this would be all features; for OpenType this includes only the _Stylistic Set_ (`ssxx`) and _Character Variant_ (`cvxx`) features. _For these features the text for UI strings must be provided in the font._

**We recommend that fonts include UI strings for the names of all `ssxx` and `cvxx` OpenType features. For `cvxx` features, fonts should also include UI strings for the non-default feature values.**

## OpenType

For OpenType, the two features that need UI strings are the [Stylistic Sets][otspec-ss] (`ss01`, `sso2`, ... `ss20`) and [Character Variants][otspec-cv] (`cv01`, `cv02`, ... `cv99`).

### Differences between `ssxx` and `cvxx` features

It is important to keep in mind fundamental differences between Stylistic Sets and Character Variants. Similarly, the UI strings that can be provided for Stylistic Sets are different than that for Character Variants:

- _Stylistic Sets_ are, by definition, binary features — a given Stylistic Set is either on or off. The only UI string that can be provided for `ssxx` features is:
  - _The name of the feature_, e.g. _Small Capitals_. There is no way to provide names for the values.
- _Character Variants_ can be binary, but they can also be defined with more than two possible values. The UI strings that can be provided for `cvxx` features include:
  - _The name of the feature_, e.g. _Rams horn alternates_.
  - _The names of the non-default values_, e.g. _Large bowl_ and _Small gamma_.

One implication of the above is that the UI string for a Stylistic Set should have an obvious _on/off_ meaning. For example, _Barred bowl forms_ and _Vietnamese-style diacritics_ are good names — the user can predict what turning on this feature is going to do — whereas _Alternate noon_ might not be such a good name.  

While feature name and value name strings are the minimum that should be provided, Character Variant features can provide additional data that may be useful within a UI:

- _Tool tip_: a string that an application can use as a tool tip in the UI
- _Sample Text_: a string that illustrates the effect of the feature
- _USV list_: not a string, but rather a list of Unicode Scalar Value of the characters for which this feature provides glyph variants. (NB: This is not an array of strings, therefore features which affect character sequences cannot be represented by this entry). 

### Defining OpenType UI Strings in .fea

The Adobe FDK documentation defines the syntax and provides examples for both [Descriptive names for Stylistic Set ('ss01 - ss20') features][adobe-afdko-ss] and [UI Label names for Character Variant 'cv01 - cv99') features][adobe-afdko-cv].

Simply add the desired parameter blocks (`featureNames` for stylistic sets; `cvParameters` for character variants) to your feature code and compile the FEA into the font, for example:

```
feature ss02 {
  featureNames { name 3 1 0x409 "UI String for SS02" ; };
  # --- rules for ss02 feature:
  # ...
} ss02 ;

feature cv01 {
  cvParameters {
    FeatUILabelNameID  { name 3 1 0x0409 "Name of the cv01 feature"  ; };
    ParamUILabelNameID { name 3 1 0x0409 "First named param for cv01" ; };
    ParamUILabelNameID { name 3 1 0x0409 "Second named param for cv01"  ; };
  } ;
  # --- rules for cv01 feature:
  # ...
} cv01 ;
```
Here is the same example with French localization added:
```
feature ss02 {
  featureNames { 
    name 3 1 0x0409 "UI String for SS02" ; 
    name 3 1 0x040C "nom de ss02"        ;
  };
  # --- rules for ss02 feature:
  # ...
} ss02 ;

feature cv01 {
  cvParameters {
    FeatUILabelNameID  { 
      name 3 1 0x0409 "Name of the cv01 feature"   ; 
      name 3 1 0x040C "Nom de la fonction cv01"    ; 
    };
    ParamUILabelNameID  { 
      name 3 1 0x0409 "First named param for cv01"           ; 
      name 3 1 0x040C "Premier paramètre nommé pour cv01"    ; 
    };
    ParamUILabelNameID { 
      name 3 1 0x0409 "Second named param for cv01"          ; 
      name 3 1 0x040C "Deuxième paramètre nommé pour cv01"   ; 
    };
  } ;
  # --- rules for cv01 feature:
  # ...
} cv01 ;
```

## Graphite

Adding UI strings for Graphite fonts is easy since the Graphite Description Language (GDL) used to create Graphite fonts includes the UI strings within the Feature Table, for example:
```
eng {
	id = "Engs";
	name.1033 = string("Uppercase Eng alternates");
	default = descender;
	settings {
		descender {
			value = 0;
			name.1033 = string("Large eng with descender");
		}
		base {
			value = 1;
			name.1033 = string("Large eng on baseline");
		}
		short {
			value = 3;
			name.1033 = string("Large eng with short stem");
		}
		capital {
			value = 2;
			name.1033 = string("Capital N with tail");
		}
	}
}
```

Notice that there is a name for the feature itself, and then a name for each of the possible values for that feature, including the default value. These strings can be localized by including translations for desired languages. For further information see the description of the _Feature Table_ in the [GDL manual][graphite-gdl].

## Supporting both OpenType and Graphite

For fonts that contain both Graphite and OpenType logic, it is usually the case that many of the features have the same purpose and result in both technologies. For such features it is best practice if the human readable strings are the same for corresponding Graphite and OpenType features. For example, don’t call the feature _Literacy Alternates_ in Graphite and _Literacy Forms_ in OpenType. **For fonts that include both Graphite and OpenType logic, we recommend that both technologies use the same UI strings for corresponding features and values (except that OpenType character variant must not include UI strings for the default value).**

Not only does using the same UI strings make sense from the point of view of the user experience, it can also make the font smaller since, with some toolchains, one copy of each UI string can be shared by both Graphite and OpenType.

### Defining UI Strings for both OT and Graphite

For fonts containing both OpenType and Graphite logic, you may want to use the `ttffeatparms` utility to add the OpenType UI strings in order to reduce the font size. This utility is part of SIL's [FontUtils][fontutils] library. 

To get help with this utility, at the command line type:

```
ttffeatparms -h
```
OpenType UI strings are coded in an xml control file. Here are the same examples as above:
```
<?xml version="1.0" encoding="UTF-8"?>
  <featureparams>
    <sset feat="ss02">
      <name><nstring lang="en">UI string for SS02</nstring></name>
    </sset>
    <cvar feat="cv01">
      <name><nstring>Jha alternates</nstring></name>
      <npstring lang="en">First named param for cv01</npstring>
      <npstring lang="en">Second named param for cv01</npstring>
    </cvar>
  </featureparams>
```
and with French localization added:
```
<?xml version="1.0" encoding="UTF-8"?>
  <featureparams>
    <sset feat="ss02">
      <name>
        <nstring lang="en">UI string for SS02</nstring>
        <nstring lang="fr">nom de ss02</nstring>
      </name>
    </sset>
    <cvar feat="cv01">
      <name><nstring>Jha alternates</nstring></name>
      <npstring lang="en">First named param for cv01</npstring>
      <npstring lang="en">Second named param for cv01</npstring>
      <npstring lang="fr">Premier paramètre nommé pour cv01</npstring>
      <npstring lang="fr">Deuxième paramètre nommé pour cv01</npstring>
    </cvar>
  </featureparams>
```

The required build steps are as follows:

- Compile OpenType and Graphite features into the font before adding OpenType UI strings
- Add OpenType UI strings into the font. The basic command to do this looks as follows:

```
tffeatparms -c control.xml input.ttf output.ttf
```

## Application support

Support for UI strings is a chicken-or-egg problem: not many commercial fonts have the UI strings, so not many application vendors are motivated to add support, and since not many applications have support, few font vendors are motivated to add the strings. In spite of this, most SIL fonts include UI strings.

Because UI strings have always been part of Graphite, some Graphite-enabled apps populate their UI with Graphite features. Here is an example screenshot from SIL FieldWorks suite showing that UI:

![Fieldworks font feature UI](images/5525-ui-strings-in-use.png)

LibreOffice uses UI strings for Graphite-enabled fonts, but not for OpenType.

Some of Adobe's Creative Cloud suite (such as InDesign) support UI strings for Stylistic Sets but not Character Variants.

SIL's PTXprint supports both Graphite and OpenType UI strings.

Please let us know if you become aware of other applications that support UI strings so we can include them here.

[adobe-afdko-cv]: https://github.com/adobe-type-tools/afdko/blob/develop/docs/OpenTypeFeatureFileSpecification.md#8d-ui-label-names-for-character-variant-features-cv01---cv99
[adobe-afdko-ss]: https://github.com/adobe-type-tools/afdko/blob/develop/docs/OpenTypeFeatureFileSpecification.md#8c-descriptive-names-for-stylistic-set-features-ss01---ss20
[fontutils]: https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=fontutils
[graphite-gdl]: https://github.com/silnrsi/grcompiler/blob/master/doc/GDL.pdf
[otspec-cv]: https://www.microsoft.com/typography/otspec/features_ae.htm#cv01-cv99
[otspec-ss]: https://www.microsoft.com/typography/otspec/features_pt.htm#ssxx
