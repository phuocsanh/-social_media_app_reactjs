import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Lottie from "react-lottie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import styles from "./register.module.scss";
import * as animationData from "../../images/38435-register.json";
import { validEmail, validPassword } from "../../utils/regex";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authAction";
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
  const { history } = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Other",
  });

  const [validateFieldUserName, setValidateFieldUserName] = useState(null);
  const [validateFieldEmail, setValidateFieldEmail] = useState(null);
  const [validateFieldPass, setValidateFieldPass] = useState(null);
  const [validateFieldConfirmPass, setValidateFieldConfirmPass] =
    useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = useSelector((state) => state.authReducer.auth);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "userName") setValidateFieldUserName(null);
    else if (prop === "email") setValidateFieldEmail(null);
    else if (prop === "password") setValidateFieldPass(null);
    else setValidateFieldConfirmPass(null);
  };

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
    if (values.userName.length === 0 || values.userName.length > 50) {
      isError = true;
      setValidateFieldUserName("Please enter email and maximum 50 characters");
    } else {
      isError = false;
      setValidateFieldUserName(null);
    }

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

    if (
      values.password.length === 0 ||
      values.password.length < 8 ||
      values.password.length > 32
    ) {
      isError = true;
      setValidateFieldPass(
        "Please enter confirm password at least 8 characters and maximun 32 characters"
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
      values.confirmPassword.length < 8 ||
      values.confirmPassword > 32
    ) {
      isError = true;
      setValidateFieldConfirmPass(
        "Please enter confirm password at least 8 characters and maximun 32 characters"
      );
    } else if (values.confirmPassword !== values.password) {
      isError = true;
      setValidateFieldConfirmPass("Confirm password is not match");
    } else {
      isError = false;
      setValidateFieldConfirmPass(null);
    }

    if (!isError) {
      const { confirmPassword, ...newValues } = values;
      dispatch(register(newValues));
    }
  };

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
          <h3 className={styles.register}>REGISTER</h3>
          <div style={{ marginTop: "1rem" }}></div>
          <TextField
            style={{ width: "100%", marginLeft: 0 }}
            required
            id="outlined-password-input"
            label="User name"
            variant="outlined"
            size="small"
            type="text"
            error={!!validateFieldUserName}
            onChange={handleChange("userName")}
            helperText={validateFieldUserName}
          />
          <div style={{ marginTop: "0.5rem" }}></div>
          <TextField
            style={{ width: "100%", marginLeft: 0 }}
            required
            id="outlined-password-input"
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            error={!!validateFieldEmail}
            onChange={handleChange("email")}
            helperText={validateFieldEmail}
          />

          <div style={{ marginTop: "0.5rem" }}></div>

          <TextField
            required
            style={{ width: "100%", marginLeft: 0 }}
            label="Password"
            variant="outlined"
            size="small"
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
          <div style={{ marginTop: "0.5rem" }}></div>

          <TextField
            required
            style={{ width: "100%", marginLeft: 0 }}
            label="Confirm Password"
            variant="outlined"
            size="small"
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
          <FormControl>
            <div className="w-100 d-flex ">
              <lable style={{ fontSize: "0.8rem" }}>Gender</lable>
            </div>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="Other"
              onChange={handleChange("gender")}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label={<span style={{ fontSize: "0.9rem" }}>Female</span>}
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label={<span style={{ fontSize: "0.9rem" }}>Male</span>}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label={<span style={{ fontSize: "0.9rem" }}>Other</span>}
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            className={"mt-4"}
            style={{ height: "3rem" }}
            onClick={handleSubmit}
          >
            REGISTER
          </Button>

          <div style={{ marginTop: "2rem" }}>
            <p>
              Already have an account <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Register;
