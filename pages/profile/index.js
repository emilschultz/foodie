import Navbar from '../../components/Navbar/Navbar';
import Posts from '../../components/Posts/Posts';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUser = await fetch('/api/user');
        const getUserJson = await getUser.json();
        setUser(getUserJson);

        const getPosts = await fetch('/api/post');
        const getPostsJson = await getPosts.json();

        const filteredPosts = getPostsJson.filter(
          (post) => post.user.id === getUserJson.id
        );
        setUserPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>{user.nickname}</h1>
        <img src={user.picture} />
      </div>
      <Posts posts={userPosts} setPosts={setUserPosts} />
      <Navbar />
    </>
  );
};

export default Profile;
