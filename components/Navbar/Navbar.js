import Link from 'next/link';
import styles from './Navbar.module.css';
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineHome,
  AiOutlineUser,
} from 'react-icons/ai';

const Navbar = () => {
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
          <Link href='/profile'>
            <AiOutlineUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
