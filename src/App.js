import "./App.css";

import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Travel from "./pages/Travel/Travel";
import Festival from "./pages/Festival/Festival";
import Accommodation from "./pages/Accommodation/Accommodation";
import Login from "./pages/Login/Login";
import Signup from "./pages/signUp/SignUp";
import { Routes, Route } from "react-router-dom";
import Write from "./pages/Review/Write";
import Board from "./pages/Board/Board";
import KakaoRedirectHandler from "./pages/Login/KakaoRedirectHandeler";
import Detail from "./pages/Detail/Detail";
import Review from "./pages/Review/Review";
import ReviewDetail from "./pages/Review/ReviewDetail";
import Modify from "./pages/Review/Modify";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/festival" element={<Festival />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:contentId" element={<Detail />} />
        <Route path="/review/write" element={<Write />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/modify/:reviewNo" element={<Modify />}></Route>
        <Route path="/review/:reviewNo" element={<ReviewDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
