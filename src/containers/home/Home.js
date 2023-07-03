import React from "react";
import Header from "../login/Header";
import stranger from "./stranger.svg";
import Trending from "./Trending";

import { NavLink, useParams, useNavigate, json } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

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
  const [title, setTitle] = useState("Trending");
  const [input, setInput] = useState(localData?.input ? localData.input : "");

  useEffect(() => {
    input ? onSearch() : movieList();
  }, [pageNo, input, searchPageNo]);

  const navigate = useNavigate();

  const getpage = (pageNo) => {
    navigate(`/movies/${pageNo}`);
  };

  console.log(pageNo, "pageno**********");

  const movieList = async () => {
    const movieApi = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=b19815284b9ae66c9aaa41aa1147b407&page=${pageNo}`
    );
    const data = await movieApi.json();
    setFullData(data);
    // getpage(data.page);
    setMovies(data?.results);
    setTitle("Trending");
    sessionStorage.setItem("home", JSON.stringify(data.page));

    sessionStorage.removeItem("search");
  };

  //search function
  const onSearch = async () => {
    const searchApi = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b19815284b9ae66c9aaa41aa1147b407&language=en-US&query=${input}&page=${searchPageNo}&include_adult=false`
    );
    const result = await searchApi.json();
    // getpage(result?.page);
    setFullData(result);
    setMovies(result?.results);
    setTitle(`Search result for "${input}"`);
    setPageNo(1);
    sessionStorage.setItem("search", JSON.stringify({ input, searchPageNo }));
  };

  //searchBack

  return (
    <div className="homepage">
      <Header
        onSearch={onSearch}
        showSearch={showSearch}
        setInput={setInput}
        setSearchPageNo={setSearchPageNo}
        localData={localData}
        input={input}
      />
      <div className="stranger">
        <img src={stranger} alt="stranger" />
      </div>
      <div className="trendMovies">
        <h2>{title}</h2>
        <div className="trendingContainer">
          {movies?.map((item) => {
            return <Trending item={item} key={item.id} />;
          })}
        </div>
      </div>
      <div className="pages">
        <ReactPaginate
          breakLabel=".."
          nextLabel=" >"
          onPageChange={(e) => {
            setPageNo(e.selected + 1);
            setSearchPageNo(e.selected + 1);
          }}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          forcePage={
            localData?.searchPageNo ? localData.searchPageNo - 1 : pageNo - 1
          }
          pageCount={fullData?.total_pages}
          breakAriaLabels={">"}
          previousLabel="<"
          pageLinkClassName="pageNo"
          activeLinkClassName="arun"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Home;
