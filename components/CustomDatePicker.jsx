import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import './styles/CustomDatePicker.css';

const CustomDatePicker = ({dateSelected, minDate, setDate}) => {
    return (
        <article>
            <DatePicker
                selected={dateSelected}
                onChange={date => setDate(date)}
                className="custom-date-picker notebook"
                calendarClassName="custom-calendar"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                minDate={minDate}
                locale={es}
            />
        </article>
    );
};

export default CustomDatePicker;