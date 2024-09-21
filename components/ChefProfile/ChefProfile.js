import styles from './ChefProfile.module.css'; 

export const ChefProfile = ({ posts, nickname, picture, followers }) => {
  
  
  return (
    <>
      <section className={styles.bio}>
        <img src={picture} className={styles.picture} />
        <p>@{nickname}</p>
        <div className={styles.stats}>
          <p>Following {}</p>
          <p>Followers {followers ? followers.length : 0}</p>
          <p>Likes {}</p>
        </div>
        {/* <button onClick={follow}>Follow</button> */}
      </section>
      <section className={styles.grid}>
        {posts.map(
          (post) => (
            (
              <div key={post.postedAt} className={styles.post}>
                {post.media &&
                  (post.media.type === 'image/jpg' ||
                    post.media.type === 'image/jpeg' ||
                    post.media.type === 'image/png' ||
                    post.media.type === 'image/avif') && (
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
