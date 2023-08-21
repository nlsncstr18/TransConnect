import React, { useState, useEffect, useRef } from "react";
import "./DashBoard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavbarDash from "../components/NavbarDash";
import Mapbox from "../components/Mapbox";


import PaymentModal from "../components/PaymentModal";

import { useSelector, useDispatch } from "react-redux";
import {
  incrementPassengers,
  decrementPassengers,
  incrementUnpaid,
  decrementUnpaid,
  clearPassengers,
} from "../components/redux/actions";

function DashBoard(props) {
  const [IsPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReverseDirection, setIsReverseDirection] = useState(true);
  const [isSimulation, setIsSimulation] = useState(true);

  const [routeInfo, setRouteInfo] = useState([]);
  const [selectedStop, setSelectedStop] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  const socketRef = useRef(null);

  const handleTogglePayment = () => {
    setIsPaymentOpen((prevIsPaymentOpen) => !prevIsPaymentOpen);
  };

  const handleManualDirection = () => {
    setIsReverseDirection(!isReverseDirection);
  };

  const handleTesting = () => {
    setIsSimulation(!isSimulation);
  };

  const handleIsFollow = () => {
    setIsFollow(!isFollow);
  };

  const tPassengers = useSelector((state) => state.tPassengers);
  const passengers = useSelector((state) => state.passengers);
  const paid = useSelector((state) => state.paid);
  const unpaid = useSelector((state) => state.unpaid);

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const handleToggleCapacityAdd = () => {
    dispatch(incrementPassengers());
    dispatch(incrementUnpaid());
  };

  const handleToggleCapacityMinus = () => {
    // dispatch(decrementPassengers());
    dispatch(decrementPassengers());
    dispatch(decrementUnpaid());
  };
  const handleToggleOk = () => {
    console.log("here", passengers, selectedStop);
    dispatch(clearPassengers());
    try {
      if (!socketRef.current) {
        // socketRef.current = io("http://devtest.puvtia.live/");
        console.log("Connected");
      }

      const socket = socketRef.current;
      socket.emit("stop_departure", {
        vehicleId: 1,
        stop: selectedStop.name,
        loadedPassengers: passengers,
      });
      console.log("passengers loaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.alert("Demo App Only. Some features may not work");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("routeInfo"));
    setRouteInfo(storedData);

    const selectedData = JSON.parse(localStorage.getItem("selectedStop"));
    setSelectedStop(selectedData);
  }, [count]);

  // useEffect(() => {
  //   const storedPassengers =
  //     JSON.parse(localStorage.getItem("Passengers")) || [];
  //   setPassengers(storedPassengers);
  // }, []);

  return (
    <>
      <div>
        <NavbarDash />
      </div>
      <div className="map-container">
        <Mapbox
          isReverseDirection={isReverseDirection}
          isFollow={isFollow}
          isSimulation={isSimulation}
        />
        <div className="controlContainer">
          <div className="passengerControl">
            <button className="minus" onClick={handleToggleCapacityMinus}>
              -
            </button>
            <button className="add" onClick={handleToggleCapacityAdd}>
              +
            </button>
          </div>
          {/* <div className="passengers-numbers text-center">{passengers}</div> */}

          <div className="infoContainer">
            <h1 className="info-status">
              {passengers}
              <span>
                <button className="ok-button" onClick={handleToggleOk}>
                  Ok
                </button>
              </span>
            </h1>
            <h1 className="info-status">
              <span className="">Paid:</span> {paid}
            </h1>
            <h1 className="info-status">
              <span className="">Unpaid:</span> {unpaid}
            </h1>
            <h1 className="info-status">
              <span className="">Passengers:</span> {tPassengers}
            </h1>
          </div>
          <button
            className="directionButton"
            style={{ color: isReverseDirection ? "#00ff7f" : "#0eead0" }}
            onClick={handleManualDirection}
          >
            {isReverseDirection ? "Reverse" : "Forward"}
          </button>
        </div>
        {/* <div className="passengerControlContainer">
          <div className="passengerControl">
            <div className="minus-icon p-2">
              <a href="#" onClick={handleToggleCapacityMinus}>
                <img
                  className="img-minus-icon"
                  src={MinusIcon}
                  alt="plus-icon"
                />
              </a>
            </div>
            <div className="passengers-numbers">{passengers}</div>
            <div className="plus-icon p-2">
              <a href="#" onClick={handleToggleCapacityAdd}>
                <img className="img-plus-icon" src={PlusIcon} alt="plus-icon" />
              </a>
            </div>
          </div>
              className={`direction-icon btn ${isReverseDirection ? 'btn-primary' : 'btn-success'}`}

            onClick={handleManualDirection}
          >
            {isReverseDirection ? 'Reverse' : 'Start'}
       




        </div> */}
        {/* <h2 className="route-info-stop">
          Upcoming Station: {routeInfo.stop} {routeInfo.duration}{" "}
          {routeInfo.distance}
        </h2> */}
        <h2 className="route-mode">
          Mode: {isReverseDirection ? "Forward" : "Reverse"}
        </h2>
        <div className="payment-icon">
          <button className="pay-button" onClick={handleTogglePayment}>
            ₱
          </button>
        </div>
        {/* <div className="payment-icon">
          <a href="#" onClick={handleTogglePayment}>
            <img
              className="img-payment-icon"
              src={PesoIcon}
              alt="payment-icon"
            />
          </a>
        </div> */}
        <button
          className="isFollow"
          style={{ color: isFollow ? "#00ff7f" : "#0eead0" }}
          onClick={handleIsFollow}
        >
          {isFollow ? "Stop" : "Follow"}
        </button>
        <button
          className="isSimulation"
          style={{ color: isSimulation ? "#00ff7f" : "#0eead0" }}
          onClick={handleTesting}
        >
          {isSimulation ? "Mode: Simulation" : "Mode: Live"}
        </button>
        {IsPaymentOpen && (
          <PaymentModal onClose={() => setIsPaymentOpen(false)} />
        )}
        *
        {/* <div className="LiveInfo">
          <h2 className="text-center text-small">Vehicle Info</h2>
        </div> */}
      </div>
    </>
  );
}

export default DashBoard;
