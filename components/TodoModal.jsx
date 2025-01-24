import { useState, useEffect, useRef } from 'react'
import './styles/TodoModal.css'
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import TypeModal from './TypeModal.jsx'
import DateModal from './DateModal.jsx'


function TodoModal({ onToggleVisible, isVisible, setTodos, isNewTodo, todo,
  currentType, startDate, currentFrecuency, setCurrentDate, setCurrentFrecuency, setCurrentType,
  types, setTypes}) {



  const [inputNameValue, setInputNameValue] = useState('');
  const [inputDescriptionValue, setInputDescriptionValue] = useState('');
  const inputNameRef = useRef(null);


  

    


  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const emptyInput = () => {
    setInputNameValue('');
    setInputDescriptionValue('');
    setCurrentType('');
    setCurrentDate(new Date());
    setCurrentFrecuency(undefined);
    inputNameRef.current.focus();
  }

  useEffect(() => {
    if (isVisible && inputNameRef.current) {
      inputNameRef.current.focus(); // Enfocar el campo de entrada del nombre
    }
    
    if (!isNewTodo && todo) {
      setInputNameValue(todo.text || '');
      setInputDescriptionValue(todo.desc || '');
      setCurrentType(todo.type || '');
      setCurrentDate(new Date(todo.date.year, todo.date.month - 1, todo.date.day));
      setCurrentFrecuency(todo.date.frecuency || undefined);
    }
  }, [isVisible]);

  

  const toggleModalType = () => {
    setTypeModalVisible(!typeModalVisible);
  };

  const toggleModalDate = () => {
    setDateModalVisible(!dateModalVisible);
  };

  const handleInputNameChange = (e) => {
    setInputNameValue(e.target.value);
  };

  const handleInputDescriptionChange = (e) => {
    setInputDescriptionValue(e.target.value);
  }

  const confirmTodo = () => {

    let newTodo =
    {
      text: inputNameValue,
      desc: inputDescriptionValue,
      type: currentType,
      date: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
        frecuency: currentFrecuency
      },
    }

    currentFrecuency
      ? newTodo =
      {
        ...newTodo,
        completedTodos: []
      }
      : newTodo =
      {
        ...newTodo,
        completed: false
      }


    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: prevTodos.length + 1,
          ...newTodo
        }
      ];
    });
    emptyInput()
  };

  const updateTodo = () => {
    onToggleVisible();
    setTodos(prevTodos => {
      return prevTodos.map(prevTodo => {
        if (prevTodo.id === todo.id) {
          return {
            ...prevTodo,
            text: inputNameValue,
            desc: inputDescriptionValue,
            type: currentType,
            date: {
              year: startDate.getFullYear(),
              month: startDate.getMonth() + 1,
              day: startDate.getDate(),
              frecuency: currentFrecuency
            }
          }
        }
        return prevTodo;
      });
    });
  }

  const deleteTodo = () => {
    onToggleVisible();
    setTodos(prevTodos => {
      return prevTodos.filter(prevTodo => prevTodo.id !== todo.id);
    });
  }

  return (
    <>
      <div className={`overlay ${isVisible ? '' : 'hidden'}`}
        onClick={typeModalVisible || dateModalVisible
          ?
          null
          :
          () => {
            onToggleVisible();
            isNewTodo ? emptyInput() : null
          }
        }>
        <TypeModal
          isVisible={typeModalVisible}
          setCurrentType={setCurrentType}
          types={types}
          onToggleVisible={toggleModalType}
          setTypes={setTypes}
        />

        <DateModal
          isVisible={dateModalVisible}
          onToggleVisible={toggleModalDate}
          date={startDate}
          setDate={setCurrentDate}
          setFrecuency={setCurrentFrecuency}
          currentFrecuency={currentFrecuency}
          isSearchSection={false}
        />

        <article className={`modal ${isVisible ? '' : 'hidden'}`}
          onClick={(e) => e.stopPropagation()}>

          <input
            ref={inputNameRef}
            type="text"
            placeholder="Nombre de la tarea"
            className="name notebook"
            value={inputNameValue}
            onChange={handleInputNameChange}

          />
          <textarea
            placeholder="Descripción"
            className="description notebook"
            value={inputDescriptionValue}
            onChange={handleInputDescriptionChange}
          />
          <section className="options-section">
            <button className="time notebook"
              onClick={(e) => {
                setDateModalVisible(true)
                e.stopPropagation()
              }}
            >
              Fecha 📅
            </button>
            <button className="type notebook" onClick={() => setTypeModalVisible(true)}>
              {currentType || 'Seleccionar tipo 🏷️'}
            </button>
          </section>
          <section className='submit-section'>
            {isNewTodo ? null
              :
              <button
                className='delete'
                onClick={deleteTodo}
              >
                <MdDelete />
              </button>
            }
            <button className='cancel'
              onClick={() => {
                onToggleVisible();
                emptyInput()

              }}
            >
              ✕
            </button>
            <button
              className={`${inputNameValue ? 'submit' : 'submit-unable'}`}
              onClick={isNewTodo ? confirmTodo : updateTodo}
              disabled={!inputNameValue}
            ><IoSend /></button>


          </section>

        </article>
      </div>


    </>
  )
}

export default TodoModal