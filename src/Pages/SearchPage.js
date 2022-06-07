import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
//Pages
import SearchBar from './SearchBar';

const YourApiKeyToken ='6HXCSPI881QTMTHT3UWTTP4EVUZCE1VZ5J'
const addressString = '0xb1497712F0306228A2A92004A46902c25712Ba51'

const SearchPage = ()=>{
    const [search] = useSearchParams();
    const [dataArr, setDataArr] = useState();
    console.log("SearchPage", search.get("address"));

    const myAddress = search.get("address");

    axios({
        url : `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${myAddress}&tag=latest&apikey=${YourApiKeyToken}`,
        method : "GET",
    })
    .then(obj=>obj.data).then(console.log)
    // .then(data=>{
    //         if(data['message'] === 'OK'){
    //             setDataArr({...dataArr, balance : data.result})
    //         }
    //     })
    


    // search.get("address");
    return ( <SearchBar isUp={true}/> );
}

export default SearchPage;

//https://api-ropsten.etherscan.io/?module=account&action=balance&address=${addressString}&tag=latest&apikey=${YourApiKeyToken}
//https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${addressString}&tag=latest&apikey=${YourApiKeyToken}