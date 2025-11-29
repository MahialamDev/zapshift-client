import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
// Google Provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Login user with email
    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Login user With Google
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider )
    }

    // Create User with Email and Password
    const registerUserWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // Update user
    const updateUserProfile = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile);
    }


    // LogOut User
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    // Unsubscribe
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });

        return () => {
            unSubscribe();
        }
        
    },[])


    const authInfo = {
        user,
        loading,
        setLoading,
        error,
        setError,
        loginWithEmail,
        loginWithGoogle,
        registerUserWithEmail,
        logoutUser,
        updateUserProfile
    }


    
    return (
        <AuthContext value={authInfo}>
            {children}
       </AuthContext>
    );
};

export default AuthProvider;