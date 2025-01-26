import { useState } from 'react';

export const useWeeks = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getWeek = (date) => {
        const currentDay = date.getDay();
        // Adjust to make Monday (1) the first day
        const diff = currentDay === 0 ? -6 : 1 - currentDay; 
        
        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);

        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            return day;
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

    return {
        currentDate,
        currentWeek,
        previousWeek,
        nextWeek,
        handleNextWeek,
        handlePrevWeek
    };
};