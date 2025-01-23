import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NavBar from '../components/Navbar.jsx';
import './App.css';
import SearchTodos from '../pages/SearchTodos.jsx';
import { useEffect } from 'react';
import { wouldBeDeleted } from '../utils/Todos.js';

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
                    {active === 'Calendario' && <About />}
                    {active === 'Buscar' && <SearchTodos todos={todos} setTodos={setTodos} types={types} setTypes={setTypes} />}
                </section>
                <NavBar setActive={setActive} active={active} />
        </main>
    );
}

export default App;