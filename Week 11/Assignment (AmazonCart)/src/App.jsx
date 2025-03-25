import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Components/AmazonCart";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/homepage";
import CartPage from "./Pages/Cartpage";
import Wishlist from "./Components/Wishlist";
import WishlistPage from "./Pages/wishlist";

function App(){
  return <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/Cart' element={<CartPage/>}/>
      <Route path='/Wishlist' element={<WishlistPage/>}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App;