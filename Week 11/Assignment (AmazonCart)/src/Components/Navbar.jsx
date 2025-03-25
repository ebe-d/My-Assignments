import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate=useNavigate();

  function Gotoo(){
    navigate('/Cart')
  }

  function Goto2(){
    navigate('/Wishlist')
  }

  function Goto3(){
    navigate('/')
  }
  
  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logoSection} onClick={Goto3}>
        <span style={styles.logo}>
          <span style={{ color: '#FF9900' }}>Ama</span>zonX
        </span>
      </div>

      {/* Greeting */}
      <div style={styles.greeting}>
        <span style={styles.greetText}>Hello, John</span>
      </div>

      {/* Icons */}
      <div style={styles.iconSection}>
        <div onClick={Goto2} style={styles.iconContainer}>
          <FaHeart size={20} color="white" />
          <span style={styles.iconLabel}>Wishlist</span>
        </div>

        <div onClick={Gotoo} style={styles.iconContainer}>
          <FaShoppingCart size={20} color="white" />
          <span style={styles.iconLabel}>Cart</span>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: '60px',
    backgroundColor: '#232F3E', // Dark blue/gray like Amazon
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
  },
  greeting: {
    display: 'flex',
    alignItems: 'center',
  },
  greetText: {
    fontSize: '16px',
  },
  iconSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconLabel: {
    fontSize: '12px',
    marginTop: '4px',
  },
};

export default Navbar;
