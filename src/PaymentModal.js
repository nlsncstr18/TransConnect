import React, { useState } from "react";
import "./PaymentModal.css";
import Arrow from "./assets/icons/arrow.png";
import DateTime from "./components/DateTime";
const PaymentModal = () => {
  const [selectedOptionFrom, setSelectedOptionFrom] = useState("From");
  const [selectedOptionTo, setSelectedOptionTo] = useState("To");
  const [sum, setSum] = useState(
    Number(selectedOptionFrom) + Number(selectedOptionTo)
  );

  const handleOptionFrom = (event) => {
    setSelectedOptionFrom(event.target.value);
    setSum(Number(event.target.value) + Number(selectedOptionTo));
  };

  const handleOptionTo = (event) => {
    setSelectedOptionTo(event.target.value);
    setSum(Number(selectedOptionFrom) + Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="payment-container">
        <h1 className="payment-section">Payment Section</h1>
        <form onSubmit={handleSubmit}>
          <div className="payment-info">
            <label>
              <select
                className="option1"
                value={selectedOptionFrom}
                onChange={handleOptionFrom}
              >
                <option value="From" disabled selected>
                  From:
                </option>
                <option value="25">Cavite</option>
                <option value="10">Makati</option>
                <option value="15">Pasay</option>
              </select>
            </label>
            <div>
              <img className="img-arrow" src={Arrow} alt="Icon" />
            </div>

            <label>
              <select
                className="option2"
                value={selectedOptionTo}
                onChange={handleOptionTo}
              >
                <option value="To" disabled selected>
                  To:
                </option>
                <option value="12">Cavite</option>
                <option value="11">Makati</option>
                <option value="13">Pasay</option>
              </select>
            </label>
            <br />
          </div>
          <div className="result">{sum ? `₱${sum}` : "₱0"}</div>
          <div className="date-time">
            <DateTime />
          </div>
          <div className="save-button">
            <button className="savebutton" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentModal;
