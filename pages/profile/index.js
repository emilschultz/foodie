import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { logOut } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
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
          <section className={styles.bio}>
            {/* {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" />} */}
            <img className={styles.picture} src='https://picsum.photos/100'/>
            <div className={styles.names}>
            <p className={styles.name}>{userData.firstname} {userData.lastname}</p>
            <p className={styles.nickname}>@{userData.nickname}</p>
            </div>
            <div className={styles.statscontainer}>
              <div className={styles.stats}>
                <p className={styles.statNumber} >{userData.followers ? userData.followers.length : 2883}</p>
                <p className={styles.statTitle}>Followers</p> 
              </div>
              
              <div className={styles.stats}>
              <p className={styles.statNumber}>{userData.following.length > 0 ? userData.following.length : 354}</p>
              <p className={styles.statTitle}>Following</p>
              </div>

              <div className={styles.stats}>
              <p className={styles.statNumber}>{userData.posts.length > 0 ? userData.posts.length : 172}</p>
              <p className={styles.statTitle}>Recipes</p>
              </div>

            </div>
            {/* Follow knappen skal egentlig ikke være her, men på chefProfile. Dette er jo ens egen profilside */}
            <button className={styles.followBtn}>Follow</button>
          </section>

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
