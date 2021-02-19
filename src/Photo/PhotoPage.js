/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect } from "react";
import invariant from "invariant";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

import Photo from "../Photo/Photo";

const Container = styled.div((props) => ({
    maxWidth: props.isFullWidth && "none",
}));

const Row = styled.div((props) => ({
    display: props.isFullWidth && "block",
    maxWidth: props.isFullWidth && "none",
    width: props.isFullWidth && "100%",
}));

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const photosUrl = `https://api.unsplash.com/photos/`;

const PhotoPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [page, setPage] = useState(0);

    const fetchImages = async () => {
        const url = `${photosUrl}${id}${clientID}`;

        setLoading(true);

        try {
            const response = await fetch(url);
            const data = await response.json();

            invariant(!data?.errors?.length, "Wrong access key");

            setPhoto(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    useEffect(() => {
        fetchImages();
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                !loading &&
                window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
            ) {
                setPage((oldPage) => {
                    return oldPage + 1;
                });
            }
        });
    }, []);

    return (
        <main>
            <Container className="photos">
                <Row className="photos-center" isFullWidth>
                    {photo && <Photo {...photo} isFullWidth />}
                </Row>
                {loading && <h2 className="loading">Loading...</h2>}
            </Container>
        </main>
    );
};

export default PhotoPage;