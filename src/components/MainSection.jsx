import SearchBar from './SearchBar';
import StarredNotes from './StarredNotes';
import NoteEditorHomepage from './NoteEditorHomepage';
import NoteEditorActive from './NoteEditorActive';
import HomepageHeader from './HomepageHeader';

function MainSection({
  currentNoteId,
  setCurrentNoteId,
  titleInput,
  contentInput,
  updateNote,
  notes,
  toggleStarred,
  deleteNote,
  onSearch,
  darkMode,
  setDarkMode,
  addAttachment,
  removeAttachment
}) {
  const isHome = currentNoteId === null;

  return (
    <div className="main-container">
      <SearchBar onSearch={onSearch} darkMode={darkMode} setDarkMode={setDarkMode}/>

      {isHome && <HomepageHeader />}
      {isHome ? (
        <NoteEditorHomepage />
      ) : (
        <NoteEditorActive
          titleInput={titleInput}
          contentInput={contentInput}
          updateNote={updateNote}
          currentNoteId={currentNoteId}
          notes={notes}
          toggleStarred={toggleStarred}
          deleteNote={deleteNote}
        />
      )}

      {isHome && (
        <StarredNotes 
          notes={notes}
          setCurrentNoteId={setCurrentNoteId}   
          toggleStarred={toggleStarred}
          deleteNote={deleteNote}
          currentNoteId={currentNoteId}
        />
      )}
    </div>
  );
}

export default MainSection;
