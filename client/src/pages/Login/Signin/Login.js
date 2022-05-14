import React, { useState } from "react";
import {
  Avatar,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import "./Login.scss";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GLogin } from "./GoogleLogin";
import AuthService from "../../../Services/AuthenticationService";
import AnalyticService from "../../../Services/AnalyticsServices.js";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { useNavigate } from "react-router-dom";

export function Login({ handleChange, props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFlag, setUsernameFlag] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [loginmessageFlag, setLoginMessageFlag] = useState(false);
  const [loginmessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const usernamerequired = (value) => {
    if (!value) {
      setUsernameFlag(false);
    } else {
      setUsernameFlag(true);
    }
  };
  const passwordrequired = (value) => {
    if (!value) {
      setPasswordFlag(false);
    } else {
      setPasswordFlag(true);
    }
  };
  const onClick = (event) => {
    event.preventDefault();
  
    //AnalyticService.getuseranalysis();
    usernamerequired(username);
    passwordrequired(password);
    if (passwordFlag && usernameFlag) {
      AuthService.login(username, password).then(
        (response) => {
          setLoginMessage("");
          setLoginMessageFlag(false);
          navigate("/home");
          setUsername("");
          setPassword("");
          window.location.reload();
        },
        (error) => {
          const message = error.message;
          setLoginMessage("Invalid Credentials");
          setLoginMessageFlag(true);
          setUsername("");
          setPassword("");
        }
      );
    }
  };

  return (
    <Grid>
      <Paper className="LoginpaperStyle">
        <Grid align="center">
          <Avatar className="LoginavatarStyle">
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN IN</h2>
          {loginmessageFlag ? (
            <AlertTitle className="alertTitleColor">
              {"*" + loginmessage}
            </AlertTitle>
          ) : null}
        </Grid>
        {usernameFlag ? (
          <TextField
            value={username}
            className="LoginspacingStyle"
            label="Username"
            placeholder="Enter Username"
            fullWidth
            variant="outlined"
            onChange={onChangeUsername}
            required
          ></TextField>
        ) : (
          <TextField
            value={username}
            className="LoginspacingStyle"
            error
            id="filled-error-helper-text"
            helperText="Username Required"
            label="Username"
            placeholder="Enter Username"
            fullWidth
            variant="outlined"
            onChange={onChangeUsername}
            required
          ></TextField>
        )}
        {passwordFlag ? (
          <TextField
            value={password}
            label="Password"
            className="LoginspacingStyle"
            fullWidth
            type="password"
            variant="outlined"
            onChange={onChangePassword}
            required
          ></TextField>
        ) : (
          <TextField
            value={password}
            label="Password"
            error
            id="filled-error-helper-text"
            className="LoginspacingStyle"
            fullWidth
            type="password"
            variant="outlined"
            helperText="Password Required"
            onChange={onChangePassword}
            required
          ></TextField>
        )}

        <Button
          className="LoginspacingStyle"
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          onClick={onClick}
        >
          SIGN IN
        </Button>

        {/* <Typography className="LoginspacingStyle" align="center">
          
        </Typography>
        <GLogin /> */}
        <Typography className="newaccountStyle">
          Don't have an account yet?
          <Link to="#" onClick={() => handleChange("event", 1)}>
            {" "}
            SIGN UP
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
