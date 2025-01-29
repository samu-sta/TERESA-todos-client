import React from 'react';
import './styles/ColorSelectorModal.css';

function ColorSelectorModal({ colors, selectedColor, onColorSelect, onClose }) {
    return (
        <div className="color-selector-modal" onClick={onClose}>
            <div className="color-selector-content">
            {Object.entries(colors).map(([color, name]) => (
                    <button
                        key={color}
                        className="color-option-with-name"
                        onClick={() => {
                            onColorSelect(color);
                            onClose();
                        }}
                    >
                        <div 
                            className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                            style={{ 
                                backgroundColor: selectedColor === color ? color : 'transparent',
                                border: `4px solid ${color}` 
                            }}
                        />
                        <span className="color-name">{name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ColorSelectorModal;