// import { fetchBooks, formatDate } from '../api.js'
import { useState, useEffect } from 'react'
import Dropdown from './Dropdown'

function CreateForm({onAddBook}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    
    const [quality, setQuality] = useState('middle');
    const [ai_api_key, setAi_api_key] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('./test_src/01.png');
    
    const [today, setToday] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    const [books, setBooks] = useState('');

    useEffect(() => {
    const day = new Date();
    const day_form = `${day.getFullYear()}년 ${day.getMonth()+1}월 ${day.getDate()}일`;
    setToday(day_form);
    setCreatedAt(day);
    setUpdatedAt(day);
    }, []);


    const handleClick = () => {
    if (!title.trim()) return;
        const newPost = {
        title,
        content
        };

        // onAddPost(newPost);
        setTitle('');
        setContent('');
    };

    const handleAddBook = async (newBook) => {
    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBook)
      });
    //   console.log(res.ok)
       const text = await res.text();
    //    console.log(text);
      const saved = await res.json();
      setPosts([saved, ...posts]);
    } catch (err) { console.error(err); }
    };

    const handleFinalForm = async () => {
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
        // 1. AI Image 생성
        try {
            const API_KEY = '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'
            const res = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Authorization': `Bearer ${API_KEY}`
                     },
            body: JSON.stringify({
                                    model: 'gpt-image-2',
                                    prompt,
                                    n: 1,
                                    size: '1024x1536',
                                    quality,
                                    output_format: 'png',
                                }),
                    });
            if (!res.ok) {
                setCoverImageUrl('./test_src/01.png');
                const errData = await res.json().catch(() => ({}))
                const status = res.status
                if (status === 401) throw new Error('API Key가 올바르지 않습니다. 확인 후 다시 시도해주세요.')
                if (status === 429) throw new Error('요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.')
                throw new Error(errData?.error?.message || 'OpenAI 이미지 생성에 실패했습니다.')
            }

            const data = await res.json();
            const b64Json = data?.data?.[0]?.b64_json;
            if (!b64Json) throw new Error('이미지 데이터를 받지 못했습니다.')
            const imageUrl = `data:image/png;base64,${b64Json}`;
            setCoverImageUrl(imageUrl);
            
                
                // setPosts([saved, ...posts]);
            } catch (err) { console.error(err); }
            
            // 2. db 저장

            const newBook = {
                title,
                content,
                author,
                likes:0,
                views:0,
                coverImageUrl,
                createdAt,
                updatedAt
            }

            
            try {
                const res = await fetch('http://localhost:3000/books', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newBook)
                });
                console.log(res.ok)
            } catch (err) { console.error(err) };
            
        }


    

    return (<>
        <p> Create Form </p>
        <section>
            <h2>새글 작성</h2>
            <form>
                <h2>제목</h2>
                <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <h2>저자</h2>
                <input value={author} onChange={(e) => setAuthor(e.target.value)}></input>
                <h2>내용</h2>
                <input value={content} onChange={(e) => setContent(e.target.value)}></input>
                {/* <button onClick={handleClick}>제출</button> */}
            </form>

            <hr />

            <form>
                <div>
                    <p>OpenAI API Key:</p>
                    <input value={ai_api_key} onChange={(e) => setAi_api_key(e.target.value)}></input>
                    <p>품질 :</p> <Dropdown value={quality} onChange={setQuality} />
                </div>

                {/* <button type='submit'> 이미지 생성 </button> */}
                <div><img src={coverImageUrl}></img></div>
                <div>
                    <h3>책 내용</h3>
                    <p>db.json에 끌어다 쓴 내용 or state에서 실시간으로 받은 내용</p>
                    <br></br>
                    <p>생성일 : {today}</p>
                    <p>수정일 : {today}</p>
                </div>
            </form>
            <hr />
            <button type='button' onClick={handleFinalForm}>최종 제출</button>
        </section>
    </>)
};

export default CreateForm;