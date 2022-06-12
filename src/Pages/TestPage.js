import React from 'react'
import BlockInfo from '../Components/BlockInfo'
//Component
import MetaMaskLogin from '../Components/MetaMaskLogin'
import TopNav from '../Components/TopNav'

const TestPage = ()=>{

    return (
        <div>
            <TopNav></TopNav>
            {/* <MetaMaskLogin /> */}
            <BlockInfo blockId='12356108'/>
        </div>
    )
}


export default TestPage