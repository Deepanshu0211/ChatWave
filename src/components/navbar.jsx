import { signOut } from 'firebase/auth'
import { auth } from '../firebase';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">ChatWave</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default navbar
