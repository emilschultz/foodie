'use client';
import { useState } from 'react';
import styles from './ChefProfile.module.css'; 

export const ChefProfile = ({ posts, nickname, picture, id, followers }) => {
  const [followState, setFollowState] = useState(followers)
  
  const follow = async () => {
    const response = await fetch('/api/user/follow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: ''
    })
    console.log(response);
  };
  
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
        <button onClick={follow}>Follow</button>
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
