import Navbar from '../../components/Navbar/Navbar.js';
// import ProfilePosts from '../../components/ProfilePosts/ProfilePosts.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function ChefPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (router.query.chefId) {
      (async () => {
        try {
          // Fetch post data
          const getIdFromPost = await fetch(
            `/api/chef?chefId=${router.query.chefId}`
          );
          const postData = await getIdFromPost.json();
          // setChef(postData);
          console.log('post data:', postData);

          // Fetch user data
          const getUser = await fetch(`/api/user?chefId=${postData.user.id}`);
          const userData = await getUser.json();
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }
  }, [router.query.chefId]);

  return (
    <>
      {userData && (
        <div>
          <h1>User Profile</h1>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Other User Data...</p>
        </div>
      )}
      {/* <ProfilePosts posts={} setPosts={} /> */}

      <Navbar />
    </>
  );
}
