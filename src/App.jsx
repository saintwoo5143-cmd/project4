import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import ImageGrid from './components/ImageGrid'
import Header from './components/Header'


const sampleItems = Array.from({ length: 12 }).map((_, i) => ({
  id: `item-${i}`,
  title: `책 이름 ${i + 1}`,
  subtitle: `책에 관한 설명입니다. ${i + 1}.`,
  image: `/bookcover1.png`
}))

function App() {
  const [query, setQuery] = useState('')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [savedApiKey, setSavedApiKey] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('apiKey') || ''
    setSavedApiKey(saved)
    setApiKeyInput(saved)
  }, [])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sampleItems
    return sampleItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
      )
    })
  }, [query])

  return (
    <div className="app-root">
      <Header query={query} setQuery={setQuery} apiKeyInput={apiKeyInput} setApiKeyInput={setApiKeyInput} savedApiKey={savedApiKey} />

      <main className="app-main">
        <h2 className="page-title">Image Grid</h2>
        <ImageGrid items={filteredItems} />
      </main>
    </div>
  )
}

export default App
