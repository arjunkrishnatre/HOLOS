import "./Settings.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("holos_username") || "Arjun";

  const email =
    localStorage.getItem("holos_email") ||
    "holos.assistsant@gmail.com";

  const [theme, setTheme] = useState(
    localStorage.getItem("holos_theme") || "dark"
  );

  const [voice, setVoice] = useState(
    localStorage.getItem("holos_voice") || "Female"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("holos_notifications") !== "false"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("holos_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("holos_voice", voice);
  }, [voice]);

  useEffect(() => {
    localStorage.setItem(
      "holos_notifications",
      notifications.toString()
    );
  }, [notifications]);

  function handleLogout() {
    localStorage.removeItem("holos_email_verified");
    navigate("/login");
  }

  return (
    <div className="settings-page">

      {/* Header */}

      <div className="settings-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ←
        </button>

        <div>
          <h1>Settings</h1>
          <p>Customize your HOL.OS experience</p>
        </div>

      </div>


      {/* Account */}

      <section className="settings-section">

        <h2>Account</h2>

        <div className="settings-card">

          <div className="profile-circle">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="account-info">

            <h3>{username}</h3>

            <p>{email}</p>

          </div>

        </div>

      </section>


      {/* Appearance */}

      <section className="settings-section">

        <h2>Appearance</h2>

        <div className="settings-card setting-row">

          <div>

            <h3>Theme</h3>

            <p>Choose how HOL.OS looks</p>

          </div>

          <select
            value={theme}
            onChange={(event) =>
              setTheme(event.target.value)
            }
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

        </div>

      </section>


      {/* AI Settings */}

      <section className="settings-section">

        <h2>HOL.OS AI</h2>

        <div className="settings-card setting-row">

          <div>

            <h3>Assistant Voice</h3>

            <p>Choose the HOL.OS assistant voice</p>

          </div>

          <select
            value={voice}
            onChange={(event) =>
              setVoice(event.target.value)
            }
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

        </div>


        <div className="settings-card setting-row">

          <div>

            <h3>Notifications</h3>

            <p>Receive HOL.OS alerts and suggestions</p>

          </div>

          <button
            className={
              notifications
                ? "toggle active"
                : "toggle"
            }
            onClick={() =>
              setNotifications(!notifications)
            }
          >

            <span></span>

          </button>

        </div>

      </section>


      {/* Devices */}

      <section className="settings-section">

        <h2>Devices</h2>

        <div
          className="settings-card clickable"
          onClick={() => navigate("/devices")}
        >

          <div>

            <h3>My Devices</h3>

            <p>View and manage your connected devices</p>

          </div>

          <span className="arrow">
            →
          </span>

        </div>


        <div
          className="settings-card clickable"
          onClick={() => navigate("/add-device")}
        >

          <div>

            <h3>＋ Add Device</h3>

            <p>Connect a new smart device</p>

          </div>

          <span className="arrow">
            →
          </span>

        </div>

      </section>


      {/* Security */}

      <section className="settings-section">

        <h2>Security</h2>

        <div className="settings-card clickable">

          <div>

            <h3>Password & Security</h3>

            <p>Manage your account security</p>

          </div>

          <span className="arrow">
            →
          </span>

        </div>

      </section>


      {/* Logout */}

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Log Out
      </button>


      <p className="settings-version">
        HOL.OS • Version 1.0.0
      </p>

    </div>
  );
}

export default Settings;