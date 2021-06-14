import React, { useState, useContext } from "react";
import { AccountContext } from "../Accounts/Accounts";
import useStyles from "../Form/styles";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
} from "@material-ui/core";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const classes = useStyles();

  const { authenticate } = useContext(AccountContext);

  return (
    <Container fixed maxWidth="xs">
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
        >
          <Typography variant="h6"> Member Login </Typography>
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
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage ? (
            <div style={{ margin: "1rem" }}>
              <text style={{ color: "red" }}>Incorrect Credentials</text>
            </div>
          ) : (
            <div style={{ margin: "1rem" }} />
          )}

          <Grid item xs={12}>
            <Button
              className={classes.buttonSubmit}
              style={{ margin: "0 auto", display: "flex" }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={(event) => {
                event.preventDefault();

                authenticate(email, password)
                  .then((data) => {
                    console.log(`logged in!`, data);
                    props.history.push("/dashboard");
                  })
                  .catch((err) => {
                    console.error(`failed to login!`, err);
                    setErrorMessage(true);
                  });
              }}
            >
              Login
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
