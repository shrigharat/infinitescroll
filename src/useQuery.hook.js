import React, {useEffect,useState} from 'react';
import axios from "axios";

export default function useQuery(pageNo) {
  let [loading, setLoading] = useState(false);
  let [limitReached, setLimitReached] = useState(false);
  let [error, setError] = useState(false);
  let [posts, setPosts] = useState([]);

  useEffect(
    () => {
      setLoading(true);
      axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/posts',
          params: { _page: pageNo, _limit: "10"}
        })
        .then(result => {
          console.log({result});
          if(result.data.length <= 0) {
            setLimitReached(true);
          }
          setPosts(prevData => [...prevData, ...result.data]);
          setLoading(false);
          setError(false);
        })
        .catch(error => {
          setError(error);
          console.log({error})
        });
    }, [pageNo]
  );
  return {loading, error, posts, limitReached};
}
