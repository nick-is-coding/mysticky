import React, {Fragment} from 'react';


const Modal = ({newNoteSubject, newNoteText, handleSubjectChange, handleTextChange, addStickyNote}) => {

    return (
        <Fragment>
            <div className='modal-container'>
                <label htmlFor="#">Subject:</label>
                <input 
                    className='subject-input'
                    type="text"
                    value={newNoteSubject}
                    onChange={handleSubjectChange}
                 />
                 <label htmlFor="#">Notes:</label>
                 <textarea 
                    className='text-input'
                    type="text"
                    value={newNoteText}
                    onChange={handleTextChange}
                 />
                <div className='modal-button'>
                    <button 
                        className='add-sticky-button'
                        onClick={() => addStickyNote(newNoteSubject, newNoteText)}
                    >
                        ADD NEW STICKY
                    </button>
                </div>
            </div>
        </Fragment>
    )

}

export default Modal;