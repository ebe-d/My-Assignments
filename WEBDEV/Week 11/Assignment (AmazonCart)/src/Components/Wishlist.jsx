import React from 'react';
import { FaThList, FaThLarge } from 'react-icons/fa';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { WishlistAtom } from '../Store/wishitemstate';
import { CartAtom } from '../Store/Cartitemstate';
import { useNavigate } from 'react-router-dom';


function Wishlist() {

    const [wishlistItems,setWishlistitems]=useRecoilState(WishlistAtom);
    const [cartItems,setCartItems]=useRecoilState(CartAtom);
    const navigate=useNavigate();

    const addToCart=(item)=>{
        if(!cartItems.some(cartItem=>cartItem.id===item.id)){
            setCartItems([...cartItems,item]);
        }
    };

    const goToCart=()=>{
        navigate('/Cart');
    }

    const IsInCart=(itemId)=>{
        return cartItems.some(Citem=>Citem.id===itemId);
    };


  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.heading}>Your Wish List</h2>
          <p style={styles.subtext}>Public</p>
        </div>
      </div>


      {/* Wishlist Items */}
      {wishlistItems.length===0?
      <div style={styles.itemsContainer}>
      <p>Empty</p>
      </div>:

      <div style={styles.itemsContainer}>
        {wishlistItems.map((item) => (
          <div key={item.id} style={styles.itemCard}>
            <img src={item.url} alt={item.name} style={styles.image} />
            <div style={styles.itemInfo}>
              <h3 style={styles.itemTitle}>{item.name}</h3>
              <p style={styles.price}>₹{item.price}</p>
              {!IsInCart(item.id)?(
                <button onClick={()=>addToCart(item)} style={styles.addButton}>Add to Cart</button>
              ):(
                <button onClick={goToCart} style={styles.addButton}>
                    Go to Cart
                </button>
              )
            }
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  subtext: {
    fontSize: '12px',
    color: '#888',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  iconBtn: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  search: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
  },
  filterBtn: {
    padding: '8px 12px',
    backgroundColor: '#FFD814',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  itemCard: {
    backgroundColor: '#fff',
    width: '250px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'contain',
    padding: '10px',
  },
  itemInfo: {
    padding: '15px',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '10px',
  },
  price: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '6px',
  },
  stockStatus: {
    color: 'green',
    fontSize: '12px',
    marginBottom: '10px',
  },
  addButton: {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#FFD814',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
};

export default Wishlist;
