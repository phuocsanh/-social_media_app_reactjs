import React from "react";

import CameraIcon from "@mui/icons-material/CameraAlt";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./info.module.scss";
function Info({ data, idUserLogin, setIsModalEdit }) {
  console.log("🚀 ~ file: info.jsx ~ line 6 ~ Info ~ data", data);
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
            <div>
              <CameraIcon />
            </div>
          </div>
          <div className={styles["user-info"]}>
            <span>{data?.userName}</span>
            <div className={styles["follow"]}>
              <span>{`0 Follow`}</span>
              <span>{`0 Following`}</span>
            </div>
            <AvatarGroup total={24}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </div>
          <div className={styles["info-btn"]}>
            {idUserLogin !== data?._id ? (
              <>
                <div>
                  <PeopleAltIcon style={{ fontSize: "1.5rem" }} />
                  <button>Bạn bè</button>
                </div>
                <div>
                  <MessageIcon style={{ color: "white", fontSize: "1.5rem" }} />
                  <button>Nhắn tin</button>
                </div>
              </>
            ) : (
              <div className={styles["edit-profile__btn"]}>
                <EditIcon style={{ fontSize: "1.2rem" }} />
                <button onClick={() => setIsModalEdit(true)}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
