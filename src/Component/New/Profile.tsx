import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import User from "../../interfaces/user";
import { GENDER, MESSAGES, URL_IMAGES } from "../../constraint";
import { getDownloadURL, refStorage, storage, uploadBytes } from "../../config/firebase-config";
import classNames from "classnames";
import MessageBox from "../Commons/MessageBox";



const Profile = (props: any) => {
  const { setAvatar, myPhone } = props;
  const [profile, setProfile] = useState<User>();
  const [oldProfile, setOldProfile] = useState<User>();
  const [disable, setDisable] = useState(false);
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    setWaiting(true);
    userApi.getDetail()
      .then((response) => {
        setOldProfile(response);
        setProfile(response);
        setWaiting(false);
      })
      .catch((error) => {

      });
  }, []);

  const handleChange = (e: any, typeEvent: string) => {
    setProfile((prev) => ({
      ...prev,
      [typeEvent]: e.target.value
    }))
  }

  const openChooseFile = () => {
    var file: any = document.getElementById("upload-avatar");
    file.click();
  }

  const handleUpload = (e: any) => {
    setDisable(true);
    const imageRef = refStorage(storage, `users/${myPhone}/${e.target.files![0].name}.jpg`);
    uploadBytes(imageRef, e.target.files![0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        setProfile((prev) => ({
          ...prev,
          avatar_url: url
        }))
        setDisable(false);
      })
    })
  }

  const handleRemoveAvatar = () => {
    setProfile((prev) => ({
      ...prev,
      avatar_url: ""
    }));
  }

  const handleCancel = () => {
    setProfile(oldProfile);
  }

  const handleSaveUpdate = async () => {
    setWaiting(true);
    const newProfile = await userApi.updateProfile(profile as User);
    setProfile(newProfile);
    setOldProfile(newProfile);
    setAvatar(newProfile.avatar_url);
    setWaiting(false);
  }
  return (
    <>
      <div className="col">
        <div className="fs-5 mb-3 fw-bold">Tài Khoản</div>
        <div className="container-fluid border-radius mb-4">
          <div className="fw-bold p-3 ps-0">Thông tin cá nhân:</div>
          <div>
            <div className="mb-4">
              <div className="mb-2">Avatar</div>
              <div className="d-flex flex-row align-items-center">
                <img className="avatar-profile"
                  src={profile?.avatar_url}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = URL_IMAGES.DEFAULT_AVATAR
                  }}
                  onChange={() => { }}
                  alt="" />
                <div className="ms-4 me-4">
                  <button
                    className=" btn btn-outline-primary"
                    onClick={() => openChooseFile()}>Change</button>
                </div>
                <div>
                  <button
                    className=" btn btn-outline-danger"
                    onClick={() => handleRemoveAvatar()}>Remove</button>
                </div>
                <input type="file" style={{ display: "none" }} id="upload-avatar" onChange={(e) => handleUpload(e)} />
                <input type="file" style={{ display: "none" }} id="upload-avatar" onChange={(e) => handleUpload(e)} />

              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <div className="">
                  <label className="form-label fw-bold">Họ và tên:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile?.name}
                    onChange={(e) => handleChange(e, "name")} />
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  <label className="form-label fw-bold">Ngày sinh:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={profile?.birth_date}
                    onChange={(e) => handleChange(e, "birth_date")} />
                </div>
              </div>
            </div>
            <div className="row pb-4 mb-4 border-bottom">
              <div className="col-6">
                <div className="">
                  <label className="form-label fw-bold">Địa chỉ:</label>
                  <input
                    type="text"
                    className="form-control" />
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  <label className="form-label fw-bold">Giới tính:</label>
                  <select
                    className="form-select"
                    value={profile?.gender}
                    onChange={(e) => handleChange(e, "gender")}>
                    {GENDER?.map((item, index: number) => (
                      <option key={index} value={item.id}>{item.value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between mb-4">
            <div>
              <button className="btn btn-outline-dark">Log out</button>
            </div>
            <div>
              <button
                className="btn btn-outline-secondary me-4"
                onClick={() => handleCancel()}> Hủy bỏ</button>
              <button
                className={classNames("btn", " btn-outline-success", { "disabled": disable })}
                onClick={() => handleSaveUpdate()} >Lưu thay đổi</button>
            </div>
          </div>
        </div>
      </div>
      {
        waiting ?
          <MessageBox
            title={MESSAGES.NOTIFICATION}
            icon="fa-solid fa-arrows-rotate text-danger"
            message={"Đang Xử Lý! Vui lòng chờ"}
            handleAcceptError={() => { }}
          />
          :
          <></>
      }
    </>
  )
}

export default Profile;
