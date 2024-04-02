import Post from '../Post/Post.js';
import Link from 'next/link';
import styles from './Posts.module.css';

const Posts = ({ posts, setPosts }) => {
  return (
    <>
      {posts.map((post) => (
        <li key={post._id} className={styles.container}>
          <Link post={post} href={`/recipe/${encodeURIComponent(post._id)}`}>
            <Post post={post} setPosts={setPosts} />
          </Link>
        </li>
      ))}
    </>
  );
};

export default Posts;
