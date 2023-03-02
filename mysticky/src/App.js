import './App.css';
import StickyNote from './components/StickyNote';
import AddButton from './components/AddButton';

function App() {
  return (
    <div className='main-container'>
      <div>
        <h1>mySticky</h1>
        <AddButton/>
      </div>
      <div className='sticky-container'>
        <StickyNote/>
      </div>
    </div>
  );
}

export default App;
