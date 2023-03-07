import './App.css';
import 'typeface-inter';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StickyNote from './components/StickyNote';
import AddButton from './components/AddButton';
import Modal from './components/Modal';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteSubject, setNewNoteSubject] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [stickyNotes, setStickyNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then(response => {
        setStickyNotes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
      subject: newNoteSubject,
      text: newNoteText
    };
  
    axios.post('http://localhost:5001/users', newNote)
      .then(response => {
        console.log(response.data.message);
        console.log(response.data.newNoteId); // added line to log the ID of the new note
        const newNoteWithId = {
          ...newNote,
          id: response.data.newNoteId // set the ID of the new note based on the response data
        };
        setStickyNotes([...stickyNotes, newNoteWithId]);
        setNewNoteSubject('');
        setNewNoteText('');
        setIsModalOpen(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  
  const handleNoteDelete = (id) => {
    return axios.delete(`http://localhost:5001/users/${id}`)
      .then(response => {
        console.log(response.data.message);
        setStickyNotes(stickyNotes.filter(note => note.id !== id));
      })
      .catch(error => {
        console.log(id);
        console.log(error);
      });
  };
  
  const onDelete = (id) => {
    console.log(id);
    handleNoteDelete(id);
  };

  return (
    <div className='cork-board'>
      <div className='main-container'>
        <div className='button-container'>
          <div className='header-container'>
              <h1>mySTICKY</h1>
            </div>
            <AddButton onClick={toggleModal}/>
            <div className='sticky-note-container'>
            {stickyNotes.map((note) => (
              <StickyNote 
              className='sticky-container' 
              key={note.id}
              id={note.id}
              subject={note.subject} 
              text={note.text}
              handleNoteDelete={handleNoteDelete}
            /> 
            ))}
          </div>
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
    </div>
  );

}

export default App;
