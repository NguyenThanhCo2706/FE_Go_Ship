import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import User from "../../interfaces/user";




const Profile = () => {
  const [profile, setProfile] = useState<User>();
  useEffect(() => {
    userApi.getDetail()
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {

      })
  }, [])
  return (
    <div className="max-height">
      <div className="">
        <div className="row border bg-light pt-2 pb-2 fs-5">
          <div className="col-6">
            <div>
              <i className="fa-solid fa-list"></i>
            </div>
          </div>
          <div className="d-flex col-6 justify-content-end fw-bolder">
            <div className="me-5">
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              <span>Log out</span>
            </div>
          </div>
        </div>

        <div className="row border pt-2 pb-2 bg-white">
          <div>
            <h4>My Profile</h4>
          </div>
          <div className="fst-italic">
            <span>Home/My Profile</span>
          </div>
        </div>
      </div>
      <div className="row bg-light ">
        <div className="col-7 overflow-auto h-100">
          <div className="bg-white m-4 me-0 ms-0">
            Colin
          </div>
        </div>
        <div className="col-5">
          <div className="bg-white p-4 m-4 ms-0 d-flex flex-column justify-content-center align-items-center border">
            <img src={process.env.PUBLIC_URL + "/images/person-icon.png"} alt="" />
            <h2 className="m-3">Nguyễn Thanh Cơ</h2>
            <div className="border-top">
              <div className="p-1">
                <i className="fa-solid fa-cake-candles me-2"></i>
                <span>Birth Day asd ádasdasdas</span>
              </div>
              <div className="p-1">
                <i className="fa-solid fa-phone me-2"></i>
                <span>Phone</span>
              </div>
              <div className="p-1">
                <i className="fa-solid fa-location-pin me-2"></i>
                <span>Địa chỉ</span>
              </div>
              <div className="p-1">
                <i className="fa-solid fa-cake-candles me-2"></i>
                <span>Birth Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile