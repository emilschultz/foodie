'use client';
import CreatePost from '../../components/CreatePost/CreatePost.js';
import Navbar from '../../components/Navbar/Navbar.js';
import { useUser } from '../../context/UserContext.js';
import { useState } from 'react';

const Create = ({ setPosts }) => {
  const [newPost, setNewPost] = useState('');
  const user = useUser();
  return (
    <div>
      <h1>Create a New Post</h1>
      <CreatePost user={user} setPosts={setNewPost} />
      <Navbar setPosts={setPosts} />
    </div>
  );
};

export default Create;
