import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './RecipePost.module.css'; 

const RecipePost = ({ postId, postedAt, media, title, chef }) => { 
  const { name, nickname, uid, picture } = chef || {};
  const router = useRouter();
  const isDiscoverPage = router.pathname === '/discover';

  const handleProfileClick = () => {
    if(uid) {
        router.push(`/chef/${uid}`)
    }
  }
 
  const handleRecipeClick = () => {
    console.log("Recipe clicked, id: ", postId); 

    if(postId) {
        router.push(`/recipe/${postId}`)
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
            <Image src={media ? media.url : 'https://via.placeholder.com/550'} alt="Recipe post" width={500} height={500} className={styles.image} priority={false} />
          )
        }
        {title}
        </div>
    </div>
  );
};

export default RecipePost;
