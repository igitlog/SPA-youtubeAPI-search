import React, { useState } from "react";
import SearchItem from "./SearchItem";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";

const SearchList = ({ searchResult, searchFormContent }) => {
  
  const [inList, setInList] = useState(true);
  const hadlerList = () => {
    setInList(true);
  };
  const hadlerUnlist = () => {
    setInList(false);
  };

  const videos = searchResult.map((video,index) => {
    return <SearchItem key={index} video={video} inList={inList} />;
  });

  return inList ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 100px",
        }}
      >
        <div>Video by search query "{searchFormContent}"</div>
        <div>
          <UnorderedListOutlined
            onClick={hadlerList}
            style={{ padding: "5px" }}
          />
          <AppstoreOutlined onClick={hadlerUnlist} style={{ padding: "5px" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>{videos}</div>
    </>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 100px",
        }}
      >
        <div>Видео по запросу "{searchFormContent}"</div>
        <div>
          <UnorderedListOutlined
            onClick={hadlerList}
            style={{ padding: "5px" }}
          />
          <AppstoreOutlined onClick={hadlerUnlist} style={{ padding: "5px" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{videos}</div>
    </>
  );
};

export default SearchList;
