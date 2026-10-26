import { NavLink } from 'react-router-dom';
import styles from './TopNav.module.css';

export default function TopNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.title}>AWS Services Explorer</span>
      </div>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.linkActive}` : styles.link)}
        end
      >
        Service Directory
      </NavLink>
      <NavLink
        to="/architecture"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.linkActive}` : styles.link)}
      >
        Architecture Demos
      </NavLink>
    </nav>
  );
}
