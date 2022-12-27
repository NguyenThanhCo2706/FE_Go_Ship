
export const generateImageMarker = (url: string) => {
  const el = document.createElement('img');
  el.src = process.env.PUBLIC_URL + `/images/${url}`
  el.style.width = "30px";
  return el;
}
export const generateMarkerShipper = () => {
  const el = document.createElement('img');
  el.src = process.env.PUBLIC_URL + "/images/marker.png"
  el.style.width = "50px";
  return el;
}

export const average = (a: number, b: number) => {
  return (a + b) / 2;
}