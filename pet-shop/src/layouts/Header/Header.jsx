import { Link, NavLink } from 'react-router-dom'

import styles from './Header.module.css'

import Logo from '../../assets/icons/logo.svg'
import IconCart from '../../assets/icons/iconCart.svg'
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items) || [];

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className="globalContainer">
        <div className={styles.headerContent}>
          <Link to='/'>
            <img src={Logo} alt="Logo" />
          </Link>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.navLink}>Main Page</NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={({ isActive }) => isActive ? styles.active : styles.navLink}>Categories</NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : styles.navLink}>All products</NavLink>
              </li>
              <li>
                <NavLink to="/sale" className={({ isActive }) => isActive ? styles.active : styles.navLink}>All sales</NavLink>
              </li>
            </ul>
          </nav>
          <Link to="/cart" className={styles.cartLink}>
            <img src={IconCart} alt="IconCart" />
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}