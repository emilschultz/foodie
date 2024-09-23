import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Navbar from "../../components/Navbar/Navbar";
import ChefProfile from "../../components/ChefProfile/ChefProfile";

const Chef = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [chefData, setChefData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        try {
          // Ensure uid is valid
          if (!uid) {
            throw new Error('User UID is not defined');
          }
          
          const userDocRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setChefData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // router.push('/signin');
      }
    };
    fetchUserData();
  }, [uid, router]);


  const {nickname, profilePicture, posts, followers, following} = chefData || {}
  
  return (
    <>
      {chefData !== null && (
        <ChefProfile
          nickname={nickname}
          profilePicture={profilePicture}
          posts={posts}
          id={uid}
          followers={followers}
          following={following}
        />
      )}
      <Navbar />
    </>
  )
};
export default Chef