import React, { useState, useEffect } from 'react'
import Geocode from "react-geocode";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { GoogleMapComponent }  from './components/GoogleMapComponent'
import { SearchAutocomplete } from './components/SearchAutocomplete'
import { data } from './components/GoogleMapComponent/utils'

console.log(data);
function App() {
  const [addressList, setAddressList] = useState(null)
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  })

  Geocode.setApiKey(process.env.REACT_APP_KEY)
  Geocode.setLanguage("pt-br");

  // useEffect(() => {
  //   searchLatLngForAddress()
  // }, [])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])

    setAddress(value)
    setCoordinates(latLng)
    searchLatLngForAddress()
  }

  const searchLatLngForAddress = async () => {
    const newAddressList = [...data]

    const promises = data.map(async (item, index) => {
      const response = await Geocode.fromAddress(item.address)
      const { lat, lng } = response.results[0].geometry.location;

      newAddressList[index] = {
            ...item,
            lat,
            lng
          }
    })

    Promise.all(promises).then((array) => {
      setAddressList(newAddressList)
    })
  }

  return (
   <>
    <SearchAutocomplete 
      address={address}
      setAddress={setAddress}
      coordinates={coordinates}
      setCoordinates={setCoordinates}
      handleSelect={handleSelect}
    />
    <GoogleMapComponent 
      addressList={addressList}
      setAddressList={setAddressList}
      coordinates={coordinates}
    />
   </>
  );
}

export default App;
