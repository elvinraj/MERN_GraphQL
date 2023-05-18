import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqloperations/mutations";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUserr, { loading, error, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("tokenn", data.user.token);
      navigate("/");
    },
  });
  // if(data) {
  //   localStorage.setItem("token", data.user.token)
  // }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // navigate("/");
    signinUserr({
      variables: {
        userSignin: formData,
      },
    });
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
