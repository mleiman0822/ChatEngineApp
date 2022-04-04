import React, { useContext } from "react";

import { Context } from "../context";

import { useRouter } from "next/router";

import axios from "axios";

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);

  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();

    if (username.length === 1 || secret.length === 1) return;

    var config = {
      method: 'put',
      url: 'https://api.chatengine.io/users/',
      headers: {
        'PRIVATE-KEY': '1feeab97-5cdd-408e-afb7-1d1ed6515e9b',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "username": username,
        "secret": secret
      })
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        router.push("/chats");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">NextJS Chat</div>

          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;