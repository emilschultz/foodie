import { db } from '../../lib/firebase'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../../components/Navbar/Navbar';
import RecipeList from '../../components/RecipeList/RecipeList';
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

  return (
    <>
      <h1>Discover</h1>
      <section className={styles.grid}>
        <RecipeList recipes={recipeDocs} />
      </section>
      <Navbar />
    </>
  );
};

export default Discover;
