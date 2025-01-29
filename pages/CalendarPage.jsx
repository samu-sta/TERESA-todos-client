import React, { useState, useEffect, useRef } from 'react';
import { useDrag } from '../src/hooks/useDrag.jsx';
import { useWeeks } from '../src/hooks/useWeeks.jsx';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import AddEventModal from '../components/AddEventModal.jsx';
import { isDateTodo } from '../utils/Todos.js';

import './styles/CalendarPage.css';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];





const CalendarPage = ({ events, setEvents }) => {
  const calendarWeeksRef = useRef(null);

  const [addModalVisibility, setAddModalVisibility] = useState(false);

  const toggleAddModalVisibility = () => {
    setAddModalVisibility(!addModalVisibility);
  }

  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toggleModalVisibility = (event = null) => {
    setSelectedEvent(event);
    setModalVisibility(!modalVisibility);
  };



  const renderEvents = (date) => {
    return events.filter(event => {
        // Create date object from event date
        
        return isDateTodo(event, date);
    }).map(event => {
      const startMinute = event.date.minute;
      const startHour = event.date.hour + startMinute / 60;
        const hourHeight = 37;
        const top = 79.5 + startHour * hourHeight;
        const height = (event.duration / 60) * hourHeight;

        return (
            <div
                key={event.id}
                className="calendar-event"
                style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    background: event.color
                }}
                onClick={() => toggleModalVisibility(event)}
            >
                {event.title}
            </div>
        );
    });
};

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };




  const {
    currentDate,
    currentWeek,
    previousWeek,
    nextWeek,
    handleNextWeek,
    handlePrevWeek
  } = useWeeks();

  const { handleDragStart, handleDrag, handleDragEnd } = useDrag(
    calendarWeeksRef,
    handlePrevWeek,
    handleNextWeek
  );

  return (
    <>
      <main className="calendar-container">
        <header className="calendar-header">
          <section className="calendar-month">
            {months[currentDate.getMonth()]}
            <MdOutlineArrowDropDown className='calendar-month-icon' />
          </section>

        </header>

        <main className="calendar-content">
          <aside className="hour-labels">
            <section className='calendar-week-date' />
            {Array.from({ length: 23 }, (_, i) => (
              <section key={i + 1} className={`hour-label ${i === 0 ? 'first-hour-label' : ''}`}>
                {`${i + 1}:00`}
              </section>
            ))}
          </aside>
          <main className="calendar-scroll"
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
          >
            <main className="calendar-weeks" ref={calendarWeeksRef}>
              <section className="calendar-week previous-week">
                {previousWeek.map((date, index) => (
                  <div key={index} className="calendar-day-container">
                    <header className={`calendar-week-date ${isToday(date) ? 'today' : ''}`}>
                      <span className="day-letter">{daysOfWeek[index]}</span>
                      <span className="date-number">{date.getDate()}</span>
                    </header>
                    <div className="hour-blocks">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="hour-block"></div>
                      ))}
                      {renderEvents(date)}

                    </div>
                  </div>
                ))}
              </section>
              <section className="calendar-week current-week">
                {currentWeek.map((date, index) => (
                  <div key={index} className="calendar-day-container">
                    <header className={`calendar-week-date ${isToday(date) ? 'today' : ''}`}>
                      <span className="day-letter">{daysOfWeek[index]}</span>
                      <span className="date-number">{date.getDate()}</span>
                    </header>
                    <div className="hour-blocks">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="hour-block"></div>
                      ))}
                      {renderEvents(date)}
                    </div>
                  </div>
                ))}
              </section>
              <section className="calendar-week next-week">
                {nextWeek.map((date, index) => (
                  <div key={index} className="calendar-day-container">
                    <header className={`calendar-week-date ${isToday(date) ? 'today' : ''}`}>
                      <span className="day-letter">{daysOfWeek[index]}</span>
                      <span className="date-number">{date.getDate()}</span>
                    </header>
                    <div className="hour-blocks">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="hour-block"></div>
                      ))}
                      {renderEvents(date)}
                    </div>
                  </div>
                ))}
              </section>
            </main>
          </main>
        </main>

        <button className='add-event-button'
          onClick={toggleAddModalVisibility}
        ><IoMdAdd /></button>
      </main>
      {addModalVisibility &&
      <AddEventModal toggleModalVisibility={toggleAddModalVisibility} events={events} setEvents={setEvents} isAddingEvent={true} />
      }
      {modalVisibility && (
        <AddEventModal 
          toggleModalVisibility={() => toggleModalVisibility(null)}
          events={events} 
          setEvents={setEvents}
          isAddingEvent={!selectedEvent}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default CalendarPage;