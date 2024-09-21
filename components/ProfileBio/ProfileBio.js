import styles from './ProfileBio.module.css';

const ProfileBio = ({userData}) => {
    console.log("ProfileBio data:", userData);
    return (
        <section className={styles.bio}>
            {userData.profilePicture && <img src={userData.profilePicture} alt="Profile" />}
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

          </section>
    )
}
export default ProfileBio;