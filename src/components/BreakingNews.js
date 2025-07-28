import React, { useEffect, useState } from "react";

const BreakingNews = ({ apiKey }) => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=4&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles) {
          setBreakingNews(
            data.articles.filter((article) => article.urlToImage)
          );
        }
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };

    if (apiKey) {
      fetchBreakingNews();
    }
  }, [apiKey]);

  useEffect(() => {
    if (breakingNews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [breakingNews.length]);

  if (breakingNews.length === 0) return null;

  return (
    <div className="my-3" style={{ width: "100%", height: "auto" }}>
      <div
        id="breakingNewsCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ width: "100%" }}
      >
        <div className="carousel-inner">
          {breakingNews.map((article, index) => (
            <div
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
              key={index}
              onClick={() => window.open(article.url, "_blank")}
            >
              <img
                src={article.urlToImage}
                className="d-block w-100"
                alt={article.title}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h6
                  style={{
                    color: "#fff",
                    fontSize: "0.9rem",
                    marginBottom: "5px",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                  }}
                >
                  BREAKING NEWS
                </h6>
                <h5>{article.title?.slice(0, 100)}...</h5>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {breakingNews.map((_, index) => (
            <button
              type="button"
              data-bs-target="#breakingNewsCarousel"
              data-bs-slide-to={index}
              className={index === currentIndex ? "active" : ""}
              aria-current={index === currentIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              key={index}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
