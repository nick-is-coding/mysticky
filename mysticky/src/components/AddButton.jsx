import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <div className='add-sticky-button'>
      <button onClick={onClick}>add sticky</button>
    </div>
  );
};

export default AddButton;