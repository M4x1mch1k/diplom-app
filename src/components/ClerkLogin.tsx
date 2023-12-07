import React, { useState } from 'react';

const validClerkCredentials = [
  { email: "admin", password: "admin" },
  { email: "clerk2@example.com", password: "clerkpassword2" },
];

const ClerkLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    const credentialMatch = validClerkCredentials.some(cred => cred.email === email && cred.password === password);
    if (!credentialMatch) {
      setError("Invalid credentials");
      return;
    }

    setError('');
    // Proceed with the login process
  };

  return (
    <div>
      <h1>Clerk Portal</h1>
      <header>Login</header>
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
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default ClerkLogin;
