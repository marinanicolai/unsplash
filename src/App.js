import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;


function App() {

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

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <div className="photos-center">
            {photos.map((photo) => {
              // eslint-disable-next-line react/jsx-props-no-spreading
              return <Photo key={photo.id} {...photo} />;
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
