import { useState } from "react";
import Map from "./Map";
import Address from "../../interfaces/address";


const Test = () => {
  const [address, setAddress] = useState<Address>({ address_notes: "", latitude: 0, longitude: 0 });
  return (
    <div>
      <Map address={address} setAddress={setAddress} />
    </div>
  )
}

export default Test;