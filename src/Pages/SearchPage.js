import React from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//Component
import TopNav from '../Components/TopNav';
import BlockInfo from '../Components/BlockInfo';
//css
import styles from './SearchPage.module.css'

const YourApiKeyToken = '6HXCSPI881QTMTHT3UWTTP4EVUZCE1VZ5J'
const divTOEthConst = 1000000000000000000;

const SearchPage = (props) => {
    const [search] = useSearchParams();

    const [dataArr, setDataArr] = useState({});
    const [isOk, setIsOk] = useState(0);
    const [showBlockInfo, setShowBlockInfo] = useState('');

    const myAddress = search.get("address");
    const now = new Date();


const onClickBlock = (blockid) => {
    console.log(blockid);
    // setShowBlockInfo('');
    setShowBlockInfo(blockid);
}


    useEffect(() => {
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
                .then(tmp => { console.log(tmp); return tmp; })
                .then(obj => {
                    if (obj.data.message === 'OK') {
                        dataArr['trxs'] = obj.data.result;
                        setDataArr({ ...dataArr });
                        return true;
                    }
                    else { console.log("err from trx"); return false; }
                })]
        )
            .then(ans => { if (ans.filter(e => e === false).length === 0) setIsOk(1); else { setIsOk(2) } })
            .catch(err => setIsOk(2))


    }, [myAddress]);


    
    return (
        <div className={styles.OuterMost}>
            <TopNav />
            {showBlockInfo.length > 0 ? <BlockInfo blockId={showBlockInfo}/>: ''}
            {/* <button onClick={ ()=>{setShowBlockInfo('')} }>hi</button> */}
            {/* <button onClick={() => { console.log(dataArr) }}>test</button> */}
            {
                isOk !== 1 ?
                    isOk === 0 ?
                        <div className={`${styles.tmpBox} w3-center`}><div><p>잠시 기다려주세요... </p></div></div>
                        :
                        <div className={`${styles.tmpBox} w3-center`}><div><p>잘못된 주소입니다.</p></div></div>
                    :
                    Object.keys(dataArr).length === 2 ?
                        <>
                            <div className={styles.containerCenter}>
                                <span className={styles.containerCard}>
                                    <div className={`${styles.card}`}><span className={styles.textCenter}>Address<br/>{myAddress}</span></div>
                                    <div className={styles.card}><span className={styles.textCenter}>balance<br></br>{dataArr['balance'] / divTOEthConst} ether</span></div>
                                </span>
                            </div>
                            <div className={styles.tableContainer}>
                                <br />
                                <table className={`${styles.searchPageTable} w3-table w3-hoverable`}>
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
                                            dataArr[`trxs`].map((trx, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <th>{idx + 1}</th>
                                                        <td>{trx['hash']}</td>
                                                        <td>{trx['input']}</td>
                                                        <td onClick={()=>{onClickBlock(trx.blockNumber)}} className='w3-button' style={{border: 'black 1px solid'}}>{trx['blockNumber']}</td>
                                                        <td>{Math.floor((now / 1000 - parseInt(trx['timeStamp'])) / 3600)} h</td>
                                                        <td>{trx['from']}</td>
                                                        <td>{trx['to']}</td>
                                                        <td>{(trx['value']) / divTOEthConst}</td>
                                                        <td>{(trx['gasPrice'] * trx['gasUsed']) / divTOEthConst} </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <br /><br /><br /><br />
                            </div>
                        </>
                        :
                        <div></div>
            }

        </div>

    );
}

export default SearchPage;

//https://api-ropsten.etherscan.io/?module=account&action=balance&address=${addressString}&tag=latest&apikey=${YourApiKeyToken}
//https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${addressString}&tag=latest&apikey=${YourApiKeyToken}