import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StickyNote from './components/StickyNote';
import AddButton from './components/AddButton';
import Modal from './components/Modal';
import ThankYou from './components/ThankYou';

const API_ENDPOINT = process.env.API_ENDPOINT;

console.log('fuck', API_ENDPOINT);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteSubject, setNewNoteSubject] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [stickyNotes, setStickyNotes] = useState([]);
  const colors = [
    '#FFECBC',
    '#E0BBE4',
    '#BCE2E8',
    '#D6EAF8',
    '#F5CBA7',
    '#D5F5E3',
    '#FADBD8',
    '#FDEBD0',
  ];
  const [showThankYou, setShowThankYou] = useState(false);
  const [isNoteAdded, setIsNoteAdded] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/users`)
      .then((response) => {
        if (!Array.isArray(response.data))
          throw new Error('Motherfucking bad response');
        setStickyNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isNoteAdded) {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setIsNoteAdded(false);
      }, 4000);
    }
  }, [isNoteAdded]);

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
      text: newNoteText,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    axios
      .post(`${API_ENDPOINT}/users`, newNote)
      .then((response) => {
        console.log(response.data.message);
        console.log(response.data.newNoteId);
        setIsNoteAdded(true);
        const newNoteWithId = {
          ...newNote,
          id: response.data.newNoteId,
        };
        setStickyNotes([...stickyNotes, newNoteWithId]);
        setNewNoteSubject('');
        setNewNoteText('');
        setIsModalOpen(false);

        axios
          .put(`${API_ENDPOINT}/users/${response.data.newNoteId}`, {
            color: newNote.color,
          })
          .then((response) => {
            console.log(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNoteDelete = async (id) => {
    return axios
      .delete(`${API_ENDPOINT}/users/${id}`)
      .then((response) => {
        console.log(response.data.message);
        setStickyNotes(stickyNotes.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.log(id);
        console.log(error);
      });
  };

  return (
    <div className='cork-board'>
      <div className='main-container'>
        <div className='button-container'>
          <div className='header-container'>
            <h1>mySTICKY</h1>
          </div>
          <AddButton onClick={toggleModal} />
          <div className='sticky-note-container'>
            {stickyNotes.reverse().map((note) => (
              <StickyNote
                className='sticky-container'
                key={note.id}
                id={note.id}
                color={note.color}
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
        {showThankYou && <ThankYou />}
      </div>
    </div>
  );
}

export default App;
