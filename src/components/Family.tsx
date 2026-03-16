import React, { useState, useEffect } from 'react';
import { LanguagePicker, languagePickerStrings_en } from 'mui-language-picker'
import { ThemeProvider, createTheme, type PaletteMode, type Theme } from "@mui/material/styles";
import { isAsExpression, type NumericLiteral } from 'typescript';
import styles from './Family.module.css'

type FontType = "ttf" | "woff" | "woff2"

interface Axes {
    ital?: 0 | 1,
    wght?: number
    wdth?: number
}

interface File {
    axes?: Axes,
    url?: string
}

export interface Props {
    family: string,
    license: string,
    files: Record<string,File>
    defaults: Record<FontType, string>,
    siteurl?: string,
    features?: string,
    sample?: string, 
    version?: string,
    source?: string
}

enum Names {Thin=1, ExtraLight, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black}

function weight(w: number) {
    return Names[(Math.min(Math.max(0,w/100),9))]
}

function width(w: number) {
    return w >= 100 ? '' : w > 75 ? 'Semi-condensed' : w < 75 ? 'Extra-condensed' : 'Condensed'
}

function describeAxes(axes: Axes | undefined): string | undefined {
    return `${width(axes?.wdth ?? 100)} ${weight(axes?.wght ?? 0) ?? ''} ${axes?.ital ? 'Italic' : ''}`
}

const licenseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" aria-hidden="true" fill="currentColor" style={{display: 'inline', width: '1em', height: '1em', colorAdjust: 'economy', verticalAlign: '-0.125em'}}>
    // !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.
    <path d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3l0 294.7 160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-384 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288L584.4 320 512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1-10.8 44.8-63.1 78.9-126 78.9zM126.8 195.8L54.4 320 199.3 320 126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1-10.8 44.8-63.1 78.9-126 78.9S11.7 382 .9 337.1z"/>
</svg>

function Lozenge(props: object) {
    return <span className={styles.lozenge} style={{borderRadius: "1em", paddingInline: "0.4em"}}>
        {props.children}
    </span>
}

export default function Family(props: Props) {
    const { family, defaults, files, license, siteurl, features, sample, version, source } = props
    const types = Object.keys(defaults)
    
    const axes = Array.from(new Set(Object.values(files).map(({ axes }) => describeAxes(axes) ?? 'Undeclared')))
    const weights = axes.map((style) => <li className='lff-family-style'><span className='lff-family-style-weight'>{style}</span></li>)
    const tech = types.map((type) => <Lozenge>{type}</Lozenge>)

return <details className={styles.family}>
        <summary>
            <span className={styles.name}>{siteurl ? <a className="lff-family url" href={siteurl}>{family}</a> : family}</span>
            <span className={styles.source}>{source}</span>
            <span className={styles.license}> {licenseIcon} {license}</span>
            <div className={styles.tech}>{tech}</div>
            {sample && <img className={styles.sample} src={sample} alt={`${family} visual sample`}/>}
        </summary>
        {features && <p>Required features: <span className={styles.features}>{features}</span></p>}
        {version && <p>Version: {version}</p>}
        <h6>Weights</h6>
        <ul>{weights}</ul>
    </details>
}