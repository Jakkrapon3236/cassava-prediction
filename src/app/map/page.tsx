'use client';
import React, { useState } from "react";
import { Map, GoogleApiWrapper, Polygon , Marker} from "google-maps-react";

const mapStyles = {
  width: '100%',
  height: '50%'
};

const rectangleCoordinates = [
  { lat: 19.020145856138136, lng: -98.24006775697993 },
  { lat: 19.020145856138136, lng: -98.23956775697993 },
  { lat: 19.020645856138136, lng: -98.23956775697993 },
  { lat: 19.020645856138136, lng: -98.24006775697993 },
];

const App = (props) => {
  const [log, setLog] = useState(""); // สร้าง state สำหรับเก็บค่า log
  const [textValue, setTextValue] = useState(""); // สร้าง state สำหรับเก็บค่าใน textbox
  const [currentLocation, setCurrentLocation] = useState(null);

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
      {currentLocation ? (
  <Map
    google={props.google}
    zoom={17}
    style={mapStyles}
    initialCenter={{
      lat: currentLocation.lat,
      lng: currentLocation.lng
    }}
  >
    <Polygon
      paths={rectangleCoordinates}
      fillColor="#0000FF"
      fillOpacity={0.35}
      strokeColor="#0000FF"
      strokeOpacity={0.8}
      strokeWeight={2}
    />
      {/* เพิ่ม Marker */}
  {currentLocation && (
    <Marker
      position={{
        lat: currentLocation.lat,
        lng: currentLocation.lng
      }}
      name="My Marker"
    />
  )}
  </Map>
  
) : (
  <div>Loading map...</div>
)}

    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyC3tm0wdG920HdRqTHuEUxXc3VI7qIKQcE"
})(App);
