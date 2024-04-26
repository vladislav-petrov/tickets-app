import styles from './Header.module.scss';

const Header = function() {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src="logo.png"
        alt="Plane flying across the planet"
      />
    </header>
  );
}

export default Header;
