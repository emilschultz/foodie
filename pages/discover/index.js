import { db } from '../../lib/firebase'
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import styles from './page.module.css'

const Discover = () => {
  const [recipeDocs, setRecipeDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    // OBS: If your collection contains a large number of documents, retrieving all of them at once might be inefficient. Consider using pagination or filtering to retrieve data in smaller chunks.
    // Refactor in future
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
    
        const allRecipePosts = querySnapshot.docs.map(recipe => ({
          id: recipe.id,
          ...recipe.data(),
        }));
        setRecipeDocs(allRecipePosts);
      } catch (error) {
              console.error('Error fetching data fom recipe collection:', error);
        } finally {
          setLoading(false)
        }
    };
    fetchRecipes();
},[]);

if (loading) return <p>Loading...</p>;

const recipePost = 
  recipeDocs.map(recipe => {
    const {id, media, title, user} = recipe;
    const {name, nickname, picture} = user || {};
    return (
      <div key={id} className={styles.post}>
        <div className={styles.header}>
          {<img src={picture || 'https://via.placeholder.com/150'} className={styles.picture} />}
          @{nickname || 'name'}
        </div>
        {media &&
          (media.type === 'image/jpg' ||
            media.type === 'image/jpeg' ||
            media.type === 'image/png' ||
            media.type === 'image/avif') && (
            <img src={media.url} className={styles.image} />
          )}
        {title}
      </div>
    )
  })

  return (
    <>
      <h1>Discover</h1>
      <section className={styles.grid}>
      {recipePost}
      </section>
      <Navbar />
    </>
  );
};

export default Discover;
