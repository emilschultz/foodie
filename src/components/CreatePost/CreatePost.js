import { useForm } from 'react-hook-form';
import { useState } from 'react';

const demoUser = {
  id: '6276d0c602ce122f7b8b11ec',
  name: 'Emil Schultz',
  nickname: 'Totti',
  picture: 'https://picsum.photos/id/237',
};

const CreatePost = ({ setPosts }) => {
  const user = demoUser;
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
      {
        _id: responseJson.insertedId,
        ...post,
      },
      ...posts,
    ]);
    reset();
    setInputDisabled(false);
    alert('successfully postet a post');
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
