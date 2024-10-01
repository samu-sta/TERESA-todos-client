import { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import './styles/AddTodo.css'

import TodoModal from './TodoModal.jsx'

function AddTodo({setTodos, date}) {

  const [isVisible, setIsVisible] = useState(false);

  const [currentType, setCurrentType] = useState('');
  const [startDate, setCurrentDate] = useState(date);
  const [currentFrecuency, setCurrentFrecuency] = useState(undefined);

  useEffect(() => {
    setCurrentDate(date);
  }
  , [date]);


  const onToggleVisible = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <article className='todoArticle'>
          <button 
            onClick={onToggleVisible}
            className='add-button'
            >
            <FaPlus />
            <span className='add-span'>Agregar tarea</span>
          </button>
      </article>

      <TodoModal 
        onToggleVisible={onToggleVisible}
        isVisible={isVisible}
        setTodos={setTodos}
        isNewTodo={true}
        startDate={startDate}
        currentType={currentType}
        currentFrecuency={currentFrecuency}
        setCurrentDate={setCurrentDate}
        setCurrentFrecuency={setCurrentFrecuency}
        setCurrentType={setCurrentType}

        />


    </>
  )
}

export default AddTodo
