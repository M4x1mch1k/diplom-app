import React, { useState } from 'react';
import { useApplicantContext } from '../context/ApplicantContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ApplicantLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { credentials } = useApplicantContext();
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    const credentialMatch = credentials.some(cred => cred.email === email && cred.password === password);
    if (!credentialMatch) {
      setError("Invalid credentials");
      return;
    }

    setError('');
    navigate('/HomeScreen');
  };

  return (
    <div className='login'>
      <h1>Applicant Portal</h1>
      <h3>Login</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
        {error && <p className='error-message'>{error}</p>} 
      <a href="/SignUp">Sign up</a>
    </div>
  );
}

export default ApplicantLogin;
