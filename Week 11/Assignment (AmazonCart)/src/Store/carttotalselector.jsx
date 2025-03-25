import { selector } from "recoil";
import { CartAtom } from "./Cartitemstate";


export const CartTotal=selector({
    key:'CartSelector',
    get:({get})=>{
        const CartItems=get(CartAtom);
        let totalPrice=0;
        let itemCount=0;

        CartItems.forEach(item=>{
            const quantity=item.quantity||1;
            totalPrice+=Number(item.price)*quantity;
            itemCount+=quantity;
        });

        return {
            totalPrice,
            formattedTotal:totalPrice.toFixed(2),
            itemCount
        }
    }
})