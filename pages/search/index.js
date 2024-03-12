import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Search = ({ setPosts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  const openSearch = () => {
    setModalOpened(true);
  };

  const handleSearch = async (e) => {
    const term = e.currentTarget.value;
    setSearchTerm(e.currentTarget.value);

    if (term.length > 2 || term.length === 0) {
      const getUsers = await fetch(`/api/user/${term}`);
      const getUsersJson = await getUsers.json();
      console.log('JSON:', getUsersJson);
      setPosts(getUsersJson);
    }
  };
  return (
    <>
      search
      <Navbar />
    </>
  );
};

export default Search;
