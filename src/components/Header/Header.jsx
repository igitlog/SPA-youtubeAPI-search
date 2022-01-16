import { Row, Col, Button, Image } from "antd";
import React from "react";
import { Navigate, NavLink } from "react-router-dom";

const Header = ({ setFavoriteData, setIsLoggedIn }) => {
  // Обновляем стейт отвечающий за логинизацию и вывод видео после получения ответа от API youtube, перенаправляем на страницу авторизации
  const handlerExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setFavoriteData(null);
    <Navigate to="/" />;
  };

  return (
    <>
      <Row
        align="middle"
        style={{
          height: "50px",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Col span={12}>
          <Row align="middle" gutter="20">
            <Col align="end" span={12}>
              <Image src="/images/Logo.png" preview={false} />
            </Col>
            <Col span={6} align="middle">
              <NavLink to="/search">Поиск</NavLink>
            </Col>
            <Col span={4} align="middle">
              <NavLink to="/favourites">Избранное</NavLink>
            </Col>
          </Row>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }} span={12}>
          <Button onClick={handlerExit} type="link">
            Выйти
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Header;
