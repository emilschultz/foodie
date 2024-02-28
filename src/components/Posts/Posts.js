import Post from '../Post/Post.js';
import styles from './Posts.module.css';

const Posts = ({ posts, setPosts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className={styles.container}>
          <Post post={post} setPosts={setPosts} />
        </div>
      ))}
    </>
  );
};

export default Posts;
