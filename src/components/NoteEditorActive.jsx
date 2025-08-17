// import React, { useRef } from "react";

// function NoteEditorActive({ titleInput, contentInput, updateNote, currentNoteId, notes, toggleStarred, deleteNote}) {
//   const fileInputRef = useRef(null);
  
//   const currentNote = notes.find(note => note.id === currentNoteId);

//   const formatDate = (timestamp) => {
//     if(!timestamp) return "";
//     const date = new Date(timestamp);
//     return `Last edited: ${date.toLocaleString()}`;
//   };

//   return (
//     <div className="note-editor active">
//       <div className="note-header">
//         <input
//           className="note-title-input"
//           type="text"
//           value={titleInput}
//           onChange={(e) => updateNote("title", e.target.value)}
//           placeholder="Note Title"
//         />
//         <div className="note-icons">
//           <i className={currentNote?.starred ? "fa-solid fa-star" : "fa-regular fa-star" } title="Star this note" onClick={() => toggleStarred(currentNoteId)}></i>
//           <i className="fa-solid fa-trash" title="Delete this note" onClick={() => deleteNote(currentNoteId)}></i>
//         </div>
//       </div>
      
//       {currentNote?.lastModified && (
//         <p className="last-modified">{formatDate(currentNote.lastModified)}</p>
//       )}
//       <textarea
//         className="note-content-input"
//         value={contentInput}
//         onChange={(e) => updateNote("content", e.target.value)}
//         placeholder="Start typing your thoughts here..."
//       /> 
      

//     </div>
//   );
// }

// export default NoteEditorActive;




import React, { useRef, useEffect } from "react";

function NoteEditorActive({
  titleInput,
  contentInput,
  updateNote,
  currentNoteId,
  notes,
  toggleStarred,
  deleteNote,
}) {
  const editorRef = useRef(null);

  const currentNote = notes.find((note) => note.id === currentNoteId);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `Last edited: ${date.toLocaleString()}`;
  };

  const insertAtCursor = (html) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    let range = sel.getRangeAt(0);

    if (!editorRef.current.contains(range.startContainer)) {
      range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    updateNote("content", editorRef.current.innerHTML);
  };

  useEffect(() => {
    if (editorRef.current && currentNote) {
      editorRef.current.innerHTML = currentNote.content || "";
    }
  }, [currentNoteId]);

  if (!currentNote) {
    return (
      <div className="note-editor active">
        <p>Select a note to start editing...</p>
      </div>
    );
  }

  return (
    <div className="note-editor active">
      <div className="note-header">
        <input
          className="note-title-input"
          type="text"
          value={titleInput}
          onChange={(e) => updateNote("title", e.target.value)}
          placeholder="Note Title"
        />
        <div className="note-icons">
          <i
            className={
              currentNote?.starred ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            title="Star this note"
            onClick={() => toggleStarred(currentNoteId)}
          ></i>
          <i
            className="fa-solid fa-trash"
            title="Delete this note"
            onClick={() => deleteNote(currentNoteId)}
          ></i>
        </div>
      </div>

      {currentNote?.lastModified && (
        <p className="last-modified">{formatDate(currentNote.lastModified)}</p>
      )}

      <div className="note-content-wrapper">
        <div
        ref={editorRef}
        className="note-content-input"
        contentEditable
        data-placeholder="Start typing your thoughts..."
        suppressContentEditableWarning={true}
        onInput={(e) => updateNote("content", e.currentTarget.innerHTML)}
        />

        <div className="note-toolbar">
          <button onClick={() => insertAtCursor("<div>• &nbsp;</div>")}>• Bullet</button>
          <button onClick={() => insertAtCursor("<div><input type='checkbox'/> &nbsp;</div>")}>☑ Checkbox</button>
          <button onClick={() => insertAtCursor("<div>→ &nbsp;</div>")}>→ Arrow</button>
          <button onClick={() => insertAtCursor("<div>▪ &nbsp;</div>")}>▪ Square</button>
          <button onClick={() => insertAtCursor("<div>○ &nbsp;</div>")}>○ Circle</button>
          <button onClick={() => insertAtCursor("<div>★ &nbsp;</div>")}>★ Star</button>
          <button onClick={() => insertAtCursor("<div>✔ &nbsp;</div>")}>✔ Done</button>
          <button onClick={() => insertAtCursor("<div>✘ &nbsp;</div>")}>✘ Cancel</button>
      </div>
    </div>
      
    </div>
  );
}

export default NoteEditorActive;
