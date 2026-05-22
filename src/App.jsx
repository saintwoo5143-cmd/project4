import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import ImageGrid from './views/ImageGrid'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Create from './views/Create'
import Update from './views/Update'

function App() {
  const [query, setQuery] = useState('')

  // const filteredItems = useMemo(() => {
  //   const q = query.trim().toLowerCase()
  //   if (!q) return sampleItems
  //   return sampleItems.filter((item) => {
  //     return (
  //       item.title.toLowerCase().includes(q) ||
  //       item.subtitle.toLowerCase().includes(q)
  //     )
  //   })
  // }, [query])

  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ImageGrid />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
