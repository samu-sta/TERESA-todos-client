import React, { useState, useEffect } from 'react';
import Todo from '../components/Todo.jsx';
import TypeModal from '../components/TypeModal.jsx';
import DateModal from '../components/DateModal.jsx';
import './styles/SearchTodos.css';

const SearchTodos = ({todos, setTodos, types, setTypes}) => {
    const [todoName, setTodoName] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [currentType, setCurrentType] = useState('');
    const [currentDate, setCurrentDate] = useState(null);
    const [typeModalVisible, setTypeModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);

    const [expandedTodo, setExpandedTodo] = useState(null);
    const toggleExpanded = (id) => {
      setExpandedTodo(expandedTodo === id ? null : id)
    }

    const handleInputChange = (e) => {
      const value = e.target.value.toLowerCase();
      setTodoName(value);
    };

    const toggleModalType = () => {
      setTypeModalVisible(!typeModalVisible);
    }

    const toggleModalDate = () => {
      setDateModalVisible(!dateModalVisible);
    }


    useEffect(() => {
      if (todoName === '' && currentType === '' && currentDate === null) {
        setFilteredTodos([]);
        return;
      }
      let filtered = todos.filter((todo) => todo.text.toLowerCase().includes(todoName));

      if (currentType !== '') {
        filtered = filtered.filter((todo) => todo.type === currentType);
      }

      if (currentDate !== null) {
        filtered = filtered.filter((todo) => {
          const todoDate = new Date(todo.date.year, todo.date.month - 1, todo.date.day);
          return todoDate.toDateString() === currentDate.toDateString();
        }
        );
      }
      setFilteredTodos(filtered);
    }, [todoName, todos, currentType, currentDate]);

    return (
      <>
      <div className={`overlay ${typeModalVisible ? '' : 'hidden'}`}
      onClick={ typeModalVisible
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
      </div>
        
        <main className='search-main'>
            <input
                className='notebook input-search'
                type="text"
                placeholder="Buscar tareas..."
                value={todoName}
                onChange={handleInputChange}
            />
            <section className="options-section options-section-search">
            <button className="notebook button-search" onClick={() => setDateModalVisible(true)}
            >
              { currentDate === null ? 'Fecha 📅' : currentDate.toLocaleDateString('es-ES') }
            </button>
            <button className="notebook button-search" onClick={() => setTypeModalVisible(true)}>
              { currentType === '' ? 'Tipo 🏷️' : currentType }
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
                    types={types}
                    setTypes={setTypes}
                    expanded={expandedTodo === todo.id}
                    onToggleExpanded={() => toggleExpanded(todo.id)}
                  />
                </li>
              ))}
            </ul>
            </section>
            <DateModal
              isVisible={dateModalVisible}
              onToggleVisible={toggleModalDate}
              date={currentDate}
              setDate={setCurrentDate}
              setFrecuency={() => {}}
              currentFrecuency={null}
              isSearchSection={true}
            />
        </main>

        </>
    );
};

export default SearchTodos;