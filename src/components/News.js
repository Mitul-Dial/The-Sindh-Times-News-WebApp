import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import BreakingNews from "./BreakingNews";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import scrollUpArrow from "../scrollUpArrow.png";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/general") {
      document.title = "The Sindh Times";
    } else {
      document.title = `TST - ${
        props.category.charAt(0).toUpperCase() + props.category.slice(1)
      }`;
    }
  }, [props.category, location.pathname]);

  const updateNews = async (resetArticles = true) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      resetArticles ? 1 : page
    }&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(60);

    if (resetArticles) {
      setArticles(parsedData.articles || []);
      setPage(1);
    } else {
      setArticles(articles.concat(parsedData.articles || []));
    }

    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [props.category, props.country]);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container-fluid" style={{ marginTop: "80px" }}>
        <div className="container-fluid">
          <BreakingNews apiKey={props.apiKey} />
        </div>

        <div className="row align-items-center mb-4">
          <div className="col-md-12">
            <h1 className="text-center">
              Top{" "}
              {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
              Headlines
            </h1>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.length === 0 && !loading && (
              <div className="col-12 text-center mt-5">
                <h3>No results found for this selection.</h3>
              </div>
            )}
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title}
                    description={element.description?.slice(0, 90) || ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 999,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            animation: "fadeIn 0.3s",
          }}
          title="Go to top"
        >
          <img
            src={scrollUpArrow}
            alt="Scroll to top"
            style={{ width: "45px", height: "45px" }}
          />
        </button>
      )}
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
