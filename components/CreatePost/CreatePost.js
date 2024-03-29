import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './CreatePost.module.css';

const CreatePost = ({ user, setPosts }) => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      post: '',
    },
  });
  const [inputDisabled, setInputDisabled] = useState(false);
  const [tags, setTags] = useState([]);
  const [servings, setServings] = useState(1);
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const onSubmitPost = async (value) => {
    setInputDisabled(true);
    const post = {
      postedAt: Date.now(),
      title: value.title,
      body: value.post,
      tags: tags,
      servings: servings,
      preptime: value.preptime,
      cookingtime: value.cooktime,
      difficulty: value.difficulty,
      ingredients: ingredients,
      steps: steps,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    const response = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const responseJson = await response.json();

    setPosts((posts) => [
      ...posts,
      {
        _id: responseJson.insertedId,
        ...post,
      },
    ]);
    reset();
    setInputDisabled(false);
    alert('successfully postet a recipe');
    router.push('/');
  };

  // TAGS FUNCTIONS
  const handleAddTag = (e) => {
    e.preventDefault();
    const tagInput = e.target.previousSibling.value;
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      e.target.previousSibling.value = '';
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  // SERVINGS FUNCTIONS
  const increase = () => {
    setServings((servings) => servings + 1);
  };

  const decrease = () => {
    setServings((servings) => servings - 1);
  };

  // INGREDIENTS FUNCTIONS

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ingredientsInput = e.target.previousSibling.value;
    if (ingredientsInput.trim() !== '') {
      setIngredients([...ingredients, ingredientsInput.trim()]);
      e.target.previousSibling.value = '';
    }
  };

  // STEPS FUNCTIONS
  const handleAddStep = (e) => {
    e.preventDefault();
    const stepsInput = e.target.previousSibling.value;
    if (stepsInput.trim() !== '') {
      setSteps([...steps, stepsInput.trim()]);
      e.target.previousSibling.value = '';
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((el, i) => i !== index));
  };
  return (
    <form onSubmit={handleSubmit(onSubmitPost)} className={styles.form}>
      {/* FILE */}
      <label htmlFor='video'>File</label>
      <input type='file' accept='video/*' />

      {/* TITLE */}
      <label htmlFor='title'>Title</label>
      <input {...register('title')} className={[styles.title, styles.input]} />

      {/* DESCRIPTION */}
      <label htmlFor='description'>Description</label>
      <textarea {...register('post')} id='description' />

      {/* TAGS */}
      <div className={styles.inputContainer}>
        {tags.map((tag, index) => (
          <div className={styles.tag} key={index}>
            <span>{tag}</span>
            <span className={styles.close} onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>

      <label htmlFor='tags'>Tags</label>
      <input {...register('tags')} className={styles.tagInput} />
      <button onClick={handleAddTag}>Add</button>

      {/* SERVINGS */}
      <p>Servings</p>
      <div className={styles.servingsContainer}>
        <p>{servings}</p>
        <div className={styles.counterContainer}>
          <span className={styles.counter} onClick={increase}>
            +
          </span>
          <span className={styles.counter} onClick={decrease}>
            -
          </span>
        </div>
      </div>

      {/* PREP/COOK TIME */}
      <label htmlFor='preptime'>Prep</label>
      <input
        {...register('preptime')}
        id='preptime'
        className={styles.input}
        placeholder='Preperation time in minutes'
        type='number'
        step={5}
      />

      <label htmlFor='cookingtime'>Cook</label>
      <input
        {...register('cooktime')}
        id='cookingtime'
        className={styles.input}
        placeholder='Cooking time in minutes'
        type='number'
        step={5}
      />

      {/* DIFFICULTY */}
      <label htmlFor='difficulty'>Difficulty</label>
      <select
        {...register('difficulty')}
        className={styles.input}
        id='difficulty'
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
      >
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>

      {/* INGREDIENTS */}
      <div className={styles.inputContainer}>
        {ingredients.map((ingredient, index) => (
          <div className={styles.tag} key={index}>
            <span>{ingredient}</span>
            <span
              className={styles.close}
              onClick={() => removeIngredient(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>

      <label htmlFor='ingredients'>Ingredients</label>
      <input
        {...register('ingredients')}
        id='ingredients'
        className={styles.tagInput}
      />
      <button onClick={handleAddIngredient}>Add</button>

      {/* COOKING STEPS */}
      {steps.map((step, index) => (
        <div key={index}>
          <span>{step}</span>
        </div>
      ))}

      <label htmlFor='STEPS'>Steps</label>
      <textarea {...register('steps')} id='steps' className={styles.input} />
      <button onClick={handleAddStep}>Add</button>

      {/* SUBMIT FORM */}
      <button type='submit' disabled={inputDisabled} className={styles.submit}>
        Submit
      </button>
    </form>
  );
};
export default CreatePost;
