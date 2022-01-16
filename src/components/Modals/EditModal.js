import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Row, Select, Slider } from "antd";

const EditModal = ({
  setFavoriteData,
  userId,
  setOneItem,
  oneItem,
  setIsModalVisible,
  isModalVisible,
}) => {
  const [inputValueSlider, setInputValueSlider] = useState(12);
  const [sortValue, setSortValue] = useState("");
  
  // Нужен для обновления элемента, собственно, он это и делает
  useEffect(() => {
    setOneItem(oneItem);
  }, []);

  const hadlerSlider = (value) => {
    setInputValueSlider(value);
  };

  // При изменении, создаём объект, который включает в себя нужные нам данные
  // Проверяем, есть ли что то в локалльном хранилище и если есть, фильтруем полученные данные
  // Возвращаем массив не содержащий наш элемент и пушим новый измененный элемент в массив элементов
  // Сэтаем новый массив объектов в локальное хранилище, обновляем стейт и закрываем модальное окно
  const handleOk = (value) => {
    const favoriteItem = {
      searchName: value.question,
      favoriteName: value.name,
      sort: sortValue,
      number: inputValueSlider,
    };
    const localData = localStorage.getItem(userId)
      ? JSON.parse(localStorage.getItem(userId))
      : "";
    let FavoriteDataNow = localData.filter(
      (el) =>
        el.searchName !== oneItem[0].searchName ||
        el.favoriteName !== oneItem[0].favoriteName ||
        el.sort !== oneItem[0].sort ||
        el.number !== oneItem[0].number
    );
    FavoriteDataNow.push(favoriteItem);
    let localObject = JSON.stringify(FavoriteDataNow);
    localStorage.setItem(userId, localObject);
    setFavoriteData([...FavoriteDataNow]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setOneItem([{}]);
    setIsModalVisible(false);
  };

  const onSortChange = (value) => {
    console.log(value);
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
        title="Изменить запрос"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered={true}
        destroyOnClose={true}
      >
        <Form onFinish={handleOk} layout="vertical">
          <Form.Item required label="Запрос" name="question">
            <Input required placeholder={oneItem[0].searchName} />
          </Form.Item>
          <Form.Item label="Название" name="name" rules={[{ min: 1 }]} required>
            <Input required placeholder={oneItem[0].favoriteName} />
          </Form.Item>

          <Form.Item name="sort" label="Сортировать по">
            <Select
              placeholder="Без сортировки"
              onChange={onSortChange}
              allowClear
              defaultValue={oneItem[0].sort}
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
            defaultValue={oneItem[0].number}
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

export default EditModal;
