

const Home = () => {
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


      {/* <div className="container">
        <div className="row bg-light p-3">
          <div className="col-4 text-center">
            <img
              className="img-panel"
              src={process.env.PUBLIC_URL + "/images/panel2.jpg"}
              alt="" />
          </div>
          <div className="col-4 text-center">
            <img
              className="img-panel"
              src={process.env.PUBLIC_URL + "/images/panel1.jpg"}
              alt="" />
          </div>
          <div className="col-4 text-center">
            <img
              className="img-panel"
              src={process.env.PUBLIC_URL + "/images/panel3.jpg"}
              alt="" />
          </div>
        </div>
      </div> */}

      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="fs-5 mb-2 fw-bold">Danh Mục</div>
            <div>
              <div className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                <div className="background-icon me-3">
                  <i className="fa-solid fa-user fs-3"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-bold">Tài khoản</span>
                  <span>Thông tin cá nhân</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                <div className="background-icon me-3">
                  <i className="fa-solid fa-cart-plus fs-3"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-bold">Đơn hàng</span>
                  <span>Thêm một đơn hàng mới</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                <div className="background-icon me-3">
                  <i className="fa-solid fa-map fs-3"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-bold">Du lịch</span>
                  <span>Xem các Shiper gần bạn</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                <div className="background-icon me-3">
                  <i className="fa-solid fa-comment fs-3"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-bold">Nhắn tin</span>
                  <span>Trao đổi với các Shiper</span>
                </div>
              </div>
            </div>
          </div>


          {/* Order */}
          {/* <div className="col">
            <div className="fs-5 mb-2 fw-bold">Order</div>
            <div className="container-fluid border-radius">
              <div className="fw-bold p-2 ps-0">Chọn địa điểm cần giao dịch:</div>
              <div className="row mb-4">
                <div className="col-6">
                  <div className="d-flex flex-row p-2 border-radius">
                    <img className="size-map"
                      src="https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y"
                      alt="" />
                    <div className=" ms-3 d-flex flex-column">
                      <span className="fw-bold">New York</span>
                      <span className="fw-light">New York</span>
                      <span>Description</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex flex-row p-2 border-radius">
                    <img className="size-map"
                      src="https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y"
                      alt="" />
                    <div className=" ms-3 d-flex flex-column">
                      <span className="fw-bold">New York</span>
                      <span className="fw-light">New York</span>
                      <span>Description</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-4">
                  <div className="">
                    <label className="form-label fw-bold">Khoảng cách:</label>
                    <input type="text" className="form-control" readOnly />
                  </div>
                </div>
                <div className="col-4">
                  <div className="">
                    <label className="form-label fw-bold">Hình thức thanh toán:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-4">
                  <div className="">
                    <label className="form-label fw-bold">Hình thức giao hàng:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="fw-bold p-2 ps-0">Thông tin cần mô tả thêm:</div>
                <div className="mb-2">
                  <label className="form-label">Chi tiết đơn hàng:</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Ghi chú:</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Hình ảnh đơn hàng:</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".png, .jgp"
                  onChange={(e) => (e)}
                />
              </div>
              <div className="text-end mb-3">
                <span>Total:</span>
                <span className="fw-bold"> 30000 VNĐ</span>
              </div>
              <div className="mb-4 text-end">
                <button className="btn btn-primary">Đặt đơn</button>
              </div>
            </div>
          </div> */}


          {/* Profile */}
          {/* <div className="col">
            <div className="fs-5 mb-2 fw-bold">Tài Khoản</div>
            <div className="container-fluid border-radius">
              <div className="fw-bold p-3 ps-0">Thông tin cá nhân:</div>
              <div>
                <div className="mb-4">
                  <div className="mb-2">Avatar</div>
                  <div className="d-flex flex-row align-items-center">
                    <img className="size-map"
                      src="https://play-lh.googleusercontent.com/6f6MrwfRIEnR-OIKIt_O3VdplItbaMqtqgCNSOxcfVMCKGKsOdBK5XcI6HZpjssnB2Y"
                      alt="" />
                    <div className="ms-4 me-4">
                      <button className=" btn btn-outline-primary">Change</button>
                    </div>
                    <div>
                      <button className=" btn btn-outline-danger">Remove</button>
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <div className="">
                      <label className="form-label fw-bold">Họ và tên:</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="">
                      <label className="form-label fw-bold">Ngày sinh:</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row pb-4 mb-4 border-bottom">
                  <div className="col-6">
                    <div className="">
                      <label className="form-label fw-bold">Địa chỉ:</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="">
                      <label className="form-label fw-bold">Giới tính:</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between mb-4">
                <div>
                  <button className="btn btn-outline-dark">Log out</button>
                </div>
                <div>
                  <button className="btn btn-outline-secondary me-4">Hủy bỏ</button>
                  <button className="btn btn-outline-success">Lưu thay đổi</button>
                </div>
              </div>
            </div>            
          </div> */}



          {/* History */}
          <div className="col">
            <div className="fs-5 mb-2 fw-bold bg-light rounded-pill">
              <i className="fa-solid fa-house-chimney me-2"></i>
              <span>Lịch sử theo dõi đơn hàng</span>
            </div>
            <div className="border-start border-5 ps-3 mb-4">
              <div className="d-flex flex-column border-radius shadow p-1 ps-3 mb-3">
                <div>
                  <i className="fa-regular fa-clock me-2 text-success"></i>
                  <span>Sun Dec 18 2022 02:43:51</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-coins me-2 text-warning"></i>
                  <span>30.000 VNĐ</span>
                </div>
              </div>
              <div className="d-flex flex-column border-radius shadow p-1 ps-3 mb-3">
                <div>
                  <i className="fa-regular fa-clock me-2 text-success"></i>
                  <span>Sun Dec 18 2022 02:43:51</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-coins me-2 text-warning"></i>
                  <span>30.000 VNĐ</span>
                </div>
              </div>
              <div className="d-flex flex-column border-radius shadow p-1 ps-3 mb-3">
                <div>
                  <i className="fa-regular fa-clock me-2 text-success"></i>
                  <span>Sun Dec 18 2022 02:43:51</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-coins me-2 text-warning"></i>
                  <span>30.000 VNĐ</span>
                </div>
              </div>
              <div className="d-flex flex-column border-radius shadow p-1 ps-3 mb-3">
                <div>
                  <i className="fa-regular fa-clock me-2 text-success"></i>
                  <span>Sun Dec 18 2022 02:43:51</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-coins me-2 text-warning"></i>
                  <span>30.000 VNĐ</span>
                </div>
              </div>
              <div className="d-flex flex-column border-radius shadow p-1 ps-3 mb-3">
                <div>
                  <i className="fa-regular fa-clock me-2 text-success"></i>
                  <span>Sun Dec 18 2022 02:43:51</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-location-pin me-2 text-primary"></i>
                  <span>Quận Hải Châu, thành phố Đà Nẵng</span>
                </div>
                <div>
                  <i className="fa-solid fa-coins me-2 text-warning"></i>
                  <span>30.000 VNĐ</span>
                </div>
              </div>
            </div>



            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;