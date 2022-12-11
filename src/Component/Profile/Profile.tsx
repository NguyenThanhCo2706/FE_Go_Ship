import moment from "moment";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import userApi from "../../api/userApi";
import { URL_IMAGES } from "../../constraint";
import Order from "../../interfaces/Order";
import User from "../../interfaces/user";
import {
  refStorage,
  storage,
  uploadBytes,
  getDownloadURL,
  push,
  refDatabase,
} from "../../config/firebase-config";
import { Link } from "react-router-dom";
import Status from "../../interfaces/status";
import statusApi from "../../api/statusApi";
import classNames from "classnames";




const Profile = (props: any) => {
  const myPhone = props.phone;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [imageAvatar, setImageAvatar] = useState("");
  const [profile, setProfile] = useState<User>();
  const [history, setHistory] = useState<Array<Order>>([]);
  const [total, setTotal] = useState(0);
  const [listStatus, setListStatus] = useState<Array<Status>>([]);
  const [targetStatus, setTargetStatus] = useState(0);

  useEffect(() => {
    userApi.getDetail()
      .then((response) => {
        setProfile(response)
        setImageAvatar(response?.avatar_url as string);
        setAddress(response?.address?.address_notes as string);
        setBirthDate(response?.birth_date as string);
        setName(response?.name as string);
      })
      .catch((error) => {

      });
    orderApi.getHistoryOrder(1)
      .then((data) => {
        setTotal(data.total);
        setHistory((data.orders))
      })
      .catch((error) => {

      })
    statusApi.getList()
      .then((data) => {
        setListStatus(data)
      })
  }, []);

  const handleEdit = async () => {
    const user: User = {
      name: name,
      birth_date: birthDate,
      avatar_url: imageAvatar,
      address: {
        address_notes: address,
        longitude: 0,
        latitude: 0
      },
      distance_view: profile?.distance_view as number,
      gender: profile?.gender as number,
    }
    const aaa = await userApi.updateProfile(user as User);
    setProfile(aaa);
    setEdit(false);
  }

  const handleClickPagination = async (page: number) => {
    setHistory([])

    const data = await orderApi.getHistoryOrder(page)
    setTotal(data.total);
    setHistory(data.orders)
  }

  const Pagination = () => {
    const tmp = [];
    for (let i = 1; i <= Math.ceil(total / 10); i++) {
      tmp.push(
        <li
          className="page-item"
          key={i}
          onClick={() => { handleClickPagination(i) }}>
          <p className="page-link">{i}</p>
        </li>
      )
    }
    return <>
      {tmp}
    </>;
  }

  const openChooseFile = () => {
    var file: any = document.getElementById("upload-avatar");
    file.click();
  }

  const handleUpload = (e: any) => {
    const imageRef = refStorage(storage, `users/${myPhone}/${e.target.files![0].name}.jpg`);
    uploadBytes(imageRef, e.target.files![0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageAvatar(url)
      })
    })
  }

  const handleNavStatus = (id: number) => {
    setTargetStatus(id);
  }

  return (
    <div className="max-height">
      <div className="container-fluid">
        <div className="row bg-light ">
          <div className="col-8">
            <ul className="mt-4 nav nav-tabs bg-white">
              <li className="nav-item">
                <Link
                  className={classNames("nav-link", "fw-bold", { "active": targetStatus === 0 })}
                  aria-current="page"
                  onClick={(e) => handleNavStatus(0)}
                  to={""}
                >Tất cả</Link>
              </li>
              {
                listStatus?.map((item: Status, index: number) => {
                  return (
                    <li key={index} className="nav-item">
                      <Link
                        className={classNames("nav-link", "fw-bold", { "active": targetStatus === item.id })}
                        aria-current="page"
                        onClick={(e) => handleNavStatus(item.id)}
                        to={""}
                      >{item.title}</Link>
                    </li>
                  )
                })
              }
            </ul>
            <div className="bg-white border-top-0 me-0 ms-0 ">
              <table className="table table-striped table-responsive ">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Image Order</th>
                    <th scope="col">Location</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Description</th>
                    <th scope="col">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    history?.map((item, index) => {
                      if (index >= 10) return (<></>);
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>
                            <img
                              className="img-item-history"
                              src={item.img_order}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = URL_IMAGES.DEFAULT_IMG_ORDER
                              }}
                              alt=""
                            />
                          </td>
                          <td>{item.address_start.address_notes} </td>
                          <td>{item.address_end.address_notes} </td>
                          <td>{item.description} </td>
                          <td>{item.cost}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><p className="page-link">Previous</p></li>
                    <Pagination />
                    <li className="page-item"><p className="page-link">Next</p></li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
          <div className="col">
            <div className="bg-white p-4 mt-4 me-3 d-flex flex-column justify-content-center align-items-center border">
              {edit ?
                <>
                  <img
                    className="img-profile"
                    src={imageAvatar}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = URL_IMAGES.DEFAULT_AVATAR
                    }}
                    onClick={() => openChooseFile()}
                    alt="">
                  </img>
                  <input type="file" style={{ display: "none" }} id="upload-avatar" onChange={(e) => handleUpload(e)} />
                  <div className="m-3 w-100">
                    <input className="form-control rounded-pill text-center fs-5 fw-bold"
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="">
                    <div className="row g-3 align-items-center p-1">
                      <div className="col-1">
                        <i className="fa-solid fa-cake-candles me-2"></i>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="row g-3 align-items-center p-1">
                      <div className="col-1">
                        <i className="fa-solid fa-phone me-2"></i>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" type="text" value={myPhone} readOnly />
                      </div>
                    </div>
                    <div className="row g-3 align-items-center p-1">
                      <div className="col-1">
                        <i className="fa-solid fa-location-pin me-2"></i>
                      </div>
                      <div className="col-auto">
                        <input className="form-control"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </>
                :
                <>
                  <div>
                    <img
                      className="img-profile"
                      src={profile?.avatar_url}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = URL_IMAGES.DEFAULT_AVATAR
                      }}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h3 className="m-3">{profile?.name}</h3>
                    <div className="">
                      <div className="p-2">
                        <i className="fa-solid fa-cake-candles me-2"></i>
                        <span>{moment(profile?.birth_date).format("YYYY/MM/DD")}</span>
                      </div>
                      <div className="p-2">
                        <i className="fa-solid fa-phone me-2"></i>
                        <span>{myPhone}</span>
                      </div>
                      <div className="p-2">
                        <i className="fa-solid fa-location-pin me-2"></i>
                        <span>{profile?.address?.address_notes}</span>
                      </div>
                    </div>
                  </div>
                </>
              }
              <div className="m-3 d-flex flex-row">
                <span className="cover-item-icon d-flex align-items-center justify-content-center">
                  <img className="item-icon-img" src={process.env.PUBLIC_URL + "/images/icons8-facebook-48.png"} alt="" />
                </span>
                <span className="cover-item-icon d-flex align-items-center justify-content-center">
                  <img className="item-icon-img" src={process.env.PUBLIC_URL + "/images/icons8-instagram-30.png"} alt="" />
                </span>
                <span className="cover-item-icon d-flex align-items-center justify-content-center">
                  <img className="item-icon-img" src={process.env.PUBLIC_URL + "/images/icons8-zalo-48.png"} alt="" />
                </span>
                <span className="cover-item-icon d-flex align-items-center justify-content-center">
                  <img className="item-icon-img" src={process.env.PUBLIC_URL + "/images/icons8-skype-48.png"} alt="" />
                </span>
              </div>
              <div className="d-flex justify-content-end">
                {
                  edit ?
                    <>
                      <button className="btn btn-outline-danger me-3" onClick={() => setEdit(!edit)}>
                        <i className="fa-solid fa-ban"></i> Cancel
                      </button>
                      <button className="btn btn-outline-primary" onClick={() => handleEdit()} autoFocus>
                        <i className="fa-solid fa-check"></i> Save
                      </button>
                    </>
                    :
                    <button className="btn btn-secondary" onClick={() => setEdit(!edit)}>
                      <i className="fa-solid fa-pen-to-square"></i> Eidt
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
