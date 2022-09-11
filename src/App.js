import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Comments from "./components/Comments/Comments";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import FilterBar from "./components/FilterBar/FilterBar";
import AllPosts from "./components/AllPosts/AllPosts";
import "./App.css";


function App() {
  return (
    <Header />
  )
}

export default App;