import _samples from '../../data/google-fonts-samples.json'
import * as Icon from './Icons'

const samples: Record<string, string | null> = _samples

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
export interface Props {
    lang?: string,
    family: string,
    familyid: string,
    license?: string,
    files?: Files,
    defaults?: Defaults,
    siteurl?: string,
    features?: string,
    sample?: string, 
    version?: string,
    source?: string
}

// This function has the following reasonable assumptions for data from LFF:
// 1. We always have a TTF version of a family
// 2. That the TTF version's styles are complete and match other types.
function countStyles(files: Record<string,File>): number {
     return Object.entries(files).filter((entry) => entry[0].endsWith('.ttf')).length
}

const graphite_only = [
    'awaminastaliq',
    'payaplanna'
]

function Sample(props: Props) {
    const {lang, defaults={} as Defaults, family, familyid, files={}, features} = props
    const flourl = files[defaults?.woff2 ?? defaults?.ttf]?.flourl
    const can_render = !graphite_only.includes(familyid) || navigator.userAgent.toLowerCase().includes('firefox');

    if (flourl && can_render)
    {
        const css_features = features ? features.split(/\s+/).map(f => f.replace(/^(\w+)=(\d+)$/, '"$1" $2')).join(',') : "normal"
        const fontFamily = `@font-face {
            font-family: '${family}';
            src: url('${flourl}');
            font-feature-settings: ${css_features};
        }`
        const key = lang?.split('-',2).join('-');
        const sampler = (key && samples[key]) ?? "Everyone has the right to education."
        return <div className='lff-sample'>
            <style>{fontFamily}</style>
            <p id='lff-sampler' style={{ fontFamily: family }} lang={lang} dir='auto'>{sampler}</p>
        </div>
    }
    return <></>
}

export default function Family(props: Props) {
    const { family, files={}, license="Proprietary", siteurl, features, source } = props
    const stylesCount = countStyles(files)

return <div className='lff-family'>
        <div className='lff-familyinfo'>
            <span className='lff-name'>{siteurl ? <a className="url" href={siteurl} target="_blank" rel="nofollow noopener">{family}</a> : family}</span>
            <span className='lff-styles'>{stylesCount} style{stylesCount > 1 && 's'}</span>
            <span className='lff-source'>{Icon.source}{siteurl ? <a className="url" href={siteurl} target="_blank" rel="nofollow noopener">{source}</a> : source}</span>
            <span className='lff-license'>{Icon.license}{license == "OFL" ? <a href="https://openfontlicense.org/" target="_blank" rel="nofollow noopener">OFL</a> : license}</span>
            {features && <p><em>Recommended OpenType feature settings:</em> <span className='lff-features'>{features}</span></p>}
        </div>
        <Sample {...props}/>
    </div>
}