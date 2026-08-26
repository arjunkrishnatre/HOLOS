import { Link } from "react-router-dom";
import "./Home.css";


function Home() {

  return (

    <div className="home-page">


      {/* TOP RIGHT MENU */}

      <nav className="navbar">

        <Link to="/about">
          About Us
        </Link>

      </nav>



      {/* MAIN HERO */}

      <section className="hero">


        <h1 className="holos-title">


          H


          {/* CLICKABLE O CORE */}

          <Link
            to="/core"
            className="core-svg-link"
          >

            <svg
              className="holos-core-svg"
              viewBox="0 0 100 100"
            >

              <circle
                cx="50"
                cy="50"
                r="35"
                className="core-ring"
              />


              <circle
                cx="50"
                cy="50"
                r="10"
                className="core-center"
              />


            </svg>


          </Link>



          LOS


        </h1>





        <h2 className="tagline">

          One Intelligence. Every Device.

        </h2>





        <div className="action-lines">

          <p>Connect.</p>

          <p>Control.</p>

          <p>Automate.</p>

        </div>





        <Link to="/signup">

          <button className="start-button">

            Get Started

          </button>


        </Link>



      </section>


    </div>

  );

}


export default Home;