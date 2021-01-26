import React from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStatevalue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [{ user, basket }, dispatch] = useStatevalue();

  React.useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className='orders'>
      <h1> Seus Pedidos</h1>
      <div className='orders_order'>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
