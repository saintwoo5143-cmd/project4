import React, { useState, useEffect, useMemo } from 'react'

const sampleItems = Array.from({ length: 12 }).map((_, i) => ({
  id: `item-${i}`,
  title: `책 이름 ${i + 1}`,
  author: `작가 ${String.fromCharCode(65 + (i % 6))}`,
  createdAt: `2026.05.${String(i + 1).padStart(2, '0')}`,
  subtitle: `책에 관한 설명입니다. ${i + 1}.`,
  likes: 0,
  image: '/bookcover1.png',
}))

function Card({ item, onClick }) {
  return (
    // UI/레이아웃팀 담당: List 카드에는 핵심 정보인 책 이름과 작가만 표시
    <article
      className="list-book-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <img className="list-book-image" src={item.image} alt={item.title} />
      <div className="list-book-content">
        <h3>{item.title}</h3>
        <p className="list-book-author">작가: {item.author}</p>
      </div>
    </article>
  )
}

export default function ImageGrid({ query = '' }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState(sampleItems)

  useEffect(() => {
    // TODO: GET /books API 연결은  담당자가 처리
    setItems(sampleItems)
  }, [])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) return items

    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
      )
    })
  }, [query, items])

  const handleOpen = (item) => {
    setSelected(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  return (
    <div className="list-page-wrap">
      {/* UI/레이아웃팀 담당: List 페이지 카드 그리드 레이아웃 */}
      <section className="list-book-grid">
        {filteredItems.map((item) => (
          <Card key={item.id} item={item} onClick={() => handleOpen(item)} />
        ))}
      </section>

      {open && selected && (
        <div className="book-modal-overlay" onClick={handleClose}>
          {/* UI/레이아웃팀 담당: 상세 모달 UI/레이아웃 정리 */}
          <section className="book-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="book-detail-header">
              <div>
                <h3>{selected.title}</h3>
                {/* UI/레이아웃팀 담당: 작가 이름을 책 제목 아래에 배치 */}
                <p className="book-detail-author">작가: {selected.author}</p>
              </div>

              <button type="button" className="book-detail-close" onClick={handleClose}>
                닫기
              </button>
            </div>

            <img className="book-detail-image" src={selected.image} alt={selected.title} />

            <div className="book-detail-body">
              <p className="book-detail-desc">{selected.subtitle}</p>
              <div className="book-detail-meta">
                <span>등록일: {selected.createdAt}</span>
              </div>
            </div>

            {/* UI/레이아웃팀 담당: 좋아요 개수 표시 UI만 배치 */}
            {/* TODO: 좋아요 클릭 기능과 PATCH /books/id 연결은 담당자가 처리 */}
            <div className="book-detail-actions">
              <div className="book-like-info">
                <span>좋아요</span>
                <strong>{selected.likes}</strong>
              </div>

              <button type="button" className="book-like-button">
                <span aria-hidden="true">😍</span>
                좋아요
              </button>

              <button type="button" className="book-edit-button">
                수정
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}