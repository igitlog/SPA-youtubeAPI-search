import { Routes, Route, Navigate } from "react-router-dom";
import Autorization from "../components/Pages/Autorization/Autorization";
import Favourites from "../components/Pages/Favourites/Favourites";
import NotfoundPage from "../components/Pages/NotFound/NotfoundPage";
import Search from "../components/Pages/Search/Search";

function AppRoutes({
  oneItem,
  setOneItem,
  userId,
  setUserId,
  favoriteData,
  setFavoriteData,
  searchFormContent,
  setSearchFormContent,
  setIsModalVisible,
  isModalVisible,
  setSearchResult,
  searchResult,
  token,
  users,
  setIsLoggedIn,
  isLoggedIn,
  setToken,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="search" />
          ) : (
            <Autorization
              setFavoriteData={setFavoriteData}
              setUserId={setUserId}
              users={users}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
            />
          )
        }
      />
      <Route
        path="/search"
        element={
          !isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <Search
              userId={userId}
              setFavoriteData={setFavoriteData}
              searchFormContent={searchFormContent}
              setSearchFormContent={setSearchFormContent}
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              setIsLoggedIn={setIsLoggedIn}
            />
          )
        }
      />
      <Route
        path="/favourites"
        element={
          !isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <Favourites
              setSearchFormContent={setSearchFormContent}
              setSearchResult={setSearchResult}
              oneItem={oneItem}
              setOneItem={setOneItem}
              userId={userId}
              setFavoriteData={setFavoriteData}
              favoriteData={favoriteData}
              setIsLoggedIn={setIsLoggedIn}
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
            />
          )
        }
      />
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
