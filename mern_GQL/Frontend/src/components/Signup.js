import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../gqloperations/mutations";
export default function Signup() {
  const [formData, setFormData] = useState({});

  const [signupUsr, { data, error, loading }] = useMutation(SIGNUP_USER); //signupUsr contains variable values & called in submit button
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signupUsr({
      variables: {
        userNew: formData,
      },
    });
  };

  if (loading) return <h2>loading......</h2>;
  return (
    <div className="container my-container">
      {error && <h1>{error.message}</h1>}

      {data && data.user && (
        <h1>{data.user.firstName} is signedup. You can Login now</h1>
      )}
      <h5>Signup!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
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
        <Link to="/login">
          <p>Already have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
