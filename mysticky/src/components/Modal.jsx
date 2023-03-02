import React, {Fragment} from 'react';


const Modal = ({newNoteSubject, newNoteText, setNewNoteSubject, setNewNoteText, handleSubjectChange, handleTextChange, addStickyNote}) => {

    return (
        <Fragment>
            <div className='modal-container'>
                <input 
                    type="text"
                    value={newNoteSubject}
                    onChange={handleSubjectChange}
                 />
                 <input 
                    type="text"
                    value={newNoteText}
                    onChange={handleTextChange}
                 />
                <button onClick={() => addStickyNote(newNoteSubject, newNoteText)}>ADD NEW STICKY</button>
            </div>
        </Fragment>
    )

}

export default Modal;