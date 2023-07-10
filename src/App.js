import Index from "./containers/login/Index";
import Home from "./containers/home/Home";
import Movie from "./containers/movieDetails/Movie";
import Protected from "./containers/login/Protected";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Global from "./Global";

function App() {
  const notify = () =>
    toast.success(" Login Successfull", {
      toastId: "abc",
      position: "top-center",
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "dark",
    });

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index notify={notify} />} />
          <Route element={<Protected />}>
            <Route path="/movies" element={<Home />} />
            <Route path="/movieDetails/:id" element={<Movie />} />
          </Route>
          <Route path="*" element={<Global />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        theme="dark"
      />
    </div>
  );
}

export default App;
