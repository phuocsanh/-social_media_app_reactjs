import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import queryString from "query-string";
import styles from "./profile.module.scss";
import Info from "./components/info/info";
import Post from "./components/post/post";
import CameraIcon from "@mui/icons-material/CameraAlt";
import { getUserById, updateInfoUser } from "../../redux/actions/profileAction";
import ModalMUI from "../../components/Modal";
import UserImage from "../../images/user.png";
import formConfig, { FORM_INPUT } from "./FormConfig";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import { saveUserId } from "../../redux/actions/appAction";
import Button from "../../components/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { onlyEnterNumber } from "../../utils/function";
import { toast } from "react-toastify";
function Profile() {
  const math = useRouteMatch();

  const history = useHistory();

  const [isModalEdit, setIsModalEdit] = useState(false);
  const dispatch = useDispatch();
  let data = useLocation();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm(formConfig);
  const userProfile = useSelector((state) => state.profileReducer.user);
  console.log("🚀 ~ file: index.jsx:43 ~ Profile ~ userProfile", userProfile);

  const userToken = useSelector((state) => state.authReducer.auth?.token);
  console.log("🚀 ~ file: index.jsx:46 ~ Profile ~ userToken", userToken);
  const authIsLogin = useSelector((state) => state.authReducer.authIsLogin);
  console.log("🚀 ~ file: index.jsx:46 ~ Profile ~ userLogin", authIsLogin);
  const userId = useSelector((state) => state.appReducer.userId);
  const _onSubmit = (value) => {
    // console.log("🚀 ~ file: index.jsx:137 ~ Profile ~ value", value);
    dispatch(
      updateInfoUser({
        data: { value, type: "updateInFo", token: userToken },
        onSuccess: (msg) => {
          dispatch(getUserById(data?.state?.id || userId, userToken));
          setIsModalEdit(false);
          toast.success(msg);
          reset();
        },
        onFailure: (msg) => {
          setIsModalEdit(false);
          toast.error(msg);
        },
      })
    );
  };
  const onChangeRadio = (value) => {
    setValue(FORM_INPUT.gender, value);
  };
  const handleClose = () => {
    setIsModalEdit(false);
  };
  useEffect(() => {
    dispatch(getUserById(data?.state?.id || userId, userToken));
  }, [data?.state?.id]);
  useEffect(() => {
    if (userProfile) {
      setValue(FORM_INPUT.gender, userProfile?.gender);
      setValue(FORM_INPUT.fullName, userProfile?.fullName);
      setValue(FORM_INPUT.userName, userProfile?.userName);
      setValue(FORM_INPUT.phoneNumber, userProfile?.phoneNumber);
      setValue(FORM_INPUT.address, userProfile?.address);
    }
  }, [data?.state?.id, userProfile]);

  useEffect(() => {
    dispatch(saveUserId(data?.state?.id));
  }, [userId]);

  return (
    <div className={styles.container}>
      <Info
        data={userProfile}
        idUserLogin={authIsLogin?._id}
        tokenUserLogin={userToken}
        setIsModalEdit={setIsModalEdit}
      />
      <Post />
      <ModalMUI handleClose={handleClose} open={isModalEdit}>
        <div className={styles["container-from"]}>
          <FormInput
            classDivInput={styles["div-form-input"]}
            label={"Full name"}
            name={FORM_INPUT.fullName}
            placeholder="Enter your full name"
            control={control}
          />
          <FormInput
            label={"User name"}
            classDivInput={styles["div-form-input"]}
            name={FORM_INPUT.userName}
            placeholder="Enter your user name"
            control={control}
          />
          <FormInput
            label={"Phone"}
            classDivInput={styles["div-form-input"]}
            name={FORM_INPUT.phoneNumber}
            placeholder="Enter your phone number"
            onKeyPress={onlyEnterNumber}
            control={control}
          />
          <FormInput
            label={"Address"}
            classDivInput={styles["div-form-input"]}
            name={FORM_INPUT.address}
            placeholder="Enter your address"
            control={control}
          />
          <div className={styles["btn-radio"]}>
            <FormControl>
              <p style={{ marginBottom: "-0.6rem" }}>Gender</p>
              <RadioGroup
                row
                defaultValue={userProfile?.gender}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => onChangeRadio(e.target.value)}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={styles["btn-group"]}>
            <Button
              title="Cancel"
              classContainer={styles["btn-cancel"]}
              onClick={() => setIsModalEdit(false)}
            />
            <Button title="Change" blue onClick={handleSubmit(_onSubmit)} />
          </div>
        </div>
      </ModalMUI>
    </div>
  );
}

export default Profile;
