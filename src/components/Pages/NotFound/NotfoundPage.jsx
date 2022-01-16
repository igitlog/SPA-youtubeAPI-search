import React from "react";
import { NavLink } from "react-router-dom";

// По ТЗ этой страницы быть не должно, на реальном проекте так делать не рекомендую
const NotfoundPage = () => {
  return (
    <div>
      <h1 style={{padding:"20vh 50px", fontSize:"24px"}}>
        Когда-то давным давно жил странник, ищущий приключений и в память о нём была создана эта страница, нажмите
        <NavLink to="/"> СЮДА</NavLink>
        , чтобы почтить его память и перейти на главную
      </h1>
    </div>
  );
};

export default NotfoundPage;
