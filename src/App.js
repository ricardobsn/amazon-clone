import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Orders from "./Orders";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStatevalue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const [login, isLogin] = React.useState(false);
  const [{}, dispatch] = useStatevalue();

  const promise = loadStripe(
    "pk_test_51IBMcaGzKajbbZPeXXtSfvqLEQEZEWUSZQccoNBCe21uK2BTSrWRS4FjMiIw4whhRpMfbL5Vm43TzVVLGYAd3w0h00yv28YISe"
  );

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);

  return (
    <Router>
      <div className='app'>
        {!login && <Header />}
        <Switch>
          <Route path='/login'>
            <Login isLogin={isLogin} />
          </Route>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/payment'>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
