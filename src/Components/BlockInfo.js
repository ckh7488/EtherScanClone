//react
import React, { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

import axios from "axios";
//css
import styles from './BlockInfo.module.css'

const YourApiKeyToken = '6HXCSPI881QTMTHT3UWTTP4EVUZCE1VZ5J'

const Portal = ({children, elementId})=>{    
    const parentFrom = useMemo(()=>document.getElementById(elementId), [elementId]);
    return createPortal(children, parentFrom);
}


const BlockInfo = ({blockId})=>{

    const [blockContent, setBlockContent] = useState({});
    const [isShow, setIsShow] =useState(true);

    const onClose = ()=>{
        setIsShow(false);
    }
    
    useEffect(()=>{
        axios({
            url : `https://api-ropsten.etherscan.io/api?module=block&action=getblockreward&blockno=${blockId}&apikey=${YourApiKeyToken}`,
            method : 'GET'
        })
        .then(c=>setBlockContent(c.data.result));
        setIsShow(true);
    },[blockId])
    
    return (
        <Portal elementId='modal-root'>
            <div className={`${styles.modalContainer} ${isShow ? 'w3-show':'w3-hide' }`}>
                <span onClick={onClose}>X</span>
                <div>BLOCK INFO</div><br></br><br></br><br></br>
                {
            //    console.log(blockContent)
                Object.keys(blockContent).map(e=><div><span>{e} : </span><span>{blockContent[e]}</span></div>)
                }
            </div>
        </Portal>
    )
}


export default BlockInfo



