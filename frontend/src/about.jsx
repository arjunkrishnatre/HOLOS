import "./About.css";
import { Link } from "react-router-dom";

function About() {

  return (

    <div className="about-page">

      {/* ================= NAVBAR ================= */}

      <nav className="about-navbar">

        <Link to="/" className="back-home">

          ← Home

        </Link>

        <h2>

          HOL.OS

        </h2>

      </nav>



      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-glow"></div>

        <div className="core-container">

          <div className="core-ring"></div>

          <div className="core-ring second"></div>

          <div className="core-dot"></div>

        </div>



        <span className="hero-title-small">

          ABOUT HOL.OS

        </span>



        <h1>

          The Operating System

          <br />

          For Every Smart Home

        </h1>



        <p>

          One Intelligence.

          Every Device.

        </p>

      </section>



      {/* ================= INTRO ================= */}

      <section className="intro">

        <h2>

          Technology should adapt

          <br />

          to people.

        </h2>



        <p>

          HOL.OS is an intelligent smart-home platform

          designed to connect people,

          health,

          and technology through

          one unified operating system.

        </p>

      </section>



      {/* ================= MISSION ================= */}

      <section className="mission">

        <div className="mission-card">

          <span>

            01

          </span>

          <h3>

            Our Mission

          </h3>

          <p>

            Smart homes should not require

            a different application for every device.

            HOL.OS connects every ecosystem

            into one intelligent platform.

          </p>

        </div>



        <div className="mission-card">

          <span>

            02

          </span>

          <h3>

            Our Goal

          </h3>

          <p>

            Build one operating system capable

            of connecting homes,

            health,

            AI,

            automation,

            and every smart device.

          </p>

        </div>

      </section>



      {/* ================= PROBLEM ================= */}

      <section className="problem">

        <h2>

          The Problem

        </h2>

        <p>

          Today's smart homes are fragmented.

        </p>



        <div className="problem-grid">

          <div className="problem-card">

            📱

            <h3>

              Too Many Apps

            </h3>

            <p>

              Every smart device has

              its own application.

            </p>

          </div>



          <div className="problem-card">

            🔗

            <h3>

              No Communication

            </h3>

            <p>

              Devices rarely communicate

              across ecosystems.

            </p>

          </div>



          <div className="problem-card">

            ⚠

            <h3>

              Complex Experience

            </h3>

            <p>

              Smart homes should be

              simple.

            </p>

          </div>

        </div>

      </section>
      {/* ================= SOLUTION ================= */}

      <section className="solution">

        <h2>

          Our Solution

        </h2>

        <p>

          One Intelligence.

          Every Device.

        </p>



        <div className="solution-grid">

          <div className="solution-card">

            🤖

            <h3>

              Unified AI

            </h3>

            <p>

              One intelligent operating system

              managing every connected device.

            </p>

          </div>



          <div className="solution-card">

            📊

            <h3>

              Live Monitoring

            </h3>

            <p>

              View real-time status

              of your home

              from anywhere.

            </p>

          </div>



          <div className="solution-card">

            ⚙

            <h3>

              Automation

            </h3>

            <p>

              Intelligent routines

              that make your home

              work automatically.

            </p>

          </div>

        </div>

      </section>



      {/* ================= LIVE PROTOTYPE ================= */}

      <section className="prototype">

        <span>

          LIVE PROTOTYPE

        </span>

        <h2>

          Already Connected

          <br />

          To Real Hardware

        </h2>



        <div className="prototype-card">

          <div className="prototype-status">

            <span className="green-dot"></span>

            LG ThinQ Connected

          </div>



          <div className="prototype-list">

            <div>

              🌡 Refrigerator Temperature

            </div>



            <div>

              ❄ Freezer Temperature

            </div>



            <div>

              🚪 Door Status

            </div>



            <div>

              ⚡ Express Freeze

            </div>



            <div>

              ☁ Live Cloud Communication

            </div>

          </div>

        </div>

      </section>



      {/* ================= EXPERIENCE ================= */}

      <section className="experience">

        <h2>

          The HOL.OS Experience

        </h2>



        <div className="experience-grid">

          <div className="experience-card">

            <h3>01</h3>

            <p>

              Unified Control

            </p>

          </div>



          <div className="experience-card">

            <h3>02</h3>

            <p>

              Live Monitoring

            </p>

          </div>



          <div className="experience-card">

            <h3>03</h3>

            <p>

              AI Assistance

            </p>

          </div>



          <div className="experience-card">

            <h3>04</h3>

            <p>

              Health Integration

            </p>

          </div>



          <div className="experience-card">

            <h3>05</h3>

            <p>

              Cross Ecosystem

            </p>

          </div>



          <div className="experience-card">

            <h3>06</h3>

            <p>

              Future Automation

            </p>

          </div>

        </div>

      </section>



      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="stat">

          <h1>

            1

          </h1>

          <p>

            Operating System

          </p>

        </div>



        <div className="stat">

          <h1>

            ∞

          </h1>

          <p>

            Future Devices

          </p>

        </div>



        <div className="stat">

          <h1>

            24/7

          </h1>

          <p>

            AI Monitoring

          </p>

        </div>



        <div className="stat">

          <h1>

            100%

          </h1>

          <p>

            Student Built

          </p>

        </div>

      </section>
      {/* ================= VISION ================= */}

      <section className="vision">

        <span className="section-small">
          OUR VISION
        </span>

        <h2>

          Today, smart homes use many apps.

          <br /><br />

          Tomorrow,

          <span className="gradient">

            HOL.OS

          </span>

          becomes the Operating System.

        </h2>

        <p>

          Our long-term vision is to build a global operating system

          for smart living—

          one that makes connected technology

          simpler,

          smarter,

          and more human.

        </p>

      </section>



      {/* ================= TEAM ================= */}

      <section className="team">

        <span className="section-small">

          THE TEAM

        </span>

        <h2>

          Built by a team that believes

          homes can be smarter.

        </h2>



        <div className="member">

          <h3>

            👨‍💻 Arjun Krishnatre

          </h3>

          <h4>

            Founder & Lead Developer

          </h4>

          <p>

            Founded HOL.OS and leads

            product development,

            frontend,

            backend,

            AI integration,

            smart-device connectivity,

            and the long-term vision.

          </p>

        </div>



        <div className="member">

          <h3>

            📋 Navya

          </h3>

          <h4>

            Operations & Brand Representative

          </h4>

          <p>

            Manages operations,

            documentation,

            public representation,

            and supports the overall organisation

            of HOL.OS.

          </p>

        </div>



        <div className="member">

          <h3>

            📈 Divyank

          </h3>

          <h4>

            Finance & Presentation

          </h4>

          <p>

            Responsible for finance,

            budgeting,

            business communication,

            presentations,

            and investment planning.

          </p>

        </div>



        <div className="member">

          <h3>

            📊 Riya

          </h3>

          <h4>

            Strategy & Research

          </h4>

          <p>

            Conducts research,

            SWOT analysis,

            strategy,

            planning,

            and product improvement.

          </p>

        </div>

      </section>



      {/* ================= ROADMAP ================= */}

      <section className="roadmap">

        <span className="section-small">

          ROADMAP

        </span>

        <h2>

          Where HOL.OS is going next

        </h2>



        <div className="timeline">

          <div className="timeline-item">

            <div className="circle done">

              ✓

            </div>

            <div>

              <h3>

                Working Prototype

              </h3>

              <p>

                React frontend

                & FastAPI backend.

              </p>

            </div>

          </div>



          <div className="timeline-item">

            <div className="circle done">

              ✓

            </div>

            <div>

              <h3>

                LG ThinQ Integration

              </h3>

              <p>

                Real-time refrigerator monitoring.

              </p>

            </div>

          </div>



          <div className="timeline-item">

            <div className="circle active">

              ◉

            </div>

            <div>

              <h3>

                Product Polish

              </h3>

              <p>

                Improving UI,

                dashboards,

                automation,

                and AI.

              </p>

            </div>

          </div>



          <div className="timeline-item">

            <div className="circle">

              04

            </div>

            <div>

              <h3>

                Multi-Brand Support

              </h3>

              <p>

                LG,

                Samsung,

                Alexa,

                Google,

                Philips Hue,

                and more.

              </p>

            </div>

          </div>



          <div className="timeline-item">

            <div className="circle">

              05

            </div>

            <div>

              <h3>

                Public Beta

              </h3>

              <p>

                Real-world testing

                with smart homes.

              </p>

            </div>

          </div>



          <div className="timeline-item">

            <div className="circle">

              06

            </div>

            <div>

              <h3>

                Global Launch

              </h3>

              <p>

                The future of smart living

                powered by HOL.OS.

              </p>

            </div>

          </div>

        </div>

      </section>



      {/* ================= END ================= */}

      <section className="ending">

        <h1>

          The Future

          <br />

          Starts With

          <span className="gradient">

            HOL.OS

          </span>

        </h1>



        <p>

          One Intelligence.

          Every Device.

        </p>



        <Link to="/signup">

          <button className="hero-button">

            Get Started

          </button>

        </Link>

      </section>



      <footer>

        <h2>

          HOL.OS

        </h2>

        <p>

          One Intelligence.

          Every Device.

        </p>

      </footer>

    </div>

  );

}

export default About;