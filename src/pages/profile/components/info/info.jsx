import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import MessageIcon from "@mui/icons-material/Message";
import { PeopleAlt, PersonAddAlt1 } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

import ModalUpload from "../ModalUpload";

import styles from "./info.module.scss";
import { updateInfoUser } from "../../../../redux/actions/profileAction";
import { getUserIsLogin } from "../../../../redux/actions/authAction";

function Info({ data, idUserLogin, tokenUserLogin, setIsModalEdit }) {
  // console.log("🚀 ~ file: info.jsx:17 ~ Info ~ data", data);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const authIsLogin = useSelector((state) => state?.authReducer?.authIsLogin);
  // console.log("🚀 ~ file: info.jsx:22 ~ Info ~ authIsLogin", authIsLogin);
  console.log("🚀 ~ file: info.jsx:23 ~ Info ~ data id", data);
  const addUnFriend = (type) => {
    dispatch(
      updateInfoUser({
        data: { value: data?._id, type, token: tokenUserLogin },
        onSuccess: (msg) => {
          dispatch(getUserIsLogin(idUserLogin, tokenUserLogin));
        },
        onFailure: (msg) => {
          // toast.error(msg);
        },
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url("https://cdn.vjshop.vn/tin-tuc/cach-chup-anh-phong-canh/cach-chup-anh-phong-canh-dep-15.jpg")`,
          }}
        ></div>
        <div className={styles.info}>
          <div className={styles["div-avatar"]}>
            <img alt="img" className={styles.avatar} src={data?.avatar} />
            {idUserLogin === data?._id && (
              <div onClick={() => setOpenModal(true)}>
                <IconButton
                  className={styles["camera"]}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <PhotoCamera sx={{ fontSize: "1rem" }} />
                </IconButton>
              </div>
            )}
          </div>
          <div className={styles["user-info"]}>
            <span>{data?.userName}</span>
            {/* <div className={styles["follow"]}>
              <span>{`0 Follow`}</span>
              <span>{`0 Following`}</span>
            </div> */}

            <AvatarGroup
              sx={{
                "& .MuiAvatar-root": {
                  width: "2rem",
                  height: "2rem",
                  fontSize: 15,
                },
              }}
              total={data?.listFriends?.length}
            >
              {data?.listFriends?.map((item, idx) => (
                <Avatar alt="Remy Sharp" src={item?.avatar} />
              ))}
            </AvatarGroup>
          </div>

          <div className={styles["info-btn"]}>
            {idUserLogin !== data?._id ? (
              <div style={{ backgroundColor: "transparent" }}>
                <>
                  {authIsLogin?.listFriends?.includes(data?._id) ? (
                    <div className={styles["div-btn"]}>
                      <PeopleAlt className={styles["icon-btn"]} />
                      <button
                        className={styles["btn-cancel"]}
                        onClick={() => addUnFriend("unFriend")}
                      >
                        Hủy kết bạn
                      </button>
                    </div>
                  ) : (
                    <div className={styles["div-btn"]}>
                      <PersonAddAlt1 className={styles["icon-btn"]} />
                      <button
                        className={styles["btn-cancel"]}
                        onClick={() => addUnFriend("addFriend")}
                      >
                        Thêm bạn bè
                      </button>
                    </div>
                  )}
                </>
                <div className={styles["div-btn"]}>
                  <MessageIcon
                    className={styles["icon-btn"]}
                    style={{ color: "white" }}
                  />
                  <button className={styles["btn-texting"]}>Nhắn tin</button>
                </div>
              </div>
            ) : (
              <div className={styles["edit-profile__btn"]}>
                <EditIcon className={styles["icon-btn"]} />
                <span onClick={() => setIsModalEdit(true)}>Edit</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalUpload openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Info;
