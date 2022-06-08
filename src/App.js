import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';
//load Pages
import SearchPage from './Pages/SearchPage';
import Home from './Pages/Home';
//router
import { Routes, Route } from "react-router-dom";



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
