import React from "react";
import "./Product.css";
import { useStatevalue } from "./StateProvider";

function Product({ title, image, rating, price, id }) {
  const [{ basket }, dispatch] = useStatevalue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, title, image, price, rating },
    });
  };

  return (
    <div className='product'>
      <div className='product_info'>
        <p>{title}</p>
        <p className='product_price'>
          <small>R$</small>
          <strong>{price}</strong>
        </p>
        <div className='product_rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <img src={image} />
      </div>
      <button onClick={addToBasket}>Adicionar a cesta</button>
    </div>
  );
}

export default Product;
