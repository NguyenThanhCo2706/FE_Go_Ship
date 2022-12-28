import { Params, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import googleMapApi from "../../api/googleMapApi";
import Address from "../../interfaces/address";
import orderApi from "../../api/orderApi";
import { ViewOrder } from "../../interfaces/Order";
import statusApi from "../../api/statusApi";
import Status from "../../interfaces/status";
import moment from "moment";
import { MESSAGES, STATUS, URL_IMAGES } from "../../constraint";
import classNames from "classnames";
import { generateImageMarker } from "../../utils/generalMarker";
import MessageBox from "../Commons/MessageBox";


const Detail = () => {
  const params: Readonly<Params<string>> = useParams();

  const [order, setOrder] = useState<ViewOrder>();
  console.log(order);
  const [rating, setRating] = useState(0);
  const [feedBack, setFeedback] = useState("");
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    setWaiting(true)
    orderApi.getDetailOrder(Number(params.id)).then((data: ViewOrder) => {
      setOrder(data);
      new mapboxgl.Marker({
        element: generateImageMarker("marker-person.png"),
        draggable: true
      }).setLngLat([data.address_start.longitude, data.address_start.latitude]).addTo(map.current);
      new mapboxgl.Marker({
        element: generateImageMarker("marker.png"),
        draggable: true
      }).setLngLat([data.address_end.longitude, data.address_end.latitude]).addTo(map.current);
      map.current.setCenter(
        [(Number(data.address_start.longitude) + Number(data.address_end.longitude)) / 2,
        (Number(data.address_start.latitude) + Number(data.address_end.latitude)) / 2]
      );
      setWaiting(false);
    })
    statusApi.getList().then((data: Array<Status>) => {
    })
  }, []);
  const navigate = useNavigate();

  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [marker, setMarker] = useState<any>([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 12
      });
      map.current.on("click", (e: any) => {
        const node = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map.current)
        setMarker((prev: any) => [...prev, node]);
        googleMapApi.getNameByLocation(e.lngLat.lng, e.lngLat.lat).then((data: Address) => {
          // setAddress(data)
        })
      });
    }, (error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    if (marker.length > 1) {
      const markerDel = marker.shift();
      markerDel.remove();
      setMarker(marker);
    }
  }, [marker])

  const handleRating = (e: any) => {
    setRating(+e.target.value);
  }
  const submitRating = async () => {
    console.log(order?.id, feedBack, rating);

    const newOrder = await orderApi.ratingOrder(order?.id || 0, feedBack, rating);
    setOrder(newOrder);
  }
  return (
    <>
      <div className="container bg-light shadow bg-white pt-1">
        <div className="fs-5 m-2 fw-bold" onClick={() => navigate("/home/history")}>
          <i className="fa-solid fa-arrow-left me-2 header-color"></i>
          <span className="hover">Quay lại</span>
        </div>
        <div className="row p-1">
          <div className="col-7">
            <div className="border p-3 rounded-3 mb-4">
              <div className="d-flex flex-row justify-content-between mb-2">
                <div>
                  <span className="fw-bold fs-5 me-2">Tình Trạng</span>
                  <span>ID{order?.id || 0}</span>
                </div>
                <div>
                  <span className="me-2">{order?.address_start.address_notes}</span>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between mb-4">
                <div>
                  <i className="fa-solid fa-circle-small"></i>
                  <span className="fw-bold">{order?.status.description}</span>
                </div>
                <div>
                  <span className="me-2">{moment(order?.created_at).format("YYYY/MM/DD hh:mm:ss")}</span>
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
              </div>

              <div className="d-flex flex-row justify-content-between">
                {
                  STATUS.map((item: any, index: number) => {
                    if (order?.status.id === 5 && index + 1 === 4) {
                      return (<></>);
                    }
                    const active = index < Number(order?.status.id) || 0;
                    return (
                      <Fragment key={index}>
                        <div className="d-flex flex-column align-items-center">
                          <div className="">
                            <div
                              className={classNames("status-period", "ms-4", "me-4", { "bg-success": active }, { "text-white": active }, { "bg-light": !active })}
                            >
                              <i className="fa-solid fa-check"></i>
                            </div>
                          </div>
                          <span className="text-center">{item.value}</span>
                        </div>
                        {index < 4 ? <div className="status-line"></div> : <></>}
                      </Fragment>
                    )
                  })
                }
              </div>
            </div>

            <div className="border p-3 rounded-3 mb-4">
              <div className="fs-5 fw-bold mb-3">Chi tiết đơn hàng</div>
              <div className="d-flex flex-row">
                <img
                  className="image-detail-order border shadow"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = URL_IMAGES.DEFAULT_IMG_ORDER
                  }}
                  src={order?.img_order}
                  alt="" />
                <div className="ms-3">
                  <div className="fw-bold">{order?.customer_notes}</div>
                  <div>{order?.description}</div>
                </div>
              </div>
            </div>
            {
              order?.status.id === 5 ?
                <div className="border p-3 mb-4">
                  <div className="fs-5 fw-bold">Đánh giá</div>
                  <div className='rating-wrap '>
                    {
                      order?.rate ?
                        <>
                          <div className='rating'>
                            <input type='radio' name='rating' value='5' id='5' checked={order?.rate.rate === 5} />
                            <label htmlFor={'5'}>☆</label>
                            <input type='radio' name='rating' value='4' id='4' checked={order?.rate.rate === 4} />
                            <label htmlFor={'4'}>☆</label>
                            <input type='radio' name='rating' value='3' id='3' checked={order?.rate.rate === 3} />
                            <label htmlFor={'3'}>☆</label>
                            <input type='radio' name='rating' value='2' id='2' checked={order?.rate.rate === 2} />
                            <label htmlFor={'2'}>☆</label>
                            <input type='radio' name='rating' value='1' id='1' checked={order?.rate.rate === 1} />
                            <label htmlFor={'1'}>☆</label>
                          </div>
                          <div>{order?.rate.feedback}</div>
                        </>
                        :
                        <>
                          <div className='rating'>
                            <input type='radio' name='rating' value='5' id='5' checked={rating === 5} onChange={(e) => handleRating(e)} />
                            <label htmlFor={'5'}>☆</label>
                            <input type='radio' name='rating' value='4' id='4' checked={rating === 4} onChange={(e) => handleRating(e)} />
                            <label htmlFor={'4'}>☆</label>
                            <input type='radio' name='rating' value='3' id='3' checked={rating === 3} onChange={(e) => handleRating(e)} />
                            <label htmlFor={'3'}>☆</label>
                            <input type='radio' name='rating' value='2' id='2' checked={rating === 2} onChange={(e) => handleRating(e)} />
                            <label htmlFor={'2'}>☆</label>
                            <input type='radio' name='rating' value='1' id='1' checked={rating === 1} onChange={(e) => handleRating(e)} />
                            <label htmlFor={'1'}>☆</label>
                          </div>
                          <textarea
                            value={feedBack}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="form-control mb-3"
                            placeholder="Nhập đánh giá của bạn..."></textarea>
                          <button
                            onClick={() => submitRating()}
                            className="btn btn-outline-success">Gửi
                          </button>
                        </>
                    }

                  </div>
                </div>
                : <></>
            }
          </div>

          <div className="col">
            <div className="border p-3 rounded-3 mb-4">
              <div className="fs-5 mb-2 fw-bold">
                <i className="fa-solid fa-list me-2 header-color"></i>
                <span className="">Địa chỉ </span>
              </div>
              <div ref={mapContainer} className="detail-map mb-2" />
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <span className="fw-bold">{order?.address_end.address_notes}</span>
                </div>
                <span className="fw-light">{order?.distance.toFixed(1) + " km"}</span>
              </div>
            </div>

            <div className="border p-3 rounded-3 mb-4">
              <div className="fs-5 fw-bold mb-3">Hóa đơn</div>
              <div className="d-flex flex-column border border-3 border-primary p-3 mb-3 bg-feat">
                <div className="d-flex flex-row justify-content-between mb-2">
                  <span>Số điện thoại:</span>
                  <span className="fw-bold">{(order?.customer as any)?.account?.phone_number}</span>
                </div>
                <div className="d-flex flex-row justify-content-between mb-2">
                  <span>Hình thức giao hàng:</span>
                  <span className="fw-bold">{order?.category.name}</span>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <span>Thanh toán:</span>
                  <span className="fw-bold">{order?.payment.description}</span>
                </div>
                <span></span>
              </div>
              <div className="d-flex flex-row justify-content-between fw-bold fs-5">
                <span>Tổng tiền:</span>
                <span>{order?.cost.toLocaleString('it-IT', { style: 'currency', currency: "VND" })}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      {
        waiting ?
          <MessageBox
            title={MESSAGES.NOTIFICATION}
            icon="fa-solid fa-arrows-rotate text-danger"
            message={"Đang Xử Lý! Vui lòng chờ"}
          />
          :
          <></>
      }
    </>
  )
}

export default Detail;