import React, { useEffect , useState} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
import { FaTimes } from 'react-icons/fa'

export const SearchAutocomplete = ({ address, setAddress, handleSelect }) => {
  const [addressField, setAddressField] = useState('')

  useEffect(() => {
    const response = address.substring(0, 23)
    if(response.length >= 23) {
      setAddressField(`${response}...`)
    } else {
      setAddressField(response)
    }
  }, [address])  

  return (
    <div>
      <PlacesAutocomplete
        value={addressField}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search-map">
            <input {...getInputProps({ placeholder: 'Pesquise um local...' })}/>
            {address && (
              <FaTimes 
                className="search-map-close" 
                onClick={() => setAddress('')}
              />
            )}
            
            <div className={(loading || suggestions?.length > 0) && "search-map-results"}>
              {loading && <div className="search-map-loading">Carregando<hr /></div>}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#ccc" : "#fff",
                  color: '#000',
                  padding: "5px",
                  borderRadius: "5px"
                }

                return (
                  <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}