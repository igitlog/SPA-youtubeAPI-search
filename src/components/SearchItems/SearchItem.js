import React from "react";

const SearchItem = ({ video, inList }) => {
  return inList ? (
    <div
      style={{
        display: "flex",
        padding: "10px",
        width: "100%",
        margin: "0 0 20px",
      }}
    >
      <img
        width={180}
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "5px" }}
      >
        <div>{video.snippet.title}</div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        width: "calc( ( 100% - 40px ) / 3 )",
        margin: "0 0 20px",
      }}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default SearchItem;
