import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { youtubeAPI } from "../../../services/api/axios";
import Header from "../../Header/Header";
import EditModal from "../../Modals/EditModal";

const Favourites = ({
  setSearchFormContent,
  setSearchResult,
  oneItem,
  setOneItem,
  userId,
  favoriteData,
  setFavoriteData,
  setIsLoggedIn,
  setIsModalVisible,
  isModalVisible,
}) => {

  // Нужен для обновления данных на странице, после изменения одного или нескольких запросов
  useEffect(() => {
    setFavoriteData(JSON.parse(localStorage.getItem(userId)));
  }, []);

  const handlerEditModal = (item) => {
    setIsModalVisible(true);
    const data = favoriteData.filter((el) => el === item);
    setOneItem(data);
  };
  const handlerDeleteButton = (item) => {
    const data = favoriteData.filter((el) => el !== item);
    setFavoriteData(data);
    const localObject = JSON.stringify(data);
    localStorage.setItem(userId, localObject);
  };
  const searchHandlerActiv = async (item) => {
    setSearchFormContent(item.searchName);
    await youtubeAPI
      .getVideo(item.searchName, item.number, item.sort || "relevance")
      .then((data) => {
        setSearchResult(data.data.items);
      })
      .catch((err) => {
        if (err.response) {
          console.error(err);
          alert("Ошибка 4хх или 5хх, подробнее можно посмотреть в консоле");
        } else if (err.request) {
          console.error(err);
          alert(
            "Запрос не ушёл или ответ от сервера не получен(Проверьте соединение)"
          );
        } else {
          console.error(err);
          alert("Возникла ошибка не связанная с запросом и ответом от сервера");
        }
      });
  };

  // Можно вынести в отдельный компонент, вообще он и должен был быть отделььным компонентом, но я захотел сделать так
  const favoriteItems = favoriteData.map((item, index) => {
    return (
      <Row key={index} style={{ padding: "10px", flexFlow: "nowrap" }}>
        <Col span={24}>
          <Row
            style={{ paddingLeft: "15px", backgroundColor: "#fff" }}
            align="middle"
          >
            <Col align="start"> {item.favoriteName}</Col>

            <Col
              align="end"
              style={{ flex: "1 0 10%", maxWidth: "100%" }}
              span={12}
            >
              <Link to={`/`}>
                <Button onClick={() => searchHandlerActiv(item)} type="link">
                  Выполнить
                </Button>
              </Link>
              <Button onClick={() => handlerEditModal(item)} type="link">
                Изменить
              </Button>
              <Button
                onClick={(e) => handlerDeleteButton(item)}
                style={{ color: "red" }}
                type="link"
              >
                Удалить
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  });

  return (
    <div>
      <EditModal
        setFavoriteData={setFavoriteData}
        userId={userId}
        setOneItem={setOneItem}
        oneItem={oneItem}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      <Header setIsLoggedIn={setIsLoggedIn} setFavoriteData={setFavoriteData} />
      <Col style={{ margin: "10vh" }}>
        <Row style={{ fontSize: "24px" }}>Избранное</Row>
        {favoriteItems}
      </Col>
    </div>
  );
};

export default Favourites;
