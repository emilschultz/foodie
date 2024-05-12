import Navbar from '../../components/Navbar/Navbar.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ChefProfile from '../../components/chefProfile/ChefProfile.js';

export default function ChefPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (router.query.chefId) {
      (async () => {
        try {
          const getUser = await fetch(
            `/api/chef?chefId=${router.query.chefId}`
          );
          const getUserJson = await getUser.json();
          setUser(getUserJson);
        } catch (error) {
          console.error('Error fetching chef with ID:', error);
        }
      })();
    }
  }, [router.query.chefId]);

  const { document } = user || {};
  const { nickname, picture, posts, id, followers } = document || {};

  return (
    <>
      {user !== null && (
        <ChefProfile
          nickname={nickname}
          picture={picture}
          posts={posts}
          id={id}
          followers={followers}
        />
      )}

      <Navbar />
    </>
  );
}
