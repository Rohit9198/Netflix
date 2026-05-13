import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate the form data

        // console.log(email.current.value);
        // console.log(password.current.value);

        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if(message) return;

        //Sign In Sign Up Logic
        if(!isSignInForm){
            //Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) =>{
                //Signed In
                const user = userCredential.user;
                updateProfile(user, {
                    displayName:"name.current.value",
                    photoURL:"https://images.unsplash.com/flagged/photo-1591475791029-f9efe6297456?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9sYXIlMjBiZWFyfGVufDB8fDB8fHww"

                }).then(() => {
                    navigate("/browse")
                }).catch((error) => {
                    // An error occurred
                    // ...
                })
                console.log(user);
                navigate("/browse")
            })
            .catch((error) =>{
                const errorCode = error.code;
                const errorMessage = error.Message;
                setErrorMessage(errorCode + "-" + errorMessage);
            })

        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/browse")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            })

        }
    }
    const toggleSignInForm = () => {
      setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d4ebd098-d7d7-40ec-9565-f43c2e25a140/web/IN-en-20260504-TRIFECTA-perspective_b86d8ae6-1919-488e-b078-01e21325cf65_medium.jpg"
          alt="logo"
        />
      </div>
      <form 
      onSubmit={(e) => e.preventDefault()}
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && <input
         type="text"
         placeholder="Full Name"
         className="p-4 my-4 w-full bg-gray-700"
         />}

        <input
         ref={email}
         type="text"
         placeholder="Email Address"
         className="p-4 my-4 w-full bg-gray-700"
         />

        <input 
        ref={password}
        type="password" 
        placeholder="Password" 
        className="p-4 my-4 w-full bg-gray-700"
        />
        
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg " onClick={handleButtonClick}>
             {isSignInForm ? "Sign In" : "Sign Up"} </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}</p>
      </form>
    </div>
  );
};

export default Login;
