// import { useRef, useState, useEffect } from 'react';

// function StarredNotes({ notes, setCurrentNoteId, toggleStarred, deleteNote, currentNoteId }) {
//   const starredNotes = notes.filter(note => note.starred);
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);

//   useEffect(() => {
//     const el = scrollRef.current;
//     const updateArrows = () => {
//       if (!el) return;
//       setShowLeftArrow(el.scrollLeft > 0);
//       setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
//     };

//     updateArrows();
//     el.addEventListener('scroll', updateArrows);
//     return () => el.removeEventListener('scroll', updateArrows);
//   }, [starredNotes]);

//   const scroll = (direction) => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const scrollAmount = 250;
//     el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
//   };

//   return (
//     <div className="starred-outer">
//       <div className="starred">
//         <i className="fa-solid fa-star star"></i>
//         <p>Starred Notes</p>
//       </div>

//       <div className="starred-wrapper">
//         {showLeftArrow && (
//           <div className="arrow left" onClick={() => scroll('left')}>
//             <i className="fa-solid fa-arrow-left"></i>
//           </div>
//         )}

//         <div className="starred-container" ref={scrollRef}>
//           {starredNotes.map((note) => (
//             <div
//               className={`starred-notes ${note.id === currentNoteId ? 'active-starred' : ''}`}
//               key={note.id}
//               onClick={() => setCurrentNoteId(note.id)}
//             >
//               <div className="starred-icons" onClick={(e) => e.stopPropagation()}>
//                 <i
//                   className={note.starred ? "fa-solid fa-star star" : "fa-regular fa-star star"}
//                   onClick={() => toggleStarred(note.id)}
//                   title="Unstar"
//                 ></i>
//                 <i
//                   className="fa-solid fa-trash trash"
//                   onClick={() => deleteNote(note.id)}
//                   title="Delete"
//                 ></i>
//               </div>
//               <p className="starred-title">{note.title || "Untitled"}</p>
//             </div>
//           ))}
//         </div>

//         {showRightArrow && (
//           <div className="arrow right" onClick={() => scroll('right')}>
//             <i className="fa-solid fa-arrow-right"></i>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StarredNotes;


import { useRef, useState, useEffect } from 'react';

function StarredNotes({ notes, setCurrentNoteId, toggleStarred, deleteNote, currentNoteId }) {
  const starredNotes = notes.filter(note => note.starred);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    const updateArrows = () => {
      if (!el) return;
      setShowLeftArrow(el.scrollLeft > 0);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    updateArrows();
    el?.addEventListener('scroll', updateArrows);
    return () => el?.removeEventListener('scroll', updateArrows);
  }, [starredNotes]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 250;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="starred-outer">
      <div className="starred">
        <i className="fa-solid fa-star star"></i>
        <p>Starred Notes</p>
      </div>

      <div className="starred-wrapper">
        {starredNotes.length === 0 ? (
          <div className="empty-starred">
            <img src="/empty_starred.svg" alt="No starred notes" />
            <p>Mark your favorites ⭐</p>
          </div>
        ) : (
          <>
            {showLeftArrow && (
              <div className="arrow left" onClick={() => scroll('left')}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            )}

            <div className="starred-container" ref={scrollRef}>
              {starredNotes.map((note) => (
                <div
                  className={`starred-notes ${note.id === currentNoteId ? 'active-starred' : ''}`}
                  key={note.id}
                  onClick={() => setCurrentNoteId(note.id)}
                >
                  <div className="starred-icons" onClick={(e) => e.stopPropagation()}>
                    <i
                      className={note.starred ? "fa-solid fa-star star" : "fa-regular fa-star star"}
                      onClick={() => toggleStarred(note.id)}
                      title="Unstar"
                    ></i>
                    <i
                      className="fa-solid fa-trash trash"
                      onClick={() => deleteNote(note.id)}
                      title="Delete"
                    ></i>
                  </div>
                  <p className="starred-title">{note.title || "Untitled"}</p>
                </div>
              ))}
            </div>

            {showRightArrow && (
              <div className="arrow right" onClick={() => scroll('right')}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StarredNotes;
