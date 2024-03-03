import React, { useState, useRef } from 'react'
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'
import clasess from '../../assets/style/formStyle/googleAdre.module.css'
import { useTranslation } from 'react-i18next'
const center = { lat: 48.8584, lng: 2.2945 }
// const googleMapsLibraries = ['places'];
const containerStyle = {
  width: '100%',
  height: '100%'
};

function GoogleAddress({ setLat, setLng, street, setStreetValue, isLoaded }) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env?.REACT_APP_MAP_KEY,
  //   libraries: googleMapsLibraries,
  // });

  const { t } = useTranslation();
  const searchRef = useRef();
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }


  function handlePlaceSelect() {
    const place = searchRef.current.getPlace();
    if (!place?.geometry) {
      console.log("Place not found");
      return;
    }

    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }

    if (currentMarker) {
      currentMarker.setMap(null);
    }

    map.panTo(place.geometry.location);

    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
    });
    let lat = place.geometry.location.lat();
    let leng = place.geometry.location.lng();
    setLat(lat);
    setLng(leng);
    setCurrentMarker(marker);
  }

  function handleMapClick(event) {
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }

    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLat(event.latLng.lat());
    setLng(event.latLng.lng())
    if (currentMarker) {
      currentMarker.setMap(null);
    }
    console.log("map>>", event)

    const marker = new window.google.maps.Marker({
      position: clickedLocation,
      map: map,
      title: "New Marker",
    });

    setCurrentMarker(marker);
  }

  return (
    <div className={clasess.googleContaier}>
      <div className={clasess.googleSub}>
        <div className={clasess.googleMapContainer}>
          <div style={{ flexGrow: 1 }}>
            <Autocomplete
              onLoad={autocomplete => (searchRef.current = autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <input type='text' placeholder={t('Search for a place')} style={{ width: '100%' }} ref={street} />
            </Autocomplete>
          </div>
        </div>
      </div>
      <div className={clasess.googleMap}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={containerStyle}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => {
            setMap(map);

            const initialMarker = new window.google.maps.Marker({
              position: center,
              map: map,
              title: "Initial Center",
            });

            setCurrentMarker(initialMarker);
          }}
          onClick={handleMapClick}
        ></GoogleMap>
      </div>
    </div>
  );
}

export default GoogleAddress
