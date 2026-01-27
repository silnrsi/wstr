import { column, defineDb } from 'astro:db';

const characters = {
    columns: {
        __uid:                      column.text(),
        character_charId:           column.text({ primaryKey: true }),
        character_usv:              column.text(),
        character_name:             column.text(),
        character_category:         column.text(),
        character_direction:        column.text(),
        character_pua:              column.text(),
        character_unicodeStatus:    column.text(),
        character_typicalForm:      column.text(),
        character_unicodeVersion:   column.text(),
    }
};

const scripts = {
    columns: {
      __uid:                    column.text(),
      __parent_uid:             column.text(),
      __display_name:           column.text(),
      script_name:              column.text(),
      script_code:              column.text({ primaryKey: true }),
      script_type:              column.text(),
      script_family:            column.text(),
      script_direction:         column.text(),
      script_baseline:          column.text(),
      script_whiteSpace:        column.text(),
      script_features:          column.text(),
      script_typicalFont:       column.text(),
      script_alternateNames:    column.text(),
      script_numericCode:       column.text(),
      script_casing:            column.text(),
      script_diacritics:        column.text(),
      script_contextualForms:   column.text(),
      script_complexPos:        column.text(),
      script_reordering:        column.text(),
      script_splitGraphs:       column.text(),
      script_ligatures:         column.text(),
      script_displayCode:       column.text(),
      script_openTypeTags:      column.text(),
      script_status:            column.text(),
      script_numericCodePlus:   column.text(),
      script_sortName:          column.text(),
      script_shortName:         column.text(),
      script_subjectTabFlags:   column.text(),
      script_sample:            column.text()
    }
}

export default defineDb({
  tables: { characters, scripts }
});
