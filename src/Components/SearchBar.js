import React from 'react';
import logo from '../logo-etherscan.svg';
//react
import { useState } from 'react';
//router
import { Link, useNavigate } from 'react-router-dom';
//CSS
import styles from './SearchBar.module.css';


const SearchBar = ({isUp}) => {
    console.log("SearchBar");
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const onChangeText = (e) => {
        setInputText(e.target['value']);
    }

    return (
        <div className={`w3-white ${isUp ? styles.upNav:styles.Mid}`}>
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <div>
                {/* <span>Address Name : </span> */}
                <input
                    placeholder='Address'
                    onChange={onChangeText}
                    onKeyDown = {e=>{
                        if(e.key === 'Enter') {
                            navigate(`/search?address=${inputText}`);
                            setInputText('');
                        }
                    }}
                    value={inputText}
                    className='w3-round-xlarge'
                    />
                {/* <Link to={`/search?address=${inputText}`}><button className='w3-button w3-black'>search</button></Link> */}

            </div>
        </div>
    )
}



export default SearchBar;