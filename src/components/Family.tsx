import type { FragmentProps } from 'react'
import styles from './Family.module.css'
import _samples from '../data/udhr-26.json'

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

const licenseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" aria-hidden="true" fill="currentColor" style={{display: 'inline', width: '1em', height: '1em', marginRight: '0.5ch', colorAdjust: 'economy', verticalAlign: '-0.125em'}}>
    // !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.
    <path d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3l0 294.7 160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-384 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288L584.4 320 512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1-10.8 44.8-63.1 78.9-126 78.9zM126.8 195.8L54.4 320 199.3 320 126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1-10.8 44.8-63.1 78.9-126 78.9S11.7 382 .9 337.1z"/>
</svg>

const sourceIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true" fill="currentColor" style={{display: 'inline', width: '1em', height: '1em', marginRight: '0.5ch', colorAdjust: 'economy', verticalAlign: '-0.125em'}}>
    // !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.
    <path d="M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"/>
</svg>

function Lozenge({ children }: FragmentProps) {
    return <span className={styles.lozenge} style={{borderRadius: "1em", paddingInline: "0.4em"}}>
        {children}
    </span>
}

function Sample(props: Props) {
    const {lang, defaults={} as Defaults, family, files={}, sample} = props
    const flourl = files[defaults?.woff2 ?? defaults?.ttf]?.flourl

    if (flourl)
    {
        const fontFamily = `@font-face {
            font-family: '${family}';
            src: url('${flourl}');
        }`
        const sampler = (lang && samples[lang]) ?? "Everyone has the right to education."
        return <div className={styles.sample}>
            <style>{fontFamily}</style>
            <p id={styles.sampler} style={{ fontFamily: family }} dir='auto'>{sampler}</p>
        </div>
    }
    if (sample) {
        return <img className={styles.sampleimg + ' ' + styles.sample}  src={sample} alt={`${family} visual sample`}/>
    }
    return <></>
}

export default function Family(props: Props) {
    const { family, defaults={} as Defaults, files={}, license="Proprietary", siteurl, features, sample, version, source } = props
    const types = Object.keys(defaults)
    const tech = types.map((type) => <Lozenge>{type}</Lozenge>)
    const stylesCount = countStyles(files)

return <div className={styles.family}>
        <div className={styles.familyinfo}>
            {/* <span className={styles.name}>{family}</span> */}
            <span className={styles.name}>{siteurl ? <a className="lff-family url" href={siteurl}>{family}</a> : family}</span>
            <span className={styles.styles}>{stylesCount} style{stylesCount > 1 && 's'}</span>
            {/* <span className={styles.source}>Source: {source}</span> */}
            <span className={styles.source}>{sourceIcon}{siteurl ? <a className="lff-family url" href={siteurl}>{source}</a> : source}</span>
            <span className={styles.license}>{licenseIcon}{license == "OFL" ? <a href="https://openfontlicense.org/">OFL</a> : license}</span>
            {features && <p><em>Recommended OpenType feature settings:</em> <span className={styles.features}>{features}</span></p>}
        </div>
        <Sample {...props}/>
        {/* <div className={styles.tech}>{tech}</div> */}
        {/* {version && <p>Version: {version}</p>} */}
        {/* <p>Styles: {countStyles(files)}</p> */}
    </div>
}