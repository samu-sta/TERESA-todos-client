import React, { useState } from 'react';
import Todo from '../components/Todo.jsx';
import './styles/SearchTodos.css';

const SearchTodos = ({todos, setTodos}) => {
    const [todoName, setTodoName] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);
    console.log(todos);

    const handleInputChange = (e) => {
      const value = e.target.value.toLowerCase();
      setTodoName(value);
      if (value === '') {
        setFilteredTodos([]);
        return;
      }
      const filtered = todos.filter((todo) => 
          todo.text.toLowerCase().includes(value)
      );
      setFilteredTodos(filtered);
      console.log(filtered);


    };

    return (
        <main className='search-main'>
            <input
                className='notebook input-search'
                type="text"
                placeholder="Buscar tareas..."
                value={todoName}
                onChange={handleInputChange}
            />
            <section className="options-section options-section-search">
            <button className="notebook button-search"
            >
              Fecha 📅
            </button>
            <button className="notebook button-search" >
              { 'Tipo 🏷️'}
            </button>
          </section>
          <section className='todos notebook'>
            <ul className='todos-ul todos-ul-search'>
              {filteredTodos.map((todo) => (
                <li className='todo-li' key={todo.id}>
                  <Todo
                    id={todo.id}
                    todo={todo}
                    actualDate={todo.date}
                    setTodos={setTodos}
                  />
                </li>
              ))}
            </ul>
            </section>
        </main>
    );
};

export default SearchTodos;