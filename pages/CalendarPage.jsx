import React, { useState, useEffect, useRef } from 'react';
import { useDrag } from '../src/hooks/useDrag.jsx';
import  {useWeeks} from '../src/hooks/useWeeks.jsx';
import { MdOutlineArrowDropDown } from "react-icons/md";

import './styles/CalendarPage.css';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];



const CalendarPage = () => {
    const calendarWeeksRef = useRef(null);


    const events = {
        '2024-03-21': [
            { title: 'Meeting', startHour: 10, duration: 1.5 },
            { title: 'Lunch', startHour: 13, duration: 1 }
        ]
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
    <main className="calendar-container">
        <header className="calendar-header">
            <section className="calendar-month">
                {months[currentDate.getMonth()]}
                <MdOutlineArrowDropDown className='calendar-month-icon'/>
            </section>
            
        </header>
        
        <main className="calendar-content">
            <aside className="hour-labels">
                    <section className='calendar-week-date'/>
                {Array.from({ length: 23 }, (_, i) => (
                    <section key={i + 1} className="hour-label">
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
                                <header className="calendar-week-date">
                                    <span className="day-letter">{daysOfWeek[index]}</span>
                                    <span className="date-number">{date.getDate()}</span>
                                </header>
                                <div className="hour-blocks">
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <div key={i} className="hour-block"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="calendar-week current-week">
                        {currentWeek.map((date, index) => (
                            <div key={index} className="calendar-day-container">
                            <header className="calendar-week-date">
                                <span className="day-letter">{daysOfWeek[index]}</span>
                                <span className="date-number">{date.getDate()}</span>
                            </header>
                            <div className="hour-blocks">
                                {Array.from({ length: 24 }, (_, i) => (
                                    <div key={i} className="hour-block"></div>
                                ))}
                            </div>
                        </div>
                        ))}
                    </section>
                    <section className="calendar-week next-week">
                        {nextWeek.map((date, index) => (
                            <div key={index} className="calendar-day-container">
                                <header className="calendar-week-date">
                                    <span className="day-letter">{daysOfWeek[index]}</span>
                                    <span className="date-number">{date.getDate()}</span>
                                </header>
                                <div className="hour-blocks">
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <div key={i} className="hour-block"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </main>
        </main>
    </main>
);
};

export default CalendarPage;