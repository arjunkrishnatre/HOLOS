import "./Kitchen.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Kitchen() {

  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [connected, setConnected] = useState(false);


  const DEVICE_ID =
    "dc70242f4c37ee122e424e978d31994e85d5e8503942ce70ef98c54c4f70dc3c";


  async function getStatus() {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/refrigerator/${DEVICE_ID}`
      );


      const data = await response.json();


      console.log("LG LIVE:", data);


      setStatus(data.response);

      setConnected(true);


    } catch(error) {


      console.log(error);

      setConnected(false);


    }

  }


  useEffect(() => {


    getStatus();


    const interval = setInterval(
      getStatus,
      5000
    );


    return () =>
      clearInterval(interval);


  }, []);


  const fridgeTemp =
    status?.temperature?.find(
      x => x.locationName === "FRIDGE"
    )?.targetTemperature;


  const freezerTemp =
    status?.temperature?.find(
      x => x.locationName === "FREEZER"
    )?.targetTemperature;


  const express =
    status?.refrigeration?.expressMode;


  const door =
    status?.doorStatus?.[0]?.doorState;


  return (

    <div className="kitchen-page">


      {/* BACK BUTTON — ONLY NEW PART */}

      <button
        className="kitchen-back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>


      <div className="fridge-card">


        <h1>
          LG Refrigerator
        </h1>


        <p className="connected">

          ▫ {connected ? "Connected" : "Offline"}

        </p>


        <hr/>


        <h3>
          Fridge Temperature
        </h3>

        <h2>
          {fridgeTemp ?? "--"}°C
        </h2>


        <hr/>


        <h3>
          Freezer Temperature
        </h3>

        <h2>
          {freezerTemp ?? "--"}°C
        </h2>


        <hr/>


        <h3>
          Express Freeze
        </h3>

        <h2>
          {express ? "ON ▫" : "OFF ▫"}
        </h2>


        <hr/>


        <h3>
          Door Status
        </h3>


        <h2>

          {
            door === "OPEN"
            ? "OPEN 🚪"
            : "CLOSED 🔒"
          }

        </h2>


      </div>


    </div>

  );

}


export default Kitchen;