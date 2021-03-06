import React from 'react';
//componenet
import TopNav from '../Components/TopNav';
import SearchBar from '../Components/SearchBar';
//css
import styles from './Home.module.css'

const Home = ()=>{
    return (
    <div className= {styles.OuterMost}>
        <div className={styles.topNavContainer}><TopNav noSearch={true}/></div>
        <SearchBar isUp={false}  />
    </div>
    )
}

export default Home