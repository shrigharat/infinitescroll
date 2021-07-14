import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import InfiniteScroll from "./components/infinitescroll/infinite-scroll.component";

function App() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const storedDarkMode = localStorage.getItem("DARK_MODE");
  const [darkMode, setDarkMode] = useState(storedDarkMode=="true");

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    console.log("Is in dark mode:", darkMode);
    console.log(typeof darkMode);
    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);

  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <div className="header">
        <button className="dm-toggle" onClick={toggleDarkMode}>
          {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>
      <InfiniteScroll url='https://jsonplaceholder.typicode.com/posts' itemsPerPage={10}/>
    </div>
  );
}

export default App;
