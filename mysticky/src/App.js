import './App.css';
import React, { useState } from 'react';
import StickyNote from './components/StickyNote';
import AddButton from './components/AddButton';
import Modal from './components/Modal';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteSubject, setNewNoteSubject] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [stickyNotes, setStickyNotes] = useState([]);


    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleSubjectChange = (event) => {
      setNewNoteSubject(event.target.value);
    };

    const handleTextChange = (event) => {
      setNewNoteText(event.target.value);
    };
  
   
  const addStickyNote = () => {
    const newNote = {
      id: Date.now(),
      subject: newNoteSubject,
      text: newNoteText
    };

    setStickyNotes([...stickyNotes, newNote]);
    setNewNoteSubject('');
    setNewNoteText('');
    setIsModalOpen(false);
  };
  
  return (
    <div className='main-container'>
      <div>
        <h1>mySticky</h1>
        <AddButton onClick={toggleModal}/>
        {stickyNotes.map((note) => (
          <StickyNote 
            className='sticky-container' 
            key={note.id} 
            subject={note.subject} 
            text={note.text} />
        ))}
      </div>
      {isModalOpen && (
       <Modal
        newNoteSubject={newNoteSubject}
        newNoteText={newNoteText}
        setNewNoteSubject={setNewNoteSubject}
        setNewNoteText={setNewNoteText}
        handleSubjectChange={handleSubjectChange}
        handleTextChange={handleTextChange}
        addStickyNote={addStickyNote}
      />
      )}
    </div>
  );

}

export default App;
