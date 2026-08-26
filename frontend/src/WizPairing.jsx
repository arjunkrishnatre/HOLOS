import "./WizPairing.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function WizPairing() {

  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState("");
  const [addedDevice, setAddedDevice] = useState(null);


  // =====================================================
  // SCAN FOR WiZ DEVICES
  // =====================================================

  async function scanDevices() {

    setScanning(true);
    setError("");
    setDevices([]);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/devices/wiz/scan"
      );

      const data = await response.json();

      console.log("WiZ SCAN:", data);

      if (!response.ok || !data.success) {

        throw new Error(
          data.detail ||
          "Unable to search for WiZ devices."
        );

      }

      setDevices(
        Array.isArray(data.devices)
          ? data.devices
          : []
      );

    } catch (err) {

      console.error(
        "WiZ scan error:",
        err
      );

      setError(
        "Unable to search for WiZ devices."
      );

    } finally {

      setScanning(false);

    }

  }


  // =====================================================
  // START SCAN WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {

    scanDevices();

  }, []);


  // =====================================================
  // ADD WiZ DEVICE TO HOL.OS
  // =====================================================

  function addDevice(device) {

    try {

      // -----------------------------------------------
      // Get existing HOL.OS devices
      // -----------------------------------------------

      const savedDevices =
        JSON.parse(
          localStorage.getItem(
            "holos_devices"
          ) || "[]"
        );


      // -----------------------------------------------
      // Check if already added
      // -----------------------------------------------

      const alreadyAdded =
        savedDevices.some(
          existing =>
            existing.mac === device.mac ||
            existing.ip === device.ip
        );


      // -----------------------------------------------
      // Create HOL.OS device object
      // -----------------------------------------------

      const holosDevice = {

        id:
          device.mac ||
          device.ip ||
          `wiz-${Date.now()}`,

        name:
          device.name ||
          "Philips WiZ Light",

        ecosystem:
          "Philips WiZ",

        ecosystemId:
          "philips",

        type:
          "light",

        ip:
          device.ip || null,

        mac:
          device.mac || null,

        connected:
          true,

        online:
          true,

        status:
          "Connected",

        addedAt:
          new Date().toISOString(),

        // -------------------------------------------
        // Future lighting settings
        // -------------------------------------------

        lighting: {

          power:
            true,

          brightness:
            100,

          color:
            "#FFFFFF",

          temperature:
            4000,

          mode:
            "Normal"

        }

      };


      // -----------------------------------------------
      // Save device if it doesn't already exist
      // -----------------------------------------------

      if (!alreadyAdded) {

        savedDevices.push(
          holosDevice
        );

        localStorage.setItem(
          "holos_devices",
          JSON.stringify(
            savedDevices
          )
        );

      }


      // -----------------------------------------------
      // Compatibility storage
      // -----------------------------------------------

      localStorage.setItem(
        "holos_wiz_device",
        JSON.stringify(
          holosDevice
        )
      );


      localStorage.setItem(
        "holos_wiz_connected",
        "true"
      );


      localStorage.setItem(
        "holos_selected_ecosystem",
        "philips"
      );


      // -----------------------------------------------
      // Show success screen
      // -----------------------------------------------

      setAddedDevice(
        holosDevice
      );

      setError("");


    } catch (err) {

      console.error(
        "WiZ ADD ERROR:",
        err
      );

      setError(
        "Unable to save the WiZ device to HOL.OS."
      );

    }

  }


  // =====================================================
  // SUCCESS SCREEN
  // =====================================================

  if (addedDevice) {

    return (

      <div className="wiz-pairing-page">

        <div className="wiz-header">

          <button
            className="wiz-back"
            onClick={() =>
              navigate("/add-devices")
            }
          >
            ←
          </button>

          <h1>
            Smart pairing
          </h1>

        </div>


        <div className="wiz-success">

          <div className="wiz-success-icon">

            ✓

          </div>


          <h2>

            Device added to HOL.OS

          </h2>


          <p>

            {addedDevice.name}

          </p>


          <div className="wiz-success-card">

            <div>

              <strong>
                💡 {addedDevice.name}
              </strong>

              <span>
                ● Connected
              </span>

            </div>


            <div className="wiz-device-details">

              <p>
                IP: {addedDevice.ip || "Unknown"}
              </p>

              <p>
                MAC: {addedDevice.mac || "Unknown"}
              </p>

              <p>
                Ecosystem: Philips WiZ
              </p>

            </div>

          </div>


          <button
            className="wiz-dashboard-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >

            Go to Dashboard →

          </button>


          <button
            className="wiz-secondary-button"
            onClick={() =>
              navigate("/add-devices")
            }
          >

            Add another device

          </button>

        </div>

      </div>

    );

  }


  // =====================================================
  // MAIN PAIRING SCREEN
  // =====================================================

  return (

    <div className="wiz-pairing-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="wiz-header">

        <button
          className="wiz-back"
          onClick={() =>
            navigate("/add-devices")
          }
        >

          ←

        </button>


        <div>

          <h1>
            Smart pairing
          </h1>

          <p>
            Philips WiZ
          </p>

        </div>

      </div>


      {/* =================================================
          SEARCH AREA
      ================================================= */}

      <div className="wiz-search">


        {scanning ? (

          <>

            <h2>
              Searching for your devices
            </h2>


            <div className="wiz-ring">

              <div className="wiz-ring-dot"></div>

            </div>


            <h3>
              Searching
            </h3>


            <p className="wiz-search-info">

              Looking for Philips WiZ devices
              on your local network...

            </p>

          </>

        ) : devices.length > 0 ? (

          <>

            <h2>
              WiZ devices found
            </h2>


            <div className="wiz-devices">

              {devices.map(
                (device, index) => (

                  <div
                    className="wiz-device"
                    key={
                      device.mac ||
                      device.ip ||
                      index
                    }
                  >


                    <div className="wiz-device-left">

                      <div className="wiz-bulb-icon">

                        💡

                      </div>


                      <div>

                        <strong>

                          {device.name ||
                            "Philips WiZ Light"}

                        </strong>


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

                    </div>


                    <button
                      className="wiz-add-button"
                      onClick={() =>
                        addDevice(device)
                      }
                    >

                      Add to HOL.OS

                    </button>


                  </div>

                )
              )}

            </div>

          </>

        ) : (

          <>

            <h2>
              Searching for your devices
            </h2>


            <div className="wiz-empty">

              <div className="wiz-static-ring">

                💡

              </div>


              <h3>
                No WiZ devices found
              </h3>


              <p>

                Make sure your WiZ light is
                powered on and connected to
                the same Wi-Fi network as
                this computer.

              </p>

            </div>


            <button
              className="wiz-rescan-button"
              onClick={scanDevices}
            >

              Scan Again

            </button>

          </>

        )}

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="wiz-error">

          {error}

        </div>

      )}


      {/* =================================================
          HELP SECTION
      ================================================= */}

      {!devices.length &&
        !scanning && (

          <div className="wiz-help">

            <h2>
              Something wrong?
            </h2>


            <div className="wiz-help-buttons">

              <button
                onClick={scanDevices}
              >

                Light is blinking

              </button>


              <button
                onClick={scanDevices}
              >

                Nothing is happening

              </button>

            </div>

          </div>

        )}

    </div>

  );

}


export default WizPairing;