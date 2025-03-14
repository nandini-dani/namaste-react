import { useContext, useEffect, useState } from 'react';
import { logoUrl } from '../utils/constants';
import { Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { UseSelector, useSelector } from 'react-redux';
const Header = () => {
  const [loginLogoutBtn, setLoginLogoutBtn] = useState('Login');
  const onlineStatus = useOnlineStatus();
  const data = useContext(UserContext);
  //subscribing to the store
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    console.log('useEffect');
  });
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logoUrl}></img>
      </div>
      <ul className="nav-bar">
        <li className="nav-item">Status: {onlineStatus ? '✅' : '🔴'}</li>
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Contanc Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/grocery">Grocery</Link>
        </li>
        <li className="nav-item">
          <Link to="/">Cart - ({cartItems.length} items)</Link>
        </li>
        <li className="nav-item">{data.loggedInUser}</li>
        <button
          className="login-btn"
          onClick={() => {
            loginLogoutBtn === 'Login'
              ? setLoginLogoutBtn('Logout')
              : setLoginLogoutBtn('Login');
          }}
        >
          {loginLogoutBtn}
        </button>
      </ul>
    </div>
  );
};
export default Header;
