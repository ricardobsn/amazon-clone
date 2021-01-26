import React, { useState } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

// import { auth, provider } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import { actionTypes } from "./reducer";

function Login({ isLogin }) {
  isLogin(true);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [state, dispatch] = useStateValue();
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        if (auth) {
          // console.log(auth);

          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);

          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <Link to='/'>
        {isLogin(false)}
        <img
          className='login_logo'
          src='https://cdn2.downdetector.com/static/uploads/logo/amazon.png'
        />
      </Link>

      <div className='login_container'>
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <Button className='login_signin' type='submit' onClick={signIn}>
          {" "}
          Sign In
        </Button>
        <Button className='login_create' onClick={register}>
          {" "}
          Create account
        </Button>
      </div>
    </div>
  );
}

export default Login;
