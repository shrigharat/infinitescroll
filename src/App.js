import { useCallback, useRef, useState } from "react";
import "./App.css";
import useQuery from "./useQuery.hook";
import Post from "./components/post.component";
import Spinner from "./components/spinner.component";

function App() {
  const [pageNo, setPageNo] = useState(1);
  const { loading, error, posts, limitReached } = useQuery(pageNo);

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
    <div className="App">
      {posts.map((post, index) => {
        if (index + 1 === posts.length) {
          return <Post post={post} ref={lastElementRef} key={post.id}/>
        } else {
          return <Post post={post} key={post.id}/>
        }
      })}
      {loading && <Spinner/>}
      {error && <span>"Error occured..."</span>}
      {limitReached && <strong>"You have reached the end!"</strong>}
    </div>
  );
}

export default App;
