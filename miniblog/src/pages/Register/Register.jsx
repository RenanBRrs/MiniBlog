import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      displayName,
      email,
      password,
    };
    if (password !== confirmPassword) {
      setError('Passwords need to be the same.');
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.register}>
      <h1>Register to post!</h1>
      <p>Create your user and share your stories</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input
            type='text'
            name='displayName'
            required
            placeholder='User Name'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type='email'
            name='email'
            required
            placeholder='User e-mail address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type='password'
            name='password'
            required
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirm Password:</span>
          <input
            type='password'
            name='confirmPassword'
            required
            placeholder='Confirm the Password'
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className='btn'>Register</button>}
        {loading && (
          <button className='btn' disabled>
            Wait...
          </button>
        )}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
