import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Core from "./Core";
import Login from "./Login";
import Signup from "./Signup";
import Settings from "./Settings";
import AddDevices from "./AddDevices";

import Dashboard from "./page/Dashboard";
import Kitchen from "./page/Kitchen";

import WizPairing from "./WizPairing";
import Wiz from "./Wiz";

function App() {
  return (
    <Routes>

      {/* MAIN */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/core"
        element={<Core />}
      />


      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* SETTINGS */}

      <Route
        path="/settings"
        element={<Settings />}
      />


      {/* DEVICES */}

      <Route
        path="/add-devices"
        element={<AddDevices />}
      />

      <Route
        path="/wiz-pairing"
        element={<WizPairing />}
      />

      <Route
        path="/wiz"
        element={<Wiz />}
      />


      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* KITCHEN */}

      <Route
        path="/kitchen"
        element={<Kitchen />}
      />

    </Routes>
  );
}

export default App;