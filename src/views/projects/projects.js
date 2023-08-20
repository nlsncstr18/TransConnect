import React from "react";
import Sample from "../../assets/sample.mkv";
import Sample2 from "../../assets/sample2.mp4";
import Sample3 from "../../assets/sample3.mp4";
import Fade from "react-reveal/Fade";
import NavbarDash from "../../components/NavbarDash";
import "./projects.css";
const projects = () => {
  return (
    <>
      <NavbarDash />
      <div className="bg-black w-full h-screen p-10 overflow-y-scroll">
        <div className="flex relative">
          <Fade left duration={2000}>
            <div className="text-white sm:m-10 sm:text-sm border-l sm:p-3 sm:h-16 font-serif">
              <div className="info-section text-white sm:max-w-2xl ">
                TransConnect
                <span>
                  : Assisting Commuters and Transport Workers with Real-Time
                  Public Transport Information and Assistance
                </span>
              </div>
              <br></br>

              <div className="sm:max-w-2xl text-justify info-section sm:text-sm font-thin">
                <h1 className="text-white">Project Objectives</h1>
                <Fade left duration={3000}>
                  <h4>
                    The objective of this project is to design a device that
                    would lessen the work and help transport workers and
                    commuters in their everyday life of commuting. The following
                    goals should be followed:
                    <br></br>
                    <br></br>
                    <li>
                      To improve and implement the public transportation
                      information dissemination real-time.
                    </li>
                    <br></br>
                    <li>
                      To enhance the transport workers awareness about the
                      commuters by providing them a device that allows them to
                      see the status of commuters, stations and payment details.
                    </li>
                    <br></br>
                    <li>
                      To improve commuters' awareness of public transportation
                      by offering them a mobile application that provides
                      real-time updates on the status of vehicles, stations, and
                      arrival times.
                    </li>
                  </h4>
                </Fade>
              </div>
            </div>
          </Fade>

          <div className="flex flex-col sm:m-10 items-center">
            <Fade duration={8000}>
              <video autoPlay loop muted className="sm:w-auto sm:h-80 ">
                <source src={Sample} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Fade>
            <Fade duration={9000}>
              <video autoPlay loop muted className="sm:w-auto sm:h-80 ">
                <source src={Sample2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Fade>
            <Fade duration={10000}>
              <video autoPlay loop muted className="sm:w-80 sm:h-auto ">
                <source src={Sample3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};

export default projects;
