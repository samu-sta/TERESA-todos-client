import { useState, useEffect } from 'react'
import './App.css'
import Todo from '../components/Todo.jsx'
import AddTodo from '../components/AddTodo.jsx'
import CustomDatePicker from '../components/CustomDatePicker.jsx'
import { isDateTodo, returnWeekDay, returnMonth, wouldBeDeleted, isCompletedInDate} from '../utils/Todos.js'

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

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
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  , [todos]);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    setTodos(todos.filter(todo => ! wouldBeDeleted(todo, new Date())))
  }, [date]);


  return (
    <>
      <main className='app-main'>
        <div className='corner-flower corner-flower-1'>🌺</div>
        <div className='corner-flower corner-flower-2'>🌺</div>
        <div className='corner-flower corner-flower-3'>🌺</div>
        <div className='corner-flower corner-flower-4'>🌺</div>

        <header className='today-header'>
          <p className='floating-flower'>🌸</p>
          <h1 className='today-title'>TERESA'S todos</h1>
          <p className='floating-flower'>🌸</p>
        </header>
        <CustomDatePicker
              dateSelected={date}
              setDate={setDate}
            />
        
        <section className='todos notebook'>
          <h2 className='today-section-h2'>{date.getDate()} {returnMonth(date)} • {returnWeekDay(date)}</h2>

          <ul>
            {
            todayTodos
              .length === 0 ? 
                <div className='main-no-todos'>
                  <img src="../images/donkey-shrek.gif" alt="Decorative GIF" className="decorative-gif" />
                </div>
              :
              todayTodos.map(todo => (
                <li key={todo.id}>
                  <Todo
                    id={todo.id}
                    todo={todo}
                    actualDate={date}
                    expanded={expandedTodo === todo.id}
                    onToggleExpanded={() => toggleExpanded(todo.id)}
                    setTodos={setTodos}
                  />
                </li>
              ))}
            
            <AddTodo setTodos={setTodos} date={date} setDate={setDate}/>
          </ul>
        </section>


      </main>


    </>
  )
}

export default App
