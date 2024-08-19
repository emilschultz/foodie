import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../../lib/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signUp(email, password);
      router.push('/')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
    </>
  );
}
