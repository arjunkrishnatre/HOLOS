import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("holos_username") || "Arjun";

  const [theme, setTheme] = useState(
    localStorage.getItem("holos_theme") || "dark"
  );

  const [greeting, setGreeting] = useState("");

  const [devices, setDevices] = useState([]);


  // =====================================================
  // TIME-BASED GREETING
  // =====================================================

  function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    }

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good Evening";
    }

    return "Good Night";
  }


  // =====================================================
  // LOAD SAVED DEVICES
  // =====================================================

  function loadDevices() {
    try {
      const saved = localStorage.getItem("holos_devices");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setDevices(parsed);
          return;
        }
      }

      setDevices([]);

    } catch (error) {
      console.error(
        "HOLOS DEVICE LOAD ERROR:",
        error
      );

      setDevices([]);
    }
  }


  // =====================================================
  // START DASHBOARD
  // =====================================================

  useEffect(() => {

    document.body.setAttribute(
      "data-theme",
      theme
    );

    setGreeting(getGreeting());

    loadDevices();


    const greetingTimer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);


    // Check for newly-added devices
    const deviceTimer = setInterval(() => {
      loadDevices();
    }, 2000);


    // React to localStorage changes
    function storageChanged() {
      loadDevices();

      setTheme(
        localStorage.getItem("holos_theme") || "dark"
      );
    }

    window.addEventListener(
      "storage",
      storageChanged
    );


    return () => {

      clearInterval(greetingTimer);

      clearInterval(deviceTimer);

      window.removeEventListener(
        "storage",
        storageChanged
      );

    };

  }, []);


  // =====================================================
  // DEVICE ICON
  // =====================================================

  function getDeviceIcon(device) {

    if (
      device.type === "light" ||
      device.type === "bulb"
    ) {
      return "💡";
    }

    if (
      device.type === "refrigerator" ||
      device.type === "fridge"
    ) {
      return "🧊";
    }

    if (device.type === "tv") {
      return "📺";
    }

    if (device.type === "washer") {
      return "🧺";
    }

    return "🔌";
  }


  // =====================================================
  // DEVICE CLICK
  // =====================================================

  function openDevice(device) {

    if (
      device.ecosystem === "Philips WiZ" ||
      device.ecosystem === "WiZ" ||
      device.type === "light" ||
      device.type === "bulb"
    ) {

      navigate("/wiz");

      return;
    }


    if (
      device.ecosystem === "LG ThinQ" ||
      device.ecosystem === "LG"
    ) {

      navigate("/kitchen");

      return;
    }

  }


  return (

    <div className="dashboard">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="top">

        <div>

          <h1>
            HOLOS
          </h1>

          <p>
            {greeting}, {username}
          </p>

        </div>


        <div
          className="profile"
          onClick={() =>
            navigate("/settings")
          }
          style={{
            cursor: "pointer"
          }}
          title="Settings"
        >
          {username
            .charAt(0)
            .toUpperCase()}
        </div>

      </div>



      {/* =====================================================
          AI CORE
      ===================================================== */}

      <div className="ai-section">

        <div className="core-ring">

          <div className="core-dot"></div>

        </div>

        <h2>
          AI ONLINE
        </h2>

        <p>
          Everything is connected.
        </p>

      </div>



      {/* =====================================================
          ROOMS
      ===================================================== */}

      <h3 className="section-title">
        Rooms
      </h3>


      <div className="rooms">


        {/* =================================================
            KITCHEN
        ================================================= */}

        <div
          className="room-card"
          onClick={() =>
            navigate("/kitchen")
          }
        >

          <h2>
            🍽 Kitchen
          </h2>

          <p>
            LG Refrigerator
          </p>

          <span className="online">
            ● Connected
          </span>

        </div>



        {/* =================================================
            LIVING ROOM
        ================================================= */}

        <div className="room-card">

          <h2>
            🛋 Living Room
          </h2>

          <p>
            2 Devices
          </p>

          <span className="online">
            ● Online
          </span>

        </div>



        {/* =================================================
            BEDROOM
        ================================================= */}

        <div className="room-card">

          <h2>
            🛏 Bedroom
          </h2>

          <p>
            1 Device
          </p>

          <span className="offline">
            ● Offline
          </span>

        </div>



        {/* =================================================
            OFFICE
        ================================================= */}

        <div className="room-card">

          <h2>
            💻 Office
          </h2>

          <p>
            No Devices
          </p>

          <span className="offline">
            ● Offline
          </span>

        </div>



        {/* =================================================
            ADD DEVICE
        ================================================= */}

        <div
          className="room-card add-device-card"
          onClick={() =>
            navigate("/add-devices")
          }
        >

          <h2>
            ＋ Add Device
          </h2>

          <p>
            Connect a new smart device
          </p>

          <span className="online">
            ● Available
          </span>

        </div>

      </div>



      {/* =====================================================
          CONNECTED DEVICES
      ===================================================== */}

      <h3 className="section-title">
        Your Devices
      </h3>


      <div className="rooms">


        {devices.length === 0 ? (

          <div
            className="room-card"
            onClick={() =>
              navigate("/add-devices")
            }
            style={{
              cursor: "pointer"
            }}
          >

            <h2>
              🔌 No Devices Yet
            </h2>

            <p>
              Add your first smart device
            </p>

            <span className="online">
              ＋ Add Device
            </span>

          </div>

        ) : (

          devices.map((device, index) => (

            <div
              key={
                device.mac ||
                device.ip ||
                index
              }

              className="room-card"
              onClick={() =>
                openDevice(device)
              }

              style={{
                cursor: "pointer"
              }}
            >

              <h2>

                {getDeviceIcon(device)}

                {" "}

                {device.name ||
                  "Smart Device"}

              </h2>


              <p>

                {device.ecosystem ||
                  "Smart Home"}

              </p>


              <span
                className={
                  device.online !== false
                    ? "online"
                    : "offline"
                }
              >

                {device.online !== false
                  ? "● Connected"
                  : "● Offline"}

              </span>

            </div>

          ))

        )}

      </div>



      {/* =====================================================
          AI SUGGESTIONS
      ===================================================== */}

      <div className="suggestions">

        <h3>
          AI Suggestions
        </h3>


        <div className="suggestion">
          Lower Refrigerator Temperature
        </div>


        <div className="suggestion">
          Enable Eco Mode
        </div>


        <div className="suggestion">
          Turn Ice Maker ON
        </div>

      </div>



      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      <div className="bottom-nav">


        <div className="active">

          🏠

          <span>
            Home
          </span>

        </div>


        <div
          onClick={() =>
            navigate("/add-devices")
          }
        >

          🔌

          <span>
            Devices
          </span>

        </div>


        <div>

          🤖

          <span>
            AI
          </span>

        </div>


        <div
          onClick={() =>
            navigate("/settings")
          }

          style={{
            cursor: "pointer"
          }}
        >

          ⚙

          <span>
            Profile
          </span>

        </div>

      </div>


    </div>

  );
}

export default Dashboard;