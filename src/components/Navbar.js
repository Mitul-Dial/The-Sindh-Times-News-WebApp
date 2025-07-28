import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import theSindhTimesLogo from "../theSindhTimesLogo.png";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          paddingBottom: 0,
        }}
      >
        <div
          className="container-fluid d-flex justify-content-between align-items-center"
          style={{ width: "100%", padding: "10px 0" }}
        >
          <div
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "260px",
              lineHeight: "1.2",
            }}
          >
            <div>{formattedTime}</div>
            <div>{formattedDate}</div>
          </div>

          <Link className="navbar-brand mx-auto" to="/" style={{ margin: 0 }}>
            <img
              src={theSindhTimesLogo}
              alt="The Sindh Times Logo"
              style={{ height: "60px", margin: "0" }}
            />
          </Link>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "250px" }}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderTop: "1px solid #333",
          borderBottom: "1px solid #444",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <div
          className="container-fluid collapse navbar-collapse show"
          id="navbarSupportedContent"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ul
            className="navbar-nav mb-2 mb-lg-0"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/business">
                Business
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/entertainment">
                Entertainment
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/health">
                Health
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/science">
                Science
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/sports">
                Sports
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/technology">
                Technology
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
