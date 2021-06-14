import React from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from "@material-ui/core";
import memories from "../images/memories.png";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "../../style";
import { useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { getPosts } from "../../actions/posts";
import SignUp from "../SignUp/SignUp";
import { AccountContext } from "../Accounts/Accounts";
import { Link } from "react-router-dom";

const App = (props) => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { logout } = useContext(AccountContext);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="80px"
          width="fit-content"
        />
        <Typography className={classes.heading} variant="h2" align="center">
          Fridge Magnets
        </Typography>
        <div style={{ width: "20px" }} />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            logout();
          }}
        >
          <Link to="/" style={{ color: "white" }}>
            Logout
          </Link>
        </Button>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.Mainccontainer}
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <br />
              <SignUp />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
