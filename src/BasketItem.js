import React from "react";
import "./BasketItem.css";
import { useStatevalue } from "./StateProvider";

function BasketItem({ id, image, title, price, rating, hideRemove }) {
  const [{ basket }, dispatch] = useStatevalue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  return (
    <div className='basketItem'>
      <img className='basketItem_image' src={image} />

      <div className='basketItem_info'>
        <p className='basketItem_title'>{title}</p>
        <p className='basketItem_price'>
          <small>R$</small>
          <strong>{price}</strong>{" "}
        </p>
        <div className='basketItem_rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {hideRemove && <button onClick={removeFromBasket}>Remover</button>}
      </div>
    </div>
  );
}

BasketItem.defaultProps = {
  hideRemove: true,
};

export default BasketItem;
