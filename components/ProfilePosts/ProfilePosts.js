import Post from '../Post/Post.js';
import styles from './ProfilePosts.module.css';

const ProfilePosts = ({ posts, setPosts }) => {
  return (
    <section className={styles.grid}>
      {posts.map((post) => (
        <div key={post._id} className={styles.post}>
          <Post post={post} setPosts={setPosts} />
        </div>
      ))}
    </section>
  );
};

export default ProfilePosts;
