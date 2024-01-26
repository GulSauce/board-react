const ArticlePreview = (props) => {
  return (
    <div className='articlePreview'
      onClick={() => {
        props.updateCurArticleTitle({ content: props.title, index: props.index })
        props.updateArticleOpen('open')
      }}>
      {props.title}
      <span
        onClick={(e) => {
          e.stopPropagation()
          const likeArray = [...props.like]
          likeArray[props.index] += 1
          props.updateLike(likeArray)
        }}>
        👍
      </span>
      {props.like[props.index]}
    </div>
  )
}

const Article = (props) => {
  return (
    <div className='article'>
      <span
        onClick={() => {
          const { content, index } = props.curArticleTitle
          const newTitle = `[개추 요청] ${content}`
          props.updateCurArticleTitle({ content: newTitle, index })

          const editedArticleList = props.articleList
          editedArticleList[index] = newTitle
          props.updateArticleList(editedArticleList)
        }}>
        글 수정|
      </span>

      <span
        onClick={() => {
          const { index } = props.curArticleTitle
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