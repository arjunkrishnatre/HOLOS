import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleContinue() {

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {

      setSending(true);

      const response = await fetch(
        "http://127.0.0.1:8000/auth/send-code",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim()
          })
        }
      );

      const data = await response.json();

      if (!data.success) {

        setError(
          data.message ||
          "Unable to send verification code."
        );

        return;
      }

      // Save email for VerifyEmail.jsx
      localStorage.setItem(
        "holos_verification_email",
        email.trim()
      );

      navigate("/verify");

    } catch (error) {

      console.error("Signup error:", error);

      setError(
        "Cannot connect to the HOL.OS server."
      );

    } finally {

      setSending(false);

    }
  }


  return (

    <div className="signup-page">

      <div className="signup-box">

        <div className="signup-core">
          <div className="signup-dot"></div>
        </div>


        <h1>
          Welcome to HOL.OS
        </h1>


        <p>
          Let's get to know you
        </p>


        <input
          type="text"
          placeholder="Full Name"
        />


        <input
          type="date"
        />


        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />


        <input
          type="password"
          placeholder="Password"
        />


        <input
          type="password"
          placeholder="Confirm Password"
        />


        <div className="gender">

          <h3>
            Gender
          </h3>


          <label>
            <input
              type="radio"
              name="gender"
            />
            Male
          </label>


          <label>
            <input
              type="radio"
              name="gender"
            />
            Female
          </label>


          <label>
            <input
              type="radio"
              name="gender"
            />
            Other
          </label>

        </div>


        {error && (
          <p className="signup-error">
            {error}
          </p>
        )}


        <button
          onClick={handleContinue}
          disabled={sending}
        >
          {sending
            ? "Sending Code..."
            : "Continue"}
        </button>


        <div className="login-text">

          Already have an account?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </div>


      </div>

    </div>

  );
}

export default Signup;