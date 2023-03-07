import React from 'react';
import axios from 'axios';

const StickyNote = ({ id, subject, text, handleNoteDelete }) => {
    const onDelete = async () => {
      console.log(id);
      await handleNoteDelete(id);
    };
  
    return (
      <div className='sticky-note'>
        <div className='sticky-content'>
          <h3>{subject}</h3>
          <span>{text}</span>
        </div>
        <button className='delete-button' onClick={onDelete}>X</button>
      </div>
    );
  };
  
export default StickyNote;
