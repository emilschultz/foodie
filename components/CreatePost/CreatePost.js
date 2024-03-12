import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

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

  const onSubmitPost = async (value) => {
    setInputDisabled(true);
    const post = {
      postedAt: Date.now(),
      body: value.post,
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
    alert('successfully postet a post');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPost)}>
      <input {...register('post')} />{' '}
      <button type='submit' disabled={inputDisabled}>
        Submit
      </button>
    </form>
  );
};
export default CreatePost;
