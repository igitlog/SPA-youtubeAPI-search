import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { youtubeAPI } from "../../../services/api/axios";
import Header from "../../Header/Header";
import SearchList from "../../SearchItems/SearchList";
import { HeartOutlined } from "@ant-design/icons";
import AddModal from "../../Modals/AddModal";

const Search = ({
  userId,
  setFavoriteData,
  searchFormContent,
  setSearchFormContent,
  setIsModalVisible,
  isModalVisible,
  searchResult,
  setSearchResult,
  setIsLoggedIn,
}) => {
  
  //Обнуление старых данных стейта
  useEffect(() => {
    setSearchResult(null);
  }, []);

  //Обработка запроса и возможных ошибок
  const handleSearch = async ({ searchFormContent }) => {
    setSearchFormContent(searchFormContent);
    await youtubeAPI
      .getVideo(searchFormContent)
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

  const handlerFavorite = () => {
    setIsModalVisible(true);
  };

  return searchResult ? (
    <>
      <AddModal
        userId={userId}
        searchFormContent={searchFormContent}
        setFavoriteData={setFavoriteData}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      <Header setIsLoggedIn={setIsLoggedIn} setFavoriteData={setFavoriteData} />
      <Col style={{ marginTop: "30vh" }}>
        <Row style={{ marginBottom: "5vh", fontSize: "24px" }} justify="center">
          Поиск видео
        </Row>
        <Row justify="center">
          <Form
            onFinish={handleSearch}
            style={{ maxWidth: "500px", width: "calc(100% - 100px)" }}
          >
            <Row style={{ flexWrap: "nowrap" }}>
              <Col style={{ flex: "1" }}>
                <Form.Item>
                  <Form.Item name="searchFormContent">
                    <Input placeholder="Что хотите посмотреть?" />
                  </Form.Item>
                  <Col align="end">
                    <HeartOutlined
                      style={{
                        marginRight: "15px",
                        top: "-50px",
                        position: "relative",
                      }}
                      onClick={handlerFavorite}
                    />
                  </Col>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Найти
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Col>
      <SearchList
        searchFormContent={searchFormContent}
        searchResult={searchResult}
      />
      )
    </>
  ) : (
    <div>
      <Header setIsLoggedIn={setIsLoggedIn} setFavoriteData={setFavoriteData} />
      <Col style={{ marginTop: "30vh" }}>
        <Row style={{ marginBottom: "5vh", fontSize: "24px" }} justify="center">
          Поиск видео
        </Row>
        <Row justify="center">
          <Form
            onFinish={handleSearch}
            style={{ maxWidth: "500px", width: "calc(100% - 100px)" }}
          >
            <Row style={{ flexWrap: "nowrap" }}>
              <Col style={{ flex: "1" }}>
                <Form.Item>
                  <Form.Item name="searchFormContent">
                    <Input placeholder="Что хотите посмотреть?" />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Найти
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Col>
    </div>
  );
};

export default Search;
