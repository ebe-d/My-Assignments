import { useRecoilState } from "recoil";
import { CartAtom } from "../Store/Cartitemstate";

function QuantityCounter({id}){
  const [CartItems,setCartItems]=useRecoilState(CartAtom);

  const ItemIndex=CartItems.findIndex(item=>item.id===id);
  const item= CartItems[ItemIndex];

  const decrease=()=>{
    if(item&&item.quantity>1){
      const newCart=[...CartItems];
      newCart[ItemIndex]={
        ...item,
        quantity:item.quantity-1
      };
      setCartItems(newCart);
    }
  }

  const Increase=()=>{
    if(item){
      const newCart=[...CartItems];
      newCart[ItemIndex]={
        ...item,
        quantity:(item.quantity||1)+1
      }
      setCartItems(newCart);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button 
        onClick={decrease}
        disabled={!item || item.quantity <= 1}
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          background: 'none',
          cursor: !item || item.quantity <= 1 ? 'not-allowed' : 'pointer',
          opacity: !item || item.quantity <= 1 ? 0.5 : 1
        }}
      >
        -
      </button>
      
      <span>{item ? (item.quantity || 1) : 1}</span>
      
      <button 
        onClick={Increase}
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          background: 'none',
          cursor: 'pointer'
        }}
      >
        +
      </button>
    </div>
  );

  
}

export default QuantityCounter;