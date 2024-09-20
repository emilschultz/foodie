import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";

const RecipeId = () => {
const router = useRouter();
const { id } = router.query;
const [recipeData, setRecipeData] = useState(null);

useEffect(() => {
  const fetchRecipeData = async () => {
    if(id) {
      try {
        if(!id) {
          throw new Error('Recipe with this ID is not defined');
        }

        const recipeDocRef = doc(db, 'recipes', id);
        const recipeDoc = await getDoc(recipeDocRef);

        if(recipeDoc.exists()) {
          setRecipeData(recipeDoc.data());
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    }
  };
  fetchRecipeData();
},[id, router]);

const {body, cookingtime, difficulty, ingredients, likes, media, preptime, servings, steps, tags, tips, title, user } = recipeData || {}

return (
  <>
      {recipeData !== null && (
        <>
          <article>
            <h1>{title}</h1>
            <div>
              <h5>By</h5>
              <Link href={'/'}>
                <img src={user.picture || ''} width={25} />
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
)
}

export default RecipeId;