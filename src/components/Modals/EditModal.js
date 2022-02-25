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

  useEffect(() => {
    setOneItem(oneItem);
  }, []);

  const hadlerSlider = (value) => {
    setInputValueSlider(value);
  };

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
        title="Edit Request"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered={true}
        destroyOnClose={true}
      >
        <Form onFinish={handleOk} layout="vertical">
          <Form.Item required label="Request" name="question">
            <Input required placeholder={oneItem[0].searchName} />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ min: 1 }]} required>
            <Input required placeholder={oneItem[0].favoriteName} />
          </Form.Item>

          <Form.Item name="sort" label="Sort by">
            <Select
              placeholder="No sorting"
              onChange={onSortChange}
              allowClear
              defaultValue={oneItem[0].sort}
            >
              <Select.Option value="date">upload date</Select.Option>
              <Select.Option value="rating">rating</Select.Option>
              <Select.Option value="viewCount">views</Select.Option>
              <Select.Option value="relevance">relevance</Select.Option>
              <Select.Option value="title">title</Select.Option>
              <Select.Option value="videoCount">number of videos</Select.Option>
            </Select>
          </Form.Item>
          <h4>Max count video</h4>
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
                  Do not save
                </Button>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row style={{ padding: "5px" }}>
                <Button type="primary" htmlType="submit">
                  Save
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
