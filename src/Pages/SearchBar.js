import logo from '../logo-etherscan.svg';
//react
import { useState } from 'react';
//router
import { Link } from 'react-router-dom';
//CSS
import './SearchBar.css';


const SearchBar = ({isUp}) => {
    console.log("SearchBar");
    const [inputText, setInputText] = useState('');
    const onChangeText = (e) => {
        setInputText(e.target['value']);
    }

    return (
        <div className={isUp ? "upNav":"Mid"}>
            <img src={logo} />
            <div>
                <span>Address Name : </span>
                <input
                    onChange={onChangeText}
                    value={inputText}
                    />
                <Link to={`/search?address=${inputText}`}><button>search</button></Link>

            </div>
        </div>
    )
}



export default SearchBar;