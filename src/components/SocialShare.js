import React, { useState, useEffect, useRef } from "react";
import shareIcon from "../shareSymbol.png";
import facebookIcon from "../facebookSymbol.png";

const SocialShare = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shareOptions = [
    {
      name: "Facebook",
      icon: facebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Twitter",
      icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "WhatsApp",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png",
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    },
    {
      name: "LinkedIn",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Telegram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
  ];

  const handleShare = (shareUrl) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  return (
    <div
      className="social-share-container"
      style={{ position: "relative", display: "inline-block" }}
      ref={containerRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <img
          src={shareIcon}
          alt="Share"
          style={{ width: "24px", height: "24px" }}
        />
      </button>

      {isOpen && (
        <div
          className="share-options"
          style={{
            position: "absolute",
            bottom: "50%",
            right: "calc(100% + 10px)",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            animation: "fadeInLeft 0.3s ease-out",
            minWidth: "150px",
            zIndex: "1000",
          }}
        >
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleShare(option.url)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              {typeof option.icon === "string" ? (
                <img
                  src={option.icon}
                  alt={option.name}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <img
                  src={option.icon}
                  alt={option.name}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                />
              )}
              {option.name}
            </button>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SocialShare;
