import React, { useState } from 'react'

function Card({ item, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={item.image} alt={item.title} />
      <div className="card-content">
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
      </div>
    </div>
  )
}

export default function ImageGrid({ items = [] }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleOpen = (item) => {
    setSelected(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  return (
    <div>
      <div className="image-grid">
        {items.map((item) => (
          <Card key={item.id} item={item} onClick={() => handleOpen(item)} />
        ))}
      </div>

      {open && selected && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selected.title}</h3>
              <button className="modal-close" onClick={handleClose}>✕</button>
            </div>
            {selected.image && <img className="modal-image" src={selected.image} alt={selected.title} />}
            <p className="modal-subtitle">{selected.subtitle}</p>
            <div className="modal-actions">
              <button className="modal-button" onClick={handleClose}>수정</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
