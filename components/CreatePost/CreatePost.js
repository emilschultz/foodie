import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/router';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'; 
import { db } from '../../lib/firebase'; 

import styles from './CreatePost.module.css';

const CreatePost = ({ user }) => {
  const [userDoc, setUserDoc] = useState(null)

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      post: '',
      updatedUser: '',
    },
  });

  // MAKE this a utility function
  useEffect(() => {
    const fetchUserDoc = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserDoc(userDocSnap.data());
          } else {
            console.error('No user document - user doenst exist!');
            // Optionally redirect to a sign-up page or error page
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };

    fetchUserDoc();
  }, [user, router]);

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

    // Create the post object with media URL if media was uploaded
    const post = {
      postedAt: Date.now(),
      media: media
        ? {
            type: media.type,
            lastModified: media.lastModified,
            lastModifiedDate: media.lastModifiedDate,
            name: media.name,
            size: media.size,
            url: mediaURL,
          }
        : null,
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
      postId: Math.random().toString(16).slice(2),
      user: {
        uid: user.uid,
        name: user.displayName || userDoc.firstname,
        nickname: userDoc.nickname || user.email,
        picture: user.photoURL || 'https://via.placeholder.com/150',
      },
    };

    try {
      // Save the post to Firestore
      const docRef = await addDoc(collection(db, 'recipes'), post);
      const userRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        postId: docRef.id
      })
      await updateDoc(userRef, {
        posts: arrayUnion(post),
        postId: docRef.id
      })
      console.log('Recipe created with ID:', docRef.id);
      reset();
      setInputDisabled(false);
      alert('Recipe successfully posted!');
      router.push('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create the recipe. Please try again.');
      setInputDisabled(false);
    }
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error during media upload:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMediaURL(downloadURL);
            setMedia(file);
          });
        }
      );
    } else {
      console.error('No file selected');
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
    setTags(tags.filter((_, i) => i !== index));
  };

  // SERVINGS FUNCTIONS
  const increase = () => setServings((servings) => servings + 1);

  const decrease = () => setServings((servings) => Math.max(servings - 1, 1));

  // INGREDIENTS FUNCTIONS
  const handleAddIngredient = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      e.preventDefault();
      const ingredientsInput = e.target.previousSibling.value || e.target.value;
      if (ingredientsInput.trim() !== '') {
        setIngredients([...ingredients, ingredientsInput.trim()]);
        e.target.previousSibling.value = '';
        e.target.value = '';
      }
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // STEPS FUNCTIONS
  const handleAddStep = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      e.preventDefault();
      const stepsInput = e.target.previousSibling.value || e.target.value;
      if (stepsInput.trim() !== '') {
        setSteps([...steps, stepsInput.trim()]);
        e.target.previousSibling.value = '';
        e.target.value = '';
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
        e.target.previousSibling.value = '';
        e.target.value = '';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPost)} className={styles.form}>
      {/* FILE */}
      <label htmlFor="media">File</label>
      <input
        id="media"
        {...register('media')}
        type="file"
        accept="media/*"
        onChange={handleFileChange}
      />

      {/* TITLE */}
      <label htmlFor="title">Title</label>
      <input
        id="title"
        {...register('title')}
        className={[styles.title, styles.input].join(' ')}
      />

      {/* DESCRIPTION */}
      <label htmlFor="description">Description</label>
      <textarea {...register('post')} id="description" />

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

      <label htmlFor="tags">Tags</label>
      <input id="tags" {...register('tags')} className={styles.tagInput} />
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
      <label htmlFor="preptime">Prep</label>
      <input
        {...register('preptime')}
        id="preptime"
        className={styles.input}
        placeholder="Preparation time in minutes"
        type="number"
        step={5}
      />

      <label htmlFor="cookingtime">Cook</label>
      <input
        {...register('cooktime')}
        id="cookingtime"
        className={styles.input}
        placeholder="Cooking time in minutes"
        type="number"
        step={5}
      />

      {/* DIFFICULTY */}
      <label htmlFor="difficulty">Difficulty</label>
      <select
        {...register('difficulty')}
        className={styles.input}
        id="difficulty"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
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

      <label htmlFor="ingredients">Ingredients</label>
      <input
        {...register('ingredients')}
        id="ingredients"
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

      <label htmlFor="steps">Steps</label>
      <textarea
        {...register('steps')}
        id="steps"
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

      <label htmlFor="tips">Tips</label>
      <textarea
        {...register('tips')}
        id="tips"
        className={styles.input}
        onKeyDown={handleAddTip}
      />
      <button onClick={handleAddTip}>Add</button>

      {/* SUBMIT FORM */}
      <button type="submit" disabled={inputDisabled} className={styles.submit}>
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
