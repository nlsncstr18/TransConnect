import React, { useState } from "react";
import "./DashBoard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavbarDash from "../components/NavbarDash";
import Mapbox from "../components/Mapbox";
import DateTime from "../components/DateTime";
import PassengerIcon from "../assets/icons/passenger.png";
import CapacityIcon from "../assets/icons/capacity.png";
import LocationIcon from "../assets/icons/location.png";
import PesoIcon from "../assets/icons/peso.png";
import PaymentModal from "../PaymentModal";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
// import CurrentLocation from "../components/CurrentLocation";
// import Mapbox from "../components/Mapbox";

const DashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  return (
    <>
      <div>
        <NavbarDash />
      </div>
      <div className="map-container">
        <Mapbox />
        <div className="overlay">
          <DateTime />
        </div>
        <div className="icons-container">
          <div className="icons icons1">
            <a href="#">
              <img className="img-icon" src={PassengerIcon} alt="Icon" />
            </a>
          </div>
          <div className="icons icons2">
            <img className="img-icon" src={CapacityIcon} alt="Icon" />
          </div>
          <div className="icons icons3">
            <img className="img-icon" src={LocationIcon} alt="Icon" />
          </div>
        </div>
        <div className="payment-icon">
          <a href="#" onClick={handleToggleModal}>
            <img
              className="img-payment-icon"
              src={PesoIcon}
              alt="payment-icon"
            />
          </a>
        </div>
        {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
};

export default DashBoard;
