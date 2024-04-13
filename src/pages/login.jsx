import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth"; // Import getAuth
import { useNavigate, Link } from 'react-router-dom';

const auth = getAuth(); // Initialize the auth object

const register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
   
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")

    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };

  return (
    <div className='form-container'>
        <div className="formwrapper">
          <span className='logo'>CHATWAVE</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
              <input type='email' placeholder='email address' />
              <input type='password' placeholder='password' />
              <button>Sign In</button>
              {err && <span> AYEE YOUR PASSWORD IZ WRONG</span>}
            </form>
            <p>Don't have an account?<Link to="/register"> Sign up now!</Link></p> 
        </div>
    </div>
  )
}

export default register;
