import React from "react";
import Header from "../login/Header";
import stranger from "./stranger.svg";
import Trending from "./Trending";

import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

import { Circles } from "react-loader-spinner";

const Home = () => {
  const localData = JSON.parse(sessionStorage.getItem("search"));
  const homePage = JSON.parse(sessionStorage.getItem("home"));

  const [pageNo, setPageNo] = useState(homePage ? homePage : 1);
  const [searchPageNo, setSearchPageNo] = useState(
    localData?.searchPageNo ? localData.searchPageNo : 1
  );
  const [fullData, setFullData] = useState();
  const [movies, setMovies] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const [title, setTitle] = useState();
  const [input, setInput] = useState(localData?.input ? localData.input : "");
  const [loader, setLoader] = useState(true);

  let searchDelay;
  useEffect(() => {
    input
      ? (searchDelay = setTimeout(() => {
          onSearch(searchPageNo);
        }, 1500))
      : movieList();
    return () => clearTimeout(searchDelay);
  }, [input]);

  useEffect(() => {
    !input && movieList();
  }, [pageNo]);

  //trending movies**********************
  const movieList = async () => {
    setLoader(true);
    const movieApi = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=b19815284b9ae66c9aaa41aa1147b407&page=${pageNo}`
    );
    const data = await movieApi.json();
    console.log("api");

    setFullData(data);
    setMovies(data?.results);
    setTitle("Trending");
    sessionStorage.setItem("home", JSON.stringify(data.page));
    sessionStorage.removeItem("search");
    setLoader(false);
  };

  //search function
  const onSearch = async (searchPageNo) => {
    setLoader(true);
    const searchApi = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US&query=${input}&page=${searchPageNo}&include_adult=false`
    );
    const result = await searchApi.json();
    setFullData(result);
    setMovies(result?.results);
    result?.total_results
      ? setTitle(`Search result for "${input}"`)
      : setTitle(`no movies found for "${input}"`);

    setPageNo(1);
    sessionStorage.setItem("search", JSON.stringify({ input, searchPageNo }));
    setLoader(false);
  };

  return (
    <div className="homepage" style={loader ? { height: "100vh" } : {}}>
      <Header
        onSearch={onSearch}
        showSearch={showSearch}
        setInput={setInput}
        setSearchPageNo={setSearchPageNo}
        localData={localData}
        input={input}
        setLoader={setLoader}
        setTitle={setTitle}
      />
      <div className="stranger">
        <img src={stranger} alt="stranger" />
      </div>
      <div className="trendMovies">
        <h2>{title}</h2>
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
          <div className="trendingContainer">
            {movies?.map((item) => {
              return <Trending item={item} key={item.id} />;
            })}
          </div>
        )}
      </div>

      <div
        className="pages"
        style={{
          display: !fullData?.total_results ? "none" : loader ? "none" : "flex",
        }}
      >
        <ReactPaginate
          breakLabel=".."
          nextLabel=" >"
          onPageChange={(e) => {
            setPageNo(e.selected + 1);
            input && onSearch(e.selected + 1);
          }}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          forcePage={
            localData?.searchPageNo ? localData.searchPageNo - 1 : pageNo - 1
          }
          pageCount={
            fullData?.total_pages > 500
              ? fullData.total_pages / 2
              : fullData?.total_pages
          }
          breakAriaLabels={">"}
          previousLabel="<"
          pageLinkClassName="pageNo"
          activeLinkClassName="arun"
          renderOnZeroPageCount={null}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Home;
