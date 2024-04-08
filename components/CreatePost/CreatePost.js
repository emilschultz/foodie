import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import styles from './CreatePost.module.css';

const CreatePost = ({ user, setPosts }) => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      post: '',
      updatedUser: '',
    },
  });

  const [inputDisabled, setInputDisabled] = useState(false);
  const [tags, setTags] = useState([]);
  const [servings, setServings] = useState(1);
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [tips, setTips] = useState([]);
  const [mediaURL, setMediaURL] = useState();
  const [media, setMedia] = useState();

  const onSubmitPost = async (value) => {
    setInputDisabled(true);
    const post = {
      postedAt: Date.now(),
      media: {
        type: media.type,
        lastModified: media.lastModified,
        lastModifiedDate: media.lastModifiedDate,
        name: media.name,
        size: media.size,
        url: mediaURL,
      },
      title: value.title,
      body: value.post,
      tags: tags,
      servings: servings,
      preptime: value.preptime,
      cookingtime: value.cooktime,
      difficulty: value.difficulty,
      ingredients: ingredients,
      steps: steps,
      tips: tips,
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

    const updatedUser = {
      _id: user._id,
      posts: user.posts ? [...user.posts, post] : [post],
    };

    const userPostsResponse = await fetch('/api/user/userPosts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const userResponseJson = await userPostsResponse.json();

    reset();
    setInputDisabled(false);
    alert('successfully postet a recipe');
    router.push('/');
  };

  // MEDIA FUNCTIONS
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            case 'success':
              console.log('Upload complete');
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setMediaURL(downloadURL);
            })
            .then(setMedia(file));
        }
      );
    } else {
      console.error('no file selected');
    }
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
    if (e.type === 'click' || e.key === 'Enter') {
      e.preventDefault();
      const ingredientsInput = e.target.previousSibling.value || e.target.value;
      if (ingredientsInput.trim() !== '') {
        setIngredients([...ingredients, ingredientsInput.trim()]);
        if (e.type === 'click') {
          e.target.previousSibling.value = '';
        } else {
          e.target.value = '';
        }
      }
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((el, i) => i !== index));
  };

  // STEPS FUNCTIONS
  const handleAddStep = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      e.preventDefault();
      const stepsInput = e.target.previousSibling.value || e.target.value;
      if (stepsInput.trim() !== '') {
        setSteps([...steps, stepsInput.trim()]);
        if (e.type === 'click') {
          e.target.previousSibling.value = '';
        } else {
          e.target.value = '';
        }
      }
    }
  };

  // TIPS FUNCTIONS
  const handleAddTip = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      e.preventDefault();
      const tipsInput = e.target.previousSibling.value || e.target.value;
      if (tipsInput.trim() !== '') {
        setTips([...tips, tipsInput.trim()]);
        if (e.type === 'click') {
          e.target.previousSibling.value = '';
        } else {
          e.target.value = '';
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPost)} className={styles.form}>
      {/* FILE */}
      <label htmlFor='media'>File</label>
      <input
        id='media'
        {...register('media')}
        type='file'
        accept='media/*'
        onChange={handleFileChange}
      />

      {/* TITLE */}
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        {...register('title')}
        className={[styles.title, styles.input]}
      />

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
      <input id='tags' {...register('tags')} className={styles.tagInput} />
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
        onKeyDown={handleAddIngredient}
      />
      <button onClick={handleAddIngredient}>Add</button>

      {/* COOKING STEPS */}
      {steps.map((step, index) => (
        <div key={index}>
          <span>{step}</span>
        </div>
      ))}

      <label htmlFor='steps'>Steps</label>
      <textarea
        {...register('steps')}
        id='steps'
        className={styles.input}
        onKeyDown={handleAddStep}
      />
      <button onClick={handleAddStep}>Add</button>

      {/* TIPS */}
      {tips.map((tip, index) => (
        <div key={index}>
          <span>{tip}</span>
        </div>
      ))}

      <label htmlFor='tips'>Tips</label>
      <textarea
        {...register('tips')}
        id='tips'
        className={styles.input}
        onKeyDown={handleAddTip}
      />
      <button onClick={handleAddTip}>Add</button>

      {/* SUBMIT FORM */}
      <button type='submit' disabled={inputDisabled} className={styles.submit}>
        Submit
      </button>
    </form>
  );
};
export default CreatePost;
