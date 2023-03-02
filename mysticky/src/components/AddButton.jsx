import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>add sticky</button>
    </div>
  );
};

export default AddButton;