import { useState } from 'react'
import './styles/WeekDayButton.css'

function WeekDayButton({ text, checked, onClick}) {



  return (
    <button
      className={`${checked ? 'weekDay-checked' : ''} weekDay-button`}
      onClick={onClick}
     >
      {text}
    </button>
  )
}

export default WeekDayButton