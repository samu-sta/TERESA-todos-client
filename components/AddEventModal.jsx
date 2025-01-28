import React, {useState} from 'react';
import { IoMdClose } from "react-icons/io";
import { BsArrowRepeat } from "react-icons/bs";
import './styles/AddEventModal.css';
import ColorSelectorModal from './ColorSelectorModal.jsx';
import CustomDatePicker from './CustomDatePicker.jsx';
import FrecuencyModal from './FrecuencyModal.jsx';


function AddEventModal({toggleModalVisibility, events, setEvents}) {
    

    const [selectedColor, setSelectedColor] = useState('#ff69b4');
    const [showColorModal, setShowColorModal] = useState(false);
    const [frecuencyModalVisible, setFrecuencyModalVisible] = useState(false);
    const [currentFrecuency, setFrecuency] = useState('none');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    console.log(events);
    const addEvent = () => {
        const id = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
        const newEvent = {
            id,
            title: eventTitle,
            date: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1])),
            duration: (parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])) * 60 + parseInt(endTime.split(':')[1]) - parseInt(startTime.split(':')[1]),
            color: selectedColor,
            frecuency: currentFrecuency
        };
        setEvents([...events, newEvent]);
        toggleModalVisibility();
    };


    const toggleModalFrecuency = () => {
        setFrecuencyModalVisible(!frecuencyModalVisible);
    }


    const onTitleChange = (e) => {
        setEventTitle(e.target.value);
    };
    

    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
        // If start time is later than end time, update end time
        if (newStartTime > endTime) {
            setEndTime(newStartTime);
        }
    };

    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        // Only allow end time to be later than start time
        if (newEndTime >= startTime) {
            setEndTime(newEndTime);
        }
    };

    const colors = {
        '#d14747': 'Rojo',
        '#ff7f00': 'Naranja',
        '#ffc700': 'Amarillo',
        '#ff69b4': 'Rosa',
        '#9747d1': 'Morado',
        '#006400': 'Verde',
        '#47d147': 'Lima',
        '#4747d1': 'Azul',
        '#47a3d1': 'Cian',
        '#006400': 'Verde',
        '#808080': 'Grafito'
    };
    

    return (
       <article className="add-event-modal">
            <header className='header-add-event-modal'>
                <button 
                    className='button-close-event-modal'
                    onClick={toggleModalVisibility}
                ><IoMdClose /></button>
                <button 
                    className='button-save-event-modal'
                    onClick={addEvent}
                >Guardar</button>
            </header>
            <section className='section-title-event-modal'>
                <input type="text" placeholder='Añade un titulo'
                    className='input-event-title notebook'
                    value={eventTitle}
                    onChange={onTitleChange}
                />
            </section>
            <section className='section-color-event-modal'>
            <button className="button-color-event" onClick={() => setShowColorModal(true)}>
            <div
                    className="color-option"
                    style={{ 
                        backgroundColor: selectedColor === selectedColor ? selectedColor : 'transparent',
                        border: `5px solid ${selectedColor}` 
                    }}
                    
                />
                {colors[selectedColor]}
            </button>
            {showColorModal && (
                <ColorSelectorModal
                    colors={colors}
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                    onClose={() => setShowColorModal(false)}
                />
            )}
            </section>

            <section className='section-date-event-modal'>
            <CustomDatePicker
                        dateSelected={eventDate}
                        setDate={setEventDate}
                    />
            <section className="time-container">
                    <div className="time-selector">
                        <input
                            type="time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            className="time-input notebook"
                        />
                    </div>
                    <div className="time-selector">
                        <input
                            type="time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            className="time-input notebook"
                            min={startTime}
                        />
                    </div>
                </section>
            </section>
            <section className='section-frecuency-event-modal'>
            <button onClick={toggleModalFrecuency} className='button-event-frecuency'>
                <BsArrowRepeat />   
                {currentFrecuency ? 'Se repite' : 'No se repite'}
            </button>
            </section>
            <FrecuencyModal
            toggleModalVisible={toggleModalFrecuency}
            isVisible={frecuencyModalVisible}
            setFrecuency={setFrecuency}
            currentFrecuency={currentFrecuency}
            startDate={eventDate}
          />
       </article>
    );
}

export default AddEventModal;