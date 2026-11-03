'use client'

import { useState, useEffect, Suspense, use, ViewTransition } from 'react';
import { LanguagePicker, type LangTag, languagePickerStrings_en } from 'mui-language-picker'
import { ThemeProvider, createTheme, type Theme } from "@mui/material/styles";
import Family from './Family'
import * as Icon from './Icons'

type LFFResponse = Record<string, any>

async function queryLFF(langtag: string): Promise<LFFResponse> {
  const response = await fetch(`https://lff.api.languagetechnology.org/lang/${langtag}`)
  if (!response.ok)
    throw new Error(await response.text(), { cause: response.status } )

  return await response.json() as LFFResponse
}

const query_cache = new Map()
function cachedQueryLFF(langtag: string): Promise<LFFResponse | Error> {
  return query_cache.getOrInsertComputed(langtag, queryLFF).catch((e:any) => e);
}

function copyRawResponse() {
  const raw_response = document.getElementById("raw-response")?.textContent ?? ""
  navigator.clipboard.writeText(raw_response)
}

interface Props { langtag: string, tagset: LangTag, name: string }

function Response({langtag, tagset, name}: Props) {
  if (!langtag || langtag === "und") 
    return <></>
  
  const resp = use(cachedQueryLFF(langtag))

  if (resp instanceof Error){
    switch (resp.cause) {
      case 404: return (<p>No records found for {name} ({langtag})</p>);
      default:
        return (
          <p style={{ color: 'red' }}>
            Error fetching {name} ({langtag}): server responsed with status: {resp.cause as number}
          </p>)  
      }
  }

  const data = resp as LFFResponse;
  return (
    <div>
      <h2>Available fonts</h2>

      <p><em>The list below is not a comprehensive list of all fonts that support the language,
        but rather a minimal selection of commonly used open fonts that are likely to work well.
        Additional fonts for some scripts and languages may be available from
        <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">Google Fonts</a>.
        Text used for font samples may not be in the selected language.</em></p>
      <ol className='lff-families'>{
        data.defaultfamily.map((id: string) => {
          const rec = data.families[id]
          return <li key={id}><Family lang={tagset?.full} {...rec}/></li>
        })
      }</ol>

      <details>
        <summary>
          View full record for {name} ({langtag}) from LFF version {data.apiversion}
          <button className='lff-copy' onClick={copyRawResponse}>{Icon.copy}</button>
        </summary>
        <pre className='lff-response'>
          <code id="raw-response">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </details>
    </div>
  )      
}


function createDarkModeTheme(dark: boolean): Theme {
  return createTheme({ colorSchemes: { dark: dark } })
}

function ApiBrowser() {
  const [theme, setTheme] = useState(createDarkModeTheme(document.documentElement.dataset.theme === 'dark'));
  const [tag, setTag] = useState<LangTag>();
  const [bcp47, setBcp47] = useState("und");
  const [name, setName] = useState("");

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

  return (
    <div className='lff-container'>
      <ThemeProvider noSsr={true} disableTransitionOnChange={true} theme={theme}>
        <LanguagePicker
          value={bcp47}
          setCode={setBcp47}
          setInfo={setTag}
          name={name}
          setName={setName}
          noFont
          noName
          font=""
          required
          offline={true}
          t={{...languagePickerStrings_en, 
              select: "Select",
              findALanguage: "Find a language by name, code, or country"
            }}
        />
      </ThemeProvider>
      <ViewTransition>
        <Suspense fallback={<p>Loading LFF data for {name}...</p>}>
          <Response langtag={bcp47} tagset={tag as LangTag} name={name}/>
        </Suspense>
      </ViewTransition>
    </div>
  );
}

export default ApiBrowser;
