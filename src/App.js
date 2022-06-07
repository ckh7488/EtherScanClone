import './App.css';
//load Pages
import SearchPage from './Pages/SearchPage';
import SearchBar from './Pages/SearchBar';
import Home from './Pages/Home';
//router
import { Routes, Route } from "react-router-dom";
import { queryAllByAltText } from '@testing-library/react';


function App() {

  console.log("App");


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
