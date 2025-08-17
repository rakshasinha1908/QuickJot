// import { useState } from "react";

// function SearchBar({ onSearch, darkMode, setDarkMode }){
//     const[searchText, setSearchText] = useState("");

//     const handleChange = (e) => {
//         const value = e.target.value;
//         setSearchText(value);
//         onSearch(value);
//     }
//     return(
//         <div className="search-outer">
//             <div className="search-container">
//                 <div className="searchbar">
//                     <i className="fa-solid fa-magnifying-glass glass-icon"></i>
//                     <input type="text" placeholder="Search notes" value={searchText} onChange={handleChange} className="search-input"/>
//                 </div>
//                 <div className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
//                     <i className={darkMode ? "fa-solid fa-sun" : "fa-regular fa-moon"}></i>
//                 </div>
//                 <div className="sign-out">
//                     <button className="signout-btn">Sign Out</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SearchBar


// import { useState, useEffect } from "react";

// function SearchBar({ onSearch }) {
//     const [searchText, setSearchText] = useState("");
//     const [darkMode, setDarkMode] = useState(false);

//     const handleChange = (e) => {
//         const value = e.target.value;
//         setSearchText(value);
//         onSearch(value);
//     };

//     const toggleDarkMode = () => {
//         setDarkMode((prev) => !prev);
//     };

//     // apply/remove class on <body>
//     useEffect(() => {
//         if (darkMode) {
//             document.body.classList.add("dark-mode");
//         } else {
//             document.body.classList.remove("dark-mode");
//         }
//     }, [darkMode]);

//     return (
//         <div className="search-outer">
//             <div className="search-container">
//                 <div className="searchbar">
//                     <i className="fa-solid fa-magnifying-glass glass-icon"></i>
//                     <input
//                         type="text"
//                         placeholder="Search notes"
//                         value={searchText}
//                         onChange={handleChange}
//                         className="search-input"
//                     />
//                 </div>
//                 <div className="toggle-mode" onClick={toggleDarkMode}>
//                     {darkMode ? (
//                         <i className="fa-solid fa-sun"></i>
//                     ) : (
//                         <i className="fa-regular fa-moon"></i>
//                     )}
//                 </div>
//                 <div className="sign-out">
//                     <button className="signout-btn">Sign Out</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SearchBar;


import { useState } from "react";

function SearchBar({ onSearch, darkMode, setDarkMode }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className="search-outer">
      <div className="search-container">
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass glass-icon"></i>
          <input
            type="text"
            placeholder="Search notes"
            value={searchText}
            onChange={handleChange}
            className="search-input"
          />
        </div>
        <div className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-regular fa-moon"></i>
          )}
        </div>
        <div className="sign-out">
          <button className="signout-btn">Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
