import logo from '../logo-etherscan.svg';
//router
import { useNavigate } from 'react-router-dom';
const SearchBar = ({ onChangeText, inputText }) => {
    const navigate = useNavigate()
    const clickSearch = ()=>{
        const X = inputText;
        navigate('/search',{state:{address:X}})
    }

    return (
        <div className="landingPage">
            <img src={logo} />
            <div>
                <span>Address Name : </span>
                <input
                    onChange={onChangeText}
                    value={inputText}
                />
                <button onClick={ clickSearch }>search</button>

            </div>
        </div>
    )
}



export default SearchBar;