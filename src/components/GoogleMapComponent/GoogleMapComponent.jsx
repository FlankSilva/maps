import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '300px'
};

const center = {
  lat: -23.6821604,
  lng: -46.8754883
};

function MyComponent({ ...props }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_KEY // AIzaSyA5_Sw8YOOaexn-HEq3tsXAt_zHTaajlBo
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        {...props}
      >
        
        <Marker 
          position={{ lat: -22.9416066, lng: -46.9998334 }}
          onClick={() => {}}
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)