import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './CreatePost.module.css';

// import { useUser } from '../../context/UserContext.js';

const CreatePost = ({ user, setPosts }) => {
  // const user = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      post: '',
    },
  });
  const [inputDisabled, setInputDisabled] = useState(false);
  const [tags, setTags] = useState([]);
  console.log(tags);

  const onSubmitPost = async (value) => {
    setInputDisabled(true);
    const post = {
      postedAt: Date.now(),
      title: value.title,
      body: value.post,
      servings: value.servings,
      tags: tags,
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
      <button onClick={handleAddTag}>Add Tag</button>

      {/* SERVINGS */}
      <label htmlFor='servings'>Servings</label>
      <input
        className={[styles.servings, styles.input]}
        {...register('servings')}
        id='servings'
        placeholder='How many people does this recipe serve?'
        type='number'
        min={1}
        max={100}
      />

      <button type='submit' disabled={inputDisabled} className={styles.submit}>
        Submit
      </button>
    </form>
  );
};
export default CreatePost;
