import { useState, useEffect } from 'react'
import './styles/Todo.css'
import TodoModal from './TodoModal.jsx'
import { isTodoAllCompleted } from '../utils/Todos.js'


function Todo({ id, todo, setTodos, frecuency, actualDate, types, setTypes }) {
  const [completed, setCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentType, setCurrentType] = useState(todo.type || '');
  const [startDate, setCurrentDate] = useState(new Date(todo.date.year, todo.date.month - 1, todo.date.day) || null);
  const [currentFrecuency, setCurrentFrecuency] = useState(todo.frecuency || '');


  const completeTodo = () => {
    setCompleted(true);
    setFadeOut(true);

    setTimeout(() => {
      if (!todo.date.frecuency) {
        deleteTodo()
        return;
      }
      isTodoAllCompleted(todo) ?
        deleteTodo()
        :
        completeFrecuencyTodo();
    }, 300);
  };


  const deleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  const completeFrecuencyTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return updateCompletedTodos(todo);
      })
    );
  };

  const onToggleVisible = () => {
    setIsVisible(!isVisible)
  }



  useEffect(() => {
    if (!isVisible) {
      setCurrentType(todo.type)
    }
  }, [isVisible]);

  useEffect(() => {
    setCurrentType(todo.type)
  }, [todo.type]);





  const updateCompletedTodos = (todo) => ({
    ...todo,
    completedTodos: [
      ...todo.completedTodos,
      {
        year: actualDate.getFullYear(),
        month: actualDate.getMonth() + 1,
        day: actualDate.getDate(),
      },
    ],
  });

  return (
    <>
      <article
        className={`todoArticle todo ${fadeOut ? 'fade-out' : ''}`}
        onClick={onToggleVisible}
      >
        <main className='todo-main'>
          <input
            type="checkbox"
            id={id} name={id}
            value={id}
            checked={completed}
            onClick={(e) => e.stopPropagation()}
            onChange={completeTodo}
            className='todo-checkbox'
          />
          <span className={`${completed ? 'completed' : ''}`} >
            {todo.text}
          </span>
        </main>
        <footer className={`todo-footer ${completed ? 'completed-footer' : ''}`}>
          <p>
            {currentType}
          </p>
        </footer>

      </article>

      <TodoModal
        onToggleVisible={onToggleVisible}
        isVisible={isVisible}
        setTodos={setTodos}
        todo={todo}
        currentType={currentType}
        setCurrentType={setCurrentType}
        startDate={startDate}
        setCurrentDate={setCurrentDate}
        currentFrecuency={currentFrecuency}
        setCurrentFrecuency={setCurrentFrecuency}
        types={types}
        setTypes={setTypes}
      />
    </>
  )
}

export default Todo