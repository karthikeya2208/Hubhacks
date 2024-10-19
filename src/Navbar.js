// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/home" style={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/client-definitions" style={styles.navLink}>
            Client Definitions
          </Link>
        </li>
        <li>
          <Link to="/program-list" style={styles.navLink}>
            Program List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Inline styles (optional)
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#008000",
    color: "#fff",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    marginRight: "20px",
  },
  navLinks: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    gap: "15px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Navbar;
