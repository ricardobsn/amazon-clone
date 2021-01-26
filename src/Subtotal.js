import React from "react";
import "./Subtotal.css";
import CurrancyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { getTotal } from "./reducer";

function Subtotal({ basket }) {
  const history = useHistory();

  return (
    <div className='subtotal'>
      <CurrancyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ( {basket?.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className='gift'>
              <input type='checkbox' />
              Este pedido contêm um presente
            </small>
          </>
        )}
        decimalScale={2}
        value={basket?.reduce(getTotal, 0).toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"R$"}
      />
      <button onClick={(e) => history.push("/payment")}>Checkout</button>
    </div>
  );
}

export default Subtotal;
