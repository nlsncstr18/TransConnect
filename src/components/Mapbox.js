import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "./Mapbox.css";
import { useState, useEffect } from "react";
import PassengerIcon from "../assets/icons/passenger.png";
import CapacityIcon from "../assets/icons/capacity.png";
import LocationIcon from "../assets/icons/location.png";

function App() {
  const [viewport, setViewport] = useState({
    longitude: 120.9842,
    latitude: 14.5995,
    zoom: 16,
  });

  const [markers, setMarkers] = useState([
    { longitude: 121.0244, latitude: 14.5547 },
    { longitude: 121.0014, latitude: 14.5378 },
    { longitude: 120.897, latitude: 14.4791 },
  ]);

  const [showMarkers, setShowMarkers] = useState(false);

  const handleGeolocate = (position) => {
    const { longitude, latitude } = position.coords;

    setViewport((prevViewport) => ({
      ...prevViewport,
      longitude,
      latitude,
      zoom: 15, // Update the zoom level
    }));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeolocate);
  }, []);

  return (
    <div className="App">
      <Map
        mapboxAccessToken={
          "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ"
        }
        style={{
          width: "100%",
          height: "100vh",
        }}
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <NavigationControl position="top-left" />

        <GeolocateControl
          position="top-left"
          onGeolocate={handleGeolocate}
          trackUserLocation={true}
          markerOptions={{
            circle: {
              radius: 10,
              color: "red",
              strokeColor: "white",
              strokeWidth: 2,
            },
          }}
        />

        {showMarkers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              longitude={marker.longitude}
              latitude={marker.latitude}
            >
              <div className={`marker marker-${index + 1}`} />
            </Marker>
          ))}
        <div className="icons-container">
          <div
            className="icons icons1"
            onClick={() => setShowMarkers(!showMarkers)}
          >
            {showMarkers ? (
              <a href="#">
                <img className="img-icon" src={PassengerIcon} alt="Icon" />
              </a>
            ) : (
              <img className="img-icon" src={PassengerIcon} alt="Icon" />
            )}
          </div>
          <div className="icons icons2">
            <img className="img-icon" src={CapacityIcon} alt="Icon" />
          </div>
          <div className="icons icons3">
            <img className="img-icon" src={LocationIcon} alt="Icon" />
          </div>
        </div>
      </Map>
    </div>
  );
}

export default App;
