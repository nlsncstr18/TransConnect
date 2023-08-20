import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PaymentModal.css";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";


import {
  setConfirmationSubmit,

  incrementPaid,

  decrementUnpaid,

} from "../components/redux/actions";
function PaymentModal() {
  // const [from, setFrom] = useState("From");
  // const [to, setTo] = useState("To");
  // const [sum, setSum] = useState(Number(from) + Number(to));
  // const [from_location, set_from_location] = useState("");
  // const [to_location, set_to_location] = useState("");
  // const [distance, setDistance] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [locationsCurrent, setlocationsCurrent] = useState([]);

  const dispatch = useDispatch();
  // const airconRate = { base: 13, perKm: 2.2 };
  //mapbox direcitons without map rendering
  // const paymentDirections = new MapboxDirections({
  //   accessToken:
  //     "pk.eyJ1IjoibmxzbmNzdHIxOCIsImEiOiJjbGlobG5zYmUxbXprM21tcXlhMHdoM2dpIn0.Klu8rkfPjzyFFtUXz4DOXw",
  //   unit: "metric",
  //   profile: "mapbox/driving-traffic",
  //   controls: {
  //     inputs: false,
  //     instructions: false,
  //   },
  // });

  const socketRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const handleClick = (value) => {



    if (value === "clear") {
      localStorage.removeItem("inputValue");
      setPickupLocation("")
      setDropoffLocation("")
      setInputValue("");
    }
    else if (value === "delete") {
      setInputValue((prevValue) => prevValue.slice(0, -1));
    }
    else if (value === "submit" && inputValue.length === 6) {


      const myBooleanValue = localStorage.getItem('myBooleanValue');


      if (myBooleanValue === 'true') {
        dispatch(setConfirmationSubmit(true));
        toast.success("Ticket Submitted", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          style: { backgroundColor: "black", color: "rgb(2, 239, 144)" },
          toastStyle: { fontSize: "30px" },
        });
        localStorage.setItem("inputValue", inputValue);
        dispatch(decrementUnpaid())
        dispatch(incrementPaid())
        localStorage.removeItem("inputValue");
        setPickupLocation("")
        setDropoffLocation("")
        setInputValue("");
      } else {
        toast.error("Invalid Code", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          style: { backgroundColor: "black", color: "rgb(2, 239, 144)" },
          toastStyle: { fontSize: "30px" },
        });
        setInputValue("");
        setPickupLocation("")
        setDropoffLocation("")

      }




    }
    else {
      setInputValue((prevValue) => {


        const newValue = prevValue + value.toString();

        return newValue.slice(0, 6);


      });
    }

  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    if (inputValue.length === 6) {
      localStorage.setItem("inputValue", inputValue);
    }
  }, [inputValue]);

  useEffect(() => {

    const isExisting = localStorage.getItem("isExisting");
    if (isExisting === "true" && inputValue) {
      const dropoffLocation = localStorage.getItem('dropoffLocation');
      if (dropoffLocation === "0") {
        setDropoffLocation("Monumento");
      }
      else if (dropoffLocation === "1") {
        setDropoffLocation("Bagong Barrio");
      }
      else if (dropoffLocation === "2") {
        setDropoffLocation("Balintawak")
      }
      else if (dropoffLocation === "3") {
        setDropoffLocation("Kaingin");
      }
      else if (dropoffLocation === "4") {
        setDropoffLocation("Roosevelt");
      }
      else if (dropoffLocation === "5") {
        setDropoffLocation("North Ave");
      }
      else if (dropoffLocation === "6") {
        setDropoffLocation("Quezon Ave");
      }
      else if (dropoffLocation === "7") {
        setDropoffLocation("Nepa Q Mart");
      }
      else if (dropoffLocation === "8") {
        setDropoffLocation("Main Ave");
      }
      else if (dropoffLocation === "9") {
        setDropoffLocation("Santolan");
      }
      else if (dropoffLocation === "10") {
        setDropoffLocation("Ortigas");
      }
      else if (dropoffLocation === "11") {
        setDropoffLocation("Guadalupe");
      }
      else if (dropoffLocation === "12") {
        setDropoffLocation("Buendia");
      }
      else if (dropoffLocation === "13") {
        setDropoffLocation("Ayala");
      }
      else if (dropoffLocation === "14") {
        setDropoffLocation("Tramo");
      }
      else if (dropoffLocation === "15") {
        setDropoffLocation("Taft");
      }
      else if (dropoffLocation === "16") {
        setDropoffLocation("Macapagal");
      }
      else if (dropoffLocation === "17") {
        setDropoffLocation("Moa");
      }

      const pickupLocation = localStorage.getItem('pickupLocation');
      if (pickupLocation === "0") {
        setPickupLocation("Monumento");
      }
      else if (pickupLocation === "1") {
        setPickupLocation("Bagong Barrio");
      }
      else if (pickupLocation === "2") {
        setPickupLocation("Balitawag")
      }
      else if (pickupLocation === "3") {
        setPickupLocation("Kaingin");
      }
      else if (pickupLocation === "4") {
        setPickupLocation("Roosevelt");
      }
      else if (pickupLocation === "5") {
        setPickupLocation("North Ave");
      }
      else if (pickupLocation === "6") {
        setPickupLocation("Quezon Ave");
      }
      else if (pickupLocation === "7") {
        setPickupLocation("Nepa Q Mart");
      }
      else if (pickupLocation === "8") {
        setPickupLocation("Main Ave");
      }
      else if (pickupLocation === "9") {
        setPickupLocation("Santolan");
      }
      else if (pickupLocation === "10") {
        setPickupLocation("Ortigas");
      }
      else if (pickupLocation === "11") {
        setPickupLocation("Guadalupe");
      }
      else if (pickupLocation === "12") {
        setPickupLocation("Buendia");
      }
      else if (pickupLocation === "13") {
        setPickupLocation("Ayala");
      }
      else if (pickupLocation === "14") {
        setPickupLocation("Tramo");
      }
      else if (pickupLocation === "15") {
        setPickupLocation("Taft");
      }
      else if (pickupLocation === "16") {
        setPickupLocation("Macapagal");
      }
      else if (pickupLocation === "17") {
        setPickupLocation("Moa");
      }

    }
  }, [localStorage.getItem("isExisting")]);

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = io("https://devtest.puvtia.live");
  //     console.log("ticket_payment connected");
  //   }

  //   const socket = socketRef.current;
  //   const ticketCode = "111111";

  //   socket.emit("ticket_payment", { code: ticketCode });

  //   socket.on("ticket_payment", (data) => {
  //     console.log("ticket-payment", data);
  //   });

  //   // socket.on("ticket_payment", (data) => {
  //   //   if (!inputValue === data) {
  //   //     console.log("nice");
  //   //   }
  //   // });
  //   return () => { };
  // }, []);

  // const currentLocations = useCallback(async () => {
  //   const response = await fetch("http://localhost:5000/transport_coordinate");
  //   const data = await response.json();

  //   // Create a new array with the longitude and latitude values
  //   const currentLocationArray = [data.longitude, data.latitude];

  //   // Convert the new array to a JSON string
  //   const currentLocationString = JSON.stringify(currentLocationArray);

  //   setlocationsCurrent(currentLocationString);
  // }, []);

  // useEffect(() => {
  //   currentLocations();

  //   const intervalId = setInterval(() => {
  //     currentLocations();
  //   }, 1000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [currentLocations]);


  // const handleFrom = (e) => {
  //   setFrom(e.target.value);
  //   const selectedOption = e.target.options[e.target.selectedIndex].text;
  //   set_from_location(selectedOption);
  // };

  // const handleTo = (e) => {
  //   setTo(e.target.value);
  //   const selectedOption = e.target.options[e.target.selectedIndex].text;
  //   if (selectedOption === "Current location") {
  //     set_to_location("Current location");

  //     return;
  //   }

  //   set_to_location(selectedOption);

  //   // payment

  //   //calculating the distance and travel time
  //   const from_lat_long = JSON.parse(from.split(","));
  //   const to_lat_long = JSON.parse(e.target.value);

  //   paymentDirections.setOrigin(from_lat_long);
  //   paymentDirections.setDestination(to_lat_long);

  //   paymentDirections.on("route", (event) => {
  //     const router = event.route[0];
  //     const distanceInMeters = router.distance;
  //     const durationInSeconds = router.duration;
  //     const distanceInKm = (distanceInMeters / 1000).toFixed(0);
  //     const durationInMinutes = (durationInSeconds / 60).toFixed(0);
  //     setDistance(distanceInKm);
  //     setDuration(durationInMinutes);

  //     // calculate the fare based on the distance
  //     const fare =
  //       distanceInKm <= 5
  //         ? airconRate.base
  //         : airconRate.base + (distanceInKm - 5) * airconRate.perKm;
  //     setSum(fare.toFixed(0));
  //   });
  // };

  // useEffect(() => {
  //   console.log(busStops[0].incoming_passengers);
  // }, [busStops]);
  // useEffect(() => {
  //   const storedBusStops = localStorage.getItem("busStops");
  //   if (storedBusStops) {
  //     setBusStops(JSON.parse(storedBusStops));
  //   }
  // }, []);

  // function SaveResult(e) {
  //   e.preventDefault();

  //   const selectedOption =
  //     e.target.querySelector(".option2").options[
  //     e.target.querySelector(".option2").selectedIndex
  //     ];
  //   if (selectedOption.id === "moa") {
  //     console.log("Selected destination is MOA");
  //     dispatch(incrementOutboundMOA());
  //   } else if (selectedOption.id === "macapagal") {
  //     console.log("Selected destination is Macapagal");
  //     dispatch(incrementOutboundMacapagal());
  //   } else if (selectedOption.id === "taft") {
  //     console.log("Selected destination is Taft");
  //     dispatch(incrementOutboundTaft());
  //   } else if (selectedOption.id === "tramo") {
  //     console.log("Selected destination is Tramo");
  //     dispatch(incrementOutboundTramo());
  //   } else if (selectedOption.id === "ayala") {
  //     console.log("Selected destination is Ayala");
  //     dispatch(incrementOutboundAyala());
  //   } else if (selectedOption.id === "buendia") {
  //     console.log("Selected destination is Buendia");
  //     dispatch(incrementOutboundBuendia());
  //   } else if (selectedOption.id === "guadalupe") {
  //     console.log("Selected destination is Guadalupe");
  //     dispatch(incrementOutboundGuadalupe());
  //   } else if (selectedOption.id === "ortigas") {
  //     console.log("Selected destination is Ortigas");
  //     dispatch(incrementOutboundOrtigas());
  //   } else if (selectedOption.id === "santolan") {
  //     console.log("Selected destination is Santolan");
  //     dispatch(incrementOutboundSantolan());
  //   } else if (selectedOption.id === "mainave") {
  //     console.log("Selected destination is Main Ave");
  //     dispatch(incrementOutboundMainAve());
  //   } else if (selectedOption.id === "nepa") {
  //     console.log("Selected destination is Nepa Q-Mart");
  //     dispatch(incrementOutboundNEPAC());
  //   } else if (selectedOption.id === "quezonave") {
  //     console.log("Selected destination is Quezon Ave");
  //     dispatch(incrementOutboundQuezon());
  //   } else if (selectedOption.id === "northave") {
  //     console.log("Selected destination is North Ave");
  //     dispatch(incrementOutboundNorthAve());
  //   } else if (selectedOption.id === "roosevelt") {
  //     console.log("Selected destination is Roosevelt");
  //     dispatch(incrementOutboundRoosevelt());
  //   } else if (selectedOption.id === "kaingin") {
  //     console.log("Selected destination is Kaingin");
  //     dispatch(incrementOutboundKaingin());
  //   } else if (selectedOption.id === "balintawak") {
  //     console.log("Selected destination is Balintawak");
  //     dispatch(incrementOutboundBalintawak());
  //   } else if (selectedOption.id === "bagongbarrio") {
  //     console.log("Selected destination is Bagong Barrio");
  //     dispatch(incrementOutboundBBAR());
  //   } else if (selectedOption.id === "monumento") {
  //     console.log("Selected destination is Monumento");
  //     dispatch(incrementOutboundMonu());
  //   }

  //   if (from && to && from !== "From" && to !== "To" && from !== to) {
  //     var fares = JSON.parse(localStorage.getItem("fares")) || [];

  //     var fare = {
  //       fare: sum,
  //       from_location: from_location,
  //       to_location: to_location,
  //       date: new Date().toLocaleDateString(),
  //       time: new Date().toLocaleTimeString(),
  //       from_lat_long: JSON.parse(from),
  //       to_lat_long: JSON.parse(to),
  //     };
  //     fares.push(fare);
  //     localStorage.setItem("fares", JSON.stringify(fares));

  //     setFrom("From");
  //     setTo("To");
  //     setSum(0);
  //     setDistance(0);
  //     setDuration(0);

  //     const savedState = localStorage.getItem("state");
  //     // console.log(savedState);

  //     dispatch(incrementPaid());
  //     dispatch(decrementUnpaid());


  // }
  // }

  return (
    <>

      <div className="payment-container">

        <div className="d-flex justify-content-center mt-2">
          <div className="row text-center">
            <p className="text-white">From: {pickupLocation}</p>
            <p className="text-white">To: {dropoffLocation}</p>


          </div>
        </div>




        <form >
          {/* <div className="payment-info">
            <label>
              <select className="option1" value={from} onChange={handleFrom}>
                <option value="From" disabled defaultValue={"From"}>
                  From:
                </option>
                <option value={locationsCurrent}>Current Location</option>

                <option
                  value={JSON.stringify([
                    120.98643366717101, 14.657172134647823,
                  ])}
                >
                  Monumento
                </option>
                <option
                  value={JSON.stringify([
                    120.99803119287168, 14.65732466999657,
                  ])}
                >
                  Bagong Barrio
                </option>
                <option
                  value={JSON.stringify([
                    121.00512419084623, 14.657438244671695,
                  ])}
                >
                  Balintawak
                </option>
                <option
                  value={JSON.stringify([121.019379539233, 14.657666053538478])}
                >
                  Roosevelt
                </option>
                <option
                  value={JSON.stringify([
                    121.03294507297232, 14.651163538685225,
                  ])}
                >
                  North Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.03930423910452, 14.641425673493188,
                  ])}
                >
                  Quezon Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.04694559659185, 14.628450129784369,
                  ])}
                >
                  Nepa Q-Mart
                </option>
                <option
                  value={JSON.stringify([
                    121.05346783304196, 14.61425789510831,
                  ])}
                >
                  Main Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.05611384183152, 14.608568193473346,
                  ])}
                >
                  Santolan
                </option>
                <option
                  value={JSON.stringify([
                    121.0562476223397, 14.586561104577427,
                  ])}
                >
                  Ortigas
                </option>
                <option
                  value={JSON.stringify([
                    121.04595650476392, 14.568473768684427,
                  ])}
                >
                  Guadalupe
                </option>
                <option
                  value={JSON.stringify([
                    121.03407938298568, 14.554257235817033,
                  ])}
                >
                  Buendia
                </option>
                <option
                  value={JSON.stringify([
                    121.02719482777911, 14.548688688740214,
                  ])}
                >
                  Ayala
                </option>
                <option
                  value={JSON.stringify([
                    120.99912512910464, 14.537623450769374,
                  ])}
                >
                  Taft Ave
                </option>
                <option
                  value={JSON.stringify([
                    120.98350369934849, 14.535246929465103,
                  ])}
                >
                  Mall of Asia
                </option>
              </select>
            </label>
            <div>
              <img className="img-arrow" src={Arrow} alt="Icon" />
            </div>

            <label>
              <select className="option2" value={to} onChange={handleTo}>
                <option value="To" disabled defaultValue={"To"}>
                  To:
                </option>

                <option
                  id="moa"
                  value={JSON.stringify([
                    120.98350369934849, 14.535246929465103,
                  ])}
                >
                  Mall of Asia
                </option>
                <option
                  id="taft"
                  value={JSON.stringify([
                    120.99912512910464, 14.537623450769374,
                  ])}
                >
                  Taft Ave
                </option>
                <option
                  id="ayala"
                  value={JSON.stringify([
                    121.02719482777911, 14.548688688740214,
                  ])}
                >
                  Ayala
                </option>
                <option
                  id="buendia"
                  value={JSON.stringify([
                    121.03407938298568, 14.554257235817033,
                  ])}
                >
                  Buendia
                </option>
                <option
                  id="guadalupe"
                  value={JSON.stringify([
                    121.04595650476392, 14.568473768684427,
                  ])}
                >
                  Guadalupe
                </option>
                <option
                  id="ortigas"
                  value={JSON.stringify([
                    121.0562476223397, 14.586561104577427,
                  ])}
                >
                  Ortigas
                </option>
                <option
                  id="santolan"
                  value={JSON.stringify([
                    121.05611384183152, 14.608568193473346,
                  ])}
                >
                  Santolan
                </option>
                <option
                  id="mainave"
                  value={JSON.stringify([
                    121.05346783304196, 14.61425789510831,
                  ])}
                >
                  Main Ave
                </option>
                <option
                  id="nepa"
                  value={JSON.stringify([
                    121.04694559659185, 14.628450129784369,
                  ])}
                >
                  Nepa Q-Mart
                </option>
                <option
                  id="quezonave"
                  value={JSON.stringify([
                    121.03930423910452, 14.641425673493188,
                  ])}
                >
                  Quezon Ave
                </option>
                <option
                  id="northave"
                  value={JSON.stringify([
                    121.03294507297232, 14.651163538685225,
                  ])}
                >
                  North Ave
                </option>
                <option
                  id="roosevelt"
                  value={JSON.stringify([121.019379539233, 14.657666053538478])}
                >
                  Roosevelt
                </option>
                <option
                  id="balintawak"
                  value={JSON.stringify([
                    121.00512419084623, 14.657438244671695,
                  ])}
                >
                  Balintawak
                </option>
                <option
                  id="bagongbarrio"
                  value={JSON.stringify([
                    120.99803119287168, 14.65732466999657,
                  ])}
                >
                  Bagong Barrio
                </option>
                <option
                  id="monumento"
                  value={JSON.stringify([
                    120.98643366717101, 14.657172134647823,
                  ])}
                >
                  Monumento
                </option>
              </select>
            </label>
            <br />
          </div> */}
          <div className="distance">


            <input
              className="mb-1 text-center border-0 px-1 border-bottom bg-transparent text-white text-xg fw-bold"
              type="text"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                const truncatedValue = value.slice(0, 6); // limit the value to 6 digits
                setInputValue(truncatedValue);
              }}
              style={{ letterSpacing: '0.5em' }} // Add letter spacing to create spacing between digits
            />


          </div>
          <div className="d-flex flex-row">

            <div className="grid-container mt-1">


              <div className="grid-item" onClick={() => handleClick(7)}>
                7
              </div>
              <div className="grid-item" onClick={() => handleClick(8)}>
                8
              </div>
              <div className="grid-item" onClick={() => handleClick(9)}>
                9
              </div>
              <div className="grid-item" onClick={() => handleClick(4)}>
                4
              </div>
              <div className="grid-item" onClick={() => handleClick(5)}>
                5
              </div>
              <div className="grid-item" onClick={() => handleClick(6)}>
                6
              </div>
              <div className="grid-item" onClick={() => handleClick(1)}>
                1
              </div>
              <div className="grid-item" onClick={() => handleClick(2)}>
                2
              </div>
              <div className="grid-item" onClick={() => handleClick(3)}>
                3
              </div>
              <div className="grid-item" onClick={() => handleClick(0)}>
                0
              </div>
              <div className="grid-item" onClick={() => handleClick("clear")}>
                clear
              </div>
              <div className="grid-item" onClick={() => handleClick("delete")}>
                delete
              </div>
              <div >

              </div>

            </div>
            <div className={`grid-item ${inputValue.length === 6 ? 'bg-success' : ''}`} onClick={() => handleClick("submit")}>
              Submit
            </div>
            <ToastContainer />

          </div>

          {/* <div className="result">{sum ? `₱${sum}` : "₱0"}</div>
          <div className="distance">{`Distance: ${distance} km`}</div>
          <div className="duration">{`Duration: ${duration} minutes`}</div> */}
          {/* <div className="date-time">
            <DateTime />s
          </div> */}
          {/* <div className="save-button">
            <button className="savebutton" type="submit">
              Save
            </button>
            <ToastContainer />
          </div> */}
        </form>
        {/* <div className="d-flex justify-content-center">
          <div className="col text-center">
            <h1 className="text-white">Fare</h1>
            <p className="text-white"> {pickupLocation}</p>


          </div>
        </div> */}

      </div>

    </>
  );
}

export default PaymentModal;
