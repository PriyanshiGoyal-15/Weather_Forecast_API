import React from "react";
import "../index.css";
import WeatherSearch from "./WeatherSearch.jsx";

const Home = () => {
  return (
    <>
      <div className="card">
        <WeatherSearch />
      </div>
    </>
  );
};
export default Home;
