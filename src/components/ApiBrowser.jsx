// src/components/ApiBrowser.jsx (using React)
// TODO: traversal of changeable nodes to access nested values
// iterate over nested object with JSON.parse, conditional checks, for...of loop or ForEach, optional chaining with ?., nullish coalescing operator 
// trimming of json markup
// trimming of spaces, autocomplete in the search box
// downloadable data file subset 

import React, { useState, useEffect } from 'react';

function ApiBrowser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://lff.api.languagetechnology.org/lang/${query}`);
        console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Langtag: e.g. wsg-Gong-IN"
        />
		{" "}
        <button type="submit">Find font</button>
      </form>

      {loading && <p>Loading LFF data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {data && (
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          )}
        </div>
      );
    }


export default ApiBrowser;
