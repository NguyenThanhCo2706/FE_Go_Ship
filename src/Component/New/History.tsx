import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import { ViewOrder } from "../../interfaces/Order";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MESSAGES, STATUS, URL_IMAGES } from "../../constraint";
import classNames from "classnames";
import MessageBox from "../Commons/MessageBox";



const History = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Array<ViewOrder>>([]);
  const [total, setTotal] = useState(0);

  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    setWaiting(true);
    orderApi.getOrderByStatus(Number(searchParams.get("page")) || 1, Number(searchParams.get("status")) || undefined)
      .then((data) => {
        setTotal(data.total);
        setOrders((data.orders))
        setWaiting(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [searchParams])


  const Pagination = () => {
    if (total <= 5) {
      return <></>;
    }
    const tmp = [<li key={0} className="page-item">
      <div className="page-link hover" aria-label="Next">
        <span aria-hidden="true">&laquo;</span>
      </div>
    </li>];
    for (let i = 1; i <= Math.ceil(total / 5); i++) {
      tmp.push(
        <li
          key={i}
          className="page-item">
          <Link
            to={`/home/history?status=${targetStatus}&page=${i}`}
            className="page-link" >{i}</Link>
        </li>
      )
    }
    tmp.push(<li key={200} className="page-item">
      <div className="page-link hover" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </div>
    </li>);
    return (
      <>
        {tmp}
      </>
    );
  }
  const [targetStatus, setTargetStatus] = useState(0);

  return (
    <>
      <div className="col">
        <div className="mb-3">
          <ul className="nav nav-tabs bg-white">
            <li className="nav-item">
              <Link
                className={classNames("nav-link", "text-dark", "fw-bold", { "active": targetStatus === 0 })}
                aria-current="page"
                onClick={(e) => { setTargetStatus(0) }}
                to={""}
              >Tất cả</Link>
            </li>
            {
              STATUS?.map((item: any, index: number) => {
                return (
                  <li key={index} className="nav-item">
                    <Link
                      className={classNames("nav-link", { "text-dark": targetStatus !== item.id }, "fw-bold", { "active": targetStatus === item.id })}
                      aria-current="page"
                      onClick={() => { setTargetStatus(item.id) }}
                      to={`/home/history?status=${item.id}&page=1`}
                    >{item.value}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="border-start border-5 ps-3 mb-4">
          {
            orders?.map((item: ViewOrder, index: number) => {
              if (index > 4) return <></>;
              return (
                <div
                  onClick={() => navigate(`/home/history/detail/${item.id}`)}
                  key={index}
                  className="d-flex flex-row justify-content-between border-radius shadow p-1 ps-3 mb-4 hover">
                  <div className="d-flex flex-column">
                    <div>
                      <i className="fa-regular fa-clock me-2 text-success"></i>
                      <span>{new Date(item?.created_at || "").toLocaleString()}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-location-dot me-2 text-primary"></i>
                      <span>{item.address_start.address_notes}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-location-dot me-2 text-primary"></i>
                      <span>{item?.address_end.address_notes}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-coins me-2 text-warning"></i>
                      <span>{item?.cost} VNĐ</span>
                    </div>
                  </div>
                  <img className="item-order-image"
                    src={item?.img_order}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = URL_IMAGES.DEFAULT_IMG_ORDER
                    }}
                    alt="" />
                </div>
              )
            })
          }
        </div>
        <ul className="pagination justify-content-center">
          <Pagination />
        </ul>
      </div>
      {
        waiting ?
          <MessageBox
            title={MESSAGES.NOTIFICATION}
            icon="fa-solid fa-arrows-rotate text-danger"
            message={"Đang Xử Lý! Vui lòng chờ"}
            handleAcceptError={() => { }}
          />
          :
          <></>
      }
    </>
  )
}

export default History;
