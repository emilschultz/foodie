import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
      router.push('/'); // Redirect to home page after successful sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    // If the user is already logged in, redirect to the home page
    router.push('/');
    return null;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
