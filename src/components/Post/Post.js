'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Post.module.css';

const Post = ({ post, setPosts }) => {
  const { _id, postedAt, body, user: foodieUser } = post;
  const [deleted, setDeleted] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      post: '',
    },
  });

  const editPost = () => {
    setValue('editPost', body);
    setModalOpened(true);
  };

  const onUpdatePost = async (value) => {
    setInputDisabled(true);
    const response = await fetch('/api/post', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        body: value.editPost,
      }),
    });

    const responseJson = await response.json();
    console.log(responseJson);

    setPosts((posts) =>
      posts.map((post) => {
        if (post._id === _id) {
          return {
            ...post,
            body: value.editPost,
          };
        }

        return post;
      })
    );

    reset();
    setInputDisabled(false);
    setModalOpened(false);
    alert('Your post has been updated');
  };

  const deletePost = async () => {
    const response = await fetch(`/api/post/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    setDeleted(true);
    alert('Your post has been DELETED  💀');
  };

  return (
    <>
      {!deleted && (
        <div className={styles.post}>
          <div>
            <img
              src={foodieUser.picture}
              alt={foodieUser.name}
              className={styles.picture}
            />
            <div>
              <p>{foodieUser.nickname}</p>
              <p>{new Date(postedAt).toLocaleString()}</p>
            </div>
          </div>
          <p>{body}</p>
          <div>
            <div>
              <p>0 people liked this</p>
              {modalOpened && (
                <form onSubmit={handleSubmit((value) => onUpdatePost(value))}>
                  <textarea
                    required
                    data-autofocus
                    placeholder='Edit your post.'
                    variant='filled'
                    {...register('editPost')}
                  />
                  <button type='submit' disabled={inputDisabled}>
                    Update
                  </button>
                  <button onClick={() => setModalOpened(false)}>Close</button>
                </form>
              )}
              <div>
                <button onClick={() => editPost()}>Edit</button>
                <button onClick={() => deletePost()}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
