import Navbar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    (async () => {
      const getUser = await fetch('/api/user');
      const getUserJson = await getUser.json();
      setUser(getUserJson);
    })();
  }, []);

  console.log('USER:', user);

  return (
    <>
      <div>
        <h1>{user.nickname}</h1>
        <img src={user.picture} />
      </div>
      <Navbar />
    </>
  );
};

export default Profile;
