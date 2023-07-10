import React, { useState } from "react";
import star from "./star.svg";
import play from "./play.svg";
import MovieLogo from "./movieLogo.png";
// import { FaClapperboardPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Trending = ({ item }) => {
  const [teaserKey, setTeaserKey] = useState();
  const [onHover, setOnHover] = useState(false);

  const navigate = useNavigate();
  const navigateTo = (id) => {
    navigate(`/movieDetails/${id}`);
  };

  const arr = Array(Math.floor(item.vote_average / 2)).fill("");

  const playOnHover = async () => {
    setOnHover(true);
    const teaser = await fetch(
      `https://api.themoviedb.org/3/movie/${item?.id}/videos?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US`
    );
    const teaserData = await teaser.json();
    const trailer = teaserData.results?.filter(
      (val, ind) => val.type == "Trailer"
    );
    setTeaserKey(trailer[0]);
    console.log(onHover, "onHover");
  };
  return (
    <div key={item.id} className="trending">
      <div
        className="card"
        onClick={() => {
          navigateTo(item.id);
        }}
      >
        <div
          className="movie"
          onMouseOver={() => playOnHover()}
          onMouseOut={() => setOnHover(false)}
        >
          {!onHover ? (
            <img
              src={
                item?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}`
                  : MovieLogo
              }
              alt={`${item?.original_title}`}
              title={item?.original_title}
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${teaserKey?.key}?autoplay=1&mute=1 `}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          )}
        </div>
        <div className="title">
          <div className="movieName">
            <h5>{item?.original_title}</h5>
            <div className="rating">
              {arr.map((val, index) => (
                <img key={index} src={star} alt="" />
              ))}

              <h6
                style={
                  item?.vote_average ? { display: "flex" } : { display: "none" }
                }
              >
                {Math.floor(item?.vote_average / 2)} /5
              </h6>
            </div>
          </div>
          <img src={play} alt="play" className="playBtnHome" />
        </div>
      </div>
    </div>
  );
};

export default Trending;
