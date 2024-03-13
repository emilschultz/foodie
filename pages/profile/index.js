import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';
import ProfilePosts from '../../components/profilePosts/ProfilePosts';
import { AiOutlineLogout } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

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
      <Link href='/api/auth/logout' className={styles.signout}>
        Sign out
        <AiOutlineLogout />
      </Link>
      {userPosts.length > 0 ? (
        <ProfilePosts posts={userPosts} setPosts={setUserPosts} />
      ) : (
        <p> You have </p>
      )}
      <Navbar />
    </>
  );
};

export default Profile;
