// src/components/ApiBrowser.jsx (using React)
// TODO: traversal of changeable nodes to access nested values
// iterate over nested object with JSON.parse, conditional checks, for...of loop or ForEach, optional chaining with ?., nullish coalescing operator 
// trimming of json markup
// trimming of spaces, autocomplete in the search box
// downloadable data file subset 

import { useState, useEffect } from 'react';
import { LanguagePicker, type LangTag, languagePickerStrings_en } from 'mui-language-picker'
import { ThemeProvider, createTheme, type Theme } from "@mui/material/styles";
import Family from './Family'
import * as Icon from './Icons'

function createDarkModeTheme(dark: boolean): Theme {
  return createTheme({ colorSchemes: { dark: dark } })
}

type LFFResponse = Record<string, any>

function ApiBrowser() {
  const [data, setData] = useState<LFFResponse|null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error|null>(null);
  const [theme, setTheme] = useState(createDarkModeTheme(document.documentElement.dataset.theme === 'dark'));
  const [tag, setTag] = useState<LangTag>();
  const [bcp47, setBcp47] = useState("und");
  const [lgName, setLgName] = useState("");

  async function fetchData(langtag: string) {
    setError(null);
    try {
      const response = await fetch(`https://lff.api.languagetechnology.org/lang/${langtag}`);
      if (!response.ok)
        throw new Error(await response.text(), { cause: response.status } );

      const json = await response.json() as Record<string, any>;
      setData(json);
    } catch (e: any) {
      setData(null)
      setError(e);
    }
  };

  function presentError() {
    if (!error) return <></>
    switch (error.cause) {
      case 404:
        return <p>No records found for {lgName} ({bcp47})</p>
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
        <h2>Available fonts</h2>

        <p><em>The list below is not a comprehensive list of all fonts that support the language,
          but rather a minimal selection of commonly used open fonts that are likely to work well.
          Additional fonts for some scripts and languages may be available from <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">Google Fonts</a>.
          Text used for font samples may not be in the selected language.</em></p>
      <ol className='lff-families'>{
        data.defaultfamily.map((id: string) => {
            const rec = data.families[id]
          return <li key={id}><Family lang={tagset?.full} {...rec}/></li>
        })
      }</ol>

        <details>
          <summary>
            View full record for {lgName} ({bcp47}) from LFF version {data.apiversion}
          <button className='lff-copy' onClick={copyResponse}>{Icon.copy}</button>
          </summary>
          <pre className='lff-response'>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </details>
      </div>
    )
  }

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(record => {
        if (document.documentElement.dataset.theme != record.oldValue) {
          setTheme(createDarkModeTheme(document.documentElement.dataset.theme === 'dark'))
        }
      })
    })
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['data-theme'],
      attributeOldValue: true,
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => { 
    if (bcp47 == "und" || bcp47 == "" ) return

      setLoading(true);
      fetchData(bcp47)
      setLoading(false);
  }, [bcp47])

  return (
    <div className='lff-container'>
      <ThemeProvider noSsr={true} disableTransitionOnChange={true} theme={theme}>
        <LanguagePicker
          value={bcp47}
          setCode={setBcp47}
          setInfo={setTag}
          name={lgName}
          setName={setLgName}
          noFont
          noName
          font=""
          required
          disabled={loading}
          offline={true}
          t={{...languagePickerStrings_en, 
              select: "Select",
              findALanguage: "Find a language by name, code, or country"
            }}
        />
      </ThemeProvider>
      {loading && <p>Loading LFF data for {lgName}...</p>}
      {presentError()}
      {presentResponse()}
    </div>
  );
}

export default ApiBrowser;
