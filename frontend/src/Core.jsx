import "./Core.css";
import { Link } from "react-router-dom";

function Core() {
  return (
    <div className="core-page">

      <div className="big-core">
        <div className="big-core-dot"></div>
      </div>

      <h1>THE HOLOS CORE</h1>

      <p>
        Every intelligent system has a core.
      </p>

      <p>
        In humans, it is our ability to think,
        learn, imagine, and make decisions.
      </p>

      <p>
        In HOLOS, the glowing Core represents
        artificial intelligence that connects
        people with their smart home.
      </p>

      <div className="connection">
        Humans ◄──── ◉ ────► Technology
        <br />
      </div>

      <Link to="/">
        <button>Back Home</button>
      </Link>

    </div>
  );
}

export default Core;