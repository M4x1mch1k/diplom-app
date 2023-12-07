import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicantContext } from '../context/ApplicantContext';
import './Login.css';

const SignUpComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { addCredentials } = useApplicantContext();
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUppercase && hasSpecialChar;
  };
  

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long and contain at least 1 uppercase letter and 1 special symbol");
      return;
    }

    setError('');

    addCredentials({ email, password });
    navigate('/ApplicantLogin');
  };

  return (
    <div className='login'>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className='error-message'>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpComponent;
