import React, { useState } from "react";
import '../css/Login.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="bodyLogin">
      <div className="login">
        <div className="formlogin">
          <form action="" >
            <h2 className="lo">Log in</h2>

            <div className="user">
              <input type="text" placeholder="Username" aria-label="Username" />
              {/* <label for="floatingInput" >Username</label> */}
            </div>

            <div className="user">
              <input type="password" placeholder="Password" aria-label="Password" />
              {/* <label>Password</label> */}
            </div>

            <div>
              <a href="/Salesperson">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
