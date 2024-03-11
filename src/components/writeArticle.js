import { useMemo, useRef, useState } from 'react'
import { ImageResize } from 'quill-image-resize-module'
import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill'
import axios from 'axios'

Quill.register('modules/ImageResize', ImageResize)

export const WriteArticle = () => {
  let navigate = useNavigate()

  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const formData = new FormData()
    const doc = new DOMParser().parseFromString(content, 'text/html')

    // 이미지 데이터 파싱 및 추가
    const images = doc.getElementsByTagName('img')
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i].src
      if (imageSrc.startsWith('data:')) {
        // MIME 타입에서 '*/' 뒤의 문자열을 확장자로 추출
        const mimeType = imageSrc.match(/data:([^;]+);/)[1]
        let extension = mimeType.split('/')[1] // '/'로 분리하고 뒤의 문자열을 취함
        if (extension === 'jpeg') {
          extension = 'jpg'
        }
        // Blob 생성 및 FormData에 추가
        const blob = await (await fetch(imageSrc)).blob()
        formData.append(`files`, blob, `image-${i}.${extension}`)
      }
      // URL 형식의 이미지 처리 로직 추가 가능
    }

    Array.from(images).forEach((img, index) => {
      img.src = index.toString() // 숫자를 문자열로 변환하여 src에 할당
    })

    // 변경된 DOM 객체에서 HTML 문자열을 다시 추출
    const htmlWithoutImages = doc.body.innerHTML

    // 이미지를 제외한 HTML 내용을 FormData에 추가
    formData.append('content', htmlWithoutImages)
    formData.append('nickname', nickname)
    formData.append('title', title)
    formData.append('password', password)

    // 서버로 FormData 전송
    try {
      const id = (
        await axios.post('https://loasim.com/api/article', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data.result
      navigate(`/article/${id}`)
    } catch (error) {
      console.error('Error uploading data:', error)
    }
  }

  // quill에서 사용할 모듈
  // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          ['float', 'height', 'width'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image'],
        ],
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }
  }, [])
  return (
    <>
      <div id="writeContain">
        <div id="writeHeader">
          <div>
            <input
              id="nicknameInput"
              className="headerInput"
              placeholder="닉네임"
              onChange={(event) => setNickname(event.target.value)}
            ></input>
            <input
              id="passwordInput"
              className="headerInput"
              placeholder="비밀번호"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <input
            id="titleInput"
            className="headerInput"
            placeholder="제목"
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <ReactQuill
          className="react-quill"
          placeholder="Quill Content"
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div>
      <div id="submitBtnContain">
        <div id="submit" onClick={handleSubmit}>
          작성완료
        </div>
      </div>
    </>
  )
}
