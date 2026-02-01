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

function ApiBrowser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      console.log(JSON.stringify(response))
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
      {error && <p style={{ color: 'red' }}>Error fetching {lgName} ({bcp47}): {error}</p>}
      {data && (
        <div>
        <p>Record for {lgName} ({bcp47})</p>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
        </div>
      )}
    </div>
  );
}


export default ApiBrowser;
