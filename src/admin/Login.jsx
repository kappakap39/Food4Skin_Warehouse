import React, { useState } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Validation from "../function/LoginValidation";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors(Validation(values));
  //   if(errors.email === "" && errors.password === ""){
  //     axios.post("http://localhost:2001/loginadmin", values)
  //     .then(res => {
  //       if(res.data === "Success"){
  //         navigate("/Salesperson");
  //       }
  //       else{
  //         alert("No record existed");
  //       }

  //     })
  //     .catch(err => console.log(err));
  //   }
  // }

  //!
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:2001/loginadmin", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/Salesperson");
          } else {
            axios
              .post("http://localhost:2001/loginsales", values)
              .then((res) => {
                if (res.data === "Success") {
                  navigate("/Product");
                } else {
                  alert("No record existed");
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const validationErrors = Validation(values);
  // setErrors(validationErrors);

  //   if(validationErrors.email === "" && validationErrors.password === ""){
  //     axios.post("http://localhost:2001/loginadmin", values)
  //     .then(res => {
  //       if(res.data === "Success"){
  //         navigate("/Salesperson");
  //       }
  //       else{
  //         alert("No record existed");
  //       }

  //     })
  //     .catch(err => console.log(err));
  //   }
  // }

  console.log(values);

  return (
    <div className="bodyLogin">
      <div className="login">
        <div className="formlogin">
          <form action="" onSubmit={handleSubmit}>
            <h2 className="lo">Log in</h2>

            <div className="user">
              <input
                type="email"
                placeholder="E-mail"
                aria-label="email"
                name="email"
                onChange={handleInput}
              />
              {/* <label for="floatingInput" >Username</label> */}
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <br />
            <div className="user">
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                name="password"
                onChange={handleInput}
              />
              {/* <label>Password</label> */}
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <br />
            {/* <div>
              <a name="submit" type="submit" id="submit" href="/Product">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </a>
            </div> */}
            <div>
              <button type="submit" name="submit" id="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
