import React, { useState, useEffect, useCallback, useRef } from "react";
import * as turf from "turf";
import BusStopIcon from "../assets/icons/busStops.png";
import mapboxgl, { Marker, LngLat } from "mapbox-gl";
import BusRoutes from "../bus_route_coordinates.json";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import io from "socket.io-client";

import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearValuesMonumento,
  clearValuesBBAR,
  clearValuesBalintawak,
  clearValuesKaingin,
  clearValuesRoosevelt,
  clearValuesNorthAve,
  clearValuesQuezon,
  clearValuesNEPAC,
  clearValuesMainAve,
  clearValuesSantolan,
  clearValuesOrtigas,
  clearValuesGuadalupe,
  clearValuesBuendia,
  clearValuesAyala,
  clearValuesTramo,
  clearValuesTaft,
  clearValuesMacapagal,
  clearValuesMOA,
  subtractPassengers,
  incrementOutboundMOA,
  incrementOutboundMacapagal,
  incrementOutboundTaft,
  incrementOutboundTramo,
  incrementOutboundAyala,
  incrementOutboundBuendia,
  incrementOutboundGuadalupe,
  incrementOutboundOrtigas,
  incrementOutboundSantolan,
  incrementOutboundMainAve,
  incrementOutboundNEPAC,
  incrementOutboundQuezon,
  incrementOutboundNorthAve,
  incrementOutboundRoosevelt,
  incrementOutboundKaingin,
  incrementOutboundBalintawak,
  incrementOutboundBBAR,
  incrementOutboundMonu,
} from "../components/redux/actions";

// import io from "socket.io-client";

