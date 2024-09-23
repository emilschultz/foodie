import { useRouter } from 'next/router.js';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase.js';
import RecipeList from '../RecipeList/RecipeList.js';
import styles from './ChefProfile.module.css';

export const ChefProfile = ({ posts, nickname, picture, followers, id, following }) => {
  const router = useRouter();
  const isProfilePage = router.pathname === '/profile';
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (user) {
        try {
          const loggedInUserRef = doc(db, 'users', user.uid);
          const loggedInUser = await getDoc(loggedInUserRef);

          if (loggedInUser.exists()) {
            const loggedInUserData = loggedInUser.data();
            if (loggedInUserData.following && loggedInUserData.following.includes(id)) {
              setIsFollowing(true);
            }
          }
        } catch (error) {
          console.error('Error checking if user is following:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkIfFollowing();
  }, [user, id]);

  const handleFollowToggle = async () => {
    try {
      const loggedInUserRef = doc(db, 'users', user.uid);
      const chefUserRef = doc(db, 'users', id)

      if (isFollowing) {
        await updateDoc(loggedInUserRef, {
          following: arrayRemove(id),
        });
        await updateDoc(chefUserRef, {
          followers: arrayRemove(user.uid),
        })
        setIsFollowing(false);
      } else {
        await updateDoc(loggedInUserRef, {
          following: arrayUnion(id),
        });
        await updateDoc(chefUserRef, {
          followers: arrayUnion(user.uid)
        })
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <section className={styles.bio}>
        <img
          src={picture || 'https://via.placeholder.com/150'}
          className={styles.picture}
        />
        <p>@{nickname}</p>
        <div className={styles.stats}>
          <p>Following {following?.length || 0}</p>
          <p>Followers {followers?.length || 0}</p>
          <p>Likes {}</p>
        </div>

        {!isProfilePage && (
          <button
            className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </section>

      <section className={styles.grid}>
        <RecipeList recipes={posts} />
      </section>
    </>
  );
};

export default ChefProfile;
