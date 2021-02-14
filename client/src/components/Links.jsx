import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
  className: "collapse navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "collapse navbar-collapse",
})``;

const Links = () => {
  return (
    <>
      <Link to="/" className="navbar-brand">
        내 첫 번째 MERN 어플리케이션!
      </Link>
      <Collapse>
        <List>
          <Item>
            <Link to="/movies/list" className="nav-link">
              영화 목록
            </Link>
          </Item>
          <Item>
            <Link to="/movies/create" className="nav-link">
              영화 추가
            </Link>
          </Item>
        </List>
      </Collapse>
    </>
  );
};

export default Links;
