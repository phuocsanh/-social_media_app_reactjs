import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import queryString from "query-string";
import styles from "./profile.module.scss";
import Info from "./components/info/info";
import Post from "./components/post/post";
import CameraIcon from "@mui/icons-material/CameraAlt";
import { getUserById } from "../../redux/actions/profileAction";
import ModalMUI from "../../components/Modal";
import UserImage from "../../images/user.png";
import formConfig, { FORM_INPUT } from "./FormConfig";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";

function Profile() {
  const math = useRouteMatch();

  const history = useHistory();

  const [isModalEdit, setIsModalEdit] = useState(false);
  const dispatch = useDispatch();
  let data = useLocation();
  const param = data?.state?.id;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formConfig);
  const userProfile = useSelector((state) => state.profileReducer.user);
  const userLogin = useSelector((state) => state.authReducer.auth);
  const handleClose = () => {
    setIsModalEdit(false);
  };
  useEffect(() => {
    dispatch(getUserById(data?.state?.id, userLogin?.token));
    const param = { id: data?.state?.id };
    history.push({ pathname: math.url, search: queryString.stringify(param) });
  }, [data?.state?.id]);

  return (
    <div className={styles.container}>
      <Info
        data={userProfile}
        idUserLogin={userLogin?.user?._id}
        setIsModalEdit={setIsModalEdit}
      />
      <Post />
      <ModalMUI handleClose={handleClose} open={isModalEdit}>
        <div className={styles["container-from"]}>
          <div className={styles["div-avatar__modal"]}>
            <img
              alt="img"
              src={userProfile?.avatar ? userProfile?.avatar : UserImage}
            />
            <div className={styles["camera"]}>
              <CameraIcon sx={{ width: "1.2rem", height: "1.2rem" }} />
            </div>
          </div>
          <FormInput
            classDivInput={styles["div-form-input"]}
            label={"Full name"}
            name={FORM_INPUT.fullName}
            placeholder="Enter your full name"
            control={control}
          />
          <FormInput
            label={"Email"}
            classDivInput={styles["div-form-input"]}
            name={FORM_INPUT.email}
            placeholder="Enter your email"
            control={control}
          />
          <FormInput
            label={"Full name"}
            classDivInput={styles["div-form-input"]}
            name={FORM_INPUT.phomeNumber}
            placeholder="Enter your phone number"
            control={control}
          />
          <FormInput
            label={"Full name"}
            classDivInput={styles["div-form-input"]}
            name={FORM_INPUT.address}
            placeholder="Enter your address"
            control={control}
          />
        </div>
      </ModalMUI>
    </div>
  );
}

export default Profile;
