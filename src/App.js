import { useState } from 'react'
import './App.css'

function App() {
  let [noProblemDayCount, updateDay] = useState(0)
  let [chickenCount, updateChickenCount] = useState(0)
  let [articleList, updateArticleList] = useState(['공감...jpg', '존잘...jpg', '우흥...jpg'])
  let [curArticleTitle, updateCurArticleTitle] = useState({})
  let [userInput, updateUserinput] = useState('')
  let [like, updateLike] = useState([0,0,0])
  let [isArticleOpen, updateArticleOpen] = useState('close');

  return (
    <div className="App"> 
      <SDMSTitle></SDMSTitle>
      
      <h2>현재상태 무사고 {noProblemDayCount}일차 치킨 {chickenCount}마리 적립</h2> 
      <div id="bottom">

        <MatchHistory></MatchHistory>
        
        <div id='articleContain'>
          <h3>게시글</h3>
          
          {
            articleList.map((title, index) => 
            <ArticlePreview 
              key={index}
              like={like}
              title={title} 
              index={index}
              updateLike={updateLike}
              updateArticleOpen= {updateArticleOpen}
              updateCurArticleTitle= {updateCurArticleTitle}>
            </ArticlePreview>)
          }

          {
            isArticleOpen === 'open' ? 
            <Article 
              curArticleTitle={curArticleTitle} 
              updateCurArticleTitle={updateCurArticleTitle} 
              articleList = {articleList}
              updateArticleList={updateArticleList}
              updateArticleOpen={updateArticleOpen}>
            </Article> : null
          }

        </div>
      </div>
      <input onChange={(e)=>{updateUserinput(e.target.value)}}></input>
      <button onClick={() => {
        const newLike = [0, ...like]
        updateLike(newLike)
        const newArticle = [userInput, ...articleList]
        updateArticleList(newArticle)
      }}>글 쓰기</button>
    </div>
  )
}

const SDMSTitle = () => {
  return(
    <h1 id='title'>성승원 도파민 모니터링 시스템(SDMS)</h1>
  )
}

const MatchHistory = () => {
  return(
    <div id='matchList'>전적</div>
  )
}

const ArticlePreview = (props) => {
  return(
    <div className='articlePreview' 
      onClick={() => {
        props.updateCurArticleTitle({content:props.title, index:props.index})
        props.updateArticleOpen('open')}}>
      {props.title}
      <span 
        onClick={(e) => {
          e.stopPropagation()
          const likeArray = [...props.like]
          likeArray[props.index] += 1
          props.updateLike(likeArray) }}>
        👍
      </span>
      {props.like[props.index]}
    </div>
  )
}

const Article = (props) => {
  return(
    <div className='article'>
      <span 
        onClick={() => {
          const {content, index} = props.curArticleTitle
          const newTitle = `[개추 요청] ${content}`
          props.updateCurArticleTitle({content:newTitle, index})

          const editedArticleList = props.articleList
          editedArticleList[index] = newTitle
          props.updateArticleList(editedArticleList)}}>
        글 수정|
      </span>

      <span 
        onClick={() => {
          const {index} = props.curArticleTitle
          const removedArticleList = [...props.articleList]
          removedArticleList.splice(index, 1)
          props.updateArticleList(removedArticleList)
          props.updateArticleOpen('close')
        }}>
        글 삭제
      </span>

      <h4>{props.curArticleTitle.content}</h4>
      <p>공감되면 개추 ㅋㅋ</p>
    </div>
  )
}

export default App
