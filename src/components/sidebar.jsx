import React from 'react'
import Nav from './navbar'
import Search from  './search'
import Chats from './chats'
const sidebar = () => {
  return (
    <div className='sidebar'>
      <Nav/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default sidebar
