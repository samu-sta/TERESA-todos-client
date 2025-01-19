import React, { useEffect, useState } from 'react';
import './styles/FrecuencyModal.css';
import { FaArrowLeft } from "react-icons/fa";
import WeekDayButton from './WeekDayButton.jsx';
import CustomDatePicker from './CustomDatePicker.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/FrecuencyModal.css';
import EndOption from './EndOption.jsx';
import { calculateSelectedDays, calculateEndDate } from '../utils/Todos.js';


const FrecuencyModal = ({ toggleModalVisible, isVisible, currentFrecuency, setFrecuency, startDate }) => {

  const [endOption, setEndOption] = useState('never');

  const [finalDate, setFinalDate] = useState(new Date());
  const [selectedFrequency, setSelectedFrequency] = useState('day');
  const [inputRepValue, setInputRepValue] = useState(1);
  const [inputEndValue, setinputEndValue] = useState(1);

  const [finalEndRadioInputs, setFinalEndRadioInputs] = useState({
    never: true,
    concreteDate: false,
    afterXTimes: false
  });


  const firstFrecuency = currentFrecuency;
  const [selectedDays, setSelectedDays] = useState({
    L: false,
    M: false,
    X: false,
    J: false,
    V: false,
    S: false,
    D: false,
  });

  const setNewInputsFrecuency = () => {
    setInputRepValue(1);
    setSelectedFrequency('day');
    setSelectedDays({
      L: false,
      M: false,
      X: false,
      J: false,
      V: false,
      S: false,
      D: false,
    });
    setEndOption('never');
    setFinalDate(new Date());
    setinputEndValue(1);
  }

  const setInputsFrecuency = (frecuency) => {
    setInputRepValue(currentFrecuency.each);
    setSelectedFrequency(currentFrecuency.unit);

    if (!currentFrecuency.days) {
      return;
    }

    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = { ...prevSelectedDays };
      Object.keys(newSelectedDays).forEach((day, index) => {
        newSelectedDays[day] = currentFrecuency.days.includes(index);
      });
      return newSelectedDays;
    });
  }



  const getFrequencyLabel = (value, frequency) => {
    let label = '';
    frequency === 'day' ? label = 'día' : null;
    frequency === 'week' ? label = 'semana' : null;
    frequency === 'year' ? label = 'año' : null;
    frequency === 'month' ? label = 'mes' : null;
    frequency === 'month' && value > 1 ? label += 'e' : null
    value > 1 ? label += 's' : null;

    label === 'mes' && value > 1 ? () => {
      label = 'meses'
      return
    } : null;

    return label;
  };


  const initializeFrecuency = () => {
    if (!currentFrecuency) {
      setNewInputsFrecuency();
      return;
    }

    setInputsFrecuency(currentFrecuency);


  }

  const letDigits = (e, numDigits, setInputValue) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > numDigits) {
      value = value.slice(0, numDigits);
    }

    if (value === '0') {
      value = '1';
    }

    setInputValue(value);
  };


  const handleRepInput = (e) => {
    letDigits(e, 2, setInputRepValue);
  };

  const handleEndInput = (e) => {
    letDigits(e, 3, setinputEndValue);
  };

  const handleModalVisible = () => {
    toggleModalVisible();
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedFrequency(e.target.value);
  }

  const handleEndOptionChange = (e) => {
    setEndOption(e.target.value);
  };



  const confirmFrecuency = () => {

    let frecuency = {
      each: parseInt(inputRepValue, 10),
      unit: selectedFrequency,
      days: calculateSelectedDays(selectedDays),
    };
    calculateSelectedDays(selectedDays).length === 0 && delete frecuency.days;

    setFrecuency(frecuency);

    if (endOption === 'concreteDate') {
      setFrecuency((prevFrecuency) => ({
        ...prevFrecuency,
        end: {
          year: finalDate.getFullYear(),
          month: finalDate.getMonth() + 1,
          day: finalDate.getDate()
        },
      }));
    }

    if (endOption === 'afterXTimes') {

      setFrecuency((prevFrecuency) => ({
        ...prevFrecuency,
        end: {
          year: calculateEndDate(prevFrecuency, startDate, parseInt(inputEndValue, 10)).year,
          month: calculateEndDate(prevFrecuency, startDate, parseInt(inputEndValue, 10)).month,
          day: calculateEndDate(prevFrecuency, startDate, parseInt(inputEndValue, 10)).day
        },

      }));
    }
    handleModalVisible();

  }






  useEffect(() => {
    initializeFrecuency();
  }, [currentFrecuency]);

  return (
    <>
      <article
        className={`modal-frecuency ${isVisible ? 'visible' : 'hidden'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className='header-modal-frecuency'>
          <button onClick={() => {
            handleModalVisible()
            currentFrecuency ? setInputsFrecuency(firstFrecuency) : null
          }}
            className='modal-frecuency-button'><FaArrowLeft  className='modal-arrow'/></button>
          <h3 className='modal-frecuency-title'>Frecuencia personalizada</h3>
          <button
            className='submit-frecuency-button modal-frecuency-button'
            onClick={confirmFrecuency}
          >
            Hecho
          </button>
        </header>
        <main className='frecuency-modal-main'>
          <section className='frecuency-modal-section'>
            <p>Se repite cada</p>
            <div className='input-frecuency-div'>
              <input
                type='text'
                className='frecuency-input notebook'
                value={inputRepValue}
                onInput={handleRepInput}

              />
              <select
                className='frecuency-select notebook'
                value={selectedFrequency}
                onChange={handleSelectChange}
              >
                <option value='day'>{getFrequencyLabel(inputRepValue, 'day')}</option>
                <option value='week'>{getFrequencyLabel(inputRepValue, 'week')}</option>
                <option value='month'>{getFrequencyLabel(inputRepValue, 'month')}</option>
                <option value='year'>{getFrequencyLabel(inputRepValue, 'year')}</option>

              </select>
            </div>
          </section>
          {selectedFrequency === 'week' && (

            <section className='frecuency-modal-section'>
              <p>Se repite el</p>
              <ol className='weekDay-list'>
                {Object.keys(selectedDays).map((day) => (
                  <li key={day} className='weekDay-overlay'>
                    <WeekDayButton
                      text={day}
                      checked={selectedDays[day]}
                      onClick={() => handleDayChange(day)}
                    />
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className='frecuency-modal-section'>
            <p>Termina</p>
            <EndOption
              value="never"
              endOption={endOption}
              handleEndOptionChange={handleEndOptionChange}
              className={`end-option ${endOption === 'never' ? 'checked' : ''}`}
            >
              Nunca
            </EndOption>
            <EndOption
              value="concreteDate"
              endOption={endOption}
              handleEndOptionChange={handleEndOptionChange}
              className={`end-option ${endOption === 'concreteDate' ? 'checked' : ''}`}
            >
              El
              <CustomDatePicker
                dateSelected={finalDate}
                minDate={startDate}
                setDate={setFinalDate}
              />

            </EndOption>
            <EndOption
              value="afterXTimes"
              endOption={endOption}
              handleEndOptionChange={handleEndOptionChange}
              className={`end-option ${endOption === 'afterXTimes' ? 'checked' : ''}`}
              
            >
              Después de
              <input
                type="text"
                className='frecuency-input notebook'
                value={inputEndValue}
                onInput={handleEndInput}
              />
              veces
            </EndOption>



          </section>

        </main>
        <footer className='frecuency-modal-footer'>
          <section className='frecuency-modal-footer__section'>
            <button
              className='cancel-frecuency-button modal-frecuency-button'
              onClick={() => {
                handleModalVisible();
                setFrecuency(null);
                initializeFrecuency();
              }
              }
            >
              Cancelar
            </button>
          </section>
        </footer>
      </article>

    </>
  );
};

export default FrecuencyModal;