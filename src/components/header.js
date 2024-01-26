const SDMSTitle = () => {
  return (
    <h1 id='title'>성승원 도파민 모니터링 시스템(SDMS)</h1>
  )
}

const SDMSStatus = (props) => {
  return (
    <h2>현재상태 무사고 {props.noProblemDayCount}일차 치킨 {props.chickenCount}마리 적립</h2>
  )
}