import React, { useEffect, useState } from "react";

import Header from "../login/Header";
import Back from "./back.svg";
import PlayBtn from "./playBtn.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import Modal from "../modal/Modal";

const Movie = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [modal, setModal] = useState(false);
  const [teaserKey, setTeaserKey] = useState(null);
  const [loader, setLoader] = useState(true);
  const [apiError, setApiError] = useState("");

  const params = useParams();
  const userID = params.id;
  useEffect(() => {
    movie();
  }, []);

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  };

  const movie = async () => {
    const overView = await fetch(
      `https://api.themoviedb.org/3/movie/${userID}?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US`
    );
    const movieData = await overView.json();
    setLoader(false);
    if (!movieData?.id) {
      setApiError(movieData.status_message);
      return;
    }
    setMovieDetails(movieData);
    const teaser = await fetch(
      `https://api.themoviedb.org/3/movie/${userID}/videos?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US`
    );
    const teaserData = await teaser.json();
    const trailer = teaserData.results?.filter(
      (val, ind) => val.type == "Trailer"
    );
    setTeaserKey(trailer[0]);
  };
  const languages = (movieDetails?.spoken_languages || []).map(
    (lang) => lang.english_name
  );

  return (
    <div className="movieDetails">
      <Header />
      {apiError ? (
        <h2 className="apiError">{apiError + "!!!!"}</h2>
      ) : (
        <>
          {loader ? (
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass="loader"
              visible={loader}
            />
          ) : (
            <div className="movieContainer1">
              <div className="backgroundCon">
                {window.screen.availWidth <= 770 && modal ? (
                  <Modal
                    teaserKey={teaserKey}
                    modal={modal}
                    setModal={setModal}
                    setTeaserKey={setTeaserKey}
                  />
                ) : (
                  <img
                    className="background"
                    src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
                    alt=""
                  />
                )}
              </div>
              <div className="movieContainer">
                <div className="gradiant">
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
                    <p>
                      Rating : {(movieDetails?.vote_average / 2).toFixed(1)}/5
                    </p>
                    <p id="aboutMovie">{movieDetails?.overview}</p>
                    <div className="release">
                      <div className="origin releaseDate">
                        <p>Release Date : </p>
                        <p>{movieDetails?.release_date?.slice(0, 4)}</p>
                      </div>
                      <div className="origin">
                        <p>Orginal Language : </p>

                        <div className="language">
                          <p> {languages.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="buttonContainer"
                  style={{ display: modal ? "none" : "flex" }}
                >
                  <div className="playButton">
                    <img
                      src={PlayBtn}
                      alt="play"
                      onClick={() => setModal(!modal)}
                      className="playBtn"
                      style={{ display: teaserKey && !modal ? "flex" : "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {window.screen.availWidth > 770 && modal && (
            <Modal teaserKey={teaserKey} modal={modal} setModal={setModal} />
          )}
        </>
      )}
    </div>
  );
};

export default Movie;
