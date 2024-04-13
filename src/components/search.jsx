import React, { useContext, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    if (!username) return; // Prevent searching if input is empty

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      const matchingUsers = [];
      querySnapshot.forEach((doc) => {
        matchingUsers.push(doc.data());
      });
      if (matchingUsers.length > 0) {
        setUser(matchingUsers[0]); // Assuming you want to show the first matching user
        setErr(false); // Reset error state if user is found
      } else {
        setUser(null); // Clear user state if no matching user is found
        setErr(true); // Set error state to indicate user not found
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (!user) return; // Ensure user is selected

    const combineID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineID), { messages: [] });

        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combineID]: {
            userInfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            date: serverTimestamp()
          }
        });
      }
      await updateDoc(doc(db, "usersChats", user.uid), {
        [combineID]: {
          userInfo: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          date: serverTimestamp()
        }
      });
    } catch (err) {
      console.error("Error creating chat:", err);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          placeholder="Find the user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
