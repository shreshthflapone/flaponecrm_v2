import React, { useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const GooglePlacesAutocomplete = ({address,setAddress,coordinates,setCoordinates}) => {
  // const [address, setAddress] = useState('');
  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyACp77XNyRyMGWuneoi43txjasns_pymlE', 
    libraries,
  });


  const handlePlaceSetNull = ()=>{
    setCoordinates({
          lat: null,
          lng: null,
        });
  }

  const handlePlaceSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'], 
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);

      if (place.geometry) {
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  };

  return (
    <div>
      {loadError && <div>Error loading maps</div>}
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type address"
            onFocus={handlePlaceSelect}
            onChange={handlePlaceSetNull}
            style={{ width: '100%', padding: '10px', fontSize: '16px'}}
          />

          {coordinates.lat && (
            <div style={{ marginTop: "10px" }}>
              <b>Lat:</b> {coordinates.lat}, <b>Lng:</b> {coordinates.lng}
            </div>
          )}
          
        </>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
