import React from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">Image Gallery</h1>
      <nav className="header-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/list" className="nav-link">List</NavLink>
        <NavLink to="/create" className="nav-link">Create</NavLink>
      </nav>
    </header>
  )
}

export default Header
