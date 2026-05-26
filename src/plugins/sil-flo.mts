import { hash } from 'astro/zod'
import { defineFontProvider } from 'unifont'
import type { ResolveFontOptions, FontFaceData } from 'unifont'

const styles = {
  normal: 0,
  italic: 1,
  oblique: 1
}

type FontType = "ttf" | "woff" | "woff2"

interface Axes {
    ital?: 0 | 1,
    wght?: number
    wdth?: number
}

interface File {
    axes?: Axes,
    flourl?: string,
    url?: string
}

type Defaults = Record<FontType, string>;
type Files = Record<string,File> 
interface Family {
    lang?: string,
    family: string,
    license?: string,
    files?: Files,
    defaults?: Defaults,
    siteurl?: string,
    features?: string,
    sample?: string, 
    version?: string,
    source?: string
}

const silflo = defineFontProvider('sil-flo', async (_options, ctx) => {
  const families = await ctx.storage.getItem('sil-flo:families.json', () => fetch('https://fonts.languagetechnology.org/families.json').then(res => res.json()))

  return {
    listFonts() {
        return Object.keys(families)
    },
    
    resolveFont(family, options: ResolveFontOptions) {
      const familyid = family.replaceAll(/\s/g, '').toLocaleLowerCase()
      const fonts = families[familyid] as Family
      if (!fonts)
        return

      const files = fonts.files ?? {} as Files;
      let results = []

      for (const [file, entry] of Object.entries(files)) {
        if (!entry.flourl)
          continue
        const format = file.split('.').pop() as "woff" | "woff2" | "ttf"
        if (!options.formats.includes(format))
          continue
        if (!options.weights.includes(`${entry.axes?.wght ?? 0}`))
          continue
        if (!options.styles.map(s => styles[s]).includes(entry.axes?.ital ?? 0))
          continue

        results.push({
          src: [{
            url: entry.flourl,
            format: format
          }],
          weight: entry.axes?.wght,
          style: entry.axes?.ital == 1 ? 'italic' : 'normal',
          feautreSettings: fonts.features
        } as FontFaceData)
      }

      return results.length > 0 ? { fonts: results } : undefined
    }
  }
})

export default silflo;