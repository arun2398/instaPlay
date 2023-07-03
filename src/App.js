// import Header from "./components/Header";
// import Form from "./components/Form";
import Index from "./containers/login/Index";
import Home from "./containers/home/Home";
import Movie from "./containers/movieDetails/Movie";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./containers/login/Protected";

function App() {
  // const data = JSON.parse(sessionStorage.getItem("login"));
  // console.log(data, "from local storage");

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<Protected />}>
            <Route path="/movies" element={<Home />} />
            <Route path="/movieDetails/:id" element={<Movie />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
