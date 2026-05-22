import React, { useState, useMemo, useEffect } from 'react'
import '../App.css'
import ImageGrid from './ImageGrid'

function Header({ query, setQuery, apiKeyInput, setApiKeyInput, savedApiKey }) {
  return <header className="app-header">

    <h1 className="app-title">Image Gallery</h1>

        <div className="header-center">
          <input
            aria-label="search"
            className="search-input"
            placeholder="책 제목이나 설명으로 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <input
            className="api-input"
            type="password"
            placeholder="API Key"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
          />
          <button
            className="confirm-button"
            onClick={() => {
              localStorage.setItem('apiKey', apiKeyInput)
              setSavedApiKey(apiKeyInput)
            }}
            disabled={apiKeyInput === savedApiKey}
          >
            {apiKeyInput === savedApiKey ? 'Saved' : 'Confirm'}
          </button>
        </div>
  </header>  ;
}

export default Header
