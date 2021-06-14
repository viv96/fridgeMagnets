import React, { useState } from "react";
import UserPool from "../../cognito/UserPool";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "../Form/styles";

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.log(err);
        setShowSuccessMessage(err.message);
        setMessageColor("red");
      } else {
        console.log(data);
        setShowSuccessMessage("User Successfully Added to the System.");
        setMessageColor("green");
      }
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={onSubmit}
      >
        <Typography variant="h6"> Add member</Typography>
        <TextField
          variant="outlined"
          label="Username"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ margin: "1.5rem" }}>
          <text style={{ color: messageColor }}>{showSuccessMessage}</text>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="#347aeb"
          size="large"
          type="submit"
          fullWidth
        >
          Add Member
        </Button>
      </form>
    </Paper>
  );
};

export default SignUp;
