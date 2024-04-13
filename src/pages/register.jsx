import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"; // Corrected Stroage to Storage
import React, { useState } from 'react';
import add from "../img/addavatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom"; // Corrected import statement

const Register = () => {  
  const [err, setErr] = useState(false);
  const navigate = useNavigate(); // Corrected hook name

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target.querySelector('#file').files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, `${displayName}/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress if needed
        }, 
        (error) => {
          console.error(error);
          setErr(true);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(auth.currentUser, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid),{
              uid:res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
            navigate("/");
          });
        }
      );
     

    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };

  return (
    <div className='form-container'>
      <div className="formwrapper">
        <span className='logo'>CHATWAVE</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='display name'/>
          <input type='email' placeholder='email address' />
          <input type='password' placeholder='password' />
          <input style={{display:"none"}} type='file' id="file"/>
          <label htmlFor='file'>
            <img src={add} alt='' />
            <span>add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span> Something is wrong fuck off now</span>}
        </form>
        <p>Already have an account?<Link to="/login">Sign in.</Link></p> 
      </div>
    </div>
  );
}

export default Register;
