// 'use client';

// import { useState } from 'react';
// import { useSetUser } from '../context/UserContext.js';
// import styles from './page.module.css';
// import Posts from '../components/Posts/Posts.js';
// import Navbar from '../components/Navbar/Navbar.js';

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const setUser = useSetUser();

//   return (
//     <section className={styles.main}>
//       <div className={styles.description}>foodie</div>
//       <Posts posts={posts} setPosts={setPosts} />
//       <Navbar setPosts={setPosts} />
//     </section>
//   );
// }
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; 
import { logOut } from '../lib/auth';

export default function Home() {
  const { user } = useAuth();  // Access the current user from the context
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to the sign-in page
      router.replace('/signin');
    }
  }, [user, router]);

  if (!user) {
    // Optionally, you can return null or a loading state until the redirect happens
    return null;
  }

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/signin'); // Redirect to sign-in page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <>
          <p>Signed in as: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  );
}
