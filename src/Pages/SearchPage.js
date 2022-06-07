import { useLocation } from "react-router-dom";

const SearchPage = ()=>{
    // const [myData, SetMyData] = useState([]);
    const { state } = useLocation();
    console.log(state);
    return ( <div>{state.address}</div> );
}

export default SearchPage;