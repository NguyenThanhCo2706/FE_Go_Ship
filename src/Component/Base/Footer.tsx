import "./style.css"

const Footer = () => {
  return (
    <div className="bg-dark text-white p-5">
      <div className="container">
        <div className="row">
          <div className="col-3 d-flex flex-column justify-content-around">
            <h1>GoShip</h1>
          </div>
          <div className="col-3 d-flex flex-column justify-content-around">
            <h1>Contact Info</h1>
          </div>
          <div className="col-3 d-flex flex-column justify-content-around">
            <h1>Quick Links</h1>
          </div>
          <div className="col-3 d-flex flex-column justify-content-around">
            <h1>Newsletter</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-3 d-flex flex-column justify-content-around">

            <span>Công ty giao nhận đầu tiên tại Việt Nam được thành lập với sứ mệnh phục vụ nhu cầu vận chuyển chuyên nghiệp của các đối tác Thương mại điện tử trên toàn quốc</span>
            <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="img-logo" />
          </div>
          <div className="col-3 d-flex flex-column justify-content-around">

            <div>
              <i className="fa-solid fa-phone me-2"></i>
              <span>+0777-333-765</span>
            </div>
            <div>
              <i className="fa-solid fa-phone me-2"></i>
              <span>+0941-383-449</span>
            </div>
            <div>
              <i className="fa-regular fa-envelope me-2"></i>
              <span>huyledut@gmail.com</span>
            </div>
            <div>
              <i className="fa-solid fa-location-pin me-2"></i>
              <span>54 nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</span>
            </div>
          </div>
          <div className="col-3 d-flex flex-column justify-content-around">
            <p>Trang chủ</p>
            <p>Dịch vụ</p>
            <p>Tuyển dụng</p>
            <p>Về chúng tôi</p>
          </div>
          <div className="col-3 d-flex flex-column justify-content-around">
            <p>Subscribe For Lastest Updates</p>
            <input type="text" placeholder="Your mail" className="form-control" />
            <button className="form-control text-primary fw-bold">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;