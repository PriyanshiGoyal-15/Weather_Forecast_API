import { style } from "framer-motion/client";
import React, { useEffect, useState } from "react";

const WeatherSearch = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "c8367ef4b2a24734bdb94632252811";

  const backgrounds = {
    Clear: "linear-gradient(to bottom, #4facfe, #00f2fe)",
    Sunny: "linear-gradient(to bottom, #f6d365, #fda085)",
    Cloudy: "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
    Overcast: "linear-gradient(to bottom, #757f9a, #d7dde8)",
    Rain: "linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6)",
    Drizzle: "linear-gradient(to bottom, #4b79a1, #283e51)",
    Thunder: "linear-gradient(to bottom, #232526, #414345)",
    Snow: "linear-gradient(to bottom, #e6dada, #274046)",
    Mist: "linear-gradient(to bottom, #3e5151, #decba4)",
    Fog: "linear-gradient(to bottom, #606c88, #3f4c6b)",
    Default: "linear-gradient(to bottom, #141E30, #243B55)",
  };

  const textColors = {
    Clear: "#000",
    Sunny: "#000",
    Snow: "#000",
    Cloudy: "#111",
    Mist: "#111",
    Fog: "#eee",
    Rain: "#fff",
    Drizzle: "#fff",
    Thunder: "#fff",
    Overcast: "#fff",
    Default: "#fff",
  };

  const fetchWeather = async (city) => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
      );

      if (!response.ok) {
        alert("City not found!");
        return;
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather("Jaipur");
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather(query);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const dateObj = new Date(dateString);
    const optionsDate = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString(undefined, optionsDate);
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = dateObj.toLocaleTimeString(undefined, optionsTime);
    return { formattedDate, formattedTime };
  };

  return (
    <div
      style={{
        ...styles.container,
        background: weather
          ? backgrounds[weather.current.condition.text] || backgrounds.Default
          : backgrounds.Default,
        color: weather
          ? textColors[weather.current.condition.text] || textColors.Default
          : textColors.Default,
        transition: "all 0.5s ease",
      }}
    >
      <h1 style={styles.title}>Weather Forecast 🌦️</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            ...styles.input,
            color: weather
              ? textColors[weather.current.condition.text] || textColors.Default
              : textColors.Default,
            border: `1px solid ${
              weather
                ? textColors[weather.current.condition.text] === "#000"
                  ? "#333"
                  : "#fff"
                : "#fff"
            }`,
          }}
        />
        <button onClick={() => fetchWeather(query)} style={styles.button}>
          🔍
        </button>
      </div>

      {weather && (
        <div style={styles.cardInner}>
          <h2 style={styles.city}>
            {weather.location.name}, <span>{weather.location.country}</span>
          </h2>
          {weather && (
            <>
              <p style={{ marginTop: "8px", opacity: 0.8 }}>
                📅 {formatDateTime(weather.location.localtime).formattedDate}
                <br />⏰
                {formatDateTime(weather.location.localtime).formattedTime}
              </p>
            </>
          )}

          <img
            src={weather.current.condition.icon}
            alt="weather icon"
            style={styles.icon}
          />
          <h3 style={styles.temp}>{weather.current.temp_c}°C</h3>
          <p style={styles.condition}>{weather.current.condition.text}</p>
          <div style={styles.infoBox}>
            <p>💨 Wind: {weather.current.wind_kph} km/h</p>
            <p>💧 Humidity: {weather.current.humidity}%</p>
            <p>🌡 Feels Like: {weather.current.feelslike_c}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "1.9rem",
    fontWeight: "600",
    marginBottom: "12px",
    fontFamily: "cursive",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    width: "50vh",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.3)",
    color: "white",
    outline: "none",
    textAlign: "center",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 18px",
    background: "white",
    color: "#333",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    fontSize: "1.2rem",
    transition: "0.3s",
  },
  cardInner: {
    marginTop: "10px",
    padding: "10px",
  },
  city: {
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  icon: {
    width: "80px",
    marginTop: "1px",
  },
  temp: {
    fontSize: "2.6rem",
    fontWeight: "700",
    margin: "8px 0",
  },
  condition: {
    fontSize: "1.2rem",
    opacity: "0.9",
  },
  infoBox: {
    marginTop: "12px",
    background: "rgba(255,255,255,0.25)",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "1rem",
  },
};

export default WeatherSearch;
