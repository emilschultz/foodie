import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './RecipePost.module.css'; 

const RecipePost = ({ postId, postedAt, id, media, title, chef }) => { // this should only be "chef" in the future. Keeping it like this while testing. Alternatively, delete docs with a user object. User will be written as chef henceforth.
  const { name, nickname, uid, picture } = chef || {};
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
    <div className={styles.post}>

      {isDiscoverPage && <div className={styles.header} onClick={handleProfileClick}>
          <Image
            src={picture || 'https://via.placeholder.com/150'}
            alt="User profile pitcure for"
            className={styles.picture}
            width={35}
            height={35}
            priority={false}
          />
          @{nickname || name || 'name'}
        </div>
        }

        <div className={styles.content} onClick={handleRecipeClick}>
        {media &&
          (media.type === 'image/jpg' ||
            media.type === 'image/jpeg' ||
            media.type === 'image/png' ||
            media.type === 'image/avif' ||
            media.type === 'image/heic') && (
            <Image src={media.url} alt="Recipe post" width={500} height={500} className={styles.image} priority={false} />
          )}
        {title}
        </div>
    </div>
  );
};

export default RecipePost;
