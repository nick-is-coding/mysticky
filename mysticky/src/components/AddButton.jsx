import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <div className='add-sticky-button'>
      <button onClick={onClick}>ADD STICKY</button>
    </div>
  );
};

export default AddButton;