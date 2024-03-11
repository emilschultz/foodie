'use client';

import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useSetUser } from '../context/UserContext.js';
// import { UserProvider } from '@auth0/nextjs-auth0/client';
// import { UserProvider as AtlasUserProvider } from '../context/UserContext.js';
import styles from './page.module.css';
import CreatePost from '../components/CreatePost/CreatePost.js';
import Posts from '../components/Posts/Posts.js';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const setUser = useSetUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch('/api/user');
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      const getPosts = await fetch('/api/post');
      const getPostssJson = await getPosts.json();
      setPosts(getPostssJson);

      setIsLoading(false);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>foodie</div>
      <CreatePost setPosts={setPosts} />
      <Posts posts={posts} setPosts={setPosts} />
    </main>
  );
}

export const getServerSideProps = withPageAuthRequired();
