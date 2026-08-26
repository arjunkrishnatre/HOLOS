import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">

      <div className="login-box">

        {/* HOLOS Core */}

        <div className="login-core">
          <div className="login-dot"></div>
        </div>

        <h1>Welcome Back</h1>

        <p>Sign in to continue to HOLOS</p>

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        {/* Login Button */}

        <Link
          to="/dashboard"
          style={{ textDecoration: "none" }}
        >
          <button>
            Login
          </button>
        </Link>

        <div className="signup-text">

          Don't have an account?

          <Link to="/signup">
            {" "}Create Account
          </Link>

        </div>

        <Link
          to="/"
          style={{ textDecoration: "none" }}
        >
          <button className="back-btn">

            Back Home

          </button>
        </Link>

      </div>

    </div>
  );
}

export default Login;