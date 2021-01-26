import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStatevalue } from "./StateProvider";
import BasketItem from "./BasketItem";

function Checkout() {
  const [{ basket }, dispatch] = useStatevalue();

  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <img
          className='checkout_ad'
          src='https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png'
          alt=''
        />
        <div>
          <h2 className='checkout_title'>Seu carrinho</h2>

          {basket?.map((item) => (
            <BasketItem
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className='checkout_right'>
        <Subtotal basket={basket} />
      </div>
    </div>
  );
}

export default Checkout;
