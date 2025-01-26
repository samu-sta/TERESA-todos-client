import React, { useState, useEffect, useRef } from 'react';
import { useDrag } from '../src/hooks/useDrag.jsx';
import  {useWeeks} from '../src/hooks/useWeeks.jsx';
import { MdOutlineArrowDropDown } from "react-icons/md";

import './styles/CalendarPage.css';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];



const CalendarPage = () => {
    const calendarWeeksRef = useRef(null);


    const events = [
        {
            id: 1,
            title: 'Meeting with John',
            date: new Date(2025, 0, 26, 16, 0),
            duration: 60,
        },
        {
            id: 2,
            title: 'Lunch with Sara',
            date: new Date(2025, 0, 26, 14, 0),
            duration: 60,
        },
        {
            id: 3,
            title: 'Lunch with SUUUUU',
            date: new Date(2025, 0, 24, 10, 0),
            duration: 120,
        }

    ]

    const renderEvents = (date) => {
        return events.filter(event => 
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
        ).map(event => {
            const startHour = event.date.getHours();
            const top = startHour * 37; // 37px per hour block
            const height = (event.duration / 60) * 37; // Convert duration to pixels

            return (
                <div
                    key={event.id}
                    className="calendar-event"
                    style={{
                        top: `${top}px`,
                        height: `${height}px`
                    }}
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
    </main>
);
};

export default CalendarPage;