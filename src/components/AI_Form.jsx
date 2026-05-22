// import { fetchBooks, formatDate } from '../api.js'

function AIForm() {
    return (<>
        <p> AI Form </p>
        <section>
            <form>
                <p>OpenAI API Key:</p>
                <input></input>
                
                <button type='submit'> 제출 </button>
            </form>
            <form>
                <div><img src='./test_src/01.png'></img></div>
                <div><h3>책 내용</h3>
                <p>db.json에 끌어다 쓴 내용 or state에서 실시간으로 받은 내용</p>
                <br></br>
                <p>생성일 : yyyy.mm.dd</p>
                <p>수정일 : yyyy.mm.dd</p>
                </div>

            </form>

        </section>
    </>)
};

export default AIForm