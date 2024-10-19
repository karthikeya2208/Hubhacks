import React from "react";
import "./homepage.png";

const Home = () => {
  return (
    <div className="home-container">
      <h1>ISANS</h1>
      <h2>Mission & Vision</h2>
      <p>
        Helping immigrants build a future in Nova Scotia
        <br />A community where all can belong and grow
      </p>
      <div className="image-wrapper">
        <img
          src={require("./homepage.png")} // Update with your image path
          alt="Screenshot of the website"
          className="home-screenshot"
        />
      </div>
    </div>
  );
};

export default Home;
