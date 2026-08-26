import "./Wiz.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Wiz() {
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [color, setColor] = useState("#ffffff");
  const [power, setPower] = useState(true);
  const [message, setMessage] = useState("");

  // Your WiZ bulb
  const DEVICE_IP = "192.168.29.181";

  // =========================
  // LOAD DEVICE
  // =========================

  async function loadDevice() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/devices/wiz"
      );

      if (!response.ok) {
        throw new Error("Unable to load WiZ devices");
      }

      const data = await response.json();

      console.log("WiZ DEVICES:", data);

      const devices = data.devices || [];

      const found = devices.find(
        (item) =>
          item.ip === DEVICE_IP ||
          item.type === "light"
      );

      if (found) {
        setDevice(found);
        setOnline(found.online !== false);
      } else {
        setDevice({
          name: "Philips WiZ Light",
          ip: DEVICE_IP,
          ecosystem: "Philips WiZ",
          type: "light",
          connected: true,
          online: true,
        });

        setOnline(true);
      }
    } catch (error) {
      console.error("WiZ LOAD ERROR:", error);

      // Still show the device page
      // so the UI doesn't become blank.
      setDevice({
        name: "Philips WiZ Light",
        ip: DEVICE_IP,
        ecosystem: "Philips WiZ",
        type: "light",
        connected: true,
        online: true,
      });

      setOnline(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevice();
  }, []);

  // =========================
  // POWER
  // =========================

  async function togglePower() {
    const newPower = !power;

    setPower(newPower);
    setMessage(
      newPower
        ? "Light turned ON"
        : "Light turned OFF"
    );

    try {
      await fetch(
        "http://127.0.0.1:8000/devices/wiz/control",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: DEVICE_IP,
            action: "power",
            value: newPower,
          }),
        }
      );
    } catch (error) {
      console.error("WiZ POWER ERROR:", error);
    }
  }

  // =========================
  // BRIGHTNESS
  // =========================

  async function changeBrightness(value) {
    setBrightness(value);

    try {
      await fetch(
        "http://127.0.0.1:8000/devices/wiz/control",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: DEVICE_IP,
            action: "brightness",
            value: Number(value),
          }),
        }
      );
    } catch (error) {
      console.error(
        "WiZ BRIGHTNESS ERROR:",
        error
      );
    }
  }

  // =========================
  // COLOR
  // =========================

  async function changeColor(value) {
    setColor(value);

    try {
      const hex = value.replace("#", "");

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      await fetch(
        "http://127.0.0.1:8000/devices/wiz/control",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: DEVICE_IP,
            action: "color",
            value: {
              r,
              g,
              b,
            },
          }),
        }
      );
    } catch (error) {
      console.error("WiZ COLOR ERROR:", error);
    }
  }

  // =========================
  // MOODS
  // =========================

  async function setMood(name) {
    const moods = {
      Fire: "#ff4b1f",
      Warm: "#ff9f43",
      Cool: "#74b9ff",
      Winter: "#dfefff",
      Autumn: "#d35400",
      Rainy: "#6c8cff",
    };

    const selectedColor =
      moods[name] || "#ffffff";

    setColor(selectedColor);

    await changeColor(selectedColor);

    setMessage(`${name} mode activated`);
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="wiz-page">
        <div className="wiz-loading">
          <div className="wiz-loader"></div>

          <h2>Connecting to WiZ...</h2>

          <p>
            Looking for your Philips WiZ light.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="wiz-page">

      {/* HEADER */}

      <header className="wiz-header">

        <button
          className="wiz-back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div className="wiz-title">

          <div className="wiz-bulb-icon">
            💡
          </div>

          <div>
            <h1>WiZ Light</h1>

            <p>
              Philips WiZ
            </p>
          </div>

        </div>

        <div
          className={
            online
              ? "wiz-status online"
              : "wiz-status offline"
          }
        >
          ● {online ? "Online" : "Offline"}
        </div>

      </header>


      {/* MAIN */}

      <main className="wiz-content">

        {/* DEVICE CARD */}

        <section className="wiz-device-card">

          <div
            className={
              power
                ? "wiz-big-bulb on"
                : "wiz-big-bulb"
            }
            style={{
              boxShadow: power
                ? `0 0 90px ${color}`
                : "none",
            }}
          >
            💡
          </div>

          <h2>
            {device?.name || "Philips WiZ Light"}
          </h2>

          <p>
            {online
              ? "Connected to HOLOS"
              : "Device offline"}
          </p>

          <button
            className={
              power
                ? "wiz-power active"
                : "wiz-power"
            }
            onClick={togglePower}
          >
            {power
              ? "● ON"
              : "○ OFF"}
          </button>

        </section>


        {/* BRIGHTNESS */}

        <section className="wiz-control-card">

          <div className="control-heading">

            <h3>
              Brightness
            </h3>

            <span>
              {brightness}%
            </span>

          </div>

          <input
            className="brightness-slider"
            type="range"
            min="1"
            max="100"
            value={brightness}
            onChange={(e) =>
              changeBrightness(e.target.value)
            }
          />

        </section>


        {/* COLOR */}

        <section className="wiz-control-card">

          <div className="control-heading">

            <h3>
              Color
            </h3>

            <span
              className="color-preview"
              style={{
                background: color,
              }}
            ></span>

          </div>

          <div className="color-selector">

            <input
              type="color"
              value={color}
              onChange={(e) =>
                changeColor(e.target.value)
              }
            />

            <div>

              <strong>
                Custom Color
              </strong>

              <p>
                Choose any color for your light.
              </p>

            </div>

          </div>

        </section>


        {/* MOODS */}

        <section className="wiz-control-card">

          <h3>
            Light Modes
          </h3>

          <p className="control-description">
            Choose an atmosphere for your room.
          </p>

          <div className="mood-grid">

            <button
              onClick={() => setMood("Fire")}
            >
              🔥
              <span>Fire</span>
            </button>

            <button
              onClick={() => setMood("Warm")}
            >
              🌅
              <span>Warm</span>
            </button>

            <button
              onClick={() => setMood("Cool")}
            >
              ❄️
              <span>Cool</span>
            </button>

            <button
              onClick={() => setMood("Winter")}
            >
              🧊
              <span>Winter</span>
            </button>

            <button
              onClick={() => setMood("Autumn")}
            >
              🍂
              <span>Autumn</span>
            </button>

            <button
              onClick={() => setMood("Rainy")}
            >
              🌧
              <span>Rainy</span>
            </button>

          </div>

        </section>


        {/* DEVICE INFORMATION */}

        <section className="wiz-control-card">

          <h3>
            Device Information
          </h3>

          <div className="wiz-info-row">
            <span>Device</span>
            <strong>
              Philips WiZ Light
            </strong>
          </div>

          <div className="wiz-info-row">
            <span>IP Address</span>
            <strong>
              {device?.ip || DEVICE_IP}
            </strong>
          </div>

          <div className="wiz-info-row">
            <span>Ecosystem</span>
            <strong>
              Philips WiZ
            </strong>
          </div>

          <div className="wiz-info-row">
            <span>HOLOS Status</span>
            <strong>
              {online
                ? "Connected"
                : "Offline"}
            </strong>
          </div>

        </section>


        {/* MESSAGE */}

        {message && (
          <div className="wiz-message">
            ✓ {message}
          </div>
        )}

      </main>

    </div>
  );
}

export default Wiz;