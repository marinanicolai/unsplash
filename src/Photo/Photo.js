/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)`
  color: palevioletred;
  display: block;
  margin: 0.5em 0;
  font-family: Helvetica, Arial, sans-serif;

  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: red;
  }
`;

const Container = styled.div`
  height: ${(props) => (props.isFullWidth ? "100%" : "auto")};
  width: ${(props) => (props.isFullWidth ? "100%" : "auto")};
`;

const Image = styled.img`
  height: ${(props) => (props.isFullWidth ? "100%" : "auto")};
  width: ${(props) => (props.isFullWidth ? "100%" : "auto")};
`;

const Photo = ({
    alt_description: altDescription,
    id,
    isFullWidth,
    urls: { full, regular },
    user: { name },
}) => {
    return (
        <Container className="photo" isFullWidth={isFullWidth}>
            <Image src={isFullWidth ? full : regular} alt={altDescription} />

            <div className="photo-info">
                <h4>{name}</h4>
                <StyledLink to={`/photo/${id}`}>More info</StyledLink>
            </div>
        </Container>
    );
};

export default Photo;