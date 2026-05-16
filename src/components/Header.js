import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
        })
        .catch((error) =>{
          navigate("/error");
        })
    };
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){

         const {uid, email, displayName, photoURL} = user;
         dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL: photoURL}));
         navigate("/browse");
        }else{
          dispatch(removeUser());
          navigate("/");
        }
      });
      return () => unsubscribe();
    }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img 
      className="w-44"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Netflix-Logo.png/1920px-Netflix-Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230726112108"
      alt="logo"/>

      {user &&(<div className="flex p-2">
        <img className="w-12 h-16 pt-6"
          alt="usericon"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"/>
          <button onClick={handleSignOut}className="font-bold text-white">(Sign Out)</button>
      </div>
  )}
    </div>
  )}
export default Header
