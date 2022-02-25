import React, { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/index";
import userData from "./users/users";

const appUsers = userData;

function App(props) {
  const [users, setUsers] = useState(appUsers);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : ""
  );

  const [favoriteData, setFavoriteData] = useState([
    localStorage.getItem(userId)
      ? JSON.parse(localStorage.getItem(userId))
      : [],
  ]);
  if (favoriteData === null) {
    setFavoriteData([]);
  }
  const [token, setToken] = useState("");

  const [oneItem, setOneItem] = useState([{}]);
  const [searchFormContent, setSearchFormContent] = useState("");
  const [searchResult, setSearchResult] = useState("");

  return (
    <>
      <AppRoutes
        oneItem={oneItem}
        setOneItem={setOneItem}
        userId={userId}
        setUserId={setUserId}
        favoriteData={favoriteData}
        setFavoriteData={setFavoriteData}
        searchFormContent={searchFormContent}
        setSearchFormContent={setSearchFormContent}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        setSearchResult={setSearchResult}
        searchResult={searchResult}
        token={token}
        setToken={setToken}
        users={users}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}

export default App;
