import styles from './RecipePost.module.css'; 

const RecipePost = ({ id, media, title, user }) => {
  const { name, nickname, picture } = user || {};

  return (
    <div key={id} className={styles.post}>
      <div className={styles.header}>
        <img
          src={picture || 'https://via.placeholder.com/150'}
          alt="User profile pitcure for"
          className={styles.picture}
        />
        @{nickname || name || 'name'}
      </div>
      {media &&
        (media.type === 'image/jpg' ||
          media.type === 'image/jpeg' ||
          media.type === 'image/png' ||
          media.type === 'image/avif') && (
          <img src={media.url} alt="Recipe" className={styles.image} />
        )}
      {title}
    </div>
  );
};

export default RecipePost;
