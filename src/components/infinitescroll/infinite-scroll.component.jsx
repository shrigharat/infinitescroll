import React, {useState, useCallback, useRef} from 'react';

import Post from "../post/post.component";
import Spinner from "../spinner/spinner.component";
import useQuery from "../../useQuery.hook";

import "./infinite-scroll.styles.css";

export default function InfiniteScroll({url, itemsPerpage}) {
  const [pageNo, setPageNo] = useState(1);
  const { loading, error, posts, limitReached } = useQuery(url, pageNo, itemsPerpage);

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
    [loading, limitReached]
  );

  return (
    <div className="infinite-scroll">
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
  )
}
