import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {

           navigate("/");
        })
        .catch((error) =>{
          navigate("/error");
        })
    }
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
