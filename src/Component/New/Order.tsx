import { useEffect, useState } from "react"
import categoryApi from "../../api/categoryApi";
import googleMapApi from "../../api/googleMapApi";
import orderApi from "../../api/orderApi";
import paymentApi from "../../api/paymentApi";
import Address from "../../interfaces/address";
import Category from "../../interfaces/category";
import Payment from "../../interfaces/payment";
import MessageBox from "../Commons/MessageBox";
import Coordinates from "../../interfaces/coordinates";

import {
  refStorage,
  storage,
  uploadBytes,
  getDownloadURL,
} from "../../config/firebase-config";
import { yupOrder } from "../../validation/validation";
import { handleError } from "../../utils";
import Map from "./Map";
import AddressView from "../../interfaces/addressView";
import classNames from "classnames";



const Order = (props: any) => {
  const { myPhone } = props;
  const [addressStart, setAddressStart] = useState<AddressView>({
    address_notes: "Địa chỉ chi tiết",
    region: "Khu vực",
    country: "Quốc gia",
    latitude: 0,
    longitude: 0
  });
  const [addressEnd, setAddressEnd] = useState<AddressView>({
    address_notes: "Địa chỉ chi tiết",
    region: "Khu vực",
    country: "Quốc gia",
    latitude: 0,
    longitude: 0
  });
  const [decription, setDecription] = useState("");
  const [distance, setDistance] = useState(0);
  const [customerNote, setCustomerNote] = useState("");
  const [imgOrder, setImgOrder] = useState<any>("");
  const [paymentList, setPaymentList] = useState<Array<Payment>>();
  const [paymentId, setPaymentId] = useState(1);
  const [categoryList, setCategoryList] = useState<Array<Category>>();
  const [categoryId, setCategoryId] = useState(1);
  const [money, setMoney] = useState(0);

  const [disable, setDisable] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const start: Coordinates = {
      lat: addressStart?.latitude,
      lng: addressStart?.longitude
    }
    const end: Coordinates = {
      lat: addressEnd?.latitude,
      lng: addressEnd?.longitude
    }
    googleMapApi.distance(start, end).then((data: number) => {
      setDistance(data / 1000);
    })
  }, [addressStart, addressEnd])

  useEffect(() => {
    orderApi.getPrice(distance, categoryId)
      .then((result) => { setMoney(result?.total || 0) })
      .catch((error) => { })
  }, [distance, categoryId])



  const defaultValue = () => {
    setDecription("");
    setDistance(0);
    setCustomerNote("");
    setImgOrder("");
    setPaymentId(1);
    setCategoryId(1);
  }

  useEffect(() => {
    paymentApi.getList().then((result => { setPaymentList(result.data) }))
    categoryApi.getList().then((result => { setCategoryList(result.data) }))
  }, [])

  const handleSubmit = async () => {
    try {
      const start: Address = {
        address_notes: addressStart.address_notes,
        latitude: addressStart.latitude,
        longitude: addressStart.longitude
      }
      const end: Address = {
        address_notes: addressEnd.address_notes,
        latitude: addressEnd.latitude,
        longitude: addressEnd.longitude
      }
      await yupOrder.validate({
        address_start: start,
        address_end: end,
        categoryId: categoryId,
        paymentId: paymentId,
        customer_notes: customerNote,
        description: decription,
        distance: distance,
        img_order: imgOrder
      });

      await orderApi.create(
        start, end, decription, distance, customerNote, imgOrder, paymentId, categoryId
      );

      setAddSuccess(true);
      defaultValue();
    }
    catch (err: any) {
      console.log(err.message);
      setIsError(true);
      setMessageError(err.message)
    }
  }

  const handleUpload = (e: any) => {
    setDisable(true);
    const imageRef = refStorage(storage, `Order/${myPhone}/${e.target.files![0].name}.jpg`);
    uploadBytes(imageRef, e.target.files![0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        setImgOrder(url);
        setDisable(false);
      })
    })
  }
  return (
    <>
      <div className="col">
        <div className="fs-5 mb-3 fw-bold">Tạo đơn hàng mới</div>
        <div className="container-fluid border-radius mb-4">
          <div className="fw-bold p-2 ps-0">Chọn địa điểm cần giao dịch:</div>
          <div className="row mb-4">
            <div className="col-6">
              <div className="d-flex flex-row p-2 border-radius">
                <div>
                  <Map address={addressStart} setAddress={setAddressStart} />
                </div>
                <div className=" ms-3 d-flex flex-column">
                  <span className="fw-bold">{addressStart.region}</span>
                  <span className="fw-light">{addressStart.country}</span>
                  <span>{addressStart.address_notes}</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-row p-2 border-radius">
                <div>
                  <Map address={addressEnd} setAddress={setAddressEnd} />
                </div>
                <div className="ms-3 d-flex flex-column">
                  <span className="fw-bold">{addressEnd.region}</span>
                  <span className="fw-light">{addressEnd.country}</span>
                  <span>{addressEnd.address_notes}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="">
                <label className="form-label fw-bold">Khoảng cách:</label>
                <input
                  type="text"
                  className="form-control"
                  value={distance.toFixed(1) + " km"}
                  readOnly />
              </div>
            </div>
            <div className="col-5">
              <div className="">
                <label className="form-label fw-bold">Hình thức thanh toán:</label>
                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => { setPaymentId(Number(e.target.value)); }}>
                  {paymentList?.map((item, index) => (
                    <option key={index} value={item.id}>{item.description}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="">
                <label className="form-label fw-bold">Hình thức giao hàng:</label>
                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => { setCategoryId(Number(e.target.value)); }}>
                  {categoryList?.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="fw-bold p-2 ps-0">Thông tin cần mô tả thêm:</div>
            <div className="mb-2">
              <label className="form-label">Chi tiết đơn hàng:</label>
              <textarea
                className="form-control"
                value={decription}
                onChange={(e) => setDecription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="form-label">Ghi chú:</label>
              <input
                type="text"
                className="form-control"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Hình ảnh đơn hàng:</label>
            <input
              type="file"
              className="form-control"
              accept=".png, .jgp"
              onChange={(e) => handleUpload(e)}
            />
            <div className="d-flex justify-content-center mb-3">
              {imgOrder ? <img className="img-upload-review" src={imgOrder} alt="" /> : <></>}
            </div>
          </div>
          <div className="text-end mb-3">
            <span>Total:</span>
            <span className="fw-bold"> {money} VNĐ</span>
          </div>
          <div className="mb-4 text-end">
            <button
              className={classNames("btn", "btn-primary", { "disabled": disable })}
              onClick={handleSubmit}
            >Đặt đơn</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order;