import { useRouter } from 'next/router';
import styles from './RecipePost.module.css'; 

const RecipePost = ({ postId, postedAt, id, media, title, user }) => {
  const { name, nickname, uid, picture } = user || {};
  const router = useRouter();
  const isDiscoverPage = router.pathname === '/discover';

  const handleProfileClick = () => {
    if(uid) {
        router.push(`/chef/${uid}`)
    }
  }
 
  const handleRecipeClick = () => {
    if(id) {
        router.push(`/recipe/${id}`)
    }
  }

  return (
    <div key={postId || postedAt} className={styles.post}>

      {isDiscoverPage && <div className={styles.header} onClick={handleProfileClick}>
          <img
            src={picture || 'https://via.placeholder.com/150'}
            alt="User profile pitcure for"
            className={styles.picture}
          />
          @{nickname || name || 'name'}
        </div>
        }

        <div className={styles.content} onClick={handleRecipeClick}>
        {media &&
          (media.type === 'image/jpg' ||
            media.type === 'image/jpeg' ||
            media.type === 'image/png' ||
            media.type === 'image/avif') && (
            <img src={media.url} alt="Recipe" className={styles.image} />
          )}
        {title}
        </div>
    </div>
  );
};

export default RecipePost;
