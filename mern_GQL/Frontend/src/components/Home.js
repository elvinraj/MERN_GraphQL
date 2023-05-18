import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { Link } from "react-router-dom";
export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) {
    return <h1>loading!!!!</h1>;
  }

  if (error) {
    console.log(error.message);
  }

  if (data.quotes.length == 0) {
    return <h2>No Quotes available</h2>;
  }
  // useEffect(() => {
  //   fetch("http://localhost:4000/", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `query getAllUsers{
  //           users{
  //             _id
  //             firstName
  //             lastName
  //             email
  //           }
  //         }`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("dataf", data));
  // }, []);
  return (
    <div className="container">
      {data.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}>
              <p className="right-align">~{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
}
