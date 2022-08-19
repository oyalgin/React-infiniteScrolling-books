import "./styles.css";
import { useState, useRef, useCallback } from "react";
import useBookSearch from "./lib/hooks/useBookSearch";
import { useSelector } from "react-redux";
import AlbumList from "./AlbumList";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { hasMore, loading, error } = useBookSearch(query, pageNumber);

  const albums = useSelector((state) => state.allAlbums.albums);
  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    console.log("handle search");
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className="App">
      <input type="text" value={query} onChange={handleSearch} />
      <AlbumList albums={albums} lastBookElementRef={lastBookElementRef} />
      {error && <div>Error</div>}
      {loading && <div>loading..</div>}
    </div>
  );
}
