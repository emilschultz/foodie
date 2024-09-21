import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { logOut } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import Link from 'next/link';
import styles from './page.module.css';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Ensure user.uid is valid
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

  return (
    <>
      {userData ? (
        <>
          <ProfileBio userData={userData} />
          <section className={styles.grid}>
            <Link href={'/'}>
            {userData.posts.map((recipe) => (
              // the Math.random is only while docs don't have a unique id. Refactor some day.
              <div key={recipe.postId ||  Math.random().toString(16).slice(2)} className={styles.post}>
                {recipe.media &&
                (recipe.media.type === 'image/jpg' ||
                  recipe.media.type === 'image/jpeg' ||
                  recipe.media.type === 'image/png' ||
                  recipe.media.type === 'image/avif') && (
                  <img src={recipe.media.url} className={styles.image} />
                )}
                {recipe.title}
              </div>
            ))}
            </Link>
          </section>
        </>

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
