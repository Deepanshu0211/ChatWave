import React from 'react'
import Sidebar from '../components/sidebar'
import Chat from'../components/chat'
import '../styles.scss'


const home = () => {
  return (
    <div className="Home">
      <div className='container'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default home
