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

export default defineDb({
  tables: { characters }
});
