import React, { useEffect } from "react";
import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIcon from "./assets/icons/user.png";
import PassIcon from "./assets/icons/pass.png";

const LoginModal = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (pin === "555555") {
      console.log("login success");
      navigate("/dashboard");
    }
  }, [pin, navigate]);

  const handleClick = (value) => {
    if (value === "clear") {
      setPin("");
    } else if (value === "delete") {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 6 && !isNaN(value)) {
      setPin(pin + value);
    }
  };

  const formattedPin = pin.split("").join("    ");
  return (
    <>
      <div className="main-container">
        <div className="login-container">
          <div>
            <div className="form-box login">
              <h3 className="animate-character">TransConnect</h3>

              <form action="#">
                <div className="input-box">
                  <input
                    className="input-pin"
                    type="text"
                    placeholder="the pin is 555555"
                    defaultValue={formattedPin}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="grid-container">
            <div className="grid-item" onClick={() => handleClick(7)}>
              7
            </div>
            <div className="grid-item" onClick={() => handleClick(8)}>
              8
            </div>
            <div className="grid-item" onClick={() => handleClick(9)}>
              9
            </div>
            <div className="grid-item" onClick={() => handleClick(4)}>
              4
            </div>
            <div className="grid-item" onClick={() => handleClick(5)}>
              5
            </div>
            <div className="grid-item" onClick={() => handleClick(6)}>
              6
            </div>
            <div className="grid-item" onClick={() => handleClick(1)}>
              1
            </div>
            <div className="grid-item" onClick={() => handleClick(2)}>
              2
            </div>
            <div className="grid-item" onClick={() => handleClick(3)}>
              3
            </div>
            <div className="grid-item" onClick={() => handleClick(0)}>
              0
            </div>
            <div className="grid-item" onClick={() => handleClick("clear")}>
              clear
            </div>
            <div className="grid-item" onClick={() => handleClick("delete")}>
              delete
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
