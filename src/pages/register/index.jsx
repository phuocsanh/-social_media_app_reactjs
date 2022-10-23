import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Lottie from "react-lottie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import styles from "./register.module.scss";
import * as animationData from "../../images/38435-register.json";
import { validEmail } from "../../utils/regex";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Register = () => {
  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$@!%&*?])[A-Za-zd#$@!%&*?]{8,30}$/;
  const { history } = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validateFieldEmail, setValidateFieldEmail] = useState(null);
  const [validateFieldPass, setValidateFieldPass] = useState(null);
  const [validateFieldConfirmPass, setValidateFieldConfirmPass] =
    useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = useSelector((state) => state.authReducer.auth);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "email") setValidateFieldEmail(null);
    else if (prop === "password") setValidateFieldPass(null);
    else setValidateFieldConfirmPass(null);
  };

  // useEffect(() => {
  //   if (auth.token) history.push("/");
  // }, [auth.token, history]);

  const handleClickShowPassword = (password) => {
    password === "pass"
      ? setShowPassword(!showPassword)
      : setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };
  const validate = () => {
    let isError = false;
    if (values.email.length === 0) {
      isError = true;
      setValidateFieldEmail("Please enter email");
    } else if (!validEmail.test(values.email)) {
      isError = true;
      setValidateFieldEmail("Invalid email format");
    } else {
      isError = false;
      setValidateFieldEmail(null);
    }

    if (values.password.length === 0 || values.password.length < 8) {
      isError = true;
      setValidateFieldPass(
        "Please enter confirm password at least 8 characters"
      );
    } else if (!validPassword.test(values.password)) {
      setValidateFieldPass(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
      );
    } else {
      isError = false;
      setValidateFieldPass(null);
    }

    if (
      values.confirmPassword.length === 0 ||
      values.confirmPassword.length < 8
    ) {
      isError = true;
      setValidateFieldConfirmPass(
        "Please enter confirm password at least 8 characters"
      );
    } else if (values.confirmPassword !== values.password) {
      isError = true;
      setValidateFieldConfirmPass("Confirm password is not match");
    } else {
      isError = false;
      setValidateFieldConfirmPass(null);
    }

    if (!isError) {
      // console.log("values", values);
      // dispatch(login({ email: values.email, password: values.password }));
    }
  };

  // useEffect(() => {
  //   if (auth?.token) history.push("/");
  // }, [auth?.token, history]);
  return (
    <div className={styles.container}>
      <div className={styles["img-left"]}>
        <Lottie options={defaultOptions} />
      </div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className={styles.form}>
          <h3>REGISTER</h3>
          <div style={{ marginTop: "2rem" }}></div>
          <TextField
            style={{ width: "100%", marginLeft: 0 }}
            required
            id="outlined-password-input"
            label="Email"
            type="email"
            error={!!validateFieldEmail}
            autoComplete="current-password"
            onChange={handleChange("email")}
            helperText={validateFieldEmail}
          />

          <div style={{ marginTop: "1rem" }}></div>
          <TextField
            required
            style={{ width: "100%", marginLeft: 0 }}
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={handleChange("password")}
            error={!!validateFieldPass}
            helperText={validateFieldPass && validateFieldPass}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("pass")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{ marginTop: "1rem" }}></div>
          <TextField
            required
            style={{ width: "100%", marginLeft: 0 }}
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={handleChange("confirmPassword")}
            error={!!validateFieldConfirmPass}
            helperText={validateFieldConfirmPass && validateFieldConfirmPass}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            className={"mt-3"}
            style={{ height: "3rem" }}
            onClick={handleSubmit}
          >
            Login
          </Button>

          <div style={{ marginTop: "2rem" }}>
            <p>
              You don't have account <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Register;
