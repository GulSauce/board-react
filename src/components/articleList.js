import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ArticlePreview = (props) => {
  let navigate = useNavigate()

  const handleClick = () => {
    navigate(`/article/${props.id}`)
  }
  return (
    <div className="articlePreview" onClick={handleClick}>
      <div className="idAndNickname">
        <div className="articleId">{props.id}</div>
        <div className="nickname">{props.nickname}</div>
      </div>
      <div className="articleTitle">{props.title}</div>
    </div>
  )
}

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const response = await axios.get(
          'https://loasim.com/api/article/list?page=1',
        )
        setArticleList(response.data.list)
      } catch (error) {
        console.error('Error fetching article list:', error)
      }
    }

    fetchArticleList()
  }, [])

  return (
    <div>
      <div className="articlePreview">
        <div className="idAndNickname">
          <div className="articleId">번호</div>
          <div className="nickname">닉네임</div>
        </div>
        <div className="articleTitle headerTitle">제목</div>
      </div>
      {articleList.map(({ id, nickname, title }) => (
        <ArticlePreview key={id} id={id} nickname={nickname} title={title} />
      ))}
    </div>
  )
}
