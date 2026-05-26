import React, { useState } from 'react'
import './App.css'
import ImageGrid from './views/ImageGrid'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Create from './views/Create'

function App() {
  const [query, setQuery] = useState('')

  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/list"
            element={
              <>
                {/* UI/레이아웃팀 담당: List 검색창 위치/디자인 개선 */}
                <div className="list-search-area">
                  <label className="list-search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      aria-label="search"
                      className="list-search-input"
                      placeholder="책 제목 또는 작가로 검색"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </label>
                </div>
                <ImageGrid query={query} />
              </>
            }
          />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
