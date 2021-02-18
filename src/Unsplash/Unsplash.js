import React, { useState, useEffect } from "react";
import invariant from "invariant";
import { FaSearch } from "react-icons/fa";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function Unsplash() {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");

    const fetchImages = async () => {
        setLoading(true);
        let url;
        const urlPage = `&page${page}`;
        const urlQuery = `&query=${query}`;

        if (query) {
            url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
        } else {
            url = `${mainUrl}${clientID}${urlPage}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            invariant(!data?.errors?.length, "Wrong access key");

            setPhotos((oldPhotos) => {
                if (query && page === 1) {
                    return data?.results;
                }

                if (query) {
                    return [...oldPhotos, ...data.results];
                }

                return [...oldPhotos, ...data];
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <main>
            <section className="search">
                <form className="search-form">
                    <input
                        type="text"
                        placeholder="search"
                        className="form-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>
                        <FaSearch />
                    </button>
                </form>
            </section>
            <section className="photos">
                <div className="photos-center">
                    {photos.map((photo) => {
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        return <img key={photo.id} {...photo} />;
                    })}
                </div>
                {loading && <h2 className="loading">Loading...</h2>}
            </section>
        </main>
    );
}

export default Unsplash;
