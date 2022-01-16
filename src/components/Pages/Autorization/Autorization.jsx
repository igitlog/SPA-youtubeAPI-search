import { Input, Button, Col, Row, Image, Form } from "antd";
import React from "react";

const Autorization = ({
  setFavoriteData,
  setUserId,
  users,
  setIsLoggedIn,
  setToken,
}) => {

  // В случае, если бы авторизация осуществлялась с помощью API, вместо замоканных данных
  // Здесь следовало бы использовать axios с проверкой .catch
  // При успешной авторизации пользователь будет перенаправлен на основную страницу
  const handleAutorization = (formContent) => {
    const findedUserLogin = users.users.find((user) => {
      return user.name === formContent.login;
    });
    const findedUserPassword = users.users.find((user) => {
      return user.password == formContent.password;
    });

    if (findedUserLogin && findedUserPassword) {
      setIsLoggedIn(true);
      setToken(findedUserLogin.token);
      localStorage.setItem("token", `${findedUserLogin.token}`);
      localStorage.setItem("userId", `${findedUserLogin.id}`);
      setUserId(findedUserLogin.id);
      const data = JSON.parse(localStorage.getItem(findedUserLogin.id));
      setFavoriteData([...data]);
    }

    // Токен генерится на сервере и возвращается после успешной авторизации, после он присваивается пользователю и сохраняется в локал
    // Так как нужно было сделать только авторизацию, каждому пльзователю токен был присвоен заранее
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col style={{ marginTop: "25vh" }}>
          <Row style={{ margin: "20px 0px 20px 0px" }} justify="center">
            <Image src="/images/Logo.png" preview={false} />
          </Row>
          <Row style={{ margin: "10px 0px 10px 0px" }} justify="center">
            Вход
          </Row>
          <Row style={{ margin: "10px 0px 10px 0px" }} justify="center">
            <Form layout="vertical" onFinish={handleAutorization}>
              <Form.Item
                label="Логин"
                name="login"
                rules={[{ type: "email" }]}
                tooltip="Данные пользователей замоканы в файле users.js"
              >
                <Input required />
              </Form.Item>
              <Form.Item label="Пароль" name="password" rules={[{ min: 6 }]}>
                <Input.Password required />
              </Form.Item>
              <Form.Item>
                <Row justify="center">
                  <Button type="primary" htmlType="submit">
                    Войти
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Autorization;
