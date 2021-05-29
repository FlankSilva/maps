import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { center, containerStyle } from './utils'
import { waterStyle } from './styledMap'

export const GoogleMapComponent = ({addressList, coordinates, props}) => {
  const [isOpen, setIsOpen] = useState(null)

  const types = {
    teste: {
      icon: '/pinKeg.svg'
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_KEY
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates.lat ? coordinates :  center}
        zoom={10}
        options={{ 
          // styles: waterStyle,
          disableDefaultUI: true, // Habilita ou desabilita as opções do maps
         }}
        {...props}
      >
        {addressList?.map((item, index) => (
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

// export default React.memo(MyComponent)