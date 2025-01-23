import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NavBar from '../components/Navbar.jsx';
import './App.css';

function About() {
    return <h1>About</h1>;
}

function App() {
    
    const [active, setActive] = useState('Diarias');

    return (
       <main className='app-main'>
                <header className='app-header'>
                    <p className='floating-flower'>🌸</p>
                    <h1 className='today-title'>TERESA'S todos</h1>
                    <p className='floating-flower'>🌸</p>
                </header>
                {active === 'Diarias' && <Home />}
                {active === 'Calendario' && <About />}
                <NavBar setActive={setActive} active={active} />
        </main>
    );
}

export default App;