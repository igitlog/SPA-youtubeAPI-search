import React, { useState } from "react";
import { Modal, Button, Form, Input, Row, Select, Slider } from "antd";

const AddModal = ({
  userId,
  searchFormContent,
  setFavoriteData,
  setIsModalVisible,
  isModalVisible,
}) => {
  const [inputValueSlider, setInputValueSlider] = useState(12);
  const [sortValue, setSortValue] = useState("");
  const hadlerSlider = (value) => {
    setInputValueSlider(value);
  };
  
  // При сохранении, создаём объект, который включает в себя нужные нам данные
  // Проверяем, есть ли что то в локалльном хранилище и если есть, объединяем получененные данные с новым объектом
  // Сэтаем новый массив объектов в локальное хранилище, обновляем стейт и закрываем модальное окно
  const handleOk = (value) => {
    const itemName = searchFormContent;
    const favoriteItem = {
      searchName: itemName,
      favoriteName: value.name,
      sort: sortValue,
      number: inputValueSlider,
    };
    const localData = localStorage.getItem(userId)
      ? JSON.parse(localStorage.getItem(userId))
      : "";
    const FavoriteDataNow = [...localData, favoriteItem];
    let localObject = JSON.stringify(FavoriteDataNow);
    localStorage.setItem(userId, localObject);
    setFavoriteData([...FavoriteDataNow]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSortChange = (value) => {
    switch (value) {
      case "date":
        setSortValue("date");
        return;
      case "rating":
        setSortValue("rating");
        return;
      case "viewCount":
        setSortValue("viewCount");
        return;
      case "relevance":
        setSortValue("relevance");
        return;
      case "title":
        setSortValue("title");
        return;
      case "videoCount":
        setSortValue("videoCount");
        return;
    }
  };

  return (
    <>
      <Modal
        title="Сохранить запрос"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered={true}
      >
        <Form onFinish={handleOk} layout="vertical">
          <Form.Item label="Запрос" name="question">
            <Input placeholder={searchFormContent} readOnly={true} />
          </Form.Item>
          <Form.Item label="Название" name="name" rules={[{ min: 1 }]} required>
            <Input required placeholder="Укажите название" />
          </Form.Item>

          <Form.Item name="sort" label="Сортировать по">
            <Select
              placeholder="Без сортировки"
              onChange={onSortChange}
              allowClear
            >
              <Select.Option value="date">дате загрузки</Select.Option>
              <Select.Option value="rating">рейтингу</Select.Option>
              <Select.Option value="viewCount">числу просмотров</Select.Option>
              <Select.Option value="relevance">актуальности</Select.Option>
              <Select.Option value="title">названию</Select.Option>
              <Select.Option value="videoCount">количеству видео</Select.Option>
            </Select>
          </Form.Item>
          <h4>Максимальное количество</h4>
          <Slider
            min={0}
            max={25}
            onChange={hadlerSlider}
            value={typeof inputValueSlider === "number" ? inputValueSlider : 0}
          />

          <Row justify="center">
            <Form.Item>
              <Row style={{ padding: "5px" }}>
                <Button onClick={handleCancel} htmlType="button">
                  Не сохранять
                </Button>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row style={{ padding: "5px" }}>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Row>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
