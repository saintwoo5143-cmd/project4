// API 엔드포인트 상수
export const API_BASE_URL = 'http://localhost:3000'
export const BOOKS_URL = `${API_BASE_URL}/books`
export const OPENAI_IMAGE_API_URL = 'https://api.openai.com/v1/images/generations'

// 날짜 포맷 유틸
export function formatDate(isoString) {
  if (!isoString) return '-'
  const d = new Date(isoString)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 도서 목록 전체 조회
export async function fetchBooks() {
  const res = await fetch(BOOKS_URL)
  if (!res.ok) throw new Error('도서 목록을 불러오지 못했습니다.')
  return res.json()
}

// 도서 단건 조회
export async function fetchBookById(id) {
  const res = await fetch(`${BOOKS_URL}/${id}`)
  if (!res.ok) throw new Error('도서 정보를 불러오지 못했습니다.')
  return res.json()
}

// 도서 등록 (POST)
export async function createBook(bookData) {
  const now = new Date().toISOString()
  const res = await fetch(BOOKS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...bookData, createdAt: now, updatedAt: now }),
  })
  if (!res.ok) throw new Error('도서 등록에 실패했습니다.')
  return res.json()
}

// 도서 수정 (PATCH)
export async function updateBook(id, bookData) {
  const res = await fetch(`${BOOKS_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...bookData, updatedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error('도서 수정에 실패했습니다.')
  return res.json()
}

// 도서 삭제 (DELETE)
export async function deleteBook(id) {
  const res = await fetch(`${BOOKS_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('도서 삭제에 실패했습니다.')
  return true
}

// 표지 이미지 저장 (PATCH - coverImageUrl만)
export async function saveCoverImage(id, coverImageUrl) {
  const res = await fetch(`${BOOKS_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coverImageUrl, updatedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error('표지 저장에 실패했습니다.')
  return res.json()
}

// OpenAI GPT Image 호출
export async function generateCoverImage({ title, content, apiKey, quality = 'low' }) {
  const prompt = `
  # 역할
  너는 북커버 제작 담당자야. 
  
  # 지침
  - 전문적인 북커버 디자인, 높은 퀄리티의 일러스트레이션, 두드러진 시각적 표현, 작품에 적합한 안전성
  - 이야기의 분위기나 무드를 포함
  
  # 책 정보
  - 제목 : "${title}"
  - 내용 요약 : ${content}.
  `

  const res = await fetch(OPENAI_IMAGE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1024x1536',
      quality,
      output_format: 'png',
    }),
  })

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    const status = res.status
    if (status === 401) throw new Error('API Key가 올바르지 않습니다. 확인 후 다시 시도해주세요.')
    if (status === 429) throw new Error('요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.')
    throw new Error(errData?.error?.message || 'OpenAI 이미지 생성에 실패했습니다.')
  }

  const data = await res.json()
  const b64Json = data?.data?.[0]?.b64_json
  if (!b64Json) throw new Error('이미지 데이터를 받지 못했습니다.')

  return `data:image/png;base64,${b64Json}`
}
