import moment from "moment";
import { Fragment, useEffect, useState } from "react";
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
import { caculateAge, changeFormateDate } from "../../utils";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

const ChildChat = (props: any) => {
  const { myPhone } = props;
  const params: any = useParams();
  const [ortherUser, setOtherUser] = useState<User>();
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [listMessages, setListMessages] = useState<Array<any>>([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [viewList, setViewList] = useState<Array<any>>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setVisibleDetail(false);
    setMessage("");
    setPage(1);
  }, [params.yourPhone])
  console.log(jwt_decode(localStorage.getItem("token") || ""));

  const sendMessage = () => {
    push(refDatabase(database, `messages/${myPhone}/${params.yourPhone}`), {
      dateTime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
      image: "",
      messages: message,
      senderPhone: myPhone
    });
    push(refDatabase(database, `messages/${params.yourPhone}/${myPhone}`), {
      dateTime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
      image: "",
      messages: message,
      senderPhone: myPhone
    });
    set(refDatabase(database, `users/${myPhone}`), {
      avatar: (jwt_decode(localStorage.getItem("token") || "") as any).avatar_url,
      name: myPhone,
      phone: myPhone
    });
    set(refDatabase(database, `messages/${params.yourPhone}/${myPhone}/isNew`), true);
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
    let ref;
    const date = new Date().toISOString();
    if (typeUpload === "IMAGE") {
      ref = refStorage(storage, `messages/${myPhone}/${date}.jpg`);
    }
    else {
      ref = refStorage(storage, `messages/${myPhone}/${date}.mp4`);
    }
    uploadBytes(ref, e.target.files![0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        push(refDatabase(database, `messages/${myPhone}/${params.yourPhone}`), {
          dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          image: url,
          messages: "",
          senderPhone: myPhone
        });
        push(refDatabase(database, `messages/${params.yourPhone}/${myPhone}`), {
          dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          image: url,
          messages: "",
          senderPhone: myPhone
        })
        set(refDatabase(database, `messages/${params.yourPhone}/${myPhone}/isNew`), true);
      })
    })
  }

  useEffect(() => {
    console.log("a");

    setViewList(listMessages.slice(Math.max(listMessages.length - 20 * page, 0)))
  }, [listMessages, page])

  const viewDetailUser = async () => {
    if (visibleDetail) {
      setOtherUser({} as User);
      setVisibleDetail(false);
      return;
    }
    setVisibleDetail(!visibleDetail);
    try {
      const user = await userApi.getDetailByPhone(params.yourPhone);
      setOtherUser(user);
    }
    catch (err) {
    }
  }

  useEffect(() => {

    onValue(refDatabase(database, `messages/${myPhone}/${params.yourPhone}`), data => {
      console.log(data);

      const getMessage: Array<string> = [];
      data.forEach(message => {
        getMessage.push(message.val())
      })
      setListMessages(getMessage)
    });
  }, [myPhone, params.yourPhone]);

  useEffect(() => {
    const element: any = document.getElementById("scroll-chat");
    if (element) {
      element.scrollTop = element?.scrollHeight;
    }
  }, [viewList]);

  return (
    <>
      <div className="col d-flex border-start">
        {params.yourPhone ?
          <>
            <div className="d-flex w-100 flex-column justify-content-between max-height">
              <div className="d-flex flex-row bg-light justify-content-between chat-height-top shadow-sm chat-header">
                <div className="m-1">
                  <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="item-avatar-chat border me-3" />
                  <span className="fw-bold">{params.yourPhone}</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="btn-img-upload bg-white" onClick={() => viewDetailUser()}>
                    <i className="fa-solid fa-info"></i>
                  </div>
                </div>
                {
                  visibleDetail ?
                    ortherUser?.name ?
                      <div className="d-flex flex-column align-items-center detail-other-user border p-2 mb-4">
                        <img
                          className="avatar-other-user"
                          src={ortherUser?.avatar_url}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = URL_IMAGES.DEFAULT_AVATAR
                          }}
                          alt=""
                        />
                        <div className="fs-5 fw-bold">{ortherUser?.name}</div>
                        <div className="d-flex flex-row justify-content-around w-100">
                          <div><i className="fa-solid fa-cake-candles"></i> {caculateAge(ortherUser?.birth_date as string)}</div>
                          <div><i className="fa-solid fa-user"></i>{ortherUser?.gender === 1 ? "Nam" : undefined} {ortherUser?.gender === 2 ? "Nữ" : undefined}</div>
                        </div>
                      </div>
                      :
                      <div className="detail-other-user border text-center">
                        No Info
                      </div>
                    :
                    <></>
                }
              </div>

              <div className="chat-content p-2" id="scroll-chat">
                {
                  listMessages.length > 20 * page ?
                    <div
                      onClick={() => setPage(page + 1)}
                      className="d-flex flex-row justify-content-center fs-6 text-primary hover">Load more</div>
                    : undefined
                }
                {listMessages ? viewList?.map((item, index, array) => {
                  if (typeof item == "boolean") return <Fragment key={index}></Fragment>;
                  const date1 = dayjs(changeFormateDate(item.dateTime));
                  let diffTime = -1;
                  if (index > 0) {
                    diffTime = date1.diff(changeFormateDate(array[index - 1]?.dateTime), 'minute', true);
                  }
                  return (
                    <div key={index}>
                      {
                        diffTime > 10 || diffTime < 0 ?
                          <div className="d-flex flex-row justify-content-center fs-6">{item.dateTime}</div>
                          :
                          <></>
                      }
                      {item.senderPhone === myPhone ?
                        <div className="d-flex flex-row justify-content-end">
                          {
                            item.image ?
                              item.image.includes("jpg") ?
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
                              <div className="rounded-pill bg-primary text-white p-2 ps-3 pe-3 m-1 mw-50">{item.messages}</div>
                              :
                              <></>
                          }
                        </div>
                        : <></>
                      }
                      {
                        item.senderPhone === params.yourPhone ?
                          <div className="d-flex flex-row justify-content-start">
                            {
                              item.image ?
                                item.image.includes("jpg") ?
                                  <img src={item.image} alt="" className="img-chat-content m-1" />
                                  :
                                  <video className="img-chat-content m-1">
                                    <source src={item.image} />
                                  </video>
                                :
                                <></>
                            }
                            {
                              item.messages ?
                                <div className="rounded-pill bg-secondary text-white p-2 ps-3 pe-3 m-1 mw-50">{item.messages}</div>
                                :
                                <></>
                            }
                          </div> : <></>
                      }
                    </div>
                  )
                }
                ) : undefined}
              </div>
              <div className="chat-input border-top">
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
