import React, { useState } from 'react'
//css
import styles from './TopNav.module.css'
//componenet
import SearchBar from './SearchBar'
import MetaMaskLogin from './MetaMaskLogin'
//img
//import logo from '../logo-etherscan.svg'

const TopNav = ({noSearch})=>{
    const [isMenuClick, setIsMenuClick] = useState(false);

    const onMenuClick = ()=> {
        setIsMenuClick(!isMenuClick);
    }

    const getAccountName = (account)=>{
        navigator.clipboard.writeText(account);
        console.log("account saved!");

    }

    return (

        <div className={`w3-white ${styles.topNav}`}>
            {noSearch ? '' : <SearchBar isUp={true} /> }        
            <div className={styles.menuContainer}>
                <div className={styles.menu}>
                    <p className= {`${styles.icon} w3-button`} onClick={onMenuClick}>☰</p>
                    <div className={isMenuClick ? 'w3-show':'w3-hide'}><MetaMaskLogin cb={getAccountName}/></div>
                </div>
            </div>
            
        </div>

    )
}

export default TopNav