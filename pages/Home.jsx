import { useState, useEffect } from 'react'
import './styles/Home.css'
import Todo from '../components/Todo.jsx'
import AddTodo from '../components/AddTodo.jsx'
import CustomDatePicker from '../components/CustomDatePicker.jsx'
import { isDateTodo, returnWeekDay, returnMonth, wouldBeDeleted, isCompletedInDate} from '../utils/Todos.js'

function Home({todos, setTodos, types, setTypes}) {

  

  const [expandedTodo, setExpandedTodo] = useState(null)
  const [todayTodos, setTodayTodos] = useState([])
  const [date, setDate] = useState(new Date())

  const toggleExpanded = (id) => {
    setExpandedTodo(expandedTodo === id ? null : id)
  }

  useEffect(() => {
    const todayTodos = todos
    .filter(todo => isDateTodo(todo, date) && ! isCompletedInDate(todo, date))
    setTodayTodos(todayTodos)
  }
  , [todos, date])

  useEffect(() => {
      // Save todos to localStorage whenever they change
      setTodos(todos.filter(todo => ! wouldBeDeleted(todo, new Date())))
      }, [date]);

  return (
    <>
      <main className='home-main'>
        
        <CustomDatePicker
              dateSelected={date}
              setDate={setDate}
            />

        <section className='todos notebook'>
          <h2 className='today-section-h2'>{date.getDate()} {returnMonth(date)} • {returnWeekDay(date)}</h2>

          <ul className='todos-ul'>
            
              {todayTodos.map(todo => (
                <li className='todo-li' key={todo.id}>
                  <Todo
                    id={todo.id}
                    todo={todo}
                    actualDate={date}
                    expanded={expandedTodo === todo.id}
                    onToggleExpanded={() => toggleExpanded(todo.id)}
                    setTodos={setTodos}
                    types={types}
                    setTypes={setTypes}
                  />
                </li>
              ))}
            
            <AddTodo 
              setTodos={setTodos} 
              date={date} 
              setDate={setDate}
              types={types}
              setTypes={setTypes}
            />
          </ul>
        </section>


      </main>


    </>
  )
}

export default Home
