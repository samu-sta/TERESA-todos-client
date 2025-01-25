import React, { useState, useRef } from 'react';
import './styles/CalendarPage.css';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dragStartX, setDragStartX] = useState(null);
    const [dragging, setDragging] = useState(false);
    const calendarWeeksRef = useRef(null);
    const [dragVelocity, setDragVelocity] = useState(0);
    const [lastDragTime, setLastDragTime] = useState(null);
    const [lastDragX, setLastDragX] = useState(null);

    const handleDragStart = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDragStartX(clientX);
        setLastDragX(clientX);
        setLastDragTime(Date.now());
        setDragging(true);
        calendarWeeksRef.current.style.transition = 'none';
    };
    
    const handleDrag = (e) => {
        if (!dragging) return;
        
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const currentTime = Date.now();
        const timeDiff = currentTime - lastDragTime;
        const distanceDiff = currentX - lastDragX;
        
        const velocity = timeDiff > 0 ? distanceDiff / timeDiff : 0;
        
        setDragVelocity(velocity);
        setLastDragTime(currentTime);
        setLastDragX(currentX);
    
        const dragDistance = currentX - dragStartX;
        calendarWeeksRef.current.style.transform = `translateX(calc(-33.33% + ${dragDistance}px))`;
    };

    const handleDragEnd = (e) => {
        if (!dragging) return;
    
        const dragEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const dragDistance = dragEndX - dragStartX;
        const screenWidth = window.innerWidth;
    
        const shouldSwipe = Math.abs(dragVelocity) > 0.5 || Math.abs(dragDistance) > screenWidth / 3;
        const swipeDirection = dragVelocity > 0 || dragDistance > 0 ? 'prev' : 'next';
    
        if (shouldSwipe) {
            calendarWeeksRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            calendarWeeksRef.current.style.transform = `translateX(${swipeDirection === 'prev' ? '0' : '-66.66%'})`;
            
            setTimeout(() => {
                if (swipeDirection === 'prev') {
                    handlePrevWeek();
                } else {
                    handleNextWeek();
                }
                calendarWeeksRef.current.style.transition = 'none';
                calendarWeeksRef.current.style.transform = 'translateX(-33.33%)';
            }, 300);
        } else {
            calendarWeeksRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            calendarWeeksRef.current.style.transform = 'translateX(-33.33%)';
            setTimeout(() => {
                calendarWeeksRef.current.style.transition = 'none';
            }, 300);
        }
    
        setDragging(false);
        setDragStartX(null);
        setDragVelocity(0);
        setLastDragTime(null);
        setLastDragX(null);
    };

    const getWeek = (date) => {
        const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));
        return Array.from({ length: 7 }, (_, i) => {
            const newDate = new Date(startOfWeek);
            newDate.setDate(startOfWeek.getDate() + i);
            return newDate;
        });
    };

    const getPreviousWeek = (date) => {
        const prevWeekDate = new Date(date);
        prevWeekDate.setDate(date.getDate() - 7);
        return getWeek(prevWeekDate);
    };

    const getNextWeek = (date) => {
        const nextWeekDate = new Date(date);
        nextWeekDate.setDate(date.getDate() + 7);
        return getWeek(nextWeekDate);
    };

    const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));
    const [previousWeek, setPreviousWeek] = useState(getPreviousWeek(new Date()));
    const [nextWeek, setNextWeek] = useState(getNextWeek(new Date()));

    const handleNextWeek = () => {
        const nextWeekDate = new Date(currentDate);
        nextWeekDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeekDate);
        setCurrentWeek(getWeek(nextWeekDate));
        setPreviousWeek(getPreviousWeek(nextWeekDate));
        setNextWeek(getNextWeek(nextWeekDate));
    };

    const handlePrevWeek = () => {
        const prevWeekDate = new Date(currentDate);
        prevWeekDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeekDate);
        setCurrentWeek(getWeek(prevWeekDate));
        setPreviousWeek(getPreviousWeek(prevWeekDate));
        setNextWeek(getNextWeek(prevWeekDate));
    };

    return (
    <div className="calendar-container">
        <div className="calendar-month">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className="calendar-header">
            {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-day">{day}</div>
            ))}
        </div>
        <div className="calendar-content">
            <div className="hour-labels">
                {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="hour-label">
                        {`${i}:00`}
                    </div>
                ))}
            </div>
            <div className="calendar-scroll"
                onMouseDown={handleDragStart}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDrag}
                onTouchEnd={handleDragEnd}
            >
                <div className="calendar-weeks" ref={calendarWeeksRef}>
                    <div className="calendar-week previous-week">
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
                    </div>
                    <div className="calendar-week current-week">
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
                    </div>
                    <div className="calendar-week next-week">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default CalendarPage;