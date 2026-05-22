import React, { useState, useMemo, useEffect } from 'react'
import '../App.css'
import ImageGrid from '../views/ImageGrid'
import { NavLink } from 'react-router-dom'

function Header() {
  return <header className="app-header">

    <h1 className="app-title">Image Gallery</h1>

    {/* <div className="header-center">
      <input
        aria-label="search"
        className="search-input"
        placeholder="책 제목이나 설명으로 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div> */}

    <nav className="header-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/list">List</NavLink>
      <NavLink to="/create">Create</NavLink>
    </nav>
  </header>;
}

export default Header
