'use client';

import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useSetUser } from '../context/UserContext.js';
import styles from './page.module.css';
// import CreatePost from '../components/CreatePost/CreatePost.js';
import Posts from '../components/Posts/Posts.js';
import Navbar from '../components/Navbar/Navbar.js';

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
    <section className={styles.main}>
      <div className={styles.description}>foodie</div>
      {/* <CreatePost setPosts={setPosts} /> */}
      <Posts posts={posts} setPosts={setPosts} />
      <Navbar setPosts={setPosts} />
    </section>
  );
}

export const getServerSideProps = withPageAuthRequired();
