import Navbar from '../../components/Navbar/Navbar.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState('');

  const { title, body } = recipe;

  useEffect(() => {
    if (router.query.recipeId) {
      (async () => {
        try {
          const getRecipe = await fetch(
            `/api/recipe?postId=${router.query.recipeId}`
          );
          const getRecipeJson = await getRecipe.json();
          console.log('JSON', getRecipeJson);
          setRecipe(getRecipeJson);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      })();
    }
  }, [router.query.recipeId]);

  return (
    <>
      <h1>{title}</h1>
      <p>{body}</p>
      <Navbar />
    </>
  );
}
