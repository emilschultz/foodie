'use client';
import { useState } from 'react';

const Post = ({ post, setPosts }) => {
  const { _id, postedAt, body, user: foodieUser } = post;
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      {!deleted && (
        <>
          <div>
            <div>
              <img src={foodieUser.picture} alt={foodieUser.name} />
              <div>
                <p>{foodieUser.nickname}</p>
                <p>{new Date(postedAt).toLocaleString()}</p>
              </div>
            </div>
            <p>{body}</p>
            <div>
              <div>
                <p>0 people liked this</p>
                <div>
                  <button onClick={() => editFlutter()}>Edit</button>
                  <button onClick={() => deleteFlutter()}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
