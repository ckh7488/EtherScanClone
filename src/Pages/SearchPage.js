import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//Pages
import SearchBar from './SearchBar';
//css
import './SearchPage.css'
import { isFocusable } from '@testing-library/user-event/dist/utils';

const YourApiKeyToken = '6HXCSPI881QTMTHT3UWTTP4EVUZCE1VZ5J'
// const addressString = '0xb1497712F0306228A2A92004A46902c25712Ba51'
const divTOEthConst = 1000000000000000000;

const SearchPage = (props) => {
    const [search] = useSearchParams();
    const [dataArr, setDataArr] = useState({});
    const [isOk, setIsOk] = useState(0);
    const myAddress = search.get("address");
    const now = new Date();
    
    
    useEffect( () => {
        setIsOk(0);  
        Promise.all([   
        axios({
            url: `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${myAddress}&tag=latest&apikey=${YourApiKeyToken}`,
            method: "GET",
        })
            // .then(tmp => { console.log(tmp); return tmp; })
            .then(obj => {
                if (obj.data['message'] === 'OK') {
                    dataArr['balance'] = obj.data.result;
                    setDataArr({ ...dataArr });
                    return true;
                }
                else { console.log("err from balance"); return false; }
            })
        ,
        axios({
            url: `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${myAddress}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${YourApiKeyToken}`,
            method: "GET",
        })
            // .then(tmp => { console.log(tmp); return tmp; })
            .then(obj => {
                if (obj.data.message === 'OK') {
                    dataArr['trxs'] = obj.data.result;
                    setDataArr({ ...dataArr });
                    return true;
                }
                else { console.log("err from trx"); return false; }
            })]
        )
        .then(ans=>{if(ans.filter(e=>e===false).length === 0 ) setIsOk(1); else {setIsOk(2)}})
        .catch(err=> setIsOk(2))
        
        
    }, [myAddress]);
    //TODO : axios부분을 useEffect 사용해서 한번만 실행하게 하기 ( ,[]) 이런식




    // search.get("address");
    return (
        <div key={props.pageId}>
            <SearchBar isUp={true} />
            {/* <button onClick={() => { console.log(dataArr) }}>test</button> */}
            {
                isOk !== 1 ?
                    isOk === 0 ? 
                        <div>잠시 기다려주세요... </div>
                        :
                        <div>잘못된 주소이거나, 이더스캔 api에 문제가 생겼습니다.</div>
                    :
                    Object.keys(dataArr).length === 2 ?
                        // style 필요없는듯?
                        <div className='tableContainer'>               
                            <div>Address : {myAddress}</div>
                            <p>balance : {dataArr['balance']/divTOEthConst} ether</p>       
                            <br/>                                 
                            <table className='searchPageTable'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <td>Txn Hash</td>
                                        <td>Method</td>
                                        <td>block</td>
                                        <td>Age</td>
                                        <td>From</td>
                                        <td>To</td>
                                        <td>Value (eth)</td>
                                        <td>Txn Fee (eth)</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataArr[`trxs`].map((trx,idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <th>{idx+1}</th>
                                                    <td>{trx['hash']}</td>
                                                    <td>{trx['input']}</td>
                                                    <td>{trx['blockNumber']}</td>
                                                    <td>{ Math.floor((now/1000 - parseInt(trx['timeStamp'])) / 3600)} h</td>
                                                    <td>{trx['from']}</td>
                                                    <td>{trx['to']}</td>
                                                    <td>{(trx['value'])/divTOEthConst}</td>
                                                    <td>{(trx['gasPrice'] * trx['gasUsed'])/divTOEthConst} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <br/><br/><br/><br/>
                        </div>
                        :
                        <div></div>}

        </div>
    );
}

export default SearchPage;

//https://api-ropsten.etherscan.io/?module=account&action=balance&address=${addressString}&tag=latest&apikey=${YourApiKeyToken}
//https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${addressString}&tag=latest&apikey=${YourApiKeyToken}