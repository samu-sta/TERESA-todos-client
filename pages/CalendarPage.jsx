import React, { useState, useRef } from 'react';
import { useDrag } from '../src/hooks/useDrag.jsx';
import  {useWeeks} from '../src/hooks/useWeeks.jsx';
import './styles/CalendarPage.css';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const CalendarPage = () => {
    const calendarWeeksRef = useRef(null);
    

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
        <header>
            <section className="calendar-month">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </section>
            <section className="calendar-header">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="calendar-day">{day}</div>
                ))}
            </section>
        </header>
        
        <main className="calendar-content">
            <aside className="hour-labels">
                {Array.from({ length: 24 }, (_, i) => (
                    <section key={i} className="hour-label">
                        {`${i}:00`}
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
                                <div className="calendar-date">{date.getDate()}</div>
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
                                <div className="calendar-date">{date.getDate()}</div>
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
                                <div className="calendar-date">{date.getDate()}</div>
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