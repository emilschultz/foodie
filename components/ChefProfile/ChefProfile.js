import { useRouter } from 'next/router.js';
import RecipeList from '../RecipeList/RecipeList.js'
import styles from './ChefProfile.module.css'; 

export const ChefProfile = ({ posts, nickname, picture, followers }) => {
  const router = useRouter();
  const isProfilePage = router.pathname === '/profile'


  return (
    <>
      <section className={styles.bio}>
        <img src={picture || 'https://via.placeholder.com/150'} className={styles.picture} />
        <p>@{nickname}</p>
        <div className={styles.stats}>
          <p>Following {}</p>
          <p>Followers {followers ? followers.length : 0}</p>
          <p>Likes {}</p>
        </div>
        
        {!isProfilePage && <button className={styles.followBtn}>Follow</button>}

      </section>
      <section className={styles.grid}>
        <RecipeList recipes={posts} />
      </section>
    </>
  );
};

export default ChefProfile;
