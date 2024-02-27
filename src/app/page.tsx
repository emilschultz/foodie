'use client';

import styles from './page.module.css';
import CreatePost from '../components/CreatePost/CreatePost.js';
import Posts from '../components/Posts/Posts.js';
import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
