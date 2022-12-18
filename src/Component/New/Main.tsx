

const Main = () => {
  return (
    <>
      <div className="header d-flex align-items-center border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="d-flex flex-row align-items-center height-content-nav">
                <div className="d-flex flex-column me-5">
                  <span className="fs-5 fw-bold">GoShip</span>
                  <span className="fs-6 fw-bold header-color">Delivery</span>
                </div>
                <div className="input-group w-50">
                  <input type="text" className="form-control border-radius bg-light" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-row justify-content-around align-items-center">
                <div className="d-flex flex-row justify-content-between align-items-center fw-bold fs-5 w-50">
                  <div className="nav-header-item">Restaurants</div>
                  <div className="nav-header-item">Deal</div>
                  <div className="nav-header-item">My Order</div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div className="background-icon ms-2 me-3">
                    <i className="fa-solid fa-bag-shopping header-color fs-5"></i>
                  </div>
                  <div >
                    <img
                      className="nav-avatar border"
                      src="https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y"
                      alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="container">
        <div className="mb-5">
          <h2 className="text-center mb-5">Vô vàn tiện ích chúng tôi đem lại để phục vụ bạn</h2>
          <div className="d-flex flex-row justify-content-evenly fs-5">
            <div className="d-flex flex-column align-items-end justify-content-evenly">
              <div className="d-flex flex-row">
                <div className="d-flex flex-column align-items-end">
                  <span className="fw-bold">Giao Hàng</span>
                  <span>Giao hàng ngay chỉ từ 15 phút</span>
                </div>
                <img
                  className="home-img-item ms-2"
                  src={process.env.PUBLIC_URL + "/images/app-icon-01.png"}
                  alt="" />
              </div>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column align-items-end">
                  <span className="fw-bold">Đồ Ăn</span>
                  <span>Món ngon mọi lúc, mọi nơi</span>
                </div>
                <img
                  className="home-img-item ms-2"
                  src={process.env.PUBLIC_URL + "/images/app-icon-03.png"}
                  alt="" />
              </div>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column align-items-end">
                  <span className="fw-bold">Mua Hộ Thuốc</span>
                  <span>Đặt thuốc chỉ với 1 chạm</span>
                </div>
                <img
                  className="home-img-item ms-2"
                  src={process.env.PUBLIC_URL + "/images/app-icon-05.png"}
                  alt="" />
              </div>
            </div>
            <div>
              <img
                className="home-img-content"
                src={process.env.PUBLIC_URL + "/images/home-502x1024.png"}
                alt="" />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-evenly">
              <div className="d-flex flex-row">
                <img
                  className="home-img-item me-2"
                  src={process.env.PUBLIC_URL + "/images/app-icon-02.png"}
                  alt="" />
                <div className="d-flex flex-column align-items-start">
                  <span className="fw-bold">Giao Hàng</span>
                  <span>Giao hàng ngay chỉ từ 15 phút</span>
                </div>
              </div>
              <div className="d-flex flex-row">
                <img
                  className="home-img-item me-2"
                  src={process.env.PUBLIC_URL + "/images/app-icon-04.png"}
                  alt="" />
                <div className="d-flex flex-column align-items-start">
                  <span className="fw-bold">Đồ Ăn</span>
                  <span>Món ngon mọi lúc, mọi nơi</span>
                </div>
              </div>
              <div className="d-flex flex-row">
                <img
                  className="home-img-item me-2"
                  src={process.env.PUBLIC_URL + "/images/app-icon-06.png"}
                  alt="" />
                <div className="d-flex flex-column align-items-start">
                  <span className="fw-bold">Mua Hộ Thuốc</span>
                  <span>Đặt thuốc chỉ với 1 chạm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="text-center mb-5">GoShip lun quan tâm đến trải nghiệm của bạn</h2>
          <div className="d-flex flex-row justify-content-evenly fs-5">
            <div className="d-flex flex-column w-50">
              <div className="">
                <span className="fw-bold">1. Nhanh Chóng</span>
                <p>Sử dụng công nghệ 4.0, HeyU giúp bạn tìm tài xế giao hàng gần nhất,
                  đảm bảo hàng hoá được vận chuyển đến tận tay người nhận trong khoảng thời gian ngắn nhất.</p>
              </div>
              <div className="">
                <span className="fw-bold">2. An Toàn</span>
                <p>HeyU đảm bảo đơn hàng sẽ được giao nguyên vẹn đến tận tay khách hàng.
                  Đền bù 100% giá trị đơn hàng tối đa lên đến 5.000.000 đồng trong trường hợp xảy ra mất mát, hư hỏng.</p>
              </div>
              <div className="">
                <span className="fw-bold">3. Tiết Kiệm</span>
                <p>Khách hàng và tài xế có thể gọi điện, nhắn tin ngay trên ứng dụng.
                  Tính toán và đưa ra quãng đường ngắn nhất để tối ưu thời gian, chi phí cho Khách hàng và Tài xế.</p>
              </div>
              <div className="">
                <span className="fw-bold">4. Hỗ trợ 24/7</span>
                <p>Tổng đài Chăm sóc khách hàng 24/7 sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.
                  Nỗ lực hết mình để giải quyết vấn đề một cách nhanh chóng và kịp thời nhất</p>
              </div>
            </div>

            <div>
              <img
                className="home-img-content"
                src={process.env.PUBLIC_URL + "/images/home-502x1024.png"}
                alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;