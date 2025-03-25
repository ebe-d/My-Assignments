import { atom } from "recoil";

export const WishlistAtom = atom({
  key: "WishlistAtom",
  default: [
    {
      id: 1,
      name: "Redragon K617 Fizz 60% Wired RGB Gaming Keyboard",
      price: 2290,
      url: "https://m.media-amazon.com/images/I/81r8JazS9eL._SX679_.jpg",
      button: "Add to Cart",
    },
    {
      id: 2,
      name: "USB-C Adapter",
      price: 2890,
      url: "https://m.media-amazon.com/images/I/61ZlhDKhy4L._SX679_.jpg",
      button: "Proceed to checkout",
    },
  ],
});
