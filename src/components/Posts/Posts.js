import Post from '../Post/Post.js';

const Posts = ({ posts, setPosts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setPosts={setPosts} />
        </div>
      ))}
    </>
  );
};

export default Posts;
