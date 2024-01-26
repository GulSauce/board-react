import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './App.css'
import {title, content} from '@src/data/data'
import {SDMSTitle, SDMSStatus} from '@src/components/header'
import {MatchHistory} from '@src/components/match_history'
import {ArticlePreview, Article} from '@src/components/article'

function App() {
  let [noProblemDayCount, updateDay] = useState(0)
  let [chickenCount, updateChickenCount] = useState(0)
  let [articleList, updateArticleList] = useState(title)
  let [curArticleTitle, updateCurArticleTitle] = useState({})
  let [userInput, updateUserinput] = useState({})
  let [like, updateLike] = useState([0, 0, 0])
  let [isArticleOpen, updateArticleOpen] = useState('close');

  return (
    <div className="App">
      <SDMSTitle></SDMSTitle>

      <SDMSStatus noProblemDayCount={noProblemDayCount} chickenCount={chickenCount}></SDMSStatus>

      <div id="bottom">

        <MatchHistory></MatchHistory>

        <div id='articleContain'>
          <h3>게시글</h3>
          <input onChange={(e) => { updateUserinput(e.target.value) }}></input>

          <Button variant="light" onClick={() => {
            const newLike = [0, ...like]
            updateLike(newLike)
            const newArticle = [userInput, ...articleList]
            updateArticleList(newArticle)
          }}>글쓰기</Button>

          {
            articleList.map((curTitle, index) =>
              <ArticlePreview
                key={index}
                like={like}
                title={title}
                index={index}
                updateLike={updateLike}
                updateArticleOpen={updateArticleOpen}
                updateCurArticleTitle={updateCurArticleTitle}>
              </ArticlePreview>)
          }

          {
            isArticleOpen === 'open' ?
              <Article
                curArticleTitle={curArticleTitle}
                updateCurArticleTitle={updateCurArticleTitle}
                articleList={articleList}
                updateArticleList={updateArticleList}
                updateArticleOpen={updateArticleOpen}>
              </Article> : null
          }

        </div>
      </div>
    </div>
  )
}

export default App
