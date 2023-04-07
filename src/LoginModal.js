import React from "react";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className="body-modal">
        <div className="login-modal">
          <h1 className="transconnect">TRANSCONNECT</h1>

          <button onClick={handleOnclick} className="login-btn">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
