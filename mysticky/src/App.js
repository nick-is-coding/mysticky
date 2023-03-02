import './App.css';
import React, { useState } from 'react';
import StickyNote from './components/StickyNote';
import AddButton from './components/AddButton';

function App() {

  const [stickyNotes, setStickyNotes] = useState([]);
  
    const addStickyNote = () => {
      const newNote = {
        id: Date.now(),
        text: 'New sticky note'
      };
  
      setStickyNotes([...stickyNotes, newNote]);
    };
  
  return (
    <div className='main-container'>
      <div>
        <h1>mySticky</h1>
        <AddButton onClick={addStickyNote}/>
        {stickyNotes.map((note) => (
          <StickyNote className='sticky-container' key={note.id} text={note.text} />
        ))}
      </div>
    </div>
  );

}

export default App;
