import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import axios from 'axios'

export const Article = () => {
  const [article, setArticle] = useState({
    title: '',
    nickname: '',
    content: '',
  })

  let { articleId } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://loasim.com/article/${articleId}`,
        )
        setArticle(response.data.result)
      } catch (error) {
        console.error('Error fetching article list:', error)
      }
    }

    fetchArticle()
  }, [articleId])

  const sanitizedHtml = DOMPurify.sanitize(article.content)

  return (
    <div id="currentContain">
      <div id="currentTitle">{article.title}</div>
      <div id="currentNickname">{article.nickname}</div>
      <div
        id="currentContent"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      ></div>
    </div>
  )
}
