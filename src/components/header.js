import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SDMSTitle = () => {
  const friendName = process.env.REACT_APP_FRIEND_NAME
  return (
    <>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <h1 id="title">{friendName} 도파민 모니터링 시스템(SDMS)</h1>
      </Link>
    </>
  )
}

export const SDMSStatus = (props) => {
  let [noProblemDayCount, updateDay] = useState(0)
  let [chickenCount, updateChickenCount] = useState(0)

  return (
    <h2 id="matchStatus">
      {' '}
      현재상태 무사고 {noProblemDayCount}일차 치킨 {chickenCount}마리 적립{' '}
    </h2>
  )
}
