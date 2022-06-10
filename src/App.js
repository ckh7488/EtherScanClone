import React from 'react'
import './App.css';
//load Pages
import SearchPage from './Pages/SearchPage';
import Home from './Pages/Home';
import TestPage from './Pages/TestPage'
//router
import { Routes, Route } from "react-router-dom";



function App() {

  console.log("App");


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/test" element={<TestPage/>} />
      </Routes>
    </>
  );
}

export default App;
