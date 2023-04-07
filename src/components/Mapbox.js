import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";

import { useState } from "react";
function MapApp() {
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  return (
    <div className="App">
      <Map
        mapboxAccessToken={
          "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ"
        }
        style={{
          width: "100%",
          height: "1000px",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <Marker longitude={lng} latitude={lat} />

        <GeolocateControl />
      </Map>
    </div>
  );
}

export default MapApp;
