import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import useQuery from "./useQuery.hook";
import Post from "./components/post.component";
import Spinner from "./components/spinner.component";

function App() {
  const [pageNo, setPageNo] = useState(1);
  const storedDarkMode = localStorage.getItem("DARK_MODE");
  const [darkMode, setDarkMode] = useState(storedDarkMode=="true");
  const { loading, error, posts, limitReached } = useQuery(pageNo);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    console.log("Is in dark mode:", darkMode);
    console.log(typeof darkMode);
    localStorage.setItem("DARK_MODE", darkMode);

    return () => {
      console.log("Is in dark mode:", darkMode);
    }
  }, [darkMode]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (element) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !limitReached) {
          setPageNo((prevPageNo) => prevPageNo + 1);
        }
      });
      if (element) {
        observer.current.observe(element);
      }
    },
    [loading]
  );

  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <div className="header">
        <button className="dm-toggle" onClick={toggleDarkMode}>
          {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>
      {posts.map((post, index) => {
        if (index + 1 === posts.length) {
          return <Post post={post} ref={lastElementRef} key={post.id} />;
        } else {
          return <Post post={post} key={post.id} />;
        }
      })}
      {loading && <Spinner />}
      {error && <span>An error occured 😞</span>}
      {limitReached && <span className="end-reached">You have reached the end 🙂</span>}
    </div>
  );
}

export default App;
