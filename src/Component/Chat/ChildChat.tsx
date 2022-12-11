import moment from "moment";
import { useEffect, useState } from "react";
import {
  database,
  refDatabase,
  refStorage,
  push,
  onValue,
  set,
  storage,
  uploadBytes,
  getDownloadURL
} from "../../config/firebase-config";
import dayjs from "dayjs";
import userApi from "../../api/userApi";
import User from "../../interfaces/user";
import { URL_IMAGES } from "../../constraint";
import { caculateAge } from "../../utils";

import { useParams } from "react-router-dom"

const ChildChat = (props: any) => {
  const params: any = useParams();
  const yourPhone = params.yourPhone;
  const myPhone = props.myPhone;
  const [ortherUser, setOtherUser] = useState<User>();
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [listMessages, setListMessages] = useState<Array<any>>([]);
  const [typeUpload, setTypeUpload] = useState("");

  useEffect(() => {
    setVisibleDetail(false);
    setMessage("");
  }, [params])

  const sendMessage = () => {
    push(refDatabase(database, `messages/${myPhone}/${yourPhone}`), {
      dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      image: "",
      messages: message,
      senderPhone: myPhone
    });
    push(refDatabase(database, `messages/${yourPhone}/${myPhone}`), {
      dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      image: "",
      messages: message,
      senderPhone: myPhone
    })
    set(refDatabase(database, `messages/${yourPhone}/${myPhone}/isNew`), true);
    setMessage("");
  }

  const openChooseFile = () => {
    setTypeUpload("IMAGE");
    var file: any = document.getElementById("chat-upload-img");
    file.click();
  }

  const openChooseFileVideo = () => {
    setTypeUpload("VIDEO");
    var file: any = document.getElementById("chat-upload-video");
    file.click();
  }

  const handleUpload = (e: any) => {
    let imageRef;
    if (typeUpload === "IMAGE") {
      imageRef = refStorage(storage, `messages/${myPhone}/${e.target.files![0].name}.jpg`);
    }
    else {
      imageRef = refStorage(storage, `messages/${myPhone}/${e.target.files![0].name}.mp4`);
    }
    uploadBytes(imageRef, e.target.files![0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        push(refDatabase(database, `messages/${myPhone}/${yourPhone}`), {
          dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          image: url,
          messages: "",
          senderPhone: myPhone
        });
        push(refDatabase(database, `messages/${yourPhone}/${myPhone}`), {
          dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          image: url,
          messages: "",
          senderPhone: myPhone
        })
        set(refDatabase(database, `messages/${yourPhone}/${myPhone}/isNew`), true);
      })
    })
  }

  const viewDetailUser = async () => {
    if (visibleDetail) {
      setOtherUser({} as User);
      setVisibleDetail(false);
      return;
    }
    setVisibleDetail(!visibleDetail);
    try {
      const user = await userApi.getDetailByPhone(yourPhone);
      setOtherUser(user);
    }
    catch (err) {
    }
  }

  useEffect(() => {
    onValue(refDatabase(database, `messages/${myPhone}/${yourPhone}`), data => {
      const getMessage: Array<string> = [];
      data.forEach(message => {
        getMessage.push(message.val())
      })
      setListMessages(getMessage)
    });
  }, [myPhone, yourPhone]);

  useEffect(() => {
    const element: any = document.getElementById("scroll-chat");
    console.log(element)
    if (element) {
      element.scrollTop = element?.scrollHeight;
    }
  }, [listMessages]);

  return (
    <>
      <div className="col ">
        {yourPhone ?
          <>
            <div className="d-flex flex-column justify-content-between max-height">
              <div className="d-flex flex-row bg-light justify-content-between shadow-sm p-2 chat-header">
                <div className="m-1">
                  <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="item-avatar-chat border me-3" />
                  <span className="fw-bold">{yourPhone}</span>
                </div>
                <div>
                  <div className="m-1 me-4 btn-img-upload bg-white" onClick={() => viewDetailUser()}>
                    <i className="fa-solid fa-info"></i>
                  </div>
                  {visibleDetail ?
                    ortherUser?.name ?
                      <div className="d-flex flex-column align-items-center detail-other-user border p-2">
                        <img
                          className="avatar-other-user"
                          src={ortherUser?.avatar_url}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = URL_IMAGES.DEFAULT_IMG_ORDER
                          }}
                          alt=""
                        />
                        <div className="fs-5 fw-bold">{ortherUser?.name}</div>
                        <div className="ms-2">
                          <div><i className="fa-solid fa-cake-candles"></i> {caculateAge(ortherUser?.birth_date as string)}</div>
                          <div><i className="fa-solid fa-user"></i> {ortherUser?.gender === 0 ? "Nữ" : "Nam"}</div>
                          <div><i className="fa-solid fa-location-pin"></i> {ortherUser?.address?.address_notes}</div>
                        </div>
                      </div>
                      :
                      <div className="detail-other-user border text-center">
                        No Info
                      </div>
                    :
                    <></>}
                </div>
              </div>
              <div className="chat-content p-2" id="scroll-chat">
                {listMessages?.map((item, index, array) => {
                  const date1 = dayjs(item.dateTime);
                  const diffTime = date1.diff(array[index - 1]?.dateTime, 'minute', true);
                  console.log(item.image.substring(item.image.length - 3))
                  return (
                    <div key={index}>
                      {
                        diffTime > 10 || diffTime < 0 ?
                          <div className="d-flex flex-row justify-content-center fs-6">{new Date(item.dateTime).toLocaleString()}</div>
                          :
                          <></>
                      }

                      {item.senderPhone === myPhone ?
                        <div className="d-flex flex-row justify-content-end">
                          {
                            item.image ?
                              item.image.substring(item.image.length - 3) === "jpg" ?
                                <img src={item.image} alt="" className="img-chat-content m-1" />
                                :
                                <video className="img-chat-content m-1" controls>
                                  <source src={item.image} />
                                </video>
                              :
                              <></>
                          }
                          {
                            item.messages ?
                              <div className="rounded-pill bg-primary text-white p-2 ps-3 pe-3 m-1">{item.messages}</div>
                              :
                              <></>
                          }
                        </div>
                        : <></>
                      }
                      {
                        item.senderPhone === yourPhone ?
                          <div className="d-flex flex-row justify-content-start">
                            {
                              item.image ?
                                item.image.substring(item.image.length - 3) === "jpg" ?
                                  <img src={item.image} alt="" className="img-chat-content m-1" />
                                  :
                                  <video>
                                    <source src={item.image} />
                                  </video>
                                :
                                <></>
                            }
                            {
                              item.messages ?
                                <div className="rounded-pill bg-secondary text-white p-2 ps-3 pe-3 m-1">{item.messages}</div>
                                :
                                <></>
                            }
                          </div> : <></>
                      }
                    </div>
                  )
                }
                )}
              </div>
              <div className="chat-input">
                <div className="d-flex flex-row p-2">
                  <div className="btn-img-upload" onClick={openChooseFile}>
                    <i className="fa-solid fa-image">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="chat-upload-img"
                        onChange={(e) => handleUpload(e)
                        }
                        accept=".png, .jgp"
                      />
                    </i>
                  </div>
                  <div className="btn-img-upload" onClick={openChooseFileVideo}>
                    <i className="fa-solid fa-video">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="chat-upload-video"
                        onChange={(e) => handleUpload(e)}
                        accept="video/mp4,video/x-m4v,video/*" />
                    </i>
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Aa"
                    value={message}
                    onKeyDown={(e) => e.key === "Enter" ? sendMessage() : undefined}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="btn btn-outline-primary ms-2 pe-4 ps-4 d-flex flex-row align-items-center" onClick={sendMessage}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
          :
          <>
          </>
        }
      </div>
    </>
  )
}

export default ChildChat
