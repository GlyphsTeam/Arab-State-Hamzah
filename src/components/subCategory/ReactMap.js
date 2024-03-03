import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axiso from 'axios';
import { useEffect, useState, memo } from "react";
const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "25px",
};



function LastMap({ data, isLoaded}) {
  const [lat, setLat] = useState("");
  const [log, setLong] = useState("");

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  // });
  const getLocation = async () => {
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/en/project`;
    await axiso.get(baseURL).then((res) => {
      setLat(res.data?.data.project?.latitude);
      setLong(res.data?.data.project?.longitude);
    }).catch((err) => {
      console.log(err);
    })

  }
  useEffect(() => {
    getLocation();
  }, [])
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(log),
  };
  // const [map, setMap] = useState(null);

  // const onLoad = useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map);
  // }, []);

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  const markers = data?.map((item) => ({
    name: item.name,
    position: { lat: item.locations_lat * 1, lng: item.locations_lng * 1 },
    onClick: () => handleClick(item.locations_lat, item.locations_lng),
  }));

  const handleClick = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
    // onLoad={onLoad}
    // onUnmount={onUnmount}
    >

      <>
        {markers?.map((marker) => (
          <Marker

            key={marker.name}

            onClick={marker.onClick}
            position={{ lat: marker.position.lat, lng: marker.position.lng }}
            label={{
              text: marker.name,
              color: "red",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          />
        ))}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(LastMap);
