import React from "react";
import star from "./star.svg";
import play from "./play.svg";
// import { FaClapperboardPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Trending = ({ item }) => {
  const navigate = useNavigate();
  const navigateTo = (id) => {
    navigate(`/movieDetails/${id}`);
  };

  const arr = Array(Math.floor(item.vote_average / 2)).fill("");

  return (
    <div key={item.id} className="trending">
      <div
        className="card"
        onClick={() => {
          navigateTo(item.id);
        }}
      >
        <div className="movie">
          <img
            src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
            alt={`${item?.original_title}`}
            title={item?.original_title}
          />
        </div>
        <div className="title">
          <div className="movieName">
            <h5>{item?.original_title}</h5>
            <div className="rating">
              {arr.map((val, index) => (
                <img key={index} src={star} alt="" />
              ))}

              <h6>{Math.floor(item?.vote_average / 2)} /5</h6>
            </div>
          </div>
          <img src={play} alt="play" className="playBtn" />
        </div>
      </div>
    </div>
  );
};

export default Trending;
