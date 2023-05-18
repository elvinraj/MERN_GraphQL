import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { CREATE_QUOTE } from "../gqloperations/mutations";
export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const [createQuotee, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuotee({
      variables: {
        name: "Quote is created",
      },
    });

    console.log("quotee", quote);
  };

  return (
    <div className="container my-container">
      {loading && <h1> Loading</h1>}
      {error && <div className="red card-panel"> {error.message}</div>}
      {data && <div className="green card-panel">{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
