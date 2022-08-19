import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    })
      .then((res) => {
        console.log(res.data);
        setBooks((prevBooks) => {
          return [...prevBooks, ...res.data.docs.map((b) => b.title)];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, pageNumber]);

  dispatch({
    type: "SET_MUSIC_ALBUMS",
    payload: { books, loading, hasMore, error }
  });
  return { books, hasMore, loading, error };
}
