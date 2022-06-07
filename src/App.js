import './App.css';
import {useState} from 'react'
//load Pages
import SearchPage from './Pages/SearchPage';
import SearchBar from './Pages/SearchBar';
import Home from './Pages/Home';
//router
import { Routes, Route } from "react-router-dom";


function App() {

  const [inputText, setInputText] = useState('');

  const onChangeText = (e) => {
      setInputText(e.target['value']);
  }

  console.log(inputText);

  return (
    <>
      <SearchBar inputText={inputText} onChangeText={onChangeText} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </>
  );
}

export default App;
