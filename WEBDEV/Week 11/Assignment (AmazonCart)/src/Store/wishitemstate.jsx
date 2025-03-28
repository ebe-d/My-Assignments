import { atom } from "recoil";

export const WishlistAtom = atom({
  key: "WishlistAtom",
  default: [
    {
      id: 1,
      name: "Redragon K617 Fizz 60% Wired RGB Gaming Keyboard",
      price: 2290,
      url: "https://i.rtings.com/assets/pages/xXDZ1p9x/best-rgb-keyboards-20240515-2-medium.jpg?format=auto",
      button: "Add to Cart",
    },
    {
      id: 2,
      name: "USB-C Adapter",
      price: 2890,
      url: "https://resources.legrand.us/220th_sm_ckv9HqsRttu6.jpg?1625706744",
      button: "Proceed to checkout",
    },
  ],
});
