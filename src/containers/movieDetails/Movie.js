import React, { useEffect, useState } from "react";

import Header from "../login/Header";
import Back from "./back.svg";
import Close from "./close.svg";
import PlayBtn from "./playBtn.svg";
import { useNavigate, useParams } from "react-router-dom";

const Movie = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [modal, setModal] = useState(false);
  const [teaserKey, setTeaserKey] = useState(null);

  const handalClick = () => {
    setTeaserKey("");
    setModal(!modal);
  };

  const params = useParams();
  const userID = params.id;
  console.log("use paramss", userID);

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  };

  useEffect(() => {
    movie();
  }, []);
  const movie = async () => {
    const overView = await fetch(
      `https://api.themoviedb.org/3/movie/${userID}?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US`
    );
    const movieData = await overView.json();
    console.log("********", movieData.spoken_languages);
    setMovieDetails(movieData);

    // const teaser = await fetch(
    //   `https://api.themoviedb.org/3/movie/${userID}/videos?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US`
    // );
    // const teaserData = await teaser.json();
    // console.log("*********teaser data", teaserData?.results[0]);
    // setTeaserKey(teaserData?.results[0]);
    // setModal(!modal);
  };
  const videofun = async () => {
    const teaser = await fetch(
      `https://api.themoviedb.org/3/movie/${userID}/videos?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US`
    );
    const teaserData = await teaser.json();
    // console.log("*********teaser data", teaserData?.results[0]);
    setTeaserKey(teaserData?.results[0]);
    setModal(!modal);
  };

  return (
    <div className="movieDetails">
      <Header />
      <div
        className="movieContainer"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path})`,
        }}
      >
        <div className="abc">
          <div className="overView">
            <div className="imgContainer">
              <img
                src={Back}
                alt="back"
                onClick={() => {
                  navigateTo();
                }}
              />
            </div>
            <h2>{movieDetails?.title}</h2>
            <p>Rating:{(movieDetails?.vote_average / 2).toFixed(2)}/5</p>
            <p id="aboutMovie">{movieDetails?.overview}</p>
            <div className="release">
              <div className="origin releaseDate">
                <p>Release Date </p>
                <p>{movieDetails?.release_date}</p>
              </div>
              <div className="origin">
                <p>Orginal Language </p>

                <div className="language">
                  {movieDetails?.spoken_languages.map((spoken) => (
                    <p>{`${spoken.english_name},`}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xyz">
          <div className="playButton">
            <img
              src={PlayBtn}
              alt="play"
              onClick={() => videofun()}
              className="playBtn"
            />
          </div>
        </div>
      </div>
      <div
        className="modalContainer"
        style={{ display: modal ? "block" : "none" }}
      >
        <div className="videomodal">
          <img src={Close} alt="" onClick={handalClick} />
          <iframe
            src={`https://www.youtube.com/embed/${teaserKey?.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Movie;
