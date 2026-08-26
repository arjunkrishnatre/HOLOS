import "./VerifyEmail.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function VerifyEmail() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);


  // ==========================================
  // GET EMAIL FROM SIGNUP
  // ==========================================

  useEffect(() => {

    const savedEmail = localStorage.getItem(
      "holos_verification_email"
    );

    if (savedEmail) {
      setEmail(savedEmail);
    }

  }, []);


  // ==========================================
  // VERIFY CODE
  // ==========================================

  async function handleVerify() {

    setError("");
    setMessage("");

    if (!email) {

      setError(
        "No email address was found. Please return to signup."
      );

      return;
    }

    if (code.length !== 6) {

      setError(
        "Please enter the 6-digit verification code."
      );

      return;
    }


    try {

      setVerifying(true);


      const response = await fetch(
        "http://127.0.0.1:8000/auth/verify-code",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            code: code
          })
        }
      );


      const data = await response.json();


      if (!data.success) {

        setError(
          data.message ||
          "Verification failed."
        );

        return;
      }


      // Email verified
      localStorage.setItem(
        "holos_email_verified",
        "true"
      );


      setMessage(
        "Email verified successfully!"
      );


      // Go to dashboard
      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);


    } catch (error) {

      console.error(
        "Verification error:",
        error
      );


      setError(
        "Cannot connect to the HOL.OS server."
      );


    } finally {

      setVerifying(false);

    }

  }


  // ==========================================
  // RESEND CODE
  // ==========================================

  async function handleResend() {

    setError("");
    setMessage("");


    if (!email) {

      setError(
        "No email address was found."
      );

      return;
    }


    try {

      setResending(true);


      const response = await fetch(
        "http://127.0.0.1:8000/auth/send-code",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email
          })
        }
      );


      const data = await response.json();


      if (!data.success) {

        setError(
          data.message ||
          "Unable to resend the verification code."
        );

        return;
      }


      setCode("");


      setMessage(
        "A new verification code has been sent."
      );


    } catch (error) {

      console.error(
        "Resend error:",
        error
      );


      setError(
        "Cannot connect to the HOL.OS server."
      );


    } finally {

      setResending(false);

    }

  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="verify-page">

      <div className="verify-box">


        <div className="verify-core">

          <div className="verify-dot"></div>

        </div>


        <h1>
          Verify Email
        </h1>


        <p>
          We sent a 6-digit code to:
        </p>


        <p>
          <strong>
            {email || "holos.assistsant@gmail.com"}
          </strong>
        </p>


        <input
          type="text"
          placeholder="Enter Code"
          maxLength={6}
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}

          onChange={(event) => {

            const value =
              event.target.value.replace(
                /\D/g,
                ""
              );

            setCode(value);

          }}
        />


        {error && (

          <p className="verify-error">
            {error}
          </p>

        )}


        {message && (

          <p className="verify-success">
            {message}
          </p>

        )}


        <button
          onClick={handleVerify}
          disabled={verifying}
        >

          {verifying
            ? "Verifying..."
            : "Verify"}

        </button>


        <div className="resend">

          Didn't receive the code?

          {" "}

          <span
            onClick={
              resending
                ? undefined
                : handleResend
            }

            style={{
              cursor: resending
                ? "default"
                : "pointer"
            }}
          >

            {resending
              ? "Sending..."
              : "Resend"}

          </span>

        </div>


        <Link to="/signup">

          <button className="back-button">
            Back
          </button>

        </Link>


      </div>

    </div>

  );

}


export default VerifyEmail;