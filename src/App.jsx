import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Cards = ({ destinations, addToFavorites, removeFromFavorites }) => {
  const location = useLocation();

  // hehe we didnt really teach this but yeah you can do this OR you can do this in the routes and get it from the props
  /*
    <Route path="/destinations" element={<Cards destinations={data} />} />

    <Route path="/favorites" element={<Cards destinations={favorites} />} isFavorites={true} />
  */
  const isFavorites = location.pathname === "/favorites";

  return (
    <ul>
      {destinations.map((destination) => {
        return (
          <li key={destination.name.common}>
            {destination.name.common}
            {!isFavorites ? (
              <button onClick={() => addToFavorites(destination)}>
                Add to favorite
              </button>
            ) : (
              <button onClick={() => removeFromFavorites(destination)}>
                Remove from favorites
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setData(data);
    };

    getData();
  }, []);

  const addToFavorites = (destination) => {
    setFavorites([...favorites, destination]);
  };

  const removeFromFavorites = (destination) => {
    setFavorites(favorites.filter((d) => d !== destination));
  };

  return (
    <>
      <ul style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/destinations">Destinations</Link>
        <Link to="/favorites">Favorites</Link>
      </ul>
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route
          path="/destinations"
          element={
            <Cards destinations={data} addToFavorites={addToFavorites} />
          }
        />
        <Route
          path="/favorites"
          element={
            <Cards
              destinations={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
