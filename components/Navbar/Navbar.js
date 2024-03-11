import Link from 'next/link';
import styles from './Navbar.module.css';
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineHome,
  AiOutlineUser,
} from 'react-icons/ai';
import { useState } from 'react';

const Navbar = ({ setPosts }) => {
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
    <nav className={styles.navbar}>
      <ul className={styles.ul}>
        <li>
          <Link href='/'>
            <AiOutlineHome />
          </Link>
        </li>
        <li>
          <Link href='search'>
            <AiOutlineSearch />
          </Link>
        </li>
        <li>
          <Link href='createPost'>
            <AiOutlinePlus />
          </Link>
        </li>
        <li>
          <Link href='/proile'>
            <AiOutlineUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
