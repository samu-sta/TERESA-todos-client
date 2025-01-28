import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NavBar from '../components/Navbar.jsx';
import './App.css';
import SearchTodos from '../pages/SearchTodos.jsx';
import { useEffect } from 'react';
import CalendarPage from '../pages/CalendarPage.jsx';
function About() {
    return <h1>About</h1>;
}

function App() {
    
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });

    const [types, setTypes] = useState(() => {
    // Cargar los types desde localStorage si están disponibles
    const savedTypes = localStorage.getItem('types');
    return savedTypes ? JSON.parse(savedTypes) : [];
    });

    const sevents = [
      {
          id: 1,
          title: 'Meeting with John',
          date: new Date(2025, 0, 26, 16, 0),
          duration: 60,
          color: '#FF0000'
      },
      {
          id: 2,
          title: 'Lunch with Sara',
          date: new Date(2025, 0, 26, 14, 0),
          duration: 60,
          color: '#00FF00'
      },
      {
          id: 3,
          title: 'Lunch with SUUUUU',
          date: new Date(2025, 0, 24, 10, 0),
          duration: 120,
          color: '#0000FF'
      }

    ];
    const [events, setEvents] = useState(sevents);

    useEffect(() => {
        // Save todos to localStorage whenever they change
        localStorage.setItem('todos', JSON.stringify(todos));
      }
      , [todos]);
    
      useEffect(() => {
        localStorage.setItem('types', JSON.stringify(types));
      }, [types]);

    
    
    const [active, setActive] = useState('Diarias');

    return (
       <main className='app-main'>
                <section className='app-section'>
                    <header className='app-header'>
                        <p className='floating-flower'>🌸</p>
                        <h1 className='today-title'>TERESA'S todos</h1>
                        <p className='floating-flower'>🌸</p>
                    </header>
                    {active === 'Diarias' && <Home todos={todos} setTodos={setTodos} types={types} setTypes={setTypes} />}
                    {active === 'Calendario' && <CalendarPage events={events} setEvents={setEvents}/>}
                    {active === 'Buscar' && <SearchTodos todos={todos} setTodos={setTodos} types={types} setTypes={setTypes} />}
                </section>
                <NavBar setActive={setActive} active={active} />
        </main>
    );
}

export default App;