import React, { useRef, useState, memo } from "react";
import ModalMUI from "../../../../components/Modal";
import AddIcon from "@mui/icons-material/Add";
import AvatarEditor from "react-avatar-editor";
import Button from "../../../../components/Button";
import styles from "./modalUpload.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import {
  getUserById,
  uploadImage,
} from "../../../../redux/actions/profileAction";

function ModalUpload({ openModal, setOpenModal }) {
  const dispatch = useDispatch();
  const [fileLocal, setFileLocal] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const userLogin = useSelector((state) => state.authReducer.auth);
  const user = useSelector((state) => state.profileReducer.user);

 
 

  const inputFile = useRef();
  function handleChange(event) {
    setFileLocal(event.target.files[0]);
  }
  const onSuccess = () => {
    setFileLocal(null);
    dispatch(getUserById(user?.user?._id, userLogin?.token));
  };
  const onSuccess2 = () => {
    setOpenModal(false)
    setFileLocal(null);
    setFileUpload(null)
    dispatch(getUserById(user?.user?._id, userLogin?.token));
  };
  const onFailure = () => {
    setOpenModal(false)
    setFileLocal(null);
    setFileUpload(null)
  };

  const handleSave = () => {
    if (setEditorRef.current) {
      const canvas = setEditorRef.current
        .getImage()
        .toDataURL("image/jpeg", 1.0);

      if (!canvas) {
        return;
      }
      dispatch(
        uploadImage(canvas, userLogin?.token, onSuccess, onFailure, true)
      );
    }
  };
  const handleChangeImage = () => {
    dispatch(
      uploadImage(fileUpload, userLogin?.token, onSuccess2, onFailure, false)
    );
  }
  const setEditorRef = useRef();

  return (
    <ModalMUI
      open={openModal}
      handleClose={() => {
        setOpenModal(false);
        setFileLocal(null);
        setFileUpload(null);
      }}
    >
      <div className={styles.container}>
        {fileLocal || fileUpload ? (
          <div className={styles["edit-avatar"]}>
            <AvatarEditor
              ref={setEditorRef}
              image={fileLocal ? URL.createObjectURL(fileLocal) : fileUpload}
              // width={250}
              // height={250}
              className={styles["avatar-editor"]}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
            />
            {fileLocal ? (
              <div className={styles["bottom-btn"]}>
                {" "}
                <Button
                  title="Cancel"
                  style={{ width: "5rem", marginRight: "1rem" }}
                />{" "}
                <Button
                  title="Save"
                  blue
                  style={{ width: "5rem" }}
                  onClick={handleSave}
                />
              </div>
            ) : (
              <div className={styles["bottom-btn"]}>
                <Button title="Change avatar" blue onClick={handleChangeImage} />
              </div>
            )}
          </div>
        ) : (
          <div className={styles["modal-upload"]}>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleChange}
              ref={inputFile}
              style={{ display: "none" }}
            />
            <Button
              onClick={() => inputFile.current.click()}
              title="Upload photos"
              ElementLeft={
                <AddIcon
                  style={{ fontSize: "1.4rem" }}
                  styleElementLeft={{ backgroundColor: "transparent" }}
                />
              }
            />

            {user?.listPicture?.length > 0 && (
              <div className={styles["list-img"]}>
                <span>Suggested images</span>
                <div>
                  {user?.listPicture?.map((item, idx) => {
                    return (
                      <img
                        onClick={() => setFileUpload(item?.url)}
                        src={item?.url}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalMUI>
  );
}

export default memo(ModalUpload);
