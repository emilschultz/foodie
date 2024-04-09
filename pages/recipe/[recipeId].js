import Navbar from '../../components/Navbar/Navbar.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState('');

  const {
    title,
    body,
    cookingtime,
    difficulty,
    ingredients,
    likes,
    media,
    postedAt,
    preptime,
    servings,
    steps,
    tags,
    tips,
    user,
    _id,
  } = recipe;

  useEffect(() => {
    if (router.query.recipeId) {
      (async () => {
        try {
          const getRecipe = await fetch(
            `/api/recipe?postId=${router.query.recipeId}`
          );
          const getRecipeJson = await getRecipe.json();
          console.log('Recipe Data', getRecipeJson);
          setRecipe(getRecipeJson);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      })();
    }
  }, [router.query.recipeId]);

  return (
    <>
      {recipe && (
        <>
          <article>
            <h1>{title}</h1>
            <div>
              <h5>By</h5>
              <Link href={'/'}>
                <img src={user.picture} width={25} />
                {user.nickname}
              </Link>
            </div>
            {tags && (
              <ul>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
            <img src={media.url} width={300} />
            <p>Total time {Number(preptime) + Number(cookingtime)} minutes</p>
            <p>Prep time {preptime} minutes</p>
            <p>Cooking time {cookingtime} minutes</p>
            <p>Difficulty {difficulty}</p>
            <p>Serves {servings} people</p>
            <p>{body}</p>
            {ingredients && (
              <>
                <h2>Ingredients</h2>
                <ul>
                  {ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </>
            )}
            {steps && (
              <>
                <h2>steps</h2>
                <ol>
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </>
            )}
            {tips && (
              <>
                <h2>tips</h2>
                <ol>
                  {tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ol>
              </>
            )}
          </article>
          <h2>Related recipes</h2>
        </>
      )}
      <Navbar />
    </>
  );
}
