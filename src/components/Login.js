// src/components/Login.js
import React from 'react';
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { provider } from '../firebase';

const Login = ({ user, setUser }) => {
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <span>Welcome, {user.displayName}</span>
          <button onClick={handleLogout} className="btn btn-secondary ms-2">Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="btn btn-primary">Login with Google</button>
      )}
    </div>
  );
};

export default Login;
