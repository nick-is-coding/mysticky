import React from 'react';

const StickyNote = ({ id, subject, text, handleNoteDelete, color }) => {
  const onDelete = async () => {
    console.log(id);
    await handleNoteDelete(id);
  };

  return (
    <div
      className='sticky-note'
      style={{ backgroundColor: color }}
    >
      <div className='sticky-content'>
        <h3>{subject}</h3>
        <span>{text}</span>
      </div>
      <button
        className='delete-button'
        onClick={onDelete}
      >
        X
      </button>
    </div>
  );
};

export default StickyNote;
