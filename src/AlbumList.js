const AlbumList = ({ albums, lastBookElementRef }) => {
  return (
    <div>
      {albums?.map((book, index) => {
        console.log(albums.length);
        if (albums.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={index}>
              {book}
            </div>
          );
        }
        return <div key={index}> {book} </div>;
      })}{" "}
    </div>
  );
};

export default AlbumList;
