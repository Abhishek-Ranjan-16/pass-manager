import React from "react";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

const Authpage = () => {
  const { isAuth } = useGetUserInfo(); 
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/homepage");
  };

  if(isAuth){
    return <Navigate to='/homepage'></Navigate>
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="intro" style={{ padding: "60px", fontSize: "80px" }}>
        Welcome To Password Manager
      </div>
      <button
        className="signIn"
        style={{
          display: "block",
          color: "white",
          backgroundColor: "black",
          borderRadius: "10px",
          padding: "10px",
          fontSize: "60px",
        }}
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </button>
      <div
        className="outro"
        style={{ color: "darkblue", fontSize: "30px", padding: "20px" }}
      >
        Made By{" "}
        <a
          target="_blank"
          href="https://github.com/Abhishek-Ranjan-16"
          style={{ color: "blue", fontSize: "30px", fontWeight: "bolder" }}
        >
          Abhishek Ranjan
        </a>
      </div>
    </div>
  );
};

export default Authpage;
