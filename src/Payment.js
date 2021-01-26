import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStatevalue } from "./StateProvider";
import BasketItem from "./BasketItem";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrancyFormat from "react-currency-format";
import { getTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStatevalue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);

  useEffect(() => {
    const getClientsecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe espera receber o valor em centavos
        url: `/payments/create?total=${basket.reduce(getTotal, 0) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientsecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className='payment'>
      <div className='payment_container'>
        <h1>Checkout {<Link to='/checkout'>{basket?.length} itens</Link>}</h1>
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Endereço de Entrega</h3>
          </div>
          <div className='payment_address'>
            <p>{user?.email}</p>
            <p>Av Presidente Vargas</p>
            <p>Rio de Janeiro- RJ</p>
          </div>
        </div>
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Review do Carrinho</h3>
          </div>
          <div className='payment_items'>
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
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Pagamento</h3>
          </div>
          <div className='payment_details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment_priceContainer'>
                <CurrancyFormat
                  renderText={(value) => (
                    <>
                      {" "}
                      <h3> Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={basket.reduce(getTotal, 0).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Pague Agora"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
