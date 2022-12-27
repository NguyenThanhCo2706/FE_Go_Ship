import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react"
import categoryApi from "../../api/categoryApi";
import googleMapApi from "../../api/googleMapApi";
import orderApi from "../../api/orderApi";
import paymentApi from "../../api/paymentApi";
import Address from "../../interfaces/address";
import Category from "../../interfaces/category";
import Payment from "../../interfaces/payment";
import MessageBox from "../Commons/MessageBox";
import {
  refStorage,
  storage,
  uploadBytes,
  getDownloadURL,
} from "../../config/firebase-config";
import { yupOrder } from "../../validation/validation";
import { handleError } from "../../utils";
import { MESSAGES } from "../../constraint";

const Order = (props: any) => {
  const myPhone: string = props.phone;
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(108.178843);
  const [lat, setLat] = useState(16.061632);
  const [zoom, setZoom] = useState(15);
  const [markers, setMarkers] = useState<Array<any>>([])

  const [addressStart, setAddressStart] = useState<Address>({ address_notes: "", latitude: 0, longitude: 0 });
  const [addressEnd, setAddressEnd] = useState<Address>({ address_notes: "", latitude: 0, longitude: 0 });
  const [decription, setDecription] = useState("");
  const [distance, setDistance] = useState(0);
  const [customerNote, setCustomerNote] = useState("");
  const [imgOrder, setImgOrder] = useState<any>("");
  const [paymentList, setPaymentList] = useState<Array<Payment>>();
  const [paymentId, setPaymentId] = useState(1);
  const [categoryList, setCategoryList] = useState<Array<Category>>();
  const [categoryId, setCategoryId] = useState(1);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [money, setMoney] = useState(0);

  const [messageError, setMessageError] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });
      map.current.on("click", (e: any) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map.current);
        setMarkers((prev) => [...prev, marker]);
      });
    }, (error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    if (markers.length > 2) {
      const markerDel = markers.shift();
      markerDel.remove();
      setMarkers(markers);
    }
    if (markers[0]) {
      // googleMapApi.getNameByLocation(markers[0]?._lngLat.lng, markers[0]?._lngLat.lat).then(data => {
      //   setAddressStart(prev => ({
      //     ...prev,
      //     latitude: markers[0]._lngLat.lat,
      //     longitude: markers[0]._lngLat.lng,
      //     address_notes: data
      //   }))
      // })
    }

    if (markers[1]) {
      // googleMapApi.getNameByLocation(markers[1]?._lngLat.lng, markers[1]?._lngLat.lat).then(data => {
      //   setAddressEnd(prev => ({
      //     ...prev,
      //     latitude: markers[1]?._lngLat.lat,
      //     longitude: markers[1]?._lngLat.lng,
      //     address_notes: data
      //   }))
      // })
    }

    if (markers.length === 2) {
      googleMapApi.distance(markers[0]?._lngLat, markers[1]?._lngLat).then((result) => {
        setDistance(result / 1000)
      })
    }
  }, [markers])

  useEffect(() => {
    console.log(distance, categoryId)
    orderApi.getPrice(distance, categoryId)
      .then((result) => { setMoney(result?.total || 0) })
      .catch((error) => { })
  }, [distance, categoryId])

  useEffect(() => {
    if (!map.current) return;
    console.log("move")
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const defaultValue = () => {
    setAddressStart({ address_notes: "", latitude: 0, longitude: 0 });
    setAddressEnd({ address_notes: "", latitude: 0, longitude: 0 });
    setDecription("");
    setDistance(0);
    setCustomerNote("");
    setImgOrder("");
    setPaymentId(1);
    setCategoryId(1);
    markers.map(item => item.remove())
    setMarkers([]);
  }

  const handleChangeAddressStart = (e: any) => {
    setAddressStart(prev => ({
      ...prev,
      address_notes: e.target.value,
    }))
  }
  const handleChangeAddressEnd = (e: any) => {
    setAddressEnd(prev => ({
      ...prev,
      address_notes: e.target.value,
    }))
  }

  useEffect(() => {
    paymentApi.getList().then((result => { setPaymentList(result.data) }))
    categoryApi.getList().then((result => { setCategoryList(result.data) }))
  }, [])

  const handleSubmit = async () => {
    try {
      await yupOrder.validate({
        address_start: addressStart,
        address_end: addressEnd,
        categoryId: categoryId,
        paymentId: paymentId,
        customer_notes: customerNote,
        description: decription,
        distance: distance,
        img_order: imgOrder
      });

      await orderApi.create(
        addressStart, addressEnd, decription, distance, customerNote, imgOrder, paymentId, categoryId
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
    const imageRef = refStorage(storage, `Order/${myPhone}/${e.target.files![0].name}.jpg`);
    uploadBytes(imageRef, e.target.files![0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        setImgOrder(url)
      })
    })
  }
  console.log(imgOrder)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-5">
          <div className="max-height d-flex flex-column justify-content-center ps-5 pe-5 overflow-auto">
            <div className="d-flex flex-row justify-content-center">
              <h2>Order</h2>
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Address Start</label>
              <input
                type="text"
                className="form-control"
                value={addressStart?.address_notes}
                onChange={(e) => { handleChangeAddressStart(e) }}
              />
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Address End</label>
              <input
                type="text"
                className="form-control"
                value={addressEnd?.address_notes}
                onChange={(e) => { handleChangeAddressEnd(e) }}
              />
            </div>
            <div className="mb-3">
              <label className="fw-bold fs-6">Distance</label>
              <input
                type="text"
                className="form-control"
                value={distance + " km"}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Decription</label>
              <textarea
                className="form-control"
                value={decription}
                onChange={(e) => setDecription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Customer note</label>
              <input
                type="text"
                className="form-control"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Image Order</label>
              <input
                type="file"
                className="form-control"
                accept=".png, .jgp"
                onChange={(e) => handleUpload(e)}
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              {imgOrder ? <img className="img-upload-review" src={imgOrder} alt="" /> : <></>}
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Payment</label>
              <select name="" id="" className="form-control" value={categoryId} onChange={(e) => { setPaymentId(Number(e.target.value)); }}>
                {paymentList?.map((item, index) => (
                  <option key={index} value={item.id}>{item.description}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">CategoryList</label>
              <select name="" id="" className="form-control" value={categoryId} onChange={(e) => { setCategoryId(Number(e.target.value)); }}>
                {categoryList?.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className=" fw-bold fs-6">Money</label>
              <input
                type="text"
                className="form-control"
                value={money}
                readOnly
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary fs-6" onClick={handleSubmit}>Đặt Đơn</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>

      {
        addSuccess ?
          <MessageBox
            title={MESSAGES.SUCCESS}
            icon="fa-solid fa-circle-check text-success"
            message="Bạn đã Đặt hàng thành công!"
            handleAcceptError={() => setAddSuccess(false)} />
          :
          <></>
      }
      {
        isError ?
          <MessageBox
            title={MESSAGES.NOTIFICATION}
            icon="fa-solid fa-circle-xmark text-danger"
            message={messageError}
            handleAcceptError={() => setIsError(false)}
          />
          :
          <></>
      }
    </div>
  )
}

export default Order