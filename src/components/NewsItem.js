import React, { useState } from "react";
import SocialShare from "./SocialShare";

const NewsItem = (props) => {
  const [imgSrc, setImgSrc] = useState(
    props.imageUrl ||
      // eslint-disable-next-line
      "TheSindhTime.png"
  );

  const handleImageError = () => {
    setImgSrc(
      // eslint-disable-next-line
      "TheSindhTime.png"
    );
  };

  const { title, description, newsUrl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card" style={{ animation: "fadeIn 0.8s ease-out" }}>
        <img
          src={imgSrc}
          className="card-img-top"
          alt="..."
          onError={handleImageError}
        />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <p className="card-text">{description}</p>

          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>

          <p className="card-text">
            <small className="text-muted">
              Source: {source ? source : "Unknown"}
            </small>
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center p-3">
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
          <SocialShare url={newsUrl} title={title} />
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
