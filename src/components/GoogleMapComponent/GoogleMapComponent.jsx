import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";

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
  const [mydata, setMydata] = useState(null)
  const [loading, setLoading] = useState(false)

  console.log(mydata);

  Geocode.setApiKey(process.env.REACT_APP_KEY)
  Geocode.setLanguage("pt-br");

  useEffect(() => {
    toConvertAddress()
  }, [])

  const toConvertAddress = async () => {
    const newData = [...data]

    const promises = data.map(async (item, index) => {
      const response = await Geocode.fromAddress(item.address)
      const { lat, lng } = response.results[0].geometry.location;

      newData[index] = {
            ...item,
            lat,
            lng
          }
    })

    Promise.all(promises).then((array) => {
      setMydata(newData)
    })
  }

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
        {mydata?.map((item, index) => (
          <Marker 
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setIsOpen(item)}
            icon={types.teste.icon}
          >
          </Marker>
        ))}

        {isOpen && (
          <InfoWindow
            position={{ lat: isOpen.lat, lng: isOpen.lng }}
            onCloseClick={() => setIsOpen(null)}
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
  {
    name: 'Nome 1',
    address: 'rua um 154 satélite iris campinas'
  },
  {
    name: 'Nome 2',
    address: 'av francisco glicerio 1046'
  },
  {
    name: 'Nome 3',
    address: 'rua irma serafina, 863'
  }
]

// const data = [
//   { lat: -22.9416066, lng: -46.9998334 },
//   { lat: -22.5416066, lng: -46.5998334 }
// ]
