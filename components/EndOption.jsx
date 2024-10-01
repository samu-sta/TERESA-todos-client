import React, { useState } from 'react';
import './styles/EndOption.css';



const EndOption = ({value, endOption, handleEndOptionChange, children, className}) => {




  const isChecked = endOption === value;


  return (
    <label 
      className={`end-option-label ${className} ${isChecked ? 'checked' : ''}`}
      onClick={() => handleEndOptionChange({target: {value}})}
    >
      <input
        type="radio"
        name="endOption"
        value={value}
        checked={isChecked}
        onChange={handleEndOptionChange}
        className="end-option-radio"
      />
      <span className="end-option-custom-radio"></span>
      {children}
    </label>
  );
};

export default EndOption;