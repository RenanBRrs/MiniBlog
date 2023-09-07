import { db } from '../firebase/config.jsx';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.error(typeof error.message);
      console.error(error.message);

      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage = 'This password must have more than 6 characters.';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail already exists';
      } else {
        systemErrorMessage = 'Error: Try again later.';
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // Logout - Sign out
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // Login - Sign in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'User not found';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Password incorrect';
      } else {
        systemErrorMessage = error.message;
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
