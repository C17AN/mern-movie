import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Links from "./Links";

const Container = styled.div.attrs({
  className: "container-fluid",
})`
  padding: 0 !important;
`;

const Nav = styled.div.attrs({
  className: "navbar navbar-expand-lg navbar-dark bg-dark",
})`
  margin-bottom: 20px;
`;

const Navbar = () => {
  return (
    <Container>
      <Nav>
        <Logo></Logo>
        <Links></Links>
      </Nav>
    </Container>
  );
};

export default Navbar;
