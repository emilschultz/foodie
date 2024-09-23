import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { logOut } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ChefProfile from '../../components/ChefProfile/ChefProfile';
import styles from './page.module.css';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          if (!user.uid) {
            throw new Error('User UID is not defined');
          }
          
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // router.push('/signin');
      }
    };

    fetchUserData();
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const {nickname, profilePicture, posts, followers, following} = userData || {}

  return (
    <>
      {userData ? (
          <ChefProfile  nickname={nickname}
          profilePicture={profilePicture}
          posts={posts} 
          id={user.uid}
          followers={followers}
          following={following}
          />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleSignOut} className={styles.signout}>
        Sign out
        <AiOutlineLogout />
      </button>
      <Navbar />
    </>
  );
};

export default Profile;
