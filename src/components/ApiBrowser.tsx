// src/components/ApiBrowser.jsx (using React)
// TODO: traversal of changeable nodes to access nested values
// iterate over nested object with JSON.parse, conditional checks, for...of loop or ForEach, optional chaining with ?., nullish coalescing operator 
// trimming of json markup
// trimming of spaces, autocomplete in the search box
// downloadable data file subset 

import React, { useState, useEffect } from 'react';
import { LanguagePicker, languagePickerStrings_en } from 'mui-language-picker'
import { ThemeProvider, createTheme, type PaletteMode, type Theme } from "@mui/material/styles";
import Family, {type Props as FamilyProps} from './Family'
import styles from './ApiBrowser.module.css'

const copyIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" style={{width: '1em', height: '1em', colorAdjust: 'economy', verticalAlign: '-0.125em'}}>
  // !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.
  <path d="M288 464L64 464c-8.8 0-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16l48 0 0-48-48 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-48-48 0 0 48c0 8.8-7.2 16-16 16zM224 304c-8.8 0-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16l0 224c0 8.8-7.2 16-16 16l-224 0zm-64-16c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224z"/>
</svg>

function createDarkModeTheme(): Theme {
  return createTheme({
    palette: {
      mode: document.documentElement.dataset.theme as PaletteMode,
    },
  })
}


const SampleImages: Record<string,string> = 
{
  'Andika.S': 'https://fonts.languagetechnology.org/fonts/sil/andika/documentation/assets/images/Andika-R_400x30.png',
  'Andika.M': 'https://fonts.languagetechnology.org/fonts/sil/andika/documentation/assets/images/Andika-R_600x45.png',
  'Andika.L': 'https://fonts.languagetechnology.org/fonts/sil/andika/documentation/assets/images/Andika-R_1200x90.png',
  'Charis.S': 'https://fonts.languagetechnology.org/fonts/sil/charis/documentation/assets/images/Charis-R_400x30.png',
  'Charis.M': 'https://fonts.languagetechnology.org/fonts/sil/charis/documentation/assets/images/Charis-R_600x45.png',
  'Charis.L': 'https://fonts.languagetechnology.org/fonts/sil/charis/documentation/assets/images/Charis-R_1200x90.png',
  'Gentium.S': 'https://fonts.languagetechnology.org/fonts/sil/gentium/documentation/assets/images/Gentium-R_400x30.png',
  'Gentium.M': 'https://fonts.languagetechnology.org/fonts/sil/gentium/documentation/assets/images/Gentium-R_600x45.png',
  'Gentium.L': 'https://fonts.languagetechnology.org/fonts/sil/gentium/documentation/assets/images/Gentium-R_1200x90.png'
}

type LFFResponse = Record<string, any> | null

function ApiBrowser() {
  const [data, setData] = useState<LFFResponse>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error|null>(null);
  const [theme, setTheme] = useState(createDarkModeTheme());
  const [bcp47, setBcp47] = React.useState("und");
  const [lgName, setLgName] = React.useState("");


  const observer = new MutationObserver((mutations) => {
    mutations.forEach(record => {
      if (document.documentElement.dataset.theme != record.oldValue) {
        setTheme(createDarkModeTheme())
      }
    })
  })
  observer.observe(document.documentElement, { 
    attributes: true,
    attributeFilter: ['data-theme'],
    attributeOldValue: true,
  })

  async function fetchData() {
    console.log(`Calling LFF API for ${bcp47}`)
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://lff.api.languagetechnology.org/lang/${bcp47}`);
      if (!response.ok)
        throw new Error(await response.text(), { cause: response.status } );

      const json = await response.json() as Record<string, any>;
      setData(json);
    } catch (e: any) {
      setData(null)
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  function presentError() {
    if (!error) return <></>
    switch (error.cause) {
      case 404:
        return <p>No records found for {lgName} ({bcp47})</p>
        break
      default:
        return (
          <p style={{ color: 'red' }}>
            Error fetching {lgName} ({bcp47}): server responsed with status: {error.cause as number}
          </p>
        )
    }
  }

  function copyResponse() {
    if (data)
      navigator.clipboard.writeText(JSON.stringify(data, null, 2))
  }

  function presentResponse() {
    if (!data) return <></>
    return (
      <div>
        <p><em>The list below is not a comprehensive list of all fonts that support the language,
          but rather a minimal selection of commonly used open fonts that are likely to work well.
          Additional fonts for some scripts and languages may be available from <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">Google Fonts</a>.
          Text used for font samples may not be in the selected language.</em></p>
        <ol className={styles.families}>
          {data.defaultfamily.map((id: string) => {
            const rec = data.families[id]
            return <li key={id}><Family sample={SampleImages[rec.family+'.S']} {...rec}/></li>
          })}
        </ol>
        <details>
          <summary>
            View full record for {lgName} ({bcp47}) from LFF version {data.apiversion}
            <button className={styles.copy} onClick={copyResponse}>{copyIcon}</button>
          </summary>
          <pre className={styles.response}>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </details>
      </div>
    )
  }

  useEffect(() => { if (bcp47 != "und" && bcp47 != "" ) fetchData() }, [bcp47])

  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <LanguagePicker
          value={bcp47}
          setCode={setBcp47}
          name={lgName}
          setName={setLgName}
          noFont
          noName
          font=""
          required
          disabled={loading}
          t={{...languagePickerStrings_en, select: "Select"}}
        />
      </ThemeProvider>
      {loading && <p>Loading LFF data for {lgName}...</p>}
      {presentError()}
      {presentResponse()}
    </div>
  );
}


export default ApiBrowser;
