// src/components/ApiBrowser.jsx (using React)
// TODO: traversal of changeable nodes to access nested values
// iterate over nested object with JSON.parse, conditional checks, for...of loop or ForEach, optional chaining with ?., nullish coalescing operator 
// trimming of json markup
// trimming of spaces, autocomplete in the search box
// downloadable data file subset 

import React, { useState, useEffect, type SyntheticEvent, useInsertionEffect } from 'react';
import { LanguagePicker, languagePickerStrings_en } from 'mui-language-picker'
import { ThemeProvider, createTheme, type PaletteMode, type Theme } from "@mui/material/styles";

function createDarkModeTheme(): Theme {
  return createTheme({
    palette: {
      mode: document.documentElement.dataset.theme as PaletteMode,
    },
  })
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

  function presentResponse() {
    if (!data) return <></>
    return (
      <div>
        <p>Record for {lgName} ({bcp47}) from LFF version: {data.apiversion}</p>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    )
  }

  useEffect(() => { if (bcp47 != "und" && bcp47 != "" ) fetchData() }, [bcp47])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <LanguagePicker
          value={bcp47}
          setCode={setBcp47}
          name={lgName}
          setName={setLgName}
          noFont
          font=""
          required
          disabled={loading}
          t={languagePickerStrings_en}
        />
      </ThemeProvider>
      {loading && <p>Loading LFF data for {lgName}...</p>}
      {presentError()}
      {presentResponse()}
    </div>
  );
}


export default ApiBrowser;
