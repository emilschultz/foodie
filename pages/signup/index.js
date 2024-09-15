import styles from './page.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../../lib/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const additionalData = {
        nickname: nickname,
        firstname: firstname,
        lastname: lastname,
      };
      // Sign up the user with email and password, and store additional data in Firestore
      await signUp(email, password, additionalData);
      router.push('/'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className={styles.container}>
      <h1>Sign Up</h1>
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
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First name"
          required
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}
