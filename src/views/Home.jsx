import React from 'react'
import { Link } from 'react-router-dom'

const homeBooks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

function Home() {
  return (
    <section className="home-book-section">
      <div className="home-book-header">
        <div>
          {/* UI/레이아웃팀 담당: BOOK ARCHIVE 레이블과 타이틀 사이 간격 조정 */}
          <p className="home-label">BOOK ARCHIVE</p>
          <h2 className="home-title">도서목록</h2>
        </div>

        {/* UI/레이아웃팀 담당: 네비바 색상과 어울리도록 버튼 컬러 변경 */}
        <Link to="/list" className="home-view-button">
          전체 보기
        </Link>
      </div>

      {/* UI/레이아웃팀 담당: 설명 텍스트 가독성 개선 */}
      <p className="home-description">
        원하는 책 표지를 한눈에 보고, 목록 페이지에서 자세한 정보를 확인할 수 있는 도서 관리 시스템입니다.
      </p>

      <div className="home-book-grid">
        {homeBooks.map((title) => (
          <article className="home-book-card" key={title}>
            <img
              className="home-book-image"
              src="/bookcover1.png"
              alt={`${title} 책 표지`}
            />
            <strong>{title}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home