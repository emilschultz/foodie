import styles from './ChefProfile.module.css';
import Link from 'next/link';

export const ChefProfile = ({ posts, nickname, picture, id }) => {
  return (
    <>
      <section className={styles.bio}>
        <img src={picture} className={styles.picture} />
        <p>@{nickname}</p>
        <div className={styles.stats}>
          <p>Following {}</p>
          <p>Followers {}</p>
          <p>Likes {}</p>
        </div>
      </section>
      <section className={styles.grid}>
        {posts.map(
          (post) => (
            console.log('post', post),
            (
              <div key={post._id} className={styles.post}>
                {post.media &&
                  (post.media.type === 'image/jpg' ||
                    post.media.type === 'image/jpeg' ||
                    post.media.type === 'image/png') && (
                    <img src={post.media.url} className={styles.image} />
                  )}

                {post.media &&
                  (post.media.type === 'video/quicktime' ||
                    post.media.type === 'video/mp4' ||
                    post.media.type === 'video/ogg') && (
                    <video autoPlay muted loop controls>
                      <source src={post.media.url} type={post.media.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
              </div>
            )
          )
        )}
      </section>
    </>
  );
};

export default ChefProfile;
