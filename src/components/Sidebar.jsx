import logo from '../assets/logo.png'

function Sidebar({notes, setCurrentNoteId, currentNoteId, createNewNote }) {

    return(
        <div className="sidebar">
            <div>
                <div>
                    <div className='title'>
                        <img src={logo} alt="QuickJot Logo" className="logo" />
                        <h1>QuickJot</h1>
                    </div>
                    <div>
                        <div className="note">
                            <button className="note-button" onClick={createNewNote}>+ Add Note</button>
                        </div>
                    </div>
                    <div className="home" onClick={() => setCurrentNoteId(null)}>
                        <i className="fa-solid fa-house"></i>
                        <p>Home</p>
                    </div>
                    <div className="list">
                        <span>Notes</span>
                        {notes.map((note) => (
                            <p key={note.id} className={note.id === currentNoteId ? 'active-note' : ''} onClick={() => setCurrentNoteId(note.id)}>
                                {note.title || 'Untitled'}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar