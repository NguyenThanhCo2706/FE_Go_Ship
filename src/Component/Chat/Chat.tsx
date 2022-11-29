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
  listAll,
  getDownloadURL
} from "../../config/firebase-config";
import { v4 } from "uuid";

const Chat = (props: any) => {
  const myPhone = props.phone;
  const [listMessages, setListMessages] = useState<Array<any>>([]);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [yourPhone, setYourPhone] = useState("")
  const [users, setUsers] = useState<Array<string>>();
  const [data, setData] = useState<Array<any>>();

  // useEffect(() => {
  //   if (myPhone === null || yourPhone === null) return;
  //   onValue(refDatabase(database, `messages/${myPhone}/${yourPhone}`), data => {
  //     const getMessage: Array<string> = [];
  //     data.forEach(message => {
  //       getMessage.push(message.val())
  //     })
  //     setListMessages(getMessage)
  //   })
  // }, [yourPhone, myPhone])

  // const handleClick = () => {
  //   push(refDatabase(database, `messages/${myPhone}/${yourPhone}`), {
  //     dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  //     image: "",
  //     messages: message,
  //     senderPhone: myPhone
  //   });
  //   push(refDatabase(database, `messages/${yourPhone}/${myPhone}`), {
  //     dateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  //     image: "",
  //     messages: message,
  //     senderPhone: myPhone
  //   })
  //   set(refDatabase(database, `messages/${yourPhone}/${myPhone}/isNew`), true)
  // }

  // const [imageUpload, setImageUpload] = useState<any>(null);

  // const handleUpload = () => {
  //   const imageRef = refStorage(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then(url => {
  //       setImageList((prev) => [...prev, url])
  //     })
  //   })
  // }
  // const imgListRef = refStorage(storage, `images/`);
  // const [imageList, setImageList] = useState<Array<any>>([]);
  // useEffect(() => {
  //   listAll(imgListRef).then(result => {
  //     result.items.forEach(item => {
  //       getDownloadURL(item).then(url => {
  //         setImageList((prev) => [...prev, url])
  //       })
  //     })
  //   })
  // }, [])

  useEffect(() => {
    onValue(refDatabase(database, `messages/${myPhone}`), data => {
      const getData: Array<string> = []
      for (const ele in data.exportVal()) {
        getData.push(ele)
      }
      setUsers(getData);
    })
  }, [])

  const naviChatUser = (yourPhone: string) => {
    onValue(refDatabase(database, `messages/${myPhone}/${yourPhone}`), data => {
      const getMessage: Array<string> = [];
      data.forEach(message => {
        getMessage.push(message.val())
      })
      setListMessages(getMessage)
    });
    setYourPhone(yourPhone);
  }
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
  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      naviChatUser(e.target.value)
    }
    console.log(e.key)
  }
  return (
    <div className="">
      <div className="row max-height">
        <div className="col-3 border-end border-start">
          <div className="chat-title">
            <div className="fw-bolder fs-4 p-1">Chat</div>
            <div className=" mt-1 mb-2">
              <input
                type="search"
                className="form-control rounded-pill bg-light fs-5"
                placeholder="Tìm kiếm trong thanh chat"
                onChange={(e) => handleSearch(e)}
                onKeyDown={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <div className="nav-chat-scroll">
            {users?.map((item, index) => (
              <div
                key={index}
                className="p-3 li-nav"
                onClick={() => naviChatUser(item)}
              >
                <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="item-avatar-chat border me-3" />
                <span className="fw-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-9">
          {yourPhone ?
            <>
              <div className="d-flex flex-column justify-content-between max-height">
                <div className="row flex-row flex-nowrap bg-light shadow-sm p-2  rounded chat-header">
                  <div className="col-4 m-1">
                    <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="item-avatar-chat border me-3" />
                    <span className="fw-bold">{yourPhone}</span>
                  </div>
                </div>
                <div className="chat-content p-2">
                  {listMessages?.map((item, index) => {
                    return (
                      <>
                        {item.senderPhone === myPhone ?
                          <div key={index} className="d-flex flex-row justify-content-end">
                            <div className="rounded-pill bg-primary text-white p-2 ps-3 pe-3 fs-5 m-1">{item.messages}</div>
                          </div>
                          : <></>
                        }
                        {
                          item.senderPhone === yourPhone ?
                            <div key={index} className="d-flex flex-row justify-content-start">
                              <div className="rounded-pill bg-secondary text-white p-2 ps-3 pe-3 fs-5 m-1">{item.messages}</div>
                            </div> : <></>
                        }
                      </>
                    )
                  }
                  )}
                </div>
                <div className="chat-input">
                  <div className="d-flex flex-row p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Aa"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                  </div>
                </div>
              </div>
            </>
            :
            <>
            </>
          }
        </div>
      </div>
    </div >

    // <div>


    //   <div>
    //     <input type="file" onChange={(e) => setImageUpload(e.target.files![0])} />
    //     <button onClick={handleUpload}>Upload</button>
    //   </div>
    //   {
    //     imageList?.map((item, index) => {
    //       return (
    //         <img key={index} src={item} alt="" />
    //       )
    //     })
    //   }



    //   <div>
    //     <label htmlFor="">My Phone</label>
    //     <input type="text" value={myPhone} onChange={(e) => setMyPhone(e.target.value)} />
    //   </div>
    //   <div>
    //     <label htmlFor="">Your Phone</label>
    //     <input type="text" value={yourPhone} onChange={(e) => setYourPhone(e.target.value)} />
    //   </div>
    //   <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
    //   <button onClick={handleClick}>Oke</button>
    //   <ul>
    //     {listMessages?.map((item, index) => {
    //       return (
    //         <div key={index}>{item.senderPhone}: {item.messages}</div>
    //       )
    //     })}
    //   </ul>
    // </div>
  );
}

export default Chat;