'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext.js';
import { AiOutlineArrowRight } from 'react-icons/ai';

import styles from './Post.module.css';
import Link from 'next/link.js';

const Post = ({ post, setPosts }) => {
  const { _id, body, user: foodieUser, likes, title, media } = post;
  console.log(media);
  const user = useUser();
  const [deleted, setDeleted] = useState(false);
  const [updatingLike, setUpdatingLike] = useState(false);
  const [likesState, setLikesState] = useState(likes);
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

  const likePost = async () => {
    setUpdatingLike(true);
    let action = likesState.includes(user.id) ? '$pull' : '$addToSet';

    await fetch('/api/post/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        userId: user.id,
        action,
      }),
    });

    setLikesState((likes) => {
      if (likesState.includes(user.id)) {
        return likes.filter((like) => like !== user.id);
      }
      return [...likes, user.id];
    });
    setUpdatingLike(false);
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
    setDeleted(true);
    alert('Your post has been DELETED  💀');
  };

  return (
    <>
      {!deleted && (
        <div className={styles.post}>
          <div className={styles.post_header}>
            <img
              src={foodieUser.picture}
              alt={foodieUser.name}
              className={styles.picture}
            />
            <div>
              <p>{foodieUser.nickname}</p>
            </div>
          </div>
          <h1>{title}</h1>
          <p>{body}</p>
          <div>
            <div>
              <p className={styles.likes}>
                {likesState ? likesState.length : 0}
                {` ${likesState.length === 1 ? 'person' : 'people'} liked this`}
              </p>
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
              <div className={styles.actions}>
                <div className={styles.buttons}>
                  {user.id === foodieUser.id && (
                    <>
                      <button className={styles.btn} onClick={() => editPost()}>
                        Edit
                      </button>
                      <button
                        className={styles.btn}
                        onClick={() => deletePost()}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button className={styles.btn} onClick={() => likePost()}>
                    Like
                  </button>
                  <button className={styles.btn} onClick={() => followUser()}>
                    Follow
                  </button>
                </div>
                <Link
                  href={`/recipe/${encodeURIComponent(post._id)}`}
                  className={styles.link}
                >
                  <AiOutlineArrowRight className={styles.link_icon} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
