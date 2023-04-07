import React, { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = () => {
  const [selectedOptionFrom, setSelectedOptionFrom] = useState("option1");
  const [selectedOptionTo, setSelectedOptionTo] = useState("option1");

  const handleOptionFrom = (event) => {
    setSelectedOptionFrom(event.target.value);
  };
  const handleOptionTo = (event) => {
    setSelectedOptionTo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="payment-container">
        <h1 className="payment-section">Payment Section</h1>
        <form onSubmit={handleSubmit}>
          <label>
            From:
            <select value={selectedOptionFrom} onChange={handleOptionFrom}>
              <option value="Cavite">Cavite</option>
              <option value="Makati">Makati</option>
              <option value="Pasay">Pasay</option>
            </select>
          </label>
          <br />
          <label>
            To:
            <select value={selectedOptionTo} onChange={handleOptionTo}>
              <option value="Cavite">Cavite</option>
              <option value="Makati">Makati</option>
              <option value="Pasay">Pasay</option>
            </select>
          </label>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PaymentModal;
