import React from 'react';

const StickyNote = ({subject, text}) => {

return (
    <div className='sticky-note'>
        <div className='sticky-content'>
                <h3>{subject}</h3>
                <span>{text}</span>
        </div>
    </div>
)

}


export default StickyNote;