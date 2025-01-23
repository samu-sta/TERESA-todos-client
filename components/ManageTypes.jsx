import { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import './styles/ManageTypes.css'
import { MdDelete } from "react-icons/md";


function ManageTypes({ types, setTypes, toogleAddingType, toogleDeletingType }) {




  return (
    <>
      <article className='type-article' onClick={(e) => e.stopPropagation()}>
        <button
          className='add-type-button type-button'
          onClick={toogleAddingType}
        >
          <FaPlus />
          <span className='add-span'>Agregar tipo</span>
        </button>
        <div className='separator'></div>
        <button
          className='delete-type-button type-button'
          onClick={toogleDeletingType}
        >
          <MdDelete />
          <span
            className='add-span'
          >
            Eliminar tipo
          </span>
        </button>
      </article>

    </>
  )
}

export default ManageTypes