import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '300px'
};

const center = {
  lat: -23.6821604,
  lng: -46.8754883
};

function MyComponent({ ...props }) {
  const [isOpen, setIsOpen] = useState(null)

  const types = {
    teste: {
      icon: '/pinKeg.svg'
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_KEY // AIzaSyA5_Sw8YOOaexn-HEq3tsXAt_zHTaajlBo
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        {...props}
      >
        {data.map((item, index) => (
          <Marker 
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setIsOpen({
              lat: item.lat,
              lng: item.lng
            })}
            icon={types.teste.icon}
          >
          </Marker>
        ))}

        {isOpen && (
          <InfoWindow
            position={{ lat: isOpen.lat, lng: isOpen.lng }}
            onCloseClick={() => setIsOpen(false)}
          >
            <div>
              <p>{isOpen.lat}, {isOpen.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

const data = [
  { lat: -22.9416066, lng: -46.9998334 },
  { lat: -22.5416066, lng: -46.5998334 }
]
