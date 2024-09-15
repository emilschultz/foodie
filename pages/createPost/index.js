import CreatePost from '../../components/CreatePost/CreatePost.js';
import Navbar from '../../components/Navbar/Navbar.js';
import { useAuth } from '../../context/AuthContext.js';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router.js';

const Create = () => {
  const [userDoc, setUserDoc] = useState(null)
  const {user} = useAuth();
  const router = useRouter();

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

  return (
    <>
      <div>
        <h1>Create a New Post</h1>
        {userDoc ? (
          <CreatePost user={user} userDoc={userDoc} />
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <Navbar />
    </>
  );
};

export default Create;
