'use client';
import CreatePost from '../../components/CreatePost/CreatePost.js';
import Navbar from '../../components/Navbar/Navbar.js';
import { useUser } from '../../context/UserContext.js';
import { useState } from 'react';

const Create = ({ setPosts }) => {
  const [newPost, setNewPost] = useState('');
  const user = useUser();
  console.log("Create Post User", user);
  return (
    <>
      <div>
        <h1>Create a New Post</h1>
        <CreatePost user={user} setPosts={setNewPost} />
      </div>
      <Navbar setPosts={setPosts} />
    </>
  );
};

export default Create;
