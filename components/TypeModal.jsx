import { useState, useEffect } from 'react';
import './styles/TypeModal.css';
import ManageTypes from './ManageTypes.jsx';
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function TypeModal({ onToggleVisible, isVisible, setCurrentType, types, setTypes }) {

  const [addingType, setAddingType] = useState(false);
  const [deletingType, setDeletingType] = useState(false);
  const [inputTypeValue, setInputTypeValue] = useState('');

  const addType = () => {
    setTypes([...types, inputTypeValue]);
    setInputTypeValue('');
  };

  const deleteType = (type) => {
    setTypes(types.filter(t => t !== type));
  }

  const handleToggleVisible = () => {
    onToggleVisible();
  };

  const handleInputTypeChange = (e) => {
    setInputTypeValue(e.target.value);
  };

  const toogleAddingType = () => {
    setAddingType(!addingType);
    setDeletingType(false);
  }

  const toogleDeletingType = () => {
    setDeletingType(!deletingType);
    setAddingType(false);
  }

  const closeModal = () => {
    setDeletingType(false);
    setAddingType(false);
  }


  return (
    <>
      <div
        className={`overlay overlay-type ${isVisible ? 'visible' : 'hidden'}`}
        onClick={() => {
          handleToggleVisible()
          closeModal()
        }}
      >
        <article className='type-modal notebook'>
          <ul className='type-list'>
            <li className='type-title'>
              <ManageTypes
                types={types}
                setTypes={setTypes}
                toogleAddingType={toogleAddingType}
                toogleDeletingType={toogleDeletingType}
              />
            </li>
            {addingType &&
              (
                <li className='type-item add-type-item'
                  onClick={(e) => e.stopPropagation()}
                >
                  <input type="text"
                    placeholder='Tipo nuevo'
                    onChange={handleInputTypeChange}
                    value={inputTypeValue}
                    className='input-type'
                  />
                  <button className={`submit-type ${inputTypeValue ? '' : 'submit-type-unable'}`}
                    onClick={
                      () => {
                        addType()
                        toogleAddingType()
                      }
                    }
                  >
                    <IoSend />
                  </button>
                </li>
              )
            }

            {types.map((type, index) => {
              return (
                <li
                  key={index}
                  className='type-item'
                  onClick={(e) => {
                    if (deletingType) {
                      deleteType(type)
                      toogleDeletingType()
                      e.stopPropagation()
                      return
                    }
                    setCurrentType(type);
                    handleToggleVisible();
                  }}>
                  <span>
                    {type}
                  </span>
                  {
                    deletingType &&
                    <div className='icon-delete-type'>
                      <MdDelete />
                    </div>
                  }
                </li>
              )
            })}
          </ul>
        </article>
      </div>
    </>
  );
}

export default TypeModal