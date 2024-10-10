'use client'

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import modalStyles from '../../components/Modal/Modal.module.css'

const RecipeId = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [recipeData, setRecipeData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // state to toggle editing mode
  const [formData, setFormData] = useState({}); // state to hold form data for editing

  useEffect(() => {
    const fetchRecipeData = async () => {
      if (id) {
        try {
          const recipeDocRef = doc(db, "recipes", id);
          const recipeDoc = await getDoc(recipeDocRef);

          if (recipeDoc.exists()) {
            const data = recipeDoc.data();
            setRecipeData(data);
            setFormData(data); // initialize form data with recipe data
          }
        } catch (error) {
          console.error("Error fetching recipe data:", error);
        }
      }
    };
    fetchRecipeData();
  }, [id, router]);

  const { body, cookingtime, difficulty, ingredients, media, preptime, servings, steps, tags, tips, title, chef, postId } = formData || {};

  const handleEditToggle = () => {
    setIsEditing(true); 
  };

  const handleCloseModal = () => {
    setIsEditing(false); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleSave = async () => {
    if (user.uid === chef.uid) {
      try {
        const recipeRef = doc(db, "recipes", postId);
        await updateDoc(recipeRef, formData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating recipe:", error);
      }
    }
  };

  return (
    <>
      {recipeData !== null && (
        <>
          <article>
            <h1>{title}</h1>
            {user.uid === chef.uid && (
              <AiOutlineEdit onClick={handleEditToggle} />
            )}
            <div>
              <h5>By</h5>
              <Link href={"/"}>
                <img src={chef.picture} width={25} />
                {chef.nickname || "nickname"}
              </Link>
            </div>
            {tags && (
              <ul>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
            <img src={media?.url} width={300} />
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
                <h2>Steps</h2>
                <ol>
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </>
            )}
            {tips && (
              <>
                <h2>Tips</h2>
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

      {/* Modal */}
      <Modal show={isEditing} onClose={handleCloseModal}>
        <h2>Edit Recipe</h2>
        <form className={modalStyles.form}>
          <div className={modalStyles.div}>
            <label>Title</label>
            <input className={modalStyles.input} type="text" name="title" value={title} onChange={handleChange} />
          </div>
          <div>
            <label>Prep Time</label>
            <input className={modalStyles.input} type="number" name="preptime" value={preptime} onChange={handleChange} />
          </div>
          <div>
            <label>Cooking Time</label>
            <input className={modalStyles.input} type="number" name="cookingtime" value={cookingtime} onChange={handleChange} />
          </div>
          <div>
            <label>Difficulty</label>
            <input className={modalStyles.input} type="text" name="difficulty" value={difficulty} onChange={handleChange} />
          </div>
          <div>
            <label>Servings</label>
            <input className={modalStyles.input} type="number" name="servings" value={servings} onChange={handleChange} />
          </div>
          <div>
          <h3>Ingredients</h3>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <input className={modalStyles.input}
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayChange(index, e, "ingredients")}
              />
            ))
          ) : (
            <p>No ingredients yet.</p>
          )}
          <button type="button" onClick={() => setFormData(prev => ({
            ...prev,
            ingredients: [...(prev.ingredients || []), ''] // add an empty string to start a new ingredient
          }))}>
            Add Ingredient
          </button>
        </div>
                  <div>
                    <h3>Steps</h3>
                    {steps?.map((step, index) => (
                      <input className={modalStyles.input}
                        key={index}
                        type="text"
                        value={step}
                        onChange={(e) => handleArrayChange(index, e, "steps")}
                      />
                    ))}
          </div>
          <button type="button" onClick={handleSave}>Save Changes</button>
        </form>
      </Modal>
    </>
  );
};

export default RecipeId;
