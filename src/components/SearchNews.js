import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

const SearchNews = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  document.title = `TST - Search Results`;

  const updateNews = async (query, pageNum = 1) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&apiKey=${props.apiKey}&page=${pageNum}&pageSize=${
      props.pageSize
    }&sortBy=publishedAt`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(60);

    if (pageNum === 1) {
      setArticles(parsedData.articles || []);
    } else {
      setArticles((prevArticles) => [
        ...prevArticles,
        ...(parsedData.articles || []),
      ]);
    }

    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("q");
    if (query) {
      setSearchQuery(query);
      setPage(1);
      updateNews(query, 1);
    }
    // eslint-disable-next-line
  }, [location.search]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await updateNews(searchQuery, nextPage);
  };

  return (
    <>
      <div style={{ marginTop: "80px" }}>
        {searchQuery && (
          <h1 className="text-center my-4">
            Search Results for "{searchQuery}"
          </h1>
        )}

        {!searchQuery && (
          <div className="text-center my-5">
            <h2>Search for News</h2>
            <p>Use the search bar above to find news articles</p>
          </div>
        )}

        {loading && articles.length === 0 && <Spinner />}

        {searchQuery && articles.length === 0 && !loading && (
          <div className="text-center my-5">
            <h3>No results found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}

        {articles.length > 0 && (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {articles.map((element, index) => {
                  return (
                    <div className="col-md-4" key={element.url + index}>
                      <NewsItem
                        title={element.title?.slice(0, 55) || ""}
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
        )}
      </div>
    </>
  );
};

SearchNews.defaultProps = {
  pageSize: 9,
};

SearchNews.propTypes = {
  pageSize: PropTypes.number,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default SearchNews;
