
import { useEffect, useState } from "react";
import {
  database,
  refDatabase,
  onValue,
} from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const Chat = (props: any) => {
  const myPhone = props.phone;
  const [users, setUsers] = useState<Array<string>>();
  const [yourPhone, setYourPhone] = useState<string>("");
  const navigate = useNavigate();
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
    <div className="container-fluid">
      <div className="row max-height bg-white">
        <div className="col-3 border-end ">
          <div className="m-2">
            <div className="chat-title">
              <h4 className="fw-bold">Chat</h4>
            </div>
            <div className="chat-title">
              <input
                type="search"
                className="form-control rounded-pill bg-light"
                placeholder="Tìm kiếm trong thanh chat"
                value={yourPhone}
                onChange={(e) => handleSearch(e)}
                onKeyDown={(e) => handleSearch(e)}
              />
            </div>
            <div className="nav-chat-scroll" >
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
                  <div className="btn-img-upload">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </div >
  );
}

export default Chat;
