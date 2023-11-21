import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "25px",
};

const center = {
  lat: parseFloat(process.env.REACT_APP_MAP_LAT),
  lng: parseFloat(process.env.REACT_APP_MAP_LNG),
};

function LastMap({ data }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

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
      zoom={8}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      <>
        {markers?.map((marker) => (
          <Marker
            key={marker.name}
            onClick={marker.onClick}
            position={marker.position}
            label={{
              text: marker.name,
              color: "black",
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

export default React.memo(LastMap);
