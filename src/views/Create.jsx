import React, { useState } from 'react'

function Create() {
  const [quality, setQuality] = useState('medium')

  return (
    <section className="create-write-page">
      {/* UI/레이아웃팀 담당: Create 페이지 작성 폼 UI/레이아웃 */}
      <h2 className="create-write-title">새글작성</h2>

      <div className="create-write-layout">
        <form className="create-write-form">
          <div className="create-two-columns">
            <label>
              도서 제목
              <input type="text" placeholder="제목" />
            </label>

            <label>
              작가 이름
              <input type="text" placeholder="작가 이름" />
            </label>
          </div>

          <label>
            내용
            <textarea rows="7" placeholder="내용" maxLength="100" />
            <span className="create-count">0/100</span>
          </label>

          <label>
            api키
            <input type="text" placeholder="api키" />
          </label>

          {/* UI/레이아웃팀 담당: 품질 선택 버튼 UI */}
          <div className="create-quality-group">
            <p>품질</p>
            <div className="create-quality-buttons">
              {['low', 'medium', 'high'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={quality === item ? 'active' : ''}
                  onClick={() => setQuality(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* UI/레이아웃팀 담당: 버튼 배치 UI만 담당 */}
          {/* TODO: 이미지 미리보기/등록 기능 연결은 담당자가 처리 */}
          <div className="create-action-row">
            <button type="button" className="create-preview-button">
              이미지 미리보기
            </button>
            <button type="button" className="create-submit-button">
              등록하기
            </button>
          </div>
        </form>

        {/* UI/레이아웃팀 담당: 이미지 미리보기 영역 UI/레이아웃 */}
        <aside className="create-preview-card">
          <div className="create-preview-image-box">이미지</div>

          <strong>이미지 미리보기</strong>
          <p>선택된 품질: {quality}</p>
          <span>입력 작성 후 이미지 미리보기를 눌러 표지를 먼저 생성하세요</span>
        </aside>
      </div>
    </section>
  )
}

export default Create