import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { database, onValue, refDatabase } from "../../config/firebase-config";
import ChildChat from "./ChildChat";




const Chat = (props: any) => {
  const { myPhone } = props;
  const navigate = useNavigate();

  const [users, setUsers] = useState<Array<string>>();
  const [yourPhone, setYourPhone] = useState("");

  useEffect(() => {
    onValue(refDatabase(database, `messages/${myPhone}`), data => {
      const getData: Array<string> = []
      for (const ele in data.exportVal()) {
        getData.push(ele)
      }
      setUsers(getData);
    })
  }, [myPhone]);

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      navigate("/home/chat/" + yourPhone)
    }
    setYourPhone(e.target.value);
  }

  return (
    <>
      <div className="container bg-light shadow bg-white">
        <div className="row">
          <div className="col-3">
            <div className="d-flex align-items-center chat-height-top border-bottom">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control border-radius bg-light shadow"
                  value={yourPhone}
                  onChange={(e) => handleSearch(e)}
                  onKeyDown={(e) => handleSearch(e)} />
              </div>
            </div>
            <div className="fs-5 m-2 fw-bold">
              <span className="header-color">MESSAGE</span>
            </div>
            <div className="nav-chat-item">
              {users?.map((item, index) => (
                <div
                  key={index}
                  className="p-2 li-nav d-flex flex-row align-items-center justify-content-between"
                  onClick={() => navigate("/home/chat/" + item)}
                >
                  <div>
                    <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="item-avatar-chat border me-3" />
                    <span className="fw-bold">{item}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="fw-bold border-top mb-2">
              <span className="m-3 p-3">Cài đặt ứng dụng trên AppStore</span>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Chat;