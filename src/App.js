import './App.css'
import { SDMSTitle, SDMSStatus } from 'components/header'
import { MatchHistory } from 'components/match_history'
import { ArticleList } from 'components/articleList'
import { WriteArticle } from 'components/writeArticle'
import { Article } from 'components/article'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SDMSTitle></SDMSTitle>
        <SDMSStatus></SDMSStatus>
        <Routes>
          <Route
            path="/"
            element={
              <div id="bottom">
                <MatchHistory></MatchHistory>

                <div id="articleContain">
                  <h3>자유게시판</h3>
                  <div id="articleNavBar">
                    <Link id="writeArticle" to="/article/write"></Link>
                  </div>
                  <ArticleList></ArticleList>
                </div>
              </div>
            }
          />
          <Route
            path="/article/write"
            element={<WriteArticle></WriteArticle>}
          />
          <Route path="/article/:articleId" element={<Article></Article>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
