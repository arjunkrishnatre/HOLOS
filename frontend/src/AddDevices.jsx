import "./AddDevices.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddDevices() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [wizDevices, setWizDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  const ecosystems = [
    {
      id: "lg",
      name: "LG ThinQ",
      icon: "🟣",
      description: "LG refrigerators, TVs, washers and more",
      available: true,
    },
    {
      id: "wiz",
      name: "Philips WiZ",
      icon: "💡",
      description: "Philips WiZ smart lights and bulbs",
      available: true,
    },
    {
      id: "alexa",
      name: "Amazon Alexa",
      icon: "🔵",
      description: "Alexa-compatible smart devices",
      available: false,
    },
    {
      id: "google",
      name: "Google Home",
      icon: "🔴",
      description: "Google Home compatible devices",
      available: false,
    },
    {
      id: "samsung",
      name: "Samsung SmartThings",
      icon: "🔷",
      description: "Samsung and SmartThings devices",
      available: false,
    },
    {
      id: "apple",
      name: "Apple Home",
      icon: "⚪",
      description: "Apple Home compatible devices",
      available: false,
    },
    {
      id: "tuya",
      name: "Tuya / Smart Life",
      icon: "🟢",
      description: "Compatible smart-home devices",
      available: false,
    },
  ];


  // =====================================================
  // SELECT ECOSYSTEM
  // =====================================================

  function selectEcosystem(ecosystem) {
    setSelected(ecosystem);
    setMessage("");
    setError("");
    setWizDevices([]);
  }


  // =====================================================
  // SAVE DEVICE TO HOLOS
  // =====================================================

  function saveDevice(device) {
    try {
      const stored =
        localStorage.getItem("holos_devices");

      let devices = [];

      if (stored) {
        try {
          devices = JSON.parse(stored);
        } catch {
          devices = [];
        }
      }

      if (!Array.isArray(devices)) {
        devices = [];
      }


      // -------------------------------------------------
      // Prevent duplicate devices
      // -------------------------------------------------

      const existingIndex = devices.findIndex(
        (existing) =>
          (
            existing.mac &&
            device.mac &&
            existing.mac.toLowerCase() ===
              device.mac.toLowerCase()
          ) ||
          (
            existing.ip &&
            device.ip &&
            existing.ip === device.ip
          )
      );


      if (existingIndex >= 0) {

        // Update existing device

        devices[existingIndex] = {
          ...devices[existingIndex],
          ...device,
          connected: true,
          online: true,
        };

      } else {

        // Add new device

        devices.push({
          ...device,
          connected: true,
          online: true,
        });

      }


      localStorage.setItem(
        "holos_devices",
        JSON.stringify(devices)
      );


      // Tell other parts of the app
      // that a device was added.

      window.dispatchEvent(
        new Event("holos-devices-updated")
      );


      return true;

    } catch (err) {

      console.error(
        "HOLOS DEVICE SAVE ERROR:",
        err
      );

      return false;
    }
  }


  // =====================================================
  // SCAN WiZ
  // =====================================================

  async function scanWiz() {

    setScanning(true);
    setError("");
    setMessage("");
    setWizDevices([]);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/devices/wiz/scan"
      );


      const data = await response.json();


      console.log(
        "HOLOS WiZ SCAN:",
        data
      );


      if (!response.ok || !data.success) {

        setError(
          data.message ||
          "Unable to scan for WiZ devices."
        );

        return;
      }


      const foundDevices =
        Array.isArray(data.devices)
          ? data.devices
          : [];


      setWizDevices(foundDevices);


      if (foundDevices.length === 0) {

        setMessage(
          "No WiZ devices found. Make sure the bulb is powered on and connected to the same Wi-Fi network as this computer."
        );

      }

    } catch (err) {

      console.error(
        "WiZ SCAN ERROR:",
        err
      );

      setError(
        "Cannot connect to the HOLOS backend."
      );

    } finally {

      setScanning(false);

    }
  }


  // =====================================================
  // ADD WiZ DEVICE
  // =====================================================

  async function addWizDevice(device) {

    setConnecting(true);
    setError("");
    setMessage("");


    try {

      console.log(
        "ADDING WiZ DEVICE:",
        device
      );


      /*
       * Ask backend to add/register the device.
       */

      const response = await fetch(
        "http://127.0.0.1:8000/devices/wiz/add",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ip: device.ip,
            mac: device.mac,
            name:
              device.name ||
              "Philips WiZ Light",
          }),
        }
      );


      const data = await response.json();


      console.log(
        "WiZ ADD RESPONSE:",
        data
      );


      if (!response.ok || !data.success) {

        setError(
          data.message ||
          "Unable to add WiZ device."
        );

        return;
      }


      /*
       * The backend may return:
       *
       * data.device
       *
       * or the device directly.
       */

      const savedDevice =
        data.device || {
          ...device,
        };


      const holosDevice = {

        ...device,

        ...savedDevice,

        name:
          savedDevice.name ||
          device.name ||
          "Philips WiZ Light",

        ecosystem:
          "Philips WiZ",

        type:
          "light",

        connected:
          true,

        online:
          true,

      };


      /*
       * IMPORTANT:
       *
       * Save it to the SAME localStorage
       * key that Dashboard reads.
       */

      const saved =
        saveDevice(holosDevice);


      if (!saved) {

        setError(
          "The WiZ device connected, but HOLOS could not save it."
        );

        return;
      }


      setMessage(
        "WiZ device added to HOL.OS successfully!"
      );


      /*
       * Remove it from the scan list
       * because it is now connected.
       */

      setWizDevices(
        (current) =>
          current.filter(
            (item) =>
              item.mac !== device.mac
          )
      );


      console.log(
        "HOLOS DEVICE SAVED:",
        holosDevice
      );


    } catch (err) {

      console.error(
        "WiZ ADD ERROR:",
        err
      );

      setError(
        "Cannot connect to the HOLOS backend."
      );

    } finally {

      setConnecting(false);

    }
  }


  // =====================================================
  // CONNECT LG
  // =====================================================

  async function connectLG() {

    setConnecting(true);
    setError("");
    setMessage("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/refrigerator/connect/lg",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );


      const data =
        await response.json();


      if (!response.ok || !data.success) {

        setError(
          data.message ||
          "Unable to connect to LG ThinQ."
        );

        return;
      }


      localStorage.setItem(
        "holos_lg_connected",
        "true"
      );


      localStorage.setItem(
        "holos_selected_ecosystem",
        "lg"
      );


      setMessage(
        "LG ThinQ connected successfully!"
      );


    } catch (err) {

      console.error(
        "LG CONNECTION ERROR:",
        err
      );

      setError(
        "Cannot connect to the HOLOS backend."
      );

    } finally {

      setConnecting(false);

    }
  }


  // =====================================================
  // CONNECT BUTTON
  // =====================================================

  async function connectEcosystem() {

    if (!selected) {
      return;
    }


    setError("");
    setMessage("");


    if (selected.id === "wiz") {

      await scanWiz();

      return;
    }


    if (selected.id === "lg") {

      await connectLG();

      return;
    }


    setError(
      `${selected.name} integration is coming soon.`
    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="add-devices-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="devices-header">

        <button
          className="devices-back"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ←
        </button>


        <div>

          <h1>
            Add Devices
          </h1>

          <p>
            Connect your smart-home ecosystem
          </p>

        </div>

      </div>



      {/* =================================================
          INTRO
      ================================================= */}

      <div className="devices-intro">

        <div className="devices-core">

          <div></div>

        </div>


        <h2>
          One app. Every ecosystem.
        </h2>


        <p>
          Choose where your smart devices are connected.
        </p>

      </div>



      {/* =================================================
          ECOSYSTEMS
      ================================================= */}

      <div className="ecosystem-grid">

        {ecosystems.map(
          (ecosystem) => (

            <div
              key={ecosystem.id}

              className={
                selected?.id ===
                ecosystem.id
                  ? "ecosystem-card selected"
                  : "ecosystem-card"
              }

              onClick={() =>
                selectEcosystem(
                  ecosystem
                )
              }
            >

              <div className="ecosystem-icon">

                {ecosystem.icon}

              </div>


              <div className="ecosystem-info">

                <h3>
                  {ecosystem.name}
                </h3>


                <p>
                  {ecosystem.description}
                </p>


                {!ecosystem.available && (

                  <small>
                    Coming soon
                  </small>

                )}

              </div>


              <div className="ecosystem-arrow">

                →

              </div>

            </div>

          )
        )}

      </div>



      {/* =================================================
          CONNECTION PANEL
      ================================================= */}

      {selected && (

        <div className="connection-panel">


          <h2>
            {selected.name}
          </h2>


          <p>

            {selected.id === "wiz"
              ? "Scan your local network for Philips WiZ lights."
              : selected.id === "lg"
              ? "Connect your LG ThinQ account to discover your devices."
              : `${selected.name} integration is coming soon.`}

          </p>



          {/* ERROR */}

          {error && (

            <p className="connection-error">

              {error}

            </p>

          )}



          {/* SUCCESS */}

          {message && (

            <p className="connection-success">

              {message}

            </p>

          )}



          {/* =================================================
              WiZ
          ================================================= */}

          {selected.id === "wiz" && (

            <>

              <button
                onClick={connectEcosystem}
                disabled={scanning}
              >

                {scanning
                  ? "Scanning..."
                  : "Scan for WiZ Devices"}

              </button>



              {/* WiZ RESULTS */}

              {wizDevices.length > 0 && (

                <div
                  className="wiz-results"
                  style={{
                    marginTop: "25px"
                  }}
                >

                  {wizDevices.map(
                    (device, index) => (

                      <div
                        key={
                          device.mac ||
                          device.ip ||
                          index
                        }

                        className="ecosystem-card"
                      >

                        <div className="ecosystem-icon">

                          💡

                        </div>


                        <div className="ecosystem-info">

                          <h3>

                            {device.name ||
                              "Philips WiZ Light"}

                          </h3>


                          <p>

                            IP:{" "}
                            {device.ip ||
                              "Unknown"}

                          </p>


                          <p>

                            MAC:{" "}
                            {device.mac ||
                              "Unknown"}

                          </p>

                        </div>


                        <button
                          onClick={() =>
                            addWizDevice(
                              device
                            )
                          }

                          disabled={connecting}
                        >

                          {connecting
                            ? "Adding..."
                            : "Add to HOL.OS"}

                        </button>

                      </div>

                    )
                  )}

                </div>

              )}

            </>

          )}



          {/* =================================================
              LG
          ================================================= */}

          {selected.id === "lg" && (

            <button
              onClick={connectEcosystem}
              disabled={connecting}
            >

              {connecting
                ? "Connecting..."
                : "Connect LG ThinQ"}

            </button>

          )}

        </div>

      )}

    </div>

  );
}

export default AddDevices;