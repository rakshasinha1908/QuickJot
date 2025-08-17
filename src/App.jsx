import { useState, useEffect } from "react";
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if(savedNotes){
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if(notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      lastModified: Date.now()
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setTitleInput("");
    setContentInput("");
    setCurrentNoteId(newNote.id);
  };

  useEffect(() => {
    const currentNote = notes.find(note => note.id === currentNoteId);
    if (currentNote) {
      setTitleInput(currentNote.title);
      setContentInput(currentNote.content);
    } else {
      setTitleInput("");
      setContentInput("");
    }
  }, [currentNoteId, notes]);

  const updateNote = (key, value) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === currentNoteId
          ? { ...note, [key]: value, lastModified: Date.now() }
          : note
      )
    );

    if (key === "title") setTitleInput(value);
    if (key === "content") setContentInput(value);
  };


  const toggleStarred = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id
          ? { ...note, starred: !note.starred }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    if (currentNoteId === id) {
      setCurrentNoteId(null);
      setTitleInput("");
      setContentInput("");
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar
        notes={filteredNotes}
        setNotes={setNotes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        createNewNote={createNewNote}
      />
      <MainSection
        notes={notes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        setNotes={setNotes}
        setTitleInput={setTitleInput}
        setContentInput={setContentInput}
        titleInput={titleInput}
        contentInput={contentInput}
        updateNote={updateNote}
        toggleStarred={toggleStarred}
        deleteNote={deleteNote}
        onSearch={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
};

export default App;
