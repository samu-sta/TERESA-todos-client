import React, { useState } from 'react';
import CustomDatePicker from '../components/CustomDatePicker.jsx'
import './styles/DateModal.css';
import FrecuencyModal from './FrecuencyModal.jsx';
import { FaArrowLeft } from "react-icons/fa";

const DateModal = ({ isVisible, onToggleVisible, currentFrecuency, setFrecuency, date, setDate }) => {

  const [frecuencyModalVisible, setFrecuencyModalVisible] = useState(false);


  const handleToggleVisible = () => {
    onToggleVisible();
  }

  const toggleModalFrecuency = () => {
    setFrecuencyModalVisible(!frecuencyModalVisible);
  }




  return (
    <>
      <div className={`overlay overlay-date ${isVisible ? 'visible' : 'hidden'}`}
        onClick={handleToggleVisible}
      >
        <article
          className='date-modal'
          onClick={(e) => e.stopPropagation()}
        >
          <header className='header-date-modal'>
            <button
              className='date-modal-button'
              onClick={handleToggleVisible}
            >
              <FaArrowLeft className='modal-arrow'/>
            </button>
            <h3 className='date-modal-title'>Selecciona fecha</h3>
            <button
              className='submit-frecuency-button modal-frecuency-button'
              onClick={handleToggleVisible}
            >
              Hecho
            </button>
          </header>
          <section className='date-modal-section'>
            <label className='start-date-label'>Inicio</label>
            <CustomDatePicker
              dateSelected={date}
              setDate={setDate}
            />
          </section>
          <button className='button notebook'
            onClick={toggleModalFrecuency}
          >
            {currentFrecuency ? 'Se Repite' : 'No se repite'}
          </button>



        </article>

        <FrecuencyModal
          toggleModalVisible={toggleModalFrecuency}
          isVisible={frecuencyModalVisible}
          setFrecuency={setFrecuency}
          currentFrecuency={currentFrecuency}
          startDate={date}
        />

      </div>
    </>
  );
};

export default DateModal;