// const ONPREM_HOST = "http://devtest.puvtia.live";
// const HOST = ONPREM_HOST;
const apiKey = process.env.REACT_APP_API_KEY;
const MAPBOX_ACCESS_TOKEN = apiKey;
function App({
  isReverseDirection = true,
  isFollow = false,
  isSimulation = true,
}) {
  // console.log("isReverseDirection", isReverseDirection);

  const [dataMonumento, setDataMonumento] = useState(0);
  const [dataBagongBarrio, setDataBagongBarrio] = useState(0);
  const [dataBalintawak, setDataBalintawak] = useState(0);
  const [dataKaingin, setDataKaingin] = useState(0);
  const [dataRoosevelt, setDataRoosevelt] = useState(0);
  const [dataNorthAvenue, setDataNorthAvenue] = useState(0);
  const [dataQuezonAvenue, setDataQuezonAvenue] = useState(0);
  const [dataNepaQMart, setDataNepaQMart] = useState(0);
  const [dataMainAvenue, setDataMainAvenue] = useState(0);
  const [dataSantolan, setDataSantolan] = useState(0);
  const [dataOrtigas, setDataOrtigas] = useState(0);
  const [dataGuadalupe, setDataGuadalupe] = useState(0);
  const [dataBuendia, setDataBuendia] = useState(0);
  const [dataAyala, setDataAyala] = useState(0);
  const [dataTramo, setDataTramo] = useState(0);
  const [dataTaftAvenue, setDataTaftAvenue] = useState(0);
  const [dataMacapagalAvenue, setDataMacapagalAvenue] = useState(0);
  const [dataMOA, setDataMOA] = useState(0);

  const dispatchFunctions = [
    incrementOutboundMonu,
    incrementOutboundBBAR,
    incrementOutboundBalintawak,
    incrementOutboundKaingin,
    incrementOutboundRoosevelt,
    incrementOutboundNorthAve,
    incrementOutboundQuezon,
    incrementOutboundNEPAC,
    incrementOutboundMainAve,
    incrementOutboundSantolan,
    incrementOutboundOrtigas,
    incrementOutboundGuadalupe,
    incrementOutboundBuendia,
    incrementOutboundAyala,
    incrementOutboundTramo,
    incrementOutboundTaft,
    incrementOutboundMacapagal,
    incrementOutboundMOA,
  ];
  // const [ReverseDirection, setReverseDirection] = useState();

  const vehicleId = 1;

  const tPassengers = useSelector((state) => state.tPassengers);
  const passengers = useSelector((state) => state.passengers);
  const setConfirmationSubmit = useSelector(
    (state) => state.set_confirmation_submit
  );

  const [count, setCount] = useState(0);
  // const socket = io("http://localhost:8080");
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastMessage, setLastMessage] = useState(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const socketRef = useRef(null);

  const dispatch = useDispatch();
  const [busStops] = useState([
    {
      id: 1,
      name: "EDSA MONUMENTO",
      coordinates: [120.98626888227597, 14.657215275955926],
    },
    {
      id: 2,
      name: "BAGONG BARRIO",
      coordinates: [120.99808879114777, 14.657391594059112],
    },
    {
      id: 3,
      name: "BALINTAWAK",
      coordinates: [121.0047431717714, 14.657524129251748],
    },
    {
      id: 4,
      name: "KAINGIN",
      coordinates: [121.01153629120206, 14.657604258191395],
    },
    {
      id: 5,
      name: "ROOSEVELT",
      coordinates: [121.01961528507952, 14.657658162087612],
    },
    {
      id: 6,
      name: "NORTH AVENUE",
      coordinates: [121.03157735787651, 14.652931262750016],
    },
    {
      id: 7,
      name: "QUEZON AVENUE",
      coordinates: [121.03883671167841, 14.641714922048095],
    },
    {
      id: 8,
      name: "NEPA Q MART",
      coordinates: [121.04684798395698, 14.629148368861149],
    },

    {
      id: 9,
      name: "MAIN AVENUE",
      coordinates: [121.05367727924602, 14.614298382438768],
    },
    {
      id: 10,
      name: "SANTOLAN",
      coordinates: [121.05570624712064, 14.608943814217012],
    },
    {
      id: 11,
      name: "ORTIGAS",
      coordinates: [121.05684254499538, 14.587845138695235],
    },
    {
      id: 12,
      name: "GUADALUPE",
      coordinates: [121.04590206450962, 14.568876021047187],
    },
    {
      id: 13,
      name: "BUENDIA",
      coordinates: [121.0355484914825, 14.555127222627686],
    },
    {
      id: 14,
      name: "AYALA",
      coordinates: [121.02902499402134, 14.549848794874846],
    },
    {
      id: 15,
      name: "TRAMO",
      coordinates: [121.00428378102572, 14.53805219625884],
    },
    {
      id: 16,
      name: "TAFT AVENUE",
      coordinates: [121.00040964855965, 14.53774675908887],
    },
    {
      id: 17,
      name: "MACAPAGAL AVENUE",
      coordinates: [120.99169116738834, 14.536965825882898],
    },
    {
      id: 18,
      name: "SM MOA",
      coordinates: [120.98333212048786, 14.535456455986655],
    },
    // {
    //   id: 19,
    //   name: "end_stop",
    //   coordinates: [120.983177, 14.535756],
    // },
    // {
    //   id: 20,
    //   name: "start_stop",
    //   coordinates: [120.98067048718022, 14.657225567125748],
    // },
  ]);

  // const { busStops, setBusStops } = useBusStops();
  const OutboundMonumento = useSelector(
    (state) => state.outbound_passengers_monumento
  );
  const OutboundBagongBarrio = useSelector(
    (state) => state.outbound_passengers_bagongbarrio
  );
  const OutboundBalintawak = useSelector(
    (state) => state.outbound_passengers_balintawak
  );
  const OutboundKaingin = useSelector(
    (state) => state.outbound_passengers_kaingin
  );
  const OutboundRoosevelt = useSelector(
    (state) => state.outbound_passengers_roosevelt
  );
  const OutboundNorthAvenue = useSelector(
    (state) => state.outbound_passengers_northavenue
  );
  const OutboundQuezonAvenue = useSelector(
    (state) => state.outbound_passengers_quezon
  );
  const OutboundNepaQMart = useSelector(
    (state) => state.outbound_passengers_nepaque
  );

  const OutboundMainAvenue = useSelector(
    (state) => state.outbound_passengers_mainavenue
  );
  const OutboundSantolan = useSelector(
    (state) => state.outbound_passengers_santolan
  );
  const OutboundOrtigas = useSelector(
    (state) => state.outbound_passengers_ortigas
  );
  const OutboundGuadalupe = useSelector(
    (state) => state.outbound_passengers_guadalupe
  );
  const OutboundBuendia = useSelector(
    (state) => state.outbound_passengers_buendia
  );
  const OutboundAyala = useSelector((state) => state.outbound_passengers_ayala);
  const OutboundTramo = useSelector((state) => state.outbound_passengers_tramo);
  const OutboundTaftAvenue = useSelector(
    (state) => state.outbound_passengers_taft
  );
  const OutboundMacapagalAvenue = useSelector(
    (state) => state.outbound_passengers_macapagal
  );
  const OutboundMOA = useSelector((state) => state.outbound_passengers_moa);

  const InboundAyala = useSelector((state) => state.inbound_passengers_ayala);

  const [route, setRoute] = useState(null);
  const [mapCenter, setMapCenter] = useState([120.994453, 14.54361]);

  const [Currentlocation, setCurrentLocation] = useState({});
  const [passengerCoords, setPassengerCoords] = useState([]);

  const [fromStop, setFromStop] = useState(0);
  const [nextStop, setNextStop] = useState(0);

  const [map, setMap] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  const [previousLocation, setPreviousLocation] = useState(null);

  const [lineLayerId, setLineLayerId] = useState(null);
  const [path, setPath] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });

  //-------------calling data from raspi server. gps current location simulation-------------//

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = io("http://devtest.puvtia.live/");
  //     console.log("Connected");
  //   }
  //   const socket = socketRef.current;
  //   socket.on("back_coordinates", (data) => {
  //     if (!data) {
  //       console.log("No data")

  //     } else {

  //       setCurrentLocation(data);
  //     }
  //   });

  //   return () => { };
  // }, []);
  //////////////////////////////////////////

  // const secondCode = useCallback(async () => {
  //   const response = await fetch("http://192.168.254.173:5000/transport_coordinate");
  //   const data = await response.json();
  //   setCurrentLocation(data);
  // }, []);

  // const secondCodeRef = useRef(secondCode);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     secondCodeRef.current();
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   if (!isSimulation) {
  //     if (!socketRef.current) {
  //       socketRef.current = io(HOST);
  //       console.log("gps connected");
  //     }
  //     const socket = socketRef.current;
  //     socket.on("back_coordinates", async (data) => {
  //       let coord = data;
  //       console.log("current location", data);
  //       if (!data) {
  //         try {
  //           const response = await fetch("http://127.0.0.1:5000/gps");
  //           const coord = await response.json();
  //           return setCurrentLocation(coord);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       setCurrentLocation(coord);
  //     });

  //     return () => {};
  //   }
  // }, [isSimulation]);

  // simulation testing

  // const currentLocation = useCallback(async () => {
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:5000/transport_simulation"
  //     );
  //     const data = await response.json();
  //     setCurrentLocation(data);
  //     // localStorage.setItem("currentLocation", JSON.stringify(data));
  //   } catch (error) {
  //     console.log("Simulation Not working");
  //   }
  // }, []);

  // const currentLocationRef = useRef(currentLocation);

  // useEffect(() => {
  //   let intervalId;

  //   if (isSimulation) {
  //     intervalId = setInterval(() => {
  //       currentLocationRef.current();
  //     }, 500);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [currentLocationRef, isSimulation]);

  // useEffect(() => {
  //   if (!isSimulation) {
  //     try {
  //       if (!socketRef.current) {
  //         socketRef.current = io("http://devtest.puvtia.live");
  //         console.log("Live Testing Connected");
  //       }
  //       const socket = socketRef.current;
  //       socket.on("back_coordinates", (data) => {
  //         // console.log("current location", data);
  //         setCurrentLocation(data);
  //       });

  //       return () => {
  //         socket.off("back_coordinates");
  //       };
  //     }
  //     catch (error) {
  //       console.log("Live not working")
  //     }
  //   }

  // }, [isSimulation]);

  //-------------rendering the mapbox-------------//

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v9",
      center: [121.0215, 14.5554],
      zoom: 15,
      attributionControl: false,
      // pitch: 70, // pitch in degrees
      // bearing: -60,
      maxBounds: [
        [120.8116, 14.3272], // Southwest coordinates of Metro Manila
        [121.2, 14.8366], // Northeast coordinates of Metro Manila
      ],
    });
    newMap.on("load", () => {
      const lineString = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: BusRoutes?.coordinates,
        },
        properties: {},
      };

      newMap.addLayer({
        id: "line-layer",
        type: "line",
        source: {
          type: "geojson",
          data: lineString,
        },
        paint: {
          "line-color": "#008b8b",
          "line-width": 4,
        },
      });
    });

    setMap(newMap);
    return () => newMap.remove();
  }, []);

  //-------------pop up data on each bus stops-------------//
  useEffect(() => {
    if (!map) return;

    busStops.forEach((stop) => {
      const busIconEl = document.createElement("img");
      busIconEl.src = BusStopIcon;
      busIconEl.style.width = "40px";
      busIconEl.style.height = "40px";

      let popupText = "";
      let outboundPassengers = "";

      if (stop.id === 1) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataMonumento}</p><p>Outbound Passengers: ${OutboundMonumento}</p>`;
        outboundPassengers = OutboundMonumento;
      } else if (stop.id === 2) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataBagongBarrio} </p><p>Outbound Passengers: ${OutboundBagongBarrio}</p>`;
        outboundPassengers = OutboundBagongBarrio;
      } else if (stop.id === 3) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataBalintawak} </p><p>Outbound Passengers: ${OutboundBalintawak}</p>`;
        outboundPassengers = OutboundBalintawak;
      } else if (stop.id === 4) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataKaingin}</p><p>Outbound Passengers: ${OutboundKaingin}</p>`;
        outboundPassengers = OutboundKaingin;
      } else if (stop.id === 5) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataRoosevelt}</p><p>Outbound Passengers: ${OutboundRoosevelt}</p>`;
        outboundPassengers = OutboundRoosevelt;
      } else if (stop.id === 6) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataNorthAvenue}</p><p>Outbound Passengers: ${OutboundNorthAvenue}</p>`;
        outboundPassengers = OutboundNorthAvenue;
      } else if (stop.id === 7) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataQuezonAvenue}</p><p>Outbound Passengers: ${OutboundQuezonAvenue}</p>`;
        outboundPassengers = OutboundQuezonAvenue;
      } else if (stop.id === 8) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataNepaQMart}</p><p>Outbound Passengers: ${OutboundNepaQMart}</p>`;
        outboundPassengers = OutboundNepaQMart;
      } else if (stop.id === 9) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataMainAvenue}</p><p>Outbound Passengers: ${OutboundMainAvenue}</p>`;
        outboundPassengers = OutboundMainAvenue;
      } else if (stop.id === 10) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataSantolan}</p><p>Outbound Passengers:${OutboundSantolan}</p>`;
        outboundPassengers = OutboundSantolan;
      } else if (stop.id === 11) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataOrtigas}</p><p>Outbound Passengers:${OutboundOrtigas}</p>`;
        outboundPassengers = OutboundOrtigas;
      } else if (stop.id === 12) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataGuadalupe}</p><p>Outbound Passengers:${OutboundGuadalupe}</p>`;
        outboundPassengers = OutboundGuadalupe;
      } else if (stop.id === 13) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataBuendia}</p><p>Outbound Passengers:${OutboundBuendia}</p>`;
        outboundPassengers = OutboundBuendia;
      } else if (stop.id === 14) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataAyala} </p><p>Outbound Passengers:${OutboundAyala}</p>`;
        outboundPassengers = OutboundAyala;
      } else if (stop.id === 15) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataTramo}</p><p>Outbound Passengers:${OutboundTramo}</p>`;
        outboundPassengers = OutboundTramo;
      } else if (stop.id === 16) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataTaftAvenue}</p><p>Outbound Passengers:${OutboundTaftAvenue}</p>`;
        outboundPassengers = OutboundTaftAvenue;
      } else if (stop.id === 17) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataMacapagalAvenue}</p><p>Outbound Passengers: ${OutboundMacapagalAvenue}</p>`;
        outboundPassengers = OutboundMacapagalAvenue;
      } else if (stop.id === 18) {
        popupText = `<h3>${stop.name}</h3><p>Waiting Passengers: ${dataMOA}</p><p>Outbound Passengers: ${OutboundMOA}</p>`;
        outboundPassengers = OutboundMOA;
      }

      const marker = new mapboxgl.Marker({ element: busIconEl })
        .setLngLat(stop?.coordinates)
        .addTo(map);

      const popup = new mapboxgl.Popup().setHTML(popupText);
      marker.setPopup(popup);

      const popupContainer = popup._content;
      popupContainer.style.width = "200px";
      popupContainer.style.height = "200px";
      popupContainer.style.fontSize = "15px";

      popupContainer.style.backgroundColor = "transparent";
      popupContainer.style.backdropFilter = "blur(50px)";
      popupContainer.style.borderRadius = "20px";
      popupContainer.style.display = "flex";
      popupContainer.style.justifyContent = "center";
      popupContainer.style.alignItems = "center";
      popupContainer.style.flexDirection = "column";
      popupContainer.style.padding = "10px";
      popupContainer.style.webkitBoxShadow = "0 10px 6px -6px #080707";
      popupContainer.style.mozBoxShadow = "0 10px 6px -6px #000000";
      popupContainer.style.boxShadow =
        "rgb(3, 3, 3) 0px 10px 36px 0px, rgb(0, 0, 0) 0px 0px 0px 1px";
      popupContainer.style.color = "rgb(2, 239, 144)";

      popup.on("close", () => {});

      marker.addTo(map);
    });
  }, [
    map,
    OutboundMonumento,
    OutboundBagongBarrio,
    OutboundBalintawak,
    OutboundKaingin,
    OutboundRoosevelt,
    OutboundNorthAvenue,
    OutboundQuezonAvenue,
    OutboundNepaQMart,
    OutboundMainAvenue,
    OutboundSantolan,
    OutboundOrtigas,
    OutboundGuadalupe,
    OutboundBuendia,
    OutboundAyala,
    OutboundTramo,
    OutboundTaftAvenue,
    OutboundMacapagalAvenue,
    OutboundMOA,
    dataMonumento,
    dataBagongBarrio,
    dataBalintawak,
    dataKaingin,
    dataRoosevelt,
    dataNorthAvenue,
    dataQuezonAvenue,
    dataNepaQMart,
    dataMainAvenue,
    dataSantolan,
    dataOrtigas,
    dataGuadalupe,
    dataBuendia,
    dataAyala,
    dataTramo,
    dataTaftAvenue,
    dataMacapagalAvenue,
    dataMOA,
  ]);

  //-------------current location with marker-------------//
  useEffect(() => {
    const goToCurrentLocation = () => {
      if (isFollow && currentLocationMarker) {
        map.flyTo({
          center: currentLocationMarker.getLngLat(),
          zoom: 17,
          speed: 0.8, // Adjust the speed for smoother movement
          curve: 1.2, // Adjust the curve for smoother movement
          bearing: 0,
          pitch: 0,
        });
      }
    };

    goToCurrentLocation(); // Trigger camera movement initially

    return () => {};
  }, [isFollow, Currentlocation]);

  useEffect(() => {
    if (
      map &&
      currentLocationMarker &&
      Currentlocation.latitude &&
      Currentlocation.longitude &&
      !isNaN(Currentlocation.latitude) &&
      !isNaN(Currentlocation.longitude)
    ) {
      currentLocationMarker.setLngLat([
        Currentlocation.longitude,
        Currentlocation.latitude,
      ]);

      const newCoordinates = [
        Currentlocation.longitude,
        Currentlocation.latitude,
      ];
      if (!previousLocation) {
        setPath({
          ...path,
          geometry: {
            ...path.geometry,
            coordinates: [newCoordinates],
          },
        });
      } else {
        setPath({
          ...path,
          geometry: {
            ...path.geometry,
            coordinates: [...path.geometry?.coordinates, newCoordinates],
          },
        });
      }
      setPreviousLocation(newCoordinates);

      if (lineLayerId) {
        map.getSource(lineLayerId).setData(path);
      }
    } else if (
      map &&
      Currentlocation.latitude &&
      Currentlocation.longitude &&
      !isNaN(Currentlocation.latitude) &&
      !isNaN(Currentlocation.longitude)
    ) {
      const marker = new mapboxgl.Marker()
        .setLngLat([Currentlocation.longitude, Currentlocation.latitude])
        .addTo(map);
      setCurrentLocationMarker(marker);
      setPreviousLocation([
        Currentlocation.longitude,
        Currentlocation.latitude,
      ]);
    }
  }, [Currentlocation]);

  //-------------bustops-------------//

  useEffect(() => {
    if (Currentlocation.latitude && Currentlocation.longitude) {
      busStops.forEach((stop, index) => {
        const distance = turf.distance(
          [stop.coordinates[0], stop.coordinates[1]],
          [Currentlocation.longitude, Currentlocation.latitude]
        );

        if (distance < 0.1) {
          localStorage.setItem("selectedStop", JSON.stringify(stop));

          if (!isReverseDirection) {
            setNextStop(index + 1);
          } else {
            setNextStop(index - 1);
          }
          {
            if (stop.id === 1) {
              dispatch(subtractPassengers(OutboundMonumento));
              dispatch(clearValuesMonumento());
            } else if (stop.id === 2) {
              dispatch(subtractPassengers(OutboundBagongBarrio));
              dispatch(clearValuesBBAR());
            } else if (stop.id === 3) {
              dispatch(subtractPassengers(OutboundBalintawak));
              dispatch(clearValuesBalintawak());
            } else if (stop.id === 4) {
              dispatch(subtractPassengers(OutboundKaingin));
              dispatch(clearValuesKaingin());
            } else if (stop.id === 5) {
              dispatch(subtractPassengers(OutboundRoosevelt));
              dispatch(clearValuesRoosevelt());
            } else if (stop.id === 6) {
              dispatch(subtractPassengers(OutboundNorthAvenue));
              dispatch(clearValuesNorthAve());
            } else if (stop.id === 7) {
              dispatch(subtractPassengers(OutboundQuezonAvenue));
              dispatch(clearValuesQuezon());
            } else if (stop.id === 8) {
              dispatch(subtractPassengers(OutboundNepaQMart));
              dispatch(clearValuesNEPAC());
            } else if (stop.id === 9) {
              dispatch(subtractPassengers(OutboundMainAvenue));
              dispatch(clearValuesMainAve());
            } else if (stop.id === 10) {
              dispatch(subtractPassengers(OutboundSantolan));
              dispatch(clearValuesSantolan());
            } else if (stop.id === 11) {
              dispatch(subtractPassengers(OutboundOrtigas));
              dispatch(clearValuesOrtigas());
            } else if (stop.id === 12) {
              dispatch(subtractPassengers(OutboundGuadalupe));
              dispatch(clearValuesGuadalupe());
            } else if (stop.id === 13) {
              dispatch(subtractPassengers(OutboundBuendia));
              dispatch(clearValuesBuendia());
            } else if (stop.id === 14) {
              dispatch(subtractPassengers(OutboundAyala));
              dispatch(clearValuesAyala());
            } else if (stop.id === 15) {
              dispatch(subtractPassengers(OutboundTramo));
              dispatch(clearValuesTramo());
            } else if (stop.id === 16) {
              dispatch(subtractPassengers(OutboundTaftAvenue));
              dispatch(clearValuesTaft());
            } else if (stop.id === 17) {
              dispatch(subtractPassengers(OutboundMacapagalAvenue));
              dispatch(clearValuesMacapagal());
            } else if (stop.id === 18) {
              dispatch(subtractPassengers(OutboundMOA));
              dispatch(clearValuesMOA());
            }
          }
        }
      });
    }
  }, [
    passengers,
    Currentlocation,
    OutboundMonumento,
    OutboundBagongBarrio,
    OutboundBalintawak,
    OutboundKaingin,
    OutboundRoosevelt,
    OutboundNorthAvenue,
    OutboundQuezonAvenue,
    OutboundNepaQMart,
    OutboundMainAvenue,
    OutboundSantolan,
    OutboundOrtigas,
    OutboundGuadalupe,
    OutboundBuendia,
    OutboundAyala,
    OutboundTramo,
    OutboundTaftAvenue,
    OutboundMacapagalAvenue,
    OutboundMOA,
    dataMonumento,
    dataBagongBarrio,
    dataBalintawak,
    dataKaingin,
    dataRoosevelt,
    dataNorthAvenue,
    dataQuezonAvenue,
    dataNepaQMart,
    dataMainAvenue,
    dataSantolan,
    dataOrtigas,
    dataGuadalupe,
    dataBuendia,
    dataAyala,
    dataTramo,
    dataTaftAvenue,
    dataMacapagalAvenue,
    dataMOA,
  ]);

  //-------------calculation of directions/distance-------------//

  useEffect(() => {
    if (Currentlocation.latitude && Currentlocation.longitude) {
      const dashboardDirections = new MapboxDirections({
        accessToken: MAPBOX_ACCESS_TOKEN,
        unit: "metric",
        profile: "mapbox/driving",
        controls: {
          inputs: false,
          instructions: false,
        },
      });
      const currentCoords = [
        Currentlocation.longitude,
        Currentlocation.latitude,
      ];

      dashboardDirections.setOrigin(currentCoords);

      if (nextStop >= 0 && nextStop < busStops.length) {
        dashboardDirections.setDestination(busStops[nextStop].coordinates);
      }

      dashboardDirections.on("route", (event) => {
        const route = event.route[0];
        const distance = (route.distance / 1000).toFixed(0);
        const duration = (route.duration / 60).toFixed(0);

        const newRouteInfo = {
          stop: busStops[nextStop]?.name,
          distance: `${distance} km`,
          duration: `${duration} minutes`,
        };

        setRouteInfo((prevRouteInfo) => ({
          ...prevRouteInfo,
          ...newRouteInfo,
        }));
        // Save newRouteInfo to localStorage
        localStorage.setItem("routeInfo", JSON.stringify(newRouteInfo));

        // Set newRouteInfo to routeInfo state
        setRouteInfo(newRouteInfo);

        // console.clear();

        // console.log(
        //   newRouteInfo.stop,
        //   newRouteInfo.distance,
        //   newRouteInfo.duration
        // );
      });
      // console.log("ReverseDirection", isReverseDirection);
    }
  }, [count]);
  ///////////////////////delay/////////////////
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);
  //-------------socket emit data register data-------------//

  // useEffect(() => {
  //   try {
  //     if (!socketRef.current) {
  //       socketRef.current = io(HOST);
  //       console.log("register_trip connected");
  //     }

  //     const socket = socketRef.current;

  //     socket.emit("register_trip", {
  //       vehicleId: vehicleId,
  //       maxPassenger: 80,
  //       coordinates: [14.535456455986655, 120.98333212048786],
  //     });
  //     localStorage.removeItem("inputValue");

  //     return () => { };
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = io("http://devtest.puvtia.live");
  //     console.log("register_trip connected");
  //   }

  //   localStorage.setItem("myBooleanValue", "false");
  //   localStorage.setItem("isExisting", "false");

  //   const socket = socketRef.current;

  //   socket.emit("register_trip", {
  //     vehicleId: vehicleId,
  //     maxPassenger: 80,
  //     coordinates: [14.535456455986655, 120.98333212048786],
  //   });

  //   const ticketCode = localStorage.getItem("inputValue");
  //   socket.emit("ticket_payment", { code: ticketCode });

  //   const handleTicketPayment = (data) => {
  //     if (ticketCode === data.code) {
  //       console.log("ticket-payment", data);
  //       localStorage.setItem("isExisting", "true");
  //       localStorage.setItem("myBooleanValue", "true");
  //       localStorage.setItem("dropoffLocation", data.dropoffLocation);
  //       localStorage.setItem("pickupLocation", data.pickupLocation);
  //       const dropoffLocation = data.dropoffLocation;

  //       if (
  //         dropoffLocation >= 0 &&
  //         dropoffLocation < dispatchFunctions.length
  //       ) {
  //         dispatch(dispatchFunctions[dropoffLocation]());
  //       }
  //     } else if (ticketCode != data.code) {
  //       console.log("Invalid Code");
  //       localStorage.removeItem("inputValue");
  //       localStorage.setItem("myBooleanValue", "false");
  //     } else {
  //       console.log("No Code");
  //     }

  //     socket.off("ticket_payment", handleTicketPayment);
  //   };

  //   if (setConfirmationSubmit === true) {
  //     socket.emit("ticket_payment", { code: ticketCode }, "cash");
  //     localStorage.setItem("myBooleanValue", "false");
  //     localStorage.setItem("isExisting", "false");
  //   }

  //   socket.on("ticket_payment", handleTicketPayment);

  //   return () => {
  //     // Clean up function

  //     socket.off("ticket_payment", handleTicketPayment);
  //   };
  // }, [localStorage.getItem("inputValue")]);

  // useEffect(() => {
  //   try {
  //     if (!socketRef.current) {
  //       socketRef.current = io("http://devtest.puvtia.live");
  //       console.log("register_trip connected");
  //     }

  //     const socket = socketRef.current;

  //     socket.emit("register_trip", {
  //       vehicleId: vehicleId,
  //       maxPassenger: 80,
  //       coordinates: [14.535456455986655, 120.98333212048786],
  //     });
  //     localStorage.removeItem("inputValue");
  //     const ticketCode = "000005";

  //     socket.emit("ticket_payment", { code: ticketCode });

  //     socket.on("ticket_payment", (data) => {
  //       console.log("ticket-payment", data);
  //     });

  //     return () => { };
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }, []);

  //-------------socket send data -------------//
  // useEffect(() => {
  //   try {
  //     if (!socketRef.current) {
  //       socketRef.current = io(HOST);
  //       console.log("vehicle_info connected");
  //     }

  //     const socket = socketRef.current;

  //     if (!!routeInfo) {
  //       socket.emit("vehicle_info", {
  //         vehicleId: vehicleId,
  //         nextStopId: routeInfo.stop,
  //         ETA: routeInfo.duration,
  //         distance: routeInfo.distance,
  //         status: "active",
  //         coordinates: [Currentlocation.latitude, Currentlocation.longitude],
  //         currentPassengers: tPassengers,
  //         isReverseDirection: isReverseDirection,
  //       });
  //     }

  //     return () => {};
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [count]);

  useEffect(() => {
    try {
      // localStorage.setItem('dataMonumento', JSON.stringify(12));
      if (!socketRef.current) {
        // socketRef.current = io(HOST);
        // console.log("Connected");
      }

      const socket = socketRef.current;

      socket.on("stops_info", (data) => {
        // console.log("stops-info", data);
        // console.log(isReverseDirection);

        // console.log("stops", data[0].waiting);
        // console.log("stops", data[17].waiting);

        if (isReverseDirection) {
          setDataMonumento(data[0].toStartStopWaiting);
          setDataBagongBarrio(data[1].toStartStopWaiting);
          setDataBalintawak(data[2].toStartStopWaiting);
          setDataKaingin(data[3].toStartStopWaiting);
          setDataRoosevelt(data[4].toStartStopWaiting);
          setDataNorthAvenue(data[5].toStartStopWaiting);
          setDataQuezonAvenue(data[6].toStartStopWaiting);
          setDataNepaQMart(data[7].toStartStopWaiting);
          setDataMainAvenue(data[8].toStartStopWaiting);
          setDataSantolan(data[9].toStartStopWaiting);
          setDataOrtigas(data[10].toStartStopWaiting);
          setDataGuadalupe(data[11].toStartStopWaiting);
          setDataBuendia(data[12].toStartStopWaiting);
          setDataAyala(data[13].toStartStopWaiting);
          setDataTramo(data[14].toStartStopWaiting);
          setDataTaftAvenue(data[15].toStartStopWaiting);
          setDataMacapagalAvenue(data[16].toStartStopWaiting);
          setDataMOA(data[17].toStartStopWaiting);
        } else {
          setDataMonumento(data[0].toEndStopWaiting);
          setDataBagongBarrio(data[1].toEndStopWaiting);
          setDataBalintawak(data[2].toEndStopWaiting);
          setDataKaingin(data[3].toEndStopWaiting);
          setDataRoosevelt(data[4].toEndStopWaiting);
          setDataNorthAvenue(data[5].toEndStopWaiting);
          setDataQuezonAvenue(data[6].toEndStopWaiting);
          setDataNepaQMart(data[7].toEndStopWaiting);
          setDataMainAvenue(data[8].toEndStopWaiting);
          setDataSantolan(data[9].toEndStopWaiting);
          setDataOrtigas(data[10].toEndStopWaiting);
          setDataGuadalupe(data[11].toEndStopWaiting);
          setDataBuendia(data[12].toEndStopWaiting);
          setDataAyala(data[13].toEndStopWaiting);
          setDataTramo(data[14].toEndStopWaiting);
          setDataTaftAvenue(data[15].toEndStopWaiting);
          setDataMacapagalAvenue(data[16].toEndStopWaiting);
          setDataMOA(data[17].toEndStopWaiting);
        }
      });
      // socket.on("ticket_payment", (data) => {
      //   // console.log("ticket-payment", data);
      // });
      socket.on("vehicle_info", (data) => {
        // console.log("vehicle-info", data);
      });

      return () => {};
    } catch (error) {
      console.log(error);
    }
  }, [count]);

  // useEffect(() => {
  //   if (dataMonumento.length > 0) {
  //     // if (dataMonumento.id)
  //     console.log("datamonumento waiting:", dataMonumento[0].waiting);
  //   }
  // }, [dataMonumento]);

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = io("http://localhost");
  //     console.log("Connected");
  //   }

  //   const socket = socketRef.current;

  //   socket.emit("coordinates", {
  //     id: "XXXA023CV",
  //     maxPassenger: 12,
  //     coordinates: {
  //       latitude: Currentlocation.latitude,
  //       longitude: Currentlocation.longitude,
  //     },
  //     nextStopId: "awds",
  //     ETA: routeInfo,
  //     Status: "active",
  //   });
  // }, [count]);

  // useEffect(() => {
  //   try {
  //     socket.emit("register_trip", {
  //       id: 12,
  //       maxPassenger: 12,
  // latitude: Currentlocation.latitude,
  // longitude: Currentlocation.longitude,
  //     });
  //     console.log("Success");
  //   } catch {
  //     console.log("error");
  //   }

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  //   socket.on("message", (data) => {
  //     setLastMessage(data);
  //   });
  //   socket.on("received", () => {
  //     setIsConnected(true);
  //     console.log("received");
  //   });
  // }, []);

  // useEffect(() => {

  //   try {
  //     socket.emit("coordinates", {
  //       id: "XXXA023CV",
  //       maxPassenger: 12,
  //       coordinates: {
  //         latitude: Currentlocation.latitude,
  //         longitude: Currentlocation.longitude,
  //       },
  //       nextStopId: "awds",
  //       ETA: routeInfo,
  //       Status: "active",
  //     });
  //     console.log("success");
  //   } catch {
  //     console.log("error");
  //   }
  // }, [count]);

  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });
  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  //   socket.on("message", (data) => {
  //     setLastMessage(data);
  //   });

  //   socket.on("stops_info", (data) => {
  //     console.log("OUTPUT", data);
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("message");
  //   };
  // }, []);

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100vw" }} />
    </div>
  );
}

export default App;
