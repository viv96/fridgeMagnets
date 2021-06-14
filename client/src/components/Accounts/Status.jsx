import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";
import Dashboard from "../Dashboard/Dashboard";
import { Redirect } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getSession, logout } = useContext(AccountContext);

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log(`logged in!`, data);
        setStatus(true);
      })
      .catch((err) => {
        console.error(`failed to login!`, err);
      });
  };

  useEffect(() => {
    getSession().then((session) => {
      console.log(`Session: `, session);
      setStatus(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status ? <Dashboard /> : <div> Please Login to access this page</div>}
    </div>
  );
};
