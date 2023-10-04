"use client";
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '1400px',
  height: '400px',
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC3tm0wdG920HdRqTHuEUxXc3VI7qIKQcE", // Replace with your Google Maps API key
  });

  
  const [log, setLog] = useState(""); // สร้าง state สำหรับเก็บค่า log
  const [textValue, setTextValue] = useState(""); // สร้าง state สำหรับเก็บค่าใน textbox
  const [currentLocation, setCurrentLocation] = useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = () => {
    // เมื่อคลิกปุ่ม
    setLog(textValue); // เซ็ตค่า log เป็นค่าจาก textbox
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
      console.log(currentLocation);
    } else {
      alert("เบราว์เซอร์ไม่รองรับ Geolocation");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ใส่ข้อความ"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)} // อัปเดตค่าใน state เมื่อ textbox ถูกแก้ไข
      />
      <button onClick={handleClick}>นำค่าไปยัง log</button>
      <button onClick={getCurrentLocation}>ดึงตำแหน่งปัจจุบัน</button>

      <div>
        <h3>ค่า log:</h3>
        <p>{log}</p>
      </div>
      <div>
        <h3>ตำแหน่งปัจจุบัน:</h3>
        {currentLocation && (
          <p>
            Lat: {currentLocation.lat}, Lng: {currentLocation.lng}
          </p>
        )}
      </div>

      {
      currentLocation ? (
<GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
      
    </GoogleMap>
  
) : (
  <div>Loading map...</div>
)}

    
    </div>
  )
}

export default React.memo(MyComponent);